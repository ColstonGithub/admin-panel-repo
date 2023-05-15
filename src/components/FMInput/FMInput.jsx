import { InputBase } from "@mui/material";
import FMInputLabel from "components/FMInputLabel/FMInputLabel";
import FMTypography from "components/FMTypography/FMTypography";
import React from "react";
import { commonStyle } from "Styles/commonStyles";
import { inputFieldStyle } from "./FMInput.style";

const FMInput = (
  {
    required,
    readOnly,
    displayText,
    id,
    placeholder,
    register,
    error,
    errorDisplayText,
    customInputLabelStyle,
    fullWidth = true,
    customInputStyle,
    ...restProps
  },
  ref
) => {
  return (
    <>
      <FMInputLabel
        required={required}
        displayText={displayText}
        styleData={{
          ...customInputLabelStyle,
        }}
      />
      <InputBase
        ref={ref}
        id={id}
        placeholder={placeholder}
        required
        fullWidth={fullWidth}
        readOnly={readOnly}
        sx={{
          ...inputFieldStyle.inputStyle,
          ...customInputStyle,
          ...(error && commonStyle.errorStyle),
        }}
        {...register}
        {...restProps}
        error={error ? true : false}
      />
      {errorDisplayText && (
        <FMTypography
          displayText={errorDisplayText}
          styleData={commonStyle.errorText}
        />
      )}
    </>
  );
};

export default React.forwardRef(FMInput);
