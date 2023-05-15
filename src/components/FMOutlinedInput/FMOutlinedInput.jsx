import React from "react";
import { Box, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
// import { commonStyles } from "Styles/commonStyles";

import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { commonStyle } from "Styles/commonStyles";
import FMInputLabel from "components/FMInputLabel/FMInputLabel";
import FMTypography from "components/FMTypography/FMTypography";

function FMOutlinedInput({
  // This component is specifically used for password input
  inputLabel,
  placeholder,
  type,
  register,
  error,
  passwordToggle,
  passwordType,
  errors,
  errorKey,
}) {
  return (
    <Box>
      <FMInputLabel
        displayText={inputLabel}
        styleData={commonStyle.inputLabelStyle}
      />
      <OutlinedInput
        placeholder={placeholder}
        type={type}
        sx={{
          ...commonStyle.inputFieldStyle,
          ...commonStyle.paddingZero,
          ...(errors[errorKey] && commonStyle.errorStyle),
        }}
        {...register}
        error={error}
        endAdornment={
          <InputAdornment position="start">
            <IconButton
              aria-label="toggle password visibility"
              onClick={passwordToggle}
              edge="end"
            >
              {passwordType ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      <FMTypography
        styleData={commonStyle.errorText}
        displayText={errors[errorKey]?.message}
      />
    </Box>
  );
}

export default FMOutlinedInput;
