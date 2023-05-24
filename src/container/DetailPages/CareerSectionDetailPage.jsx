import React, { useEffect } from "react";
import FMTypography from "components/FMTypography/FMTypography";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getCareerSecById } from "redux/Slices/CareerSection/CareerSection";
import ModalWrapper from "container/HomePage/Modal";
import { commonStyle } from "Styles/commonStyles";
import { Box } from "@mui/material";
const CareerSectionDetailPage = (props) => {
  const { setOpen, open, id } = props;
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  const setCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getCareerSecById(id));
  }, [id, dispatch]);

  const careerSectionDetail = useSelector(
    (state) => state?.careerSection?.getCareerSecData?.careerData
  );

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Quotation Details"}
    >
      <Row style={{ marginBottom: "1rem" }}>
        <Col>
          <FMTypography displayText={"Name"} />
          <FMTypography
            displayText={careerSectionDetail?.name}
            styleData={{ color: "#717171" }}
          />
        </Col>
        <Col>
          <FMTypography displayText={"Date"} />
          <FMTypography
            displayText={moment(careerSectionDetail?.createdAt).format(
              "DD/MM/YYYY"
            )}
            styleData={{ color: "#717171" }}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: "1rem" }}>
        <Col>
          <FMTypography displayText={"Mobile Number"} />
          <FMTypography
            displayText={careerSectionDetail?.mobileNo}
            styleData={{ color: "#717171" }}
          />
        </Col>
        <Col>
          <FMTypography displayText={"Subject"} />
          <FMTypography
            displayText={careerSectionDetail?.subject}
            styleData={{ color: "#717171" }}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: "1rem" }}>
        <Col>
          <FMTypography displayText={"Message"} />
          <FMTypography
            displayText={careerSectionDetail?.message}
            styleData={{ color: "#717171" }}
          />
        </Col>
        <Col>
          <FMTypography displayText={"Email"} />
          <FMTypography
            displayText={careerSectionDetail?.email}
            styleData={{ color: "#717171" }}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: "1rem" }}>
        <Col>
          <div className="mb-2">
            <FMTypography displayText={"PDF"} />
            <a href={careerSectionDetail?.pdf}>Click to Download</a>
          </div>
          {careerSectionDetail?.pdf && (
            <Box
              sx={{
                margin: "1rem 0",
              }}
            >
              <FMTypography
                displayText={"Pdf Preview"}
                styleData={commonStyle.commonModalTitleStyle}
              />
              <embed
                src={careerSectionDetail?.pdf}
                type="application/pdf"
                frameBorder="0"
                scrolling="auto"
                height="200px"
                width="100%"
              ></embed>
            </Box>
          )}
        </Col>
      </Row>
    </ModalWrapper>
  );
};

export default CareerSectionDetailPage;
