import { Box, Grid, InputBase } from "@mui/material";
import FMButton from "../../components/FMButton/FMButton";
import FMTypography from "../../components/FMTypography/FMTypography";
import ColstonLogo from "../../assets/ColstonLogo.png";
import { HeaderStyle } from "../../components/SearchBar/HeaderStyle";
import React from "react";
import { commonStyle } from "../../Styles/commonStyles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { verifyOtp } from "../../redux/Slices/SignUp/SignUp";
import { useDispatch } from "react-redux";
import { verifyEmailSchema } from "../../validationSchema/verifyemailSchema";
import { useSearchParams } from "react-router-dom";

const EmailOtpVerification = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const onSubmit = (data) => {
    let postData = {
      otp: data?.otp,
      id: id,
    };
    dispatch(verifyOtp(postData));
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(verifyEmailSchema),
    mode: "onChange",
  });
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
      <Grid container sx={commonStyle.mainGridContainer}>
        <Grid item sx={commonStyle.innerGrid}>
          <Box sx={commonStyle.formDetailsContainer}>
            <FMTypography
              displayText="Enter OTP"
              styleData={commonStyle.headingStyle}
            />
          </Box>
          <Box sx={commonStyle.formOuterBoxStyle}>
            <Box component="form" xs={12} onSubmit={handleSubmit(onSubmit)}>
              <Box sx={commonStyle.flexStyle}>
                <Box>
                  <InputBase
                    required
                    id="otp"
                    name="otp"
                    placeholder="Enter your otp"
                    sx={{
                      ...commonStyle.inputFieldStyle,

                      ...(errors.otp && commonStyle.errorStyle),
                    }}
                    {...register("otp")}
                    error={errors.otp ? true : false}
                  />
                  <FMTypography
                    styleData={commonStyle.errorText}
                    displayText={errors.otp?.message}
                  />
                </Box>

                <FMButton
                  displayText={"Verify OTP"}
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

export default EmailOtpVerification;
