// src/app/services/api/postApiDataWithFile.ts
// Handles file uploads through the proxy

export const postApiDataWithFile = async <T>(
  endpoint: string,
  formData: FormData
): Promise<{ data: T | null; error?: string }> => {
  try {
    const res = await fetch(`/api/proxy/${endpoint}/`, {
      method: "POST",
      body: formData,
      // Content-Type is automatically set by browser for FormData
    });

    if (!res.ok) {
      let errorMsg = `خطای ${res.status}`;
      try {
        const errorData = await res.json();
        errorMsg =
          Object.values(errorData).flat().join(" | ") || errorMsg;
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
