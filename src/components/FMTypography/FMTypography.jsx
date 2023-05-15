import React from "react";
import Typography from "@mui/material/Typography";
const style = {
  typographyStyle: {
    color: "black",
  },
};
const FMTypography = ({ displayText, styleData, ...restProps }) => {
  return (
    <Typography sx={{ ...style.typographyStyle, ...styleData }} {...restProps}>
      {displayText}
    </Typography>
  );
};

export default FMTypography;
