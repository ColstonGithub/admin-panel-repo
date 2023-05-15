import { Box, Grid, Modal } from "@mui/material";
import FMTypography from "components/FMTypography/FMTypography";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import crossIcon from "assets/crossIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getQuotationSecById } from "../../../redux/Slices/QuotationSection/QuotationSection";

const QuotationSectionDetailPage = (props) => {
  const { setOpen, open, id } = props;

  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const setCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getQuotationSecById(id));
  }, [id, dispatch]);

  const quotationSecDetail = useSelector(
    (state) => state?.quotationSection?.getQuotationSecData?.requestData
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
            // height: "auto",
          }}
        >
          <Grid
            sx={{
              backgroundColor: "white",
              width: "36.5rem",
              borderRadius: "0.5rem",
              height: "700px",
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
                  displayText={"Quotation Section Details"}
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
                    displayText={quotationSecDetail?.name}
                    styleData={{ color: "#717171" }}
                  />
                </Col>
                <Col>
                  <FMTypography displayText={"Date"} />
                  <FMTypography
                    displayText={moment(quotationSecDetail?.createdAt).format(
                      "DD/MM/YYYY"
                    )}
                    styleData={{ color: "#717171" }}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <FMTypography displayText={"Email"} />
                  <FMTypography
                    displayText={quotationSecDetail?.email}
                    styleData={{ color: "#717171" }}
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: "1rem" }}>
                <Col>
                  <FMTypography displayText={"Mobile Number"} />
                  <FMTypography
                    displayText={quotationSecDetail?.mobileNo}
                    styleData={{ color: "#717171" }}
                  />
                </Col>
                <Col>
                  <FMTypography displayText={"Subject"} />
                  <FMTypography
                    displayText={quotationSecDetail?.subject}
                    styleData={{ color: "#717171" }}
                  />
                </Col>
              </Row>

              <Row style={{ marginTop: "1rem" }}>
                <Col>
                  <FMTypography displayText={"City"} />
                  <FMTypography
                    displayText={quotationSecDetail?.city}
                    styleData={{ color: "#717171" }}
                  />
                </Col>
                <Col>
                  <FMTypography displayText={"Pincode"} />
                  <FMTypography
                    displayText={quotationSecDetail?.pincode}
                    styleData={{ color: "#717171" }}
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: "1rem" }}>
                <Col>
                  <FMTypography displayText={"State"} />
                  <FMTypography
                    displayText={quotationSecDetail?.state}
                    styleData={{ color: "#717171" }}
                  />
                </Col>
                <Col>
                  <FMTypography displayText={"Landmark"} />
                  <FMTypography
                    displayText={quotationSecDetail?.landmark}
                    styleData={{ color: "#717171" }}
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: "1rem" }}>
                <Col>
                  <FMTypography displayText={"Address"} />
                  <FMTypography
                    displayText={quotationSecDetail?.address}
                    styleData={{ color: "#717171" }}
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: "1rem" }}>
                <Col>
                  <FMTypography displayText={"Dealer Name"} />
                  <FMTypography
                    displayText={quotationSecDetail?.dealerName}
                    styleData={{ color: "#717171" }}
                  />
                </Col>
                <Col>
                  <FMTypography displayText={"Problem"} />
                  <FMTypography
                    displayText={quotationSecDetail?.problem}
                    styleData={{ color: "#717171" }}
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: "1rem" }}>
                <Col>
                  <FMTypography displayText={"Call Type"} />
                  <FMTypography
                    displayText={quotationSecDetail?.callType}
                    styleData={{ color: "#717171" }}
                  />
                </Col>
                <Col>
                  <FMTypography displayText={"Purchase Date"} />
                  <FMTypography
                    displayText={quotationSecDetail?.purchaseDate}
                    styleData={{ color: "#717171" }}
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: "1rem" }}>
                <Col>
                  <FMTypography displayText={"Product Category"} />
                  <FMTypography
                    displayText={quotationSecDetail?.productCategory}
                    styleData={{ color: "#717171" }}
                  />
                </Col>
                <Col>
                  <FMTypography displayText={"Product CodeName"} />
                  <FMTypography
                    displayText={quotationSecDetail?.productCodeName}
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

export default QuotationSectionDetailPage;
