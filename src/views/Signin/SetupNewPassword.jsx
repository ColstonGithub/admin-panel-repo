import React, { useState, useEffect } from "react";
import { Box, Grid, InputBase } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import FMButton from "../../components/FMButton/FMButton";
import FMTypography from "../../components/FMTypography/FMTypography";

import { useSelector } from "react-redux";
import { commonStyle } from "../../Styles/commonStyles";
import { HeaderStyle } from "../../components/SearchBar/HeaderStyle";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LOGIN } from "../../Routes/Routes";
import FMOutlinedInput from "../../components/FMOutlinedInput/FMOutlinedInput";
import { tests } from "../../constants/AppConstant";
import { setupPassword } from "../../redux/Slices/Login/setupPassword";

import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { setupPasswordSchema } from "../../validationSchema/setUpNewPassword";
import { getInitialImagesAdmin } from "redux/Slices/InitialImagesAdmin/InitialImagesAdminSlice";

const SetupNewPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  const [passwordType, setPasswordType] = useState(true);
  const [confirmPasswordType, setConfirmPasswordType] = useState(true);
  const [passwordErrors, setPassowordErrors] = useState({
    length: true,
    upperCase: true,
    lowerCase: true,
    symbol: true,
    digits: true,
  });

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(setupPasswordSchema),
    mode: "onChange",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerField = (field, options = {}) => {
    const { onChange: fieldOnChange, ...restProps } = register(field);
    const { onChange } = options;

    const handleChange = (e) => {
      onChange?.(e);
      fieldOnChange(e);
    };

    return { onChange: handleChange, ...restProps };
  };
  const handelPasswordChange = (e) => {
    const value = e.target.value;

    Object.keys(tests).forEach((error) => {
      const pattern = tests[error];
      setPassowordErrors((prev) => ({
        ...prev,
        [error]: !pattern.test(value),
      }));
    });
  };
  const passwordToggle = () => setPasswordType(!passwordType);
  const confirmPasswordToggle = () =>
    setConfirmPasswordType(!confirmPasswordType);

  const onSubmit = (data) => {
    const postData = {
      password: data.password,
      token: token,
      userId: id,
    };
    dispatch(setupPassword(postData)).then((res) => {
      // if (!res.error) {
      // removeItem("userData");

      navigate(LOGIN);
      // }
    });
  };
  useEffect(() => {
    dispatch(getInitialImagesAdmin());
  }, [dispatch]);

  const initialImagesAdmin = useSelector(
    (state) => state?.initialImagesAdmin?.initialImagesAdmin?.initialImages
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
              displayText="Reset Password"
              styleData={commonStyle.headingStyle}
            />
          </Box>
          <Box sx={commonStyle.formOuterBoxStyle}>
            <Box component="form" xs={12} onSubmit={handleSubmit(onSubmit)}>
              <Box sx={commonStyle.flexStyle}>
                <Box>
                  <FMOutlinedInput
                    // inputLabel="Password"
                    placeholder="New Password"
                    type={passwordType ? "password" : "text"}
                    register={registerField("password", {
                      onChange: handelPasswordChange,
                    })}
                    error={!!errors.password}
                    passwordToggle={passwordToggle}
                    passwordType={passwordType}
                    errors={errors}
                    errorKey="password"
                  />

                  <FMOutlinedInput
                    // inputLabel="Password"
                    placeholder="Confirm New Password"
                    type={confirmPasswordType ? "password" : "text"}
                    register={registerField("confirmPassword")}
                    error={!!errors.confirmPassword}
                    passwordToggle={confirmPasswordToggle}
                    passwordType={confirmPasswordType}
                    errors={errors}
                    errorKey="confirmPassword"
                  />
                </Box>

                <FMButton
                  displayText={"Reset Password"}
                  variant={"contained"}
                  styleData={{
                    ...commonStyle.buttonStyles,
                    marginTop: "24px",
                  }}
                  onClick={handleSubmit(onSubmit)}
                  // onClick={afterResetPasswordNavigate}
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

export default SetupNewPassword;
