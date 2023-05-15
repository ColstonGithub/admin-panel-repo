import {
  WHITE_SPACES_REGEX_PASSWORD,
  NEW_PASSWORD_REGEX,
} from "constants/AppConstant";

import * as Yup from "yup";
export const setupPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .matches(WHITE_SPACES_REGEX_PASSWORD, "Password is invalid")
    .min(6, "Password should be 6 to 20 characters long")
    .max(20, "Password should be 6 to 20 characters long")
    .matches(NEW_PASSWORD_REGEX, "Password is invalid"),

  confirmPassword: Yup.string()
    .required("Password is required")
    .matches(WHITE_SPACES_REGEX_PASSWORD, "Please enter valid password")
    .oneOf([Yup.ref("password"), null], "Password does not match"),
});
