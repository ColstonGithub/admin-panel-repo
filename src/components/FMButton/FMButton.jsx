import * as React from "react";
import Button from "@mui/material/Button";

export default function FMButton({
  displayText,
  onClick,
  styleData,
  variant,
  ...restProps
}) {
  return (
    <Button
      variant={variant || "contained"}
      disableRipple
      disableElevation
      sx={styleData}
      onClick={onClick}
      {...restProps}
    >
      {displayText}
    </Button>
  );
}
