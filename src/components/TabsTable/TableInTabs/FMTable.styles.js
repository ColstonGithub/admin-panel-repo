import { BLACK, DEEP_GREY } from "constants/colors";

export const styles = {
  tableContainerStyles: {
    "&.MuiTableContainer-root": {
      boxShadow: "none",
    },
  },
  paginationStyle: {
    height: `calc(100vh - 20rem)`,
    overflow: "auto",
  },
  paginationContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "0.75rem",
    marginBottom: "1rem",
  },
  customSrollBar: {
    "&::-webkit-scrollbar": {
      width: "0.3em",
      height: "0.3rem",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 0.375rem rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 0.375rem rgba(0,0,0,0.00)",
      width: "0.438rem",
      borderRadius: "0.75rem",
      background: "#DADADA",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      borderRadius: "0.75rem",
      background: "#BFBFBF",
    },
  },
  tableBorderStyle: {
    contain: "paint",
    // border: `0.063rem solid ${DEEP_GREY}`,
    borderLeft: `0.063rem solid ${DEEP_GREY}`,
    borderRight: `0.063rem solid ${DEEP_GREY}`,
    borderBottom: `0.063rem solid ${DEEP_GREY}`,
    borderRadius: "0.5rem",
  },
  tableHeadRow: {
    height: "3.313rem",
  },
  tableHeadCell: {
    fontFamily: "Inter",
    fontWeight: 500,
    color: BLACK,
    opacity: 1,
    borderTop: `0.063rem solid ${DEEP_GREY} `,
  },
  notFoundStyle: {
    justifyContent: "center",
    marginTop: "6rem",
  },
  maxWidth: {
    maxWidth: "",
  },
  noPaginationTable: {
    overflow: "hidden",
  },
};
