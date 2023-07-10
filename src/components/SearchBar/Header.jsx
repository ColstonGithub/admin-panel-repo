import { Avatar, Box, Grid, Typography } from "@mui/material";
import SearchBar from "components/SearchBar/SearchBar";
import React, { useEffect, useState } from "react";
import colstonLogo from "../../assets/ColstonLogo.png";
import profileIcon from "../../assets/profileIcon.svg";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled, alpha } from "@mui/material/styles";
import { HeaderStyle } from "./HeaderStyle";
import { commonStyle } from "../../Styles/commonStyles";
import { Col, Row } from "react-bootstrap";
import "./HeaderBootstrapMenu.css";
import { useDispatch, useSelector } from "react-redux";

import FMTypography from "components/FMTypography/FMTypography";
import { Stack } from "@mui/system";
import FMButton from "components/FMButton/FMButton";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "Routes/Routes";
import { logout } from "redux/Slices/Login/auth.slice";
import { Link } from "react-router-dom";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const personLoggedIn = JSON.parse(
    localStorage.getItem("Sidebar_Module_Assigned")
  )?.fullName;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElSec, setAnchorElSec] = React.useState(null);
  const [openFilter, setOpenFilter] = useState(false);

  const open = Boolean(anchorEl);
  const openSec = Boolean(anchorElSec);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickSec = (event) => {
    setAnchorElSec(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseSec = () => {
    setAnchorElSec(null);
  };

  const navigateToLogin = () => {
    navigate(LOGIN);
  };

  const logoutPerson = () => {
    localStorage.clear();
    navigate(LOGIN);
  };

  const logoutHandler = () => {
    // setDisabledLogout(true);
    dispatch(logout())
      .then((response) => {
        if (response.payload.data.code === 200) {
          setAnchorEl(null);
          localStorage.clear();
          navigate(LOGIN);
        } else {
          // setDisabledLogout(false);
        }
      })
      .catch((rejectedWithValue) => {
        // setDisabledLogout(false);
        localStorage.clear();
        navigate(LOGIN);
        // notify({ type: "success", content: "Logged out successfully" });
        throw new Error("Logout failed");
      });
  };

  const [hoverMenu, setHoverMenu] = useState(false);

  const menuOpenedOnHover = () => {
    setHoverMenu(true);
    // const element = document.getElementsByClassName("rowOnHover");
  };

  const [show, setShow] = useState("");

  const showDropdown = (id) => {
    setShow(id);
  };

  const hideDropdown = () => {
    setShow("");
  };

  return (
    <Grid
      sx={{
        ...HeaderStyle.headerFullStyle,
        position: "relative",
        zIndex: "999",
      }}
    >
      <Row
        style={{
          margin: "0",
          padding: "1rem 50px",
        }}
      >
        <Col md={9}>
          <Link to={"/home"}>
            <img
              src={colstonLogo}
              alt="ColstonLogo"
              style={{
                ...HeaderStyle.ColstonLogoStyle,
                marginTop: "0.6rem",
                width: "300px",
                height: "auto",
              }}
            />
          </Link>
        </Col>

        <Col
          md={3}
          style={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          {/* profile below */}
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            style={{
              minWidth: "0",
              "MuiButton-root:hover": {
                // MuiButtonRoot:hover
                backgroundColor: "red !important",
                borderRadius: "28px",
              },
            }}
          >
            <img
              src={profileIcon}
              alt="profileIcon"
              style={HeaderStyle.profileIconStyle}
            />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            sx={{ padding: "2rem", ...HeaderStyle.lgjaStyle }}
          >
            <Box
              sx={{
                display: "flex",
                marginBottom: ".5rem",
                alignItems: "center",
              }}
            >
              <Stack direction="row" spacing={2} sx={{ marginLeft: "1rem" }}>
                <Avatar src="/broken-image.jpg" />
              </Stack>
              {personLoggedIn ? (
                <Box sx={{ marginLeft: "12px" }}>
                  <FMTypography
                    displayText={personLoggedIn}
                    sx={{ fontSize: "14px" }}
                  />
                  {/* <FMButton
                    displayText={"See your Profile"}
                    variant={"outlined"}
                    styleData={{
                      // ...commonStyle.buttonStyles,padd
                      color: "#717171",
                      padding: "0",
                      fontSize: "10px",
                      backgroundColor: "none",
                      border: "none",
                      "&:hover": {
                        backgroundColor: "white",
                        border: "none",
                      },
                    }}
                  /> */}
                </Box>
              ) : (
                <Box>
                  <FMButton
                    displayText={"Log in"}
                    variant={"outlined"}
                    styleData={{
                      textTransform: "capitalize",
                      paddingTop: "0",
                      color: "black",
                      backgroundColor: "none",
                      border: "none",
                      "&:hover": {
                        backgroundColor: "white",
                        border: "none",
                      },
                    }}
                    onClick={navigateToLogin}
                  />
                  <FMTypography
                    displayText={"To access account"}
                    sx={{
                      color: "#717171",
                      marginLeft: "12px",
                      fontSize: "10px",
                      color: "black",
                    }}
                  />
                </Box>
              )}
            </Box>
            <hr style={{ margin: "0" }} />
            {personLoggedIn && (
              <MenuItem
                onClick={logoutHandler}
                divider
                sx={{ padding: "1rem" }}
              >
                {/* <img
                  src={logoutIcon}
                  alt="logout-icon"
                  style={{ marginRight: "12px" }}
                /> */}
                Log Out
              </MenuItem>
            )}
          </Menu>
        </Col>
      </Row>
    </Grid>
  );
};

export default Header;
