import React from "react";
import Typography from "@mui/material/Typography";
import { commonStyle } from "Styles/commonStyles";
const style = {
  typographyStyle: {
    color: "black",
  },
};
const FMTypography = ({ displayText, styleData, ...restProps }) => {
  return (
    <Typography sx={{ ...style.typographyStyle, ...commonStyle.commonModalTitleStyle,...styleData, }} {...restProps}>
      {displayText}
    </Typography>
  );
};

export default FMTypography;
