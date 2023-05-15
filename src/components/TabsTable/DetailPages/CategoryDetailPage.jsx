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
import moment from "moment";

const HomePageBannerDetailPage = (props) => {
  const { setOpen, open, id, type } = props;
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const setCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getBannersDetail(id));
  }, [id, dispatch]);

  const bannerDetailedData = useSelector(
    (state) => state?.exploreCategories?.getParticularBannerData?.banner
  );

  const productData = useSelector(
    (state) => state?.brandProduct?.getBannerProductData?.product
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
              // padding: "2.125rem",
              borderRadius: "0.5rem",
              // marginTop: "-5rem",
              // height: "43.75rem",
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
                  displayText={
                    // type === "homePageBannerString"
                    //   ?
                    "Banner Details"
                    // : type === "homePageCategoryString"
                    // ? "Category Detail"
                    // : "Product Detail"
                  }
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
                    displayText={
                      // type === "homePageBannerString"
                      //   ?
                      bannerDetailedData?.title
                      // : type === "homePageCategoryString"
                      // ? productDetailedData?.name
                      // : productData?.name
                    }
                    styleData={{ color: "#717171" }}
                  />
                </Col>
                <Col>
                  <FMTypography displayText={"Date"} />
                  <FMTypography
                    displayText={
                      // type === "homePageBannerString"
                      //   ? bannerDetailedData?.title
                      //   : type === "homePageBannerString"
                      //   ? productDetailedData?.name
                      // :
                      moment(productData?.createdAt).format("DD/MM/YYYY")
                    }
                    styleData={{ color: "#717171" }}
                  />
                </Col>
              </Row>
              {/* {type === "homePageCategoryString" && (
                <FMDetailTypography
                  displayText1={"Keyword:"}
                  displayText2={productDetailedData?.keyword}
                />
              )} */}
              {/* {type === "brandProductString" && (
                <>
                  <Row style={{ marginBottom: "1rem" }}>
                    <Col>
                      <FMTypography displayText={"Amazon Link"} />
                      <FMTypography
                        displayText={productData?.amazonLink}
                        styleData={{ color: "#717171" }}
                      />
                    </Col>
                    <Col></Col>
                  </Row>
                  <Row style={{ marginBottom: "1rem" }}>
                    <Col>
                      <FMTypography displayText={"Color"} />
                      {productData?.color?.map((elem) => (
                        <FMTypography
                          displayText={elem}
                          styleData={{ color: "717171" }}
                        />
                      ))}
                    </Col>
                    <Col>
                      <FMTypography displayText={"PDF"} />
                      <a href={productData?.pdf}>Click to download</a>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "1rem" }}>
                    <FMTypography displayText={"Specifications:"} />
                    <FMTypography
                      displayText={productData?.specification}
                      styleData={{ color: "#717171" }}
                    />
                  </Row>
                  <Row style={{ marginBottom: "1rem" }}>
                    <FMTypography displayText={"Description"} />
                    <FMTypography
                      displayText={productData?.description}
                      styleData={{ color: "#717171" }}
                    />
                  </Row>
                </>
              )} */}
              <FMTypography
                displayText={"Images:"}
                styleData={{ color: "#717171" }}
              />
              {/* {type === "homePageBannerString" ? ( */}
              {bannerDetailedData?.banners?.map((elem) => (
                <img
                  src={elem?.img}
                  alt="img"
                  width="550px"
                  style={{ marginRight: "2rem", marginTop: "1rem" }}
                />
              ))}
              {/* ) : type === "homePageCategoryString" ? 
              (
                <img
                  src={productDetailedData?.categoryImage}
                  alt="cat-img"
                  width="100px"
                />
              ) : 
              (
                productData?.productPictures?.map((elem) => (
                  <img
                    src={elem?.img}
                    alt="img"
                    width="100px"
                    height="100px"
                    style={{ marginLeft: "2rem" }}
                  />
                ))
              )} */}
            </Grid>

            <Container>
              <Row></Row>
            </Container>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

export default HomePageBannerDetailPage;
