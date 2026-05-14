import { postApiData } from "../receive_data/apiClientPost";

export const sendOTP = async (phone: string) => {
  return await postApiData("/auth/send-otp/", {
    phone_number: phone,
  });
};

export const verifyOTP = async (
  phone: string,
  code: string
) => {
  const res = await postApiData<any>(
    "/auth/verify-otp/",
    {
      phone_number: phone,
      code: code,
    }
  );

  // IMPORTANT
  if (res.error) {
    throw new Error(res.error);
  }

  if (res?.data?.user) {
    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );
  }

  return res.data;
};
