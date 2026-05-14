import { postApiData } from "../receive_data/apiClientPost";
import { saveUser } from "./authStorage";

interface VerifyResponse {
  user: {
    phone: string;
  };
}

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
  const res = await postApiData<VerifyResponse>(
    "/auth/verify-otp/",
    {
      phone_number: phone.trim(),
      code: code.trim(),
    }
  );

  if (res.error) {
    throw new Error(res.error);
  }

  if (res.data?.user) {
    saveUser({
      phone: res.data.user.phone,
    });
  }

  return res;
}
