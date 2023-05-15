import { CANCEL_GREY_BORDER, LIGHT_GREY_BORDER } from "constants/colors";
export const commonStyle = {
  flexDisplayStyle: { display: "flex" },
  capitalizeTextStyle: { textTransform: "capitalize" },
  mainGridContainer: {
    display: "flex",
    alignItems: "center",
    background: "white",
    height: "75vh",
    justifyContent: "center",
  },

  commonModalTitleStyle:{
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "16px",
    color: "#222222",
  },

  innerGrid: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "2rem",
    marginTop: "5rem",
    borderRadius: "20px",
    boxShadow:
      " 0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
  },
  formOuterBoxStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  flexStyle: {
    display: "flex",
    flexDirection: "column",
  },
  inputFieldStyle: {
    width: "100%",
    height: "2.75rem",
    padding: "1rem",
    marginTop: "0.5rem",
    marginBottom: "0.375rem",
    border: `0.063rem solid grey`,
    boxSizing: "border-box",
    boxShadow: "0rem 0.25rem 0.5rem rgba(0,0,0,0.04)",
    borderRadius: "0.5rem",
    color: "black",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
      color: "black",
    },
    "&::placeholder": {
      color: "black",
      opacity: 1,
    },
  },
  errorStyle: {
    border: "0.125rem solid red",

    "&:hover": {
      border: "0.125rem solid red",
    },
  },
  errorText: {
    width: "100%",
    color: "red",
    height: "1.25rem",
    fontFamily: " 'Inter', sans-serif", 
    fontSize: "0.875rem",
    marginTop: "0.375rem",
  },

  paddingZero: {
    padding: 0,
  },
  buttonBox: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: "1.625rem",
  },
  buttonStyles: {
    width: "auto",
    height: "2.75rem",
    backgroundColor: "#801317",
    borderRadius: "0.5rem",
    fontSize: "1rem",
    fontWeight: "700",
    lineHeight: "1.5rem",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#801317",
    },
  },
  textTransformStyle: {
    textTransform: "none",
    fontFamily: " 'Inter', sans-serif", 
    fontWeight: "600",
  },
  disableRippleStyle: {
    color: "#717171",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  inputLabelStyle: {
    fontStyle: "normal",
    fontFamily: " 'Inter', sans-serif", 
    fontSize: "1.063rem",
    marginTop: "1rem",
    lineHeight: "1.25rem",
    color: "rgba(26,26,26,0.4)",
    fontWeight: "600",
  },
  headingStyle: {
    fontFamily: " 'Inter', sans-serif", 
    fontWeight: "600",
    fontSize: "1.5rem",
  },
  dropdownStyle: {
    background: "white",
    boxShadow: `0rem 0.0625rem 0.125rem ${LIGHT_GREY_BORDER}`,
    borderRadius: "0.5rem",
    height: "2.75rem",
    "& .MuiOutlinedInput-notchedOutline": {
      border: `0.0625rem solid ${CANCEL_GREY_BORDER}`,
    },
    "&.Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        border: `0.0625rem solid ${CANCEL_GREY_BORDER}`,
      },
    },
  },
};

export const editModalStyling = {};
