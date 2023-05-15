import React from "react";
import { Box } from "@mui/material";
// import FMTypography from "Components/FMTypography";
// import { commonStyles } from "Styles/commonStyles";
import FMTypography from "../FMTypography/FMTypography";
import { commonStyle } from "../../Styles/commonStyles";

const FMDetailTypography = (props) => {
  const {
    styleData,
    styleData1,
    styleData2,
    displayText1,
    displayText2,
    displayText3,
    styleData3,
  } = props;
  return (
    <Box sx={{ ...styleData, display: "flex" }}>
      <FMTypography
        styleData={{
          fontStyle: "normal",
          textTransform: "capitalize",
          fontWeight: 400,
          fontFamily: " 'Inter', sans-serif",
          fontSize: "1rem",
          color: "#717171",
          ...styleData1,
        }}
        displayText={displayText1}
      />
      {displayText2 && (
        <FMTypography
          styleData={{
            fontStyle: "normal",
            textTransform: "capitalize",
            fontWeight: 400,
            fontFamily: " 'Inter', sans-serif",
            fontSize: "1rem",
            color: "black",
            ...styleData2,
          }}
          displayText={displayText2}
        />
      )}

      {displayText3 && (
        <FMTypography
          styleData={{
            ...commonStyle.detailTypographyStyle,
            ...commonStyle.detailTypographyStyleData,
            ...styleData3,
          }}
          displayText={displayText3}
        />
      )}
    </Box>
  );
};

export default FMDetailTypography;
