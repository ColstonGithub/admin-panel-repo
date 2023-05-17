export const HeaderStyle = {
  headerFullStyle: {
    backgroundColor: "#FAFBFD",
    boxShadow: "0px 1px 12px rgba(181, 180, 180, 0.12)",
  },
  iconGridContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem 50px",
  },
  monkeyLogoStyle: { width: "50px", height: "50px" },
  //colstonLogoStyle: { width: "150px", height: "30px", marginTop: "1rem" },
  cartStyle: {
    width: "20px",
    height: "18px",
    margin: "1rem 2rem 0 0",
  },
  profileIconStyle: { width: "20px", height: "20px" },

  //   menu style
  menuGridStyle: {
    // backgroundColor: "#f5f5f5 ",
    padding: "12px 0 12px 50px",
  },
  menuBtnStyle: {
    color: "black",
    fontSize: "14px",
    "&:hover": {
      backgroundColor: "#E6E6E6 !important",
      borderRadius: "28px",
    },
  },
  lgjaStyle: {
    ".MuiMenu-list": {
      width: "236px",
    },
    ".MuiPopover-paper": {
      padding: "1rem 1rem 1rem 0",
      borderRadius: "20px",
      width: "236px",
      // backgroundColor: "red",
    },
  },
  openOnHover: {
    "&:hover": { display: "block" },
  },
};
