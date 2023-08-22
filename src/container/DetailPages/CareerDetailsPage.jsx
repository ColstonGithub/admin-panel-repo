import FMTypography from "components/FMTypography/FMTypography";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import ModalWrapper from "container/HomePage/Modal";
import "./detailPage.css";
import { getCareerDetailsById } from "redux/Slices/CareerDetails/CareerDetails";

// Styles for the editor and its container element
const previewContainer = {
  backgroundColor: "#f8f8f8",
  padding: "10px",
  border: "1px solid #ddd",
  marginTop: "5px",
};

const CareerDetailsPage = (props) => {
  const { setOpen, open, id, type } = props;
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const setCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getCareerDetailsById(id));
  }, [id, dispatch]);

  const careerDetail = useSelector(
    (state) => state?.careerDetails?.getCareerDetailsData?.CareerDetails
  );

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Career Details"}
    >
      <Row style={{ marginTop: "1rem" }}>
        <Col>
          <FMTypography displayText={"Content Heading"} />
          <FMTypography
            displayText={careerDetail?.contentHeading}
            styleData={{ color: "#717171" }}
          />
        </Col>
        <Col>
          <FMTypography displayText={"Date"} />
          <FMTypography
            displayText={moment(careerDetail?.createdAt).format("DD/MM/YYYY")}
            styleData={{ color: "#717171" }}
          />
        </Col>
      </Row>

      <Row style={{ marginTop: "1rem" }}>
        <Col>
          <FMTypography displayText={"Content Text"} />
          <FMTypography
            displayText={careerDetail?.contentText}
            styleData={{ color: "#717171" }}
          />
        </Col>
        <Col>
          <FMTypography displayText={"Image Alt Text"} />
          <FMTypography
            displayText={careerDetail?.imageAltText}
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
            src={careerDetail?.image}
            alt="img"
            width="450px"
            height="auto"
          />
        </Col>
      </Row>
    </ModalWrapper>
  );
};

export default CareerDetailsPage;
