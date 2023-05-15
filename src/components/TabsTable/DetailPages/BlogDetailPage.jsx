import { Box, Grid, Modal } from "@mui/material";
import FMTypography from "components/FMTypography/FMTypography";
import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import crossIcon from "assets/crossIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getBlogsDetail } from "redux/Slices/Blogs/Blogs";

const BlogDetailPage = (props) => {
  const { setOpen, open, id, type } = props;
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const setCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getBlogsDetail(id));
  }, [id, dispatch]);

  const blogsDetail = useSelector((state) => state?.blogs?.getBlogsData?.Blogs);
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
        onClose={setOpen}
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
              <Row>
                <Col>
                  <FMTypography displayText={"Title"} />
                  <FMTypography
                    displayText={blogsDetail?.title}
                    styleData={{ color: "#717171" }}
                  />
                </Col>
                <Col>
                  <FMTypography displayText={"Date"} />
                  <FMTypography
                    displayText={moment(blogsDetail?.createdAt).format(
                      "DD/MM/YYYY"
                    )}
                    styleData={{ color: "#717171" }}
                  />
                </Col>
              </Row>

              <Row style={{ marginTop: "1rem" }}>
                <Col>
                  <FMTypography displayText={"Page Title"} />
                  <FMTypography
                    displayText={blogsDetail?.pageTitle}
                    styleData={{ color: "#717171" }}
                  />
                </Col>
                <Col>
                  <FMTypography displayText={"Page Heading"} />
                  <FMTypography
                    displayText={blogsDetail?.pageHeading}
                    styleData={{ color: "#717171" }}
                  />
                </Col>
              </Row>

              <Row style={{ marginTop: "1rem" }}>
                <Col>
                  <FMTypography displayText={"Bolg Category"} />
                  <FMTypography
                    displayText={blogsDetail?.blogCategory}
                    styleData={{ color: "#717171" }}
                  />
                </Col>
                <Col>
                  {" "}
                  <FMTypography displayText={"Image Alt Text"} />
                  <FMTypography
                    displayText={blogsDetail?.imageAltText}
                    styleData={{ color: "#717171" }}
                  />
                </Col>
              </Row>

              <Row style={{ marginTop: "1rem" }}>
                <Col>
                  <FMTypography displayText={"Text"} />
                  <FMTypography
                    displayText={blogsDetail?.text}
                    styleData={{ color: "#717171" }}
                  />
                </Col>
              </Row>

              <Row style={{ marginTop: "1rem" }}>
                <Col md={6}>
                  <FMTypography
                    displayText={"Images"}
                    styleData={{ color: "#222", marginBottom: "5px" }}
                  />
                  <img
                    src={blogsDetail?.image}
                    alt="img"
                    width="450px"
                    height="auto"
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

export default BlogDetailPage;
