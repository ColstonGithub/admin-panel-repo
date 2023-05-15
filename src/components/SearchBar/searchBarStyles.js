export const SearchStyle = {
  searchBoxWrapper: {
    display: "flex",
    alignItems: "center",
    border: `0.06rem solid #1a1a1a1f`,
    borderRadius: "50px",
    width: "auto",
    height: "auto",
    padding: "0.625rem 1rem",
    // boxShadow: "0rem 0.25rem 0.5rem rgba(0, 174, 239, 0.02)",
    boxShadow:
      " 0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
  },

  searchIcon: {
    marginRight: "0.625rem",
    color: "#1a1a1a66",
  },
  inputField: {
    "&.MuiInput-input": {
      lineHeight: "1.3125rem",
      fontFamily: "'Inter'",
      fontStyle: "normal",
      fontWeight: "400",
      color: "black",
      fontSize: "0.875rem",
    },
  },
  cancelIcon: {
    color: "#1a1a1a66",
    cursor: "pointer",
  },
};
