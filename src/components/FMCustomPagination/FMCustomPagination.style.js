import { makeStyles } from "@mui/styles";
import { BG_WHITE, BLACK, DEEP_GREY, PDSL_BLUE } from "constants/colors";
export const useStyles = makeStyles(
  () => ({
    pagination: {
      "& .MuiPaginationItem-root": {
        color: BLACK,
        border: `0.063rem solid ${DEEP_GREY}`,
      },
      "& .MuiButtonBase-root.Mui-selected": {
        backgroundColor: PDSL_BLUE,
        color: BG_WHITE,
      },
      "& .MuiButtonBase-root.Mui-selected:hover": {
        backgroundColor: PDSL_BLUE,
        color: BG_WHITE,
      },
      "& .MuiPaginationItem-ellipsis": {
        border: 0,
      },
      "& .MuiPaginationItem-root button": {
        margin: 0,
      },
    },
  }),
  { name: "MuiLoginViewStyles" }
);
