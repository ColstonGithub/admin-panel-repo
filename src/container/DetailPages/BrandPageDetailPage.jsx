import { Box, Grid, Modal } from "@mui/material";
import FMTypography from "components/FMTypography/FMTypography";
import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import crossIcon from "assets/crossIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  getBannersDetail,
  getCategoriesDetail,
} from "redux/Slices/HomePage/HomePageCategories";
import FMDetailTypography from "components/FMDetailTypography/FMDetailTypography";
import { getBannerProductDetail } from "redux/Slices/BannerProducts/BannerProducts";
import { getBrandPageDetail } from "redux/Slices/BrandPage/BrandPage";
import moment from "moment";

const BrandPageDetailPage = (props) => {
  const { setOpen, open, id, type } = props;
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const setCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    // if (id) {
    dispatch(getBrandPageDetail(id));
    // }
  }, [id, dispatch]);

  const brandPageDetailedData = useSelector(
    (state) => state?.brandPage?.getBrandPageData?.brandproduct
  );
  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "#FFF",
        padding: "15px",
        zIndex: "1000",
        width: "35%",
        borderRadius: ".5em",
      }}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          justifyContent: "center",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0, .8)",
          zIndex: "1000",
          overflowY: "auto",
        }}
      >
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            transform: "translate(0, 30%)",
            height: "fit-content",
          }}
        >
          <Grid
            sx={{
              backgroundColor: "white",
              width: "36.5rem",
              borderRadius: "0.5rem",
              height: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                boxShadow: " 0px 1px 12px rgba(181, 180, 180, 0.12)",
              }}
            >
              <FMTypography
                displayText={"Brand Page Detail"}
                styleData={{
                  fontWeight: "600",
                  fontSize: "1.125rem",
                  fontFamily: " 'Inter', sans-serif",
                  margin: "1rem",
                }}
              />
              <img
                src={crossIcon}
                alt="cross-icon"
                style={{ cursor: "pointer", width: "1rem", margin: "1rem" }}
                onClick={setCloseDialog}
              />
            </Box>
            <Container>
              <Grid sx={{ marginBottom: "1rem" }}>
                <Row style={{ marginBottom: "1rem" }}>
                  <Col>
                    <FMTypography displayText={"Name:"} />
                    <FMTypography
                      displayText={brandPageDetailedData?.title}
                      styleData={{ color: "#717171" }}
                    />
                  </Col>
                  <Col>
                    <FMTypography displayText={"Created At:"} />
                    <FMTypography
                      displayText={moment(
                        brandPageDetailedData?.createdAt
                      ).format("DD/MM/YYYY")}
                      styleData={{ color: "#717171" }}
                    />
                  </Col>
                </Row>

                <Row style={{ marginBottom: "1rem" }}>
                  <FMTypography displayText={"Text:"} />
                  <FMTypography
                    displayText={brandPageDetailedData?.text}
                    styleData={{ color: "#717171" }}
                  />
                </Row>

                <Grid>
                  <img
                    src={brandPageDetailedData?.image}
                    alt="img"
                    width="550px"
                    // height="auto"
                    style={{ marginLeft: ".4rem" }}
                  />
                </Grid>
              </Grid>
            </Container>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

export default BrandPageDetailPage;
