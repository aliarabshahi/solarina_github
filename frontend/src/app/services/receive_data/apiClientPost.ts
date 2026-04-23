// src/app/services/api/postApiData.ts
// Sends JSON data through proxy to backend

export const postApiData = async <T>(
  endpoint: string,
  body: Record<string, any>
): Promise<{ data: T | null; error?: string }> => {
  try {
    const res = await fetch(`/api/proxy/${endpoint}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      let errorMsg = `خطای ${res.status}`;
      try {
        const errorData = await res.json();
        if (typeof errorData === "object") {
          errorMsg =
            Object.values(errorData).flat().join(" | ") || errorMsg;
        }
      } catch {
        // no-op
      }
      throw new Error(errorMsg);
    }

    const data = (await res.json()) as T;
    return { data };
  } catch (error) {
    const msg =
      error instanceof Error
        ? error.message
        : "مشکلی در ارسال داده‌ها رخ داده است";
    return { data: null, error: msg };
  }
};
