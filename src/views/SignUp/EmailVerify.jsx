import { Grid } from "@mui/material";
import FMTypography from "components/FMTypography/FMTypography";
import ColstonLogo from "../../assets/ColstonLogo.png";
import { HeaderStyle } from "components/SearchBar/HeaderStyle";
import React from "react";
import { commonStyle } from "Styles/commonStyles";
import { Box } from "@mui/system";

const EmailVerify = () => {
  return (
    <>
      <Box
        sx={{ ...commonStyle.flexDisplayStyle, padding: "1rem 50px 0 50px" }}
      >
        <img
          src={ColstonLogo}
          alt="ColstonLogo"
          style={{ ...HeaderStyle.ColstonLogoStyle, marginTop: "0.6rem" }}
        />
      </Box>
      <Grid container sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item sx={commonStyle.innerGrid}>
          <FMTypography
            displayText={
              "Please verify mail by clicking on link sent on your email id"
            }
            sx={{ fontWeight: "600",  fontFamily: " 'Inter', sans-serif",  }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default EmailVerify;
