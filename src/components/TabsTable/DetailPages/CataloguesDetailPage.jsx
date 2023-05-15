import { Box, Grid, Modal } from "@mui/material";
import FMTypography from "components/FMTypography/FMTypography";
import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import crossIcon from "assets/crossIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getCatalogueDetail } from "redux/Slices/Catalogue/Catalogue";

const CataloguesDetailPage = (props) => {
  const { setOpen, open, id, type } = props;
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const setCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getCatalogueDetail(id));
  }, [id, dispatch]);

  const blogsDetail = useSelector((state) => state?.blogs?.getBlogsData?.Blogs);

  const cataloguesDetail = useSelector(
    (state) => state?.catalogues?.getCatalogueData?.Catalogue
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
                boxShadow: " 0px 1px 12px rgba(181, 180, 180, 0.12)",
              }}
            >
              <Col className="col-11">
                <FMTypography
                  displayText={"Product Details"}
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
                  <FMTypography displayText={"Title"} />
                  <FMTypography
                    displayText={cataloguesDetail?.title}
                    styleData={{ color: "#717171" }}
                  />
                </Col>
                <Col>
                  <FMTypography displayText={"Date"} />
                  <FMTypography
                    displayText={moment(cataloguesDetail?.createdAt).format(
                      "DD/MM/YYYY"
                    )}
                    styleData={{ color: "#717171" }}
                  />
                </Col>
              </Row>

              <Row style={{ marginBottom: "1rem" }}>
                <Col>
                  <FMTypography displayText={"Image Alt Text"} />
                  <FMTypography
                    displayText={cataloguesDetail?.imageAltText}
                    styleData={{ color: "#717171" }}
                  />
                </Col>
                <Col>
                  <FMTypography displayText={"PDF"} />
                  <a href={cataloguesDetail?.pdf}> Click here to download </a>
                </Col>
              </Row>

              <FMTypography
                displayText={"Images:"}
                styleData={{ color: "#717171" }}
              />
              {/* {exhibitionBannerDetail?.map((elem) => (
                <img
                  src={elem?.bannerImage}
                  alt="img"
                  width="100px"
                  height="100px"
                  style={{ marginLeft: "2rem" }}
                />
              ))} */}
              <img
                src={cataloguesDetail?.image}
                alt="img"
                width="450px"
                height="auto"
                style={{ marginLeft: "3rem" }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

export default CataloguesDetailPage;
