function cleanEndpoint(endpoint: string) {
  let out = endpoint.replace(/^\/+/, "");
  const isMediaStatic = out.startsWith("media/") || out.startsWith("static/");
  const isMediaFile = /\.(pdf|jpg|jpeg|png|gif|svg|webp|mp4|mov|avi|mp3|wav|ogg)$/i.test(out);

  if (out.includes("?") || isMediaStatic || isMediaFile) {
    out = out.replace(/\/+$/, "");
  } else {
    out = out.replace(/\/+$/, "") + "/";
  }
  return out;
}

function getBaseUrl() {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "http://localhost:3000";
}

export const getApiData = async (endpoint: string) => {
  const cleanedEndpoint = cleanEndpoint(endpoint);
  const baseUrl = getBaseUrl();
  const finalUrl = `${baseUrl}/api/proxy/${cleanedEndpoint}`;

  try {
    const res = await fetch(finalUrl, { cache: "no-store" });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    if (Array.isArray(data.results) && data.results.length === 0) {
      return { data: [], message: "داده‌ای برای نمایش وجود ندارد" };
    }
    if (data.results?.data && data.results.data.length === 0) {
      return { data: [], message: "داده‌ای برای نمایش وجود ندارد" };
    }
    if (Array.isArray(data.results)) return { data: data.results };
    if (data.results?.data) return { data: data.results.data };
    return { data };
  } catch (err) {
    return {
      data: null,
      error: "متاسفانه مشکلی در ارتباط با سرور رخ داده است",
    };
  }
};
