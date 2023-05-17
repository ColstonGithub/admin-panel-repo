import { Box, Grid, Modal } from "@mui/material";
import FMTypography from "components/FMTypography/FMTypography";
import React, { useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import crossIcon from "assets/crossIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { getBannersDetail } from "redux/Slices/HomePage/HomePageCategories";
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
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
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
              padding: "2.125rem",
              borderRadius: "0.5rem",
              marginTop: "2rem",
              // height: "43.75rem",
              height: "auto",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <img
                src={crossIcon}
                alt="cross-icon"
                style={{ cursor: "pointer", width: "1rem" }}
                onClick={setCloseDialog}
              />
            </Box>
            <FMTypography
              displayText="Banner Details"
              styleData={{
                fontWeight: "600",
                display: "flex",
                justifyContent: "center",
                fontSize: "1.125rem",
                marginBottom: "1.5rem",
                fontFamily: " 'Inter', sans-serif",
              }}
            />

            <Container>
              <Row style={{ marginBottom: "1rem" }}>
                <Col>
                  <FMTypography displayText={"Name"} />
                  <FMTypography
                    displayText={bannerDetailedData?.title}
                    styleData={{ color: "#717171" }}
                  />
                </Col>
                <Col>
                  <FMTypography displayText={"Date"} />
                  <FMTypography
                    displayText={moment(productData?.createdAt).format(
                      "DD/MM/YYYY"
                    )}
                    styleData={{ color: "#717171" }}
                  />
                </Col>
              </Row>
              <FMTypography displayText={"Images"} />
              {bannerDetailedData?.banners?.map((elem) => (
                <img
                  src={elem?.img}
                  alt="img"
                  width="550px"
                  style={{ marginRight: "2rem", marginTop: "1rem" }}
                />
              ))}
            </Container>

          </Grid>
        </Grid>
      </Modal>
    </>
  );
};

export default HomePageBannerDetailPage;
