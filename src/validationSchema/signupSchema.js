import {
  WHITE_SPACES_REGEX_PASSWORD,
  EMAIL_REGEX,
  NEW_PASSWORD_REGEX,
  MOBILE_NUMBER_REGEX,
} from "constants/AppConstant";
import * as Yup from "yup";

export const signUpSchema = Yup.object().shape({
  firstName: Yup.string().required("name is mandatory"),

  lastName: Yup.string().required("Last name is mandatory"),

  contactNumber: Yup.string()
    .required("Phone number is mandatory")
    .test("check_all_zero", "Phone number is invalid", (val) => +val > 0)
    .matches(MOBILE_NUMBER_REGEX, "Phone number is invalid")
    .max(10, "Phone number should not exceed 10 digits"),

  email: Yup.string()
    .required("User name is mandatory")
    .matches(EMAIL_REGEX, "Please enter valid email")
    .min(6, "Username should be 6 to 100 characters long")
    .max(100, "Username should be 6 to 100 characters long"),

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
