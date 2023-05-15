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
import { getBrandPageBannerDetail } from "redux/Slices/BrandPage/brandPageBanner";

const BrandPageBannerDetailPage = (props) => {
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
    dispatch(getBrandPageBannerDetail(id));
    // }
  }, [id, dispatch]);

  const brandPageBannerDetailedData = useSelector(
    (state) => state?.brandPageBanner?.getBrandPageBannerData?.banner
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
                      displayText={brandPageBannerDetailedData?.title}
                      styleData={{ color: "#717171" }}
                    />
                  </Col>
                  <Col>
                    <FMTypography displayText={"Created At:"} />
                    <FMTypography
                      displayText={moment(
                        brandPageBannerDetailedData?.createdAt
                      ).format("DD/MM/YYYY")}
                      styleData={{ color: "#717171" }}
                    />
                  </Col>
                </Row>

                <Row style={{ marginBottom: "1rem" }}>
                  <Col>
                    <FMTypography displayText={"Banner Image Alt Text:"} />
                    <FMTypography
                      displayText={
                        brandPageBannerDetailedData?.bannerImageAltText
                      }
                      styleData={{ color: "#717171" }}
                    />
                  </Col>
                  <Col>
                    <FMTypography displayText={"Banner Image Text Alt Text:"} />
                    <FMTypography
                      displayText={
                        brandPageBannerDetailedData?.bannerImageTextAltText
                      }
                      styleData={{ color: "#717171" }}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col style={{ marginBottom: "1rem" }}>
                    <FMTypography displayText={"Banner Image:"} />
                    <img
                      src={brandPageBannerDetailedData?.bannerImage}
                      alt="img"
                      width="300px"
                      height="300px"
                      style={{ marginLeft: "8rem" }}
                    />
                  </Col>
                  <Col>
                    <FMTypography displayText={"Banner Text Image: "} />
                    <img
                      src={brandPageBannerDetailedData?.bannerImageText}
                      alt="img"
                      width="300px"
                      height="300px"
                      style={{ marginLeft: "8rem" }}
                    />
                  </Col>
                </Row>
              </Grid>
            </Container>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

export default BrandPageBannerDetailPage;
