import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FORGOTPASSWORD, SIGNUP } from "../../Routes/Routes";
import { useSelector } from "react-redux";
import FMButton from "../../components/FMButton/FMButton";
import FMTypography from "../../components/FMTypography/FMTypography";

import { login } from "../../redux/Slices/Login/auth.slice";

import { commonStyle } from "../../Styles/commonStyles";
import { HeaderStyle } from "../../components/SearchBar/HeaderStyle";
import { setItem } from "../../services/commonService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../validationSchema/loginSchema";
import { notify } from "constants/utils";
import { getInitialImagesAdmin } from "redux/Slices/InitialImagesAdmin/InitialImagesAdminSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const forgotPasswordNavigate = () => {
    navigate(FORGOTPASSWORD);
  };
  const passwordToggle = () => {
    setPasswordType(!passwordType);
  };

  const onSubmit = (data) => {
    dispatch(login(data))
      .unwrap()
      .then((res) => {
        if (res) {
          setItem("userData", res?.data);
          notify({ type: "success", messgae: "Logged in successfully" });
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log("err => ", err);
        notify({
          type: "error",
          messgae: err?.error?.response?.data?.message
            ? err?.error?.response?.data?.message
            : err?.error?.response?.data?.error
            ? err?.error?.response?.data?.error
            : err?.error?.message,
        });
      });
  };
  useEffect(() => {
    dispatch(getInitialImagesAdmin());
  }, [dispatch]);

  const initialImagesAdmin = useSelector(
    (state) => state?.InitialImagesAdmin?.initialImagesAdmin?.initialImages
  );
  const ColstonLogo = initialImagesAdmin && initialImagesAdmin[24]?.image;

  useEffect(() => {
    const auth = localStorage.getItem("AUTH_ACCESS_TOKEN");
    if (auth) {
      setIsLoggedIn(true);
    }
  }, []);

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  } else {
    return (
      <>
        <Box sx={{ padding: "1rem 50px 0 50px" }}>
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
                displayText="Log In"
                styleData={commonStyle.headingStyle}
              />
            </Box>
            <Box sx={commonStyle.formOuterBoxStyle}>
              <Box component="form" xs={12} onSubmit={handleSubmit(onSubmit)}>
                <Box sx={commonStyle.flexStyle}>
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

                  <OutlinedInput
                    placeholder="Enter your password"
                    type={passwordType ? "password" : "text"}
                    sx={{
                      ...commonStyle.inputFieldStyle,
                      ...commonStyle.paddingZero,
                      ...(errors.password && commonStyle.errorStyle),
                    }}
                    {...register("password")}
                    error={errors.password ? true : false}
                    endAdornment={
                      <InputAdornment position="start">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={passwordToggle}
                          edge="end"
                          disableRipple={true}
                        >
                          {passwordType ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FMTypography
                    styleData={commonStyle.errorText}
                    displayText={errors.password?.message}
                  />
                  <Box sx={commonStyle.buttonBox}>
                    <FMButton
                      displayText={"Forgot Password?"}
                      variant={"text"}
                      styleData={{
                        ...commonStyle.textTransformStyle,
                        ...commonStyle.disableRippleStyle,
                      }}
                      onClick={forgotPasswordNavigate}
                    />
                  </Box>
                  <FMButton
                    displayText={"Login"}
                    variant={"contained"}
                    styleData={{
                      ...commonStyle.buttonStyles,
                    }}
                    onClick={handleSubmit(onSubmit)}
                  />
                  <input type={"submit"} hidden />

                  {/* after ruler btns */}
                  {/* <img src={OptLoginIcon} alt="otp-login" /> */}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: ".3rem",
                  }}
                >
                  <FMTypography displayText={"Don’t have an account?"} />
                  <FMButton
                    variant={"outlined"}
                    displayText={"Sign Up"}
                    styleData={{
                      color: "#222222",
                      padding: "0",
                      fontSize: "1rem",
                      fontFamily: " 'Inter', sans-serif",
                      fontWeight: "600",
                      border: "none",
                      marginLeft: ".5rem",
                      marginTop: "-.1rem",
                      "&:hover": {
                        backgroundColor: "white",
                        border: "none",
                      },
                    }}
                    onClick={() => navigate(SIGNUP)}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  }
};

export default Login;
