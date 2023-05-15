import { EMAIL_REGEX } from "constants/AppConstant";
import * as Yup from "yup";

export const forgotOtpSchema = Yup.object().shape({
  email: Yup.string()
    .required("User name is mandatory")
    .matches(EMAIL_REGEX, "Please enter valid email")
    .min(6, "Username should be 6 to 100 characters long")
    .max(100, "Username should be 6 to 100 characters long"),
});
