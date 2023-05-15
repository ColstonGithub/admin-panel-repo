import {
  WHITE_SPACES_REGEX_PASSWORD,
  EMAIL_REGEX,
} from "constants/AppConstant";
import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required("User name is mandatory")
    .matches(EMAIL_REGEX, "Please enter valid email")
    .min(6, "Username should be 6 to 100 characters long")
    .max(100, "Username should be 6 to 100 characters long"),
  password: Yup.string()
    .required("Password is mandatory")
    .matches(WHITE_SPACES_REGEX_PASSWORD, "Please enter valid password")
    .max(20, "Password should be of maximum 20 characters"),
});
