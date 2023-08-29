import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import FMTypography from "components/FMTypography/FMTypography";
import { HeaderStyle } from "components/SearchBar/HeaderStyle";
import { commonStyle } from "Styles/commonStyles";
import { Box } from "@mui/system";

import { useSelector } from "react-redux";
import { getInitialImagesAdmin } from "redux/Slices/InitialImagesAdmin/InitialImagesAdminSlice";
const EmailVerify = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInitialImagesAdmin());
  }, [dispatch]);

  const initialImagesAdmin = useSelector(
    (state) => state?.InitialImagesAdmin?.initialImagesAdmin?.initialImages
  );
  const ColstonLogo = initialImagesAdmin && initialImagesAdmin[24]?.image;

  return (
    <>
      <Box
        sx={{ ...commonStyle.flexDisplayStyle, padding: "1rem 50px 0 50px" }}
      >
        <img
          src={ColstonLogo}
          alt="ColstonLogo"
          style={{
            ...HeaderStyle.ColstonLogoStyle,
            marginTop: "0.6rem",
            width: "300px",
            height: "auto",
          }}
        />
      </Box>
      <Grid container sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item sx={commonStyle.innerGrid}>
          <FMTypography
            displayText={
              "Please verify mail by clicking on link sent on your email id"
            }
            sx={{ fontWeight: "600", fontFamily: " 'Inter', sans-serif" }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default EmailVerify;
