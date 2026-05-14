import { postApiData } from "../receive_data/apiClientPost";
import { saveUser } from "./authStorage";

export async function sendOTP(phone: string) {
  return await postApiData(
    "/auth/send-otp/",
    {
      phone_number: phone.trim(),
    }
  );
}

export async function verifyOTP(
  phone: string,
  code: string
) {
  const cleanPhone = phone.trim();

  const res = await postApiData(
    "/auth/verify-otp/",
    {
      phone_number: cleanPhone,
      code: code.trim(),
    }
  );

  if (res.error) {
    throw new Error(res.error);
  }

  // ✅ Always save phone after successful verify
  saveUser({
    phone: cleanPhone,
  });

  return res;
}
