import { Box, Grid, Modal } from "@mui/material";
import FMTypography from "components/FMTypography/FMTypography";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import crossIcon from "assets/crossIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getFaqById } from "../../../redux/Slices/FAQS/FaqSlice";

const FaqDetailPage = (props) => {
  const { setOpen, open, id } = props;

  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const setCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getFaqById(id));
  }, [id, dispatch]);

  const faqCategoryDetail = useSelector(
    (state) => state?.faqCategory?.getFaqCategoryData?.faqCategory
  );
  const faqDetail = useSelector((state) => state?.faq?.getFaqData?.faqData);
  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "#FFF",
        padding: "15px",
        zIndex: "1000",
        width: "35%",
        // height:'300px'
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
            height: "450px",
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
                  displayText={"FAQ Category Details"}
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
                  <FMTypography displayText={"Faq Category"} />
                  <FMTypography
                    displayText={faqDetail?.faqCategory}
                    styleData={{ color: "#717171" }}
                  />
                </Col>
                <Col>
                  <FMTypography displayText={"Date"} />
                  <FMTypography
                    displayText={moment(faqDetail?.createdAt).format(
                      "DD/MM/YYYY"
                    )}
                    styleData={{ color: "#717171" }}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <FMTypography displayText={"Question"} />
                  <FMTypography
                    displayText={faqDetail?.question}
                    styleData={{ color: "#717171" }}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <FMTypography displayText={"Answer"} />
                  <FMTypography
                    displayText={faqDetail?.answer}
                    styleData={{ color: "#717171" }}
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

export default FaqDetailPage;
