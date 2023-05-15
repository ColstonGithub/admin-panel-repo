import {
  BLACK,
  BG_WHITE,
  CANCEL_GREY_BORDER,
  DETAIL_HEADING,
} from "constants/colors";
//import { commonStyles } from "Styles/commonStyles";

export const inputFieldStyle = {
  inputStyle: {
    background: BG_WHITE,
    border: `0.0625rem solid ${CANCEL_GREY_BORDER}`,
    borderRadius: "0.5rem",
    height: "2.75rem",
    padding: "0.625rem 0.875rem",
    // fontFamily: commonStyles.fontFamilyStyle,
    lineHeight: "1.5rem",
    fontSize: "1rem",
    fontWeight: "400",
    color: BLACK,
  },
  inputTitleStyle: {
    color: DETAIL_HEADING,
    fontSize: "0.875rem",
    marginBottom: "0.4rem",
  },
};
