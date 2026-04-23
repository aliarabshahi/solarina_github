// src/app/services/api/fetchApiData.ts
// Client-side safe: hits Next.js proxy API routes instead of backend directly

import { ApiResponse } from "@/app/types/coursesType";

export const fetchApiData = async <T>(
  endpoint: string,
  params?: Record<string, string | number | boolean>
): Promise<ApiResponse<T>> => {
  const url = new URL(`/api/proxy/${endpoint}/`, window.location.origin);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const res = await fetch(url.toString(), {
    cache: "no-store", // always fresh
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status}`);
  }

  return res.json();
};
