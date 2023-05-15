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
import { getBannerProductDetail } from "redux/Slices/BannerProducts/BannerProducts";
import moment from "moment";

const ExploreCategoryDetailPage = (props) => {
  const { setOpen, open, id, type } = props;
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const setCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (type === "homePageBannerString") dispatch(getBannersDetail(id));
    else if (type === "homePageCategoryString")
      dispatch(getCategoriesDetail(id));
    else if (type === "brandProductString")
      dispatch(getBannerProductDetail(id));
  }, [id, dispatch]);

  const productDetailedData = useSelector(
    (state) => state?.exploreCategories?.getProductsListData?.category
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
          position: "fixed",
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
                boxShadow: " 0px 1px 12px rgba(181, 180, 180, 0.12)",
              }}
            >
              <Col className="col-11">
                <FMTypography
                  displayText={"Category Details"}
                  styleData={{
                    fontWeight: "500",
                    fontSize: "1.125rem",
                    fontFamily: " 'Inter', sans-serif",
                    margin: "1rem",
                    textAlign: "center",
                  }}
                />
              </Col>
              <Col className="col-1">
                <img
                  src={crossIcon}
                  alt="cross-icon"
                  style={{ cursor: "pointer", width: "1rem", margin: "1rem" }}
                  onClick={setCloseDialog}
                />
              </Col>
            </Box>

            <Grid sx={{ margin: "1rem" }}>
              <Row style={{ marginBottom: "1rem" }}>
                <Col>
                  <FMTypography displayText={"Name"} />
                  <FMTypography
                    displayText={productDetailedData?.name}
                    styleData={{ color: "#717171" }}
                  />
                </Col>
                <Col>
                  <FMTypography displayText={"Date"} />
                  <FMTypography
                    displayText={moment(productDetailedData?.createdAt).format(
                      "DD/MM/YYYY"
                    )}
                    styleData={{ color: "#717171" }}
                  />
                </Col>
              </Row>
              <Row style={{ marginBottom: "1rem" }}>
                <Col>
                  <FMTypography displayText={"Keyword:"} />
                  <FMTypography
                    displayText={productDetailedData?.keyword}
                    styleData={{ color: "#717171" }}
                  />
                </Col>
                <Col>
                  <FMTypography displayText={"Image Alt Text:"} />
                  <FMTypography
                    displayText={productDetailedData?.imageAltText}
                    styleData={{ color: "#717171" }}
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <FMTypography
                    displayText={"Images:"}
                    styleData={{ color: "#717171" }}
                  />

                  <img
                    src={productDetailedData?.categoryImage}
                    alt="cat-img"
                    width="550px"
                  />
                </Col>
              </Row>
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

export default ExploreCategoryDetailPage;
