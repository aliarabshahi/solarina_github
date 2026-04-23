import { NextRequest, NextResponse } from "next/server";
import { getServerConfig } from "@/app/services/config/config";

// Detect if running on the server (SSR or image optimizer)
function isServerSide() {
  return typeof window === "undefined";
}

async function forward(req: NextRequest, path: string[], method: string) {
  const { API_BASE_URL, API_TOKEN } = getServerConfig();

  const isMediaRequest = path[0] === "media" || path[0] === "static";
  let targetBaseUrl = API_BASE_URL;
  if (isMediaRequest) {
    // Switch from /api/ base to root base for media/static
    targetBaseUrl = API_BASE_URL.replace("/api/", "/");
  }

  const isMediaFile = path.some(segment =>
    /\.(pdf|jpg|jpeg|png|gif|svg|webp|mp4|mov|avi|mp3|wav|ogg)$/i.test(segment)
  );
  const trailingSlash = isMediaRequest && isMediaFile ? "" : "/";
  const queryString = req.nextUrl.search;
  const targetUrl = `${targetBaseUrl}${path.join("/")}${trailingSlash}${queryString}`;
  console.log(`[Proxy→Nginx] ${method} -> ${targetUrl}`);

  // Determine the public base URL from request headers or fallback
  const publicBaseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    `${req.headers.get("x-forwarded-proto") || "http"}://${
      req.headers.get("host") || "localhost:3000"
    }`;

  const fetchOptions: RequestInit = {
    method,
    headers: !isMediaRequest
      ? { Authorization: `Token ${API_TOKEN}` }
      : {},
    redirect: "manual",
  };

  if (method !== "GET" && method !== "HEAD" && !isMediaRequest) {
    const body = await req.text();
    fetchOptions.headers = {
      ...fetchOptions.headers,
      "Content-Type": req.headers.get("content-type") || "application/json",
    };
    fetchOptions.body = body;
  }

  try {
    const resp = await fetch(targetUrl, fetchOptions);

    if (resp.status >= 300 && resp.status < 400) {
      const location = resp.headers.get("location");
      if (location) {
        return NextResponse.redirect(location);
      }
    }

    const contentType = resp.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const data = await resp.json();
      const rewrittenData = rewriteUrlsInObject(
        data,
        publicBaseUrl,
        "http://nginx/solarina/"
      );
      return NextResponse.json(rewrittenData, { status: resp.status });
    } else {
      const buffer = await resp.arrayBuffer();
      return new NextResponse(buffer, {
        status: resp.status,
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": resp.headers.get("content-disposition") || "",
        },
      });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to proxy request" }, { status: 500 });
  }
}

function rewriteUrlsInObject(obj: any, publicBaseUrl: string, ssrBaseUrl: string): any {
  const isPdfOrDoc = (url: string) =>
    /\.(pdf|docx?|xlsx?|pptx?)$/i.test(url);

  if (typeof obj === "string") {
    if (obj.startsWith("http://nginx/solarina/")) {
      // Server-side behavior: split by file type
      if (isServerSide()) {
        if (isPdfOrDoc(obj)) {
          return obj.replace("http://nginx/solarina/", `${publicBaseUrl}/api/proxy/`);
        }
        return ssrBaseUrl ? obj.replace("http://nginx/solarina/", ssrBaseUrl) : obj;
      }
      // Client: always go public
      return obj.replace("http://nginx/solarina/", `${publicBaseUrl}/api/proxy/`);
    }
    return obj;
  } else if (Array.isArray(obj)) {
    return obj.map(item => rewriteUrlsInObject(item, publicBaseUrl, ssrBaseUrl));
  } else if (typeof obj === "object" && obj !== null) {
    const rewrittenObj: any = {};
    for (const key in obj) {
      rewrittenObj[key] = rewriteUrlsInObject(obj[key], publicBaseUrl, ssrBaseUrl);
    }
    return rewrittenObj;
  }
  return obj;
}

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  return forward(req, params.path, "GET");
}

export async function POST(req: NextRequest, { params }: { params: { path: string[] } }) {
  return forward(req, params.path, "POST");
}
