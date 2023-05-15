import * as Yup from "yup";

export const verifyEmailSchema = Yup.object().shape({
  otp: Yup.string().required("OTP is mandatory"),
});
