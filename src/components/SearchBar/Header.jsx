import { Avatar, Box, Grid } from "@mui/material";
import React from "react";
import colstonLogo from "../../assets/ColstonLogo.png";
import profileIcon from "../../assets/profileIcon.svg";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { HeaderStyle } from "./HeaderStyle";
import { Col, Row } from "react-bootstrap";
import "./HeaderBootstrapMenu.css";
import { useDispatch } from "react-redux";

import FMTypography from "components/FMTypography/FMTypography";
import { Stack } from "@mui/system";
import FMButton from "components/FMButton/FMButton";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "Routes/Routes";
import { logout } from "redux/Slices/Login/auth.slice";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const personLoggedIn = JSON.parse(
    localStorage.getItem("Sidebar_Module_Assigned")
  )?.fullName;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateToLogin = () => {
    navigate(LOGIN);
  };

  const logoutHandler = () => {
    // setDisabledLogout(true);
    dispatch(logout())
      .then((response) => {
        setAnchorEl(null);
        localStorage.clear();
        navigate(LOGIN);
      })
      .catch((rejectedWithValue) => {
        // setDisabledLogout(false);
        localStorage.clear();
        navigate(LOGIN);
        // notify({ type: "success", content: "Logged out successfully" });
        throw new Error("Logout failed");
      });
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
