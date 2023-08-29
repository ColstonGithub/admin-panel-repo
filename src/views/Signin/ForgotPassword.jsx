import React from "react";
import { Box, Grid, InputBase } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FMButton from "components/FMButton/FMButton";
import FMTypography from "components/FMTypography/FMTypography";
import { HeaderStyle } from "components/SearchBar/HeaderStyle";
import { commonStyle } from "Styles/commonStyles";
import { SETUP_NEW_PASSWORD } from "Routes/Routes";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotOtpSchema } from "validationSchema/forgotOtpSchema";
import { useDispatch } from "react-redux";
import { resetPasswordLink } from "../../redux/Slices/Login/resetPasswordLink";
import { useSelector } from "react-redux";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const resetPasswordNavigate = () => {
    navigate(SETUP_NEW_PASSWORD);
  };

  const onSubmit = (data) => {
    dispatch(resetPasswordLink(data));
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotOtpSchema),
    mode: "onChange",
  });

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
      <Grid container sx={commonStyle.mainGridContainer}>
        <Grid item sx={commonStyle.innerGrid}>
          <Box sx={commonStyle.formDetailsContainer}>
            <FMTypography
              displayText="Forgot Password"
              styleData={commonStyle.headingStyle}
            />
          </Box>
          <Box sx={commonStyle.formOuterBoxStyle}>
            <Box component="form" xs={12} onSubmit={handleSubmit(onSubmit)}>
              <Box sx={commonStyle.flexStyle}>
                <Box>
                  <InputBase
                    required
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    sx={{
                      ...commonStyle.inputFieldStyle,

                      ...(errors.email && commonStyle.errorStyle),
                    }}
                    {...register("email")}
                    error={errors.email ? true : false}
                  />
                  <FMTypography
                    styleData={commonStyle.errorText}
                    displayText={errors.email?.message}
                  />
                </Box>

                <FMButton
                  displayText={"Send reset link"}
                  variant={"contained"}
                  styleData={{
                    ...commonStyle.buttonStyles,
                  }}
                  onClick={handleSubmit(onSubmit)}
                />
                <input type={"submit"} hidden />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ForgotPassword;
