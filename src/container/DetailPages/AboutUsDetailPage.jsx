import { Box } from "@mui/material";
import FMTypography from "components/FMTypography/FMTypography";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getAboutusById } from "redux/Slices/AboutUs/AboutUs";
import ModalWrapper from "container/HomePage/Modal";

const AboutUsDetailPage = (props) => {
  const { setOpen, open, id } = props;
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const setCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getAboutusById(id));
  }, [id, dispatch]);

  const aboutUsDetail = useSelector(
    (state) => state?.aboutUs?.getAboutUsData?.AboutUs
  );
  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      setCloseDialog={setCloseDialog}
      handleClose={handleClose}
      modalTitle={"About Us Details"}
    >
      <Row style={{ marginBottom: "1rem" }}>
        <Col>
          <FMTypography displayText={"Title"} />
          <FMTypography
            displayText={aboutUsDetail?.title}
            styleData={{ color: "#717171" }}
          />
        </Col>
        <Col>
          <FMTypography displayText={"Date"} />
          <FMTypography
            displayText={moment(aboutUsDetail?.createdAt).format("DD/MM/YYYY")}
            styleData={{ color: "#717171" }}
          />
        </Col>
      </Row>
      <Row style={{ marginBottom: "1rem" }}>
        <Col>
          <FMTypography displayText={"Banner Image Alt Text"} />
          <FMTypography
            displayText={aboutUsDetail?.bannerImageAltText}
            styleData={{ color: "#717171" }}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <FMTypography displayText={"Text"} />
          <FMTypography
            displayText={aboutUsDetail?.text}
            styleData={{ color: "#717171" }}
          />
        </Col>
      </Row>

      <Row>
        <FMTypography
          displayText={"Banner Image"}
          styleData={{ marginBottom: "4px", marginTop: "1rem" }}
        />
        <Box style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={aboutUsDetail?.bannerImage}
            alt="img"
            height="200px"
            width="100%"
          />
        </Box>
      </Row>
    </ModalWrapper>
  );
};

export default AboutUsDetailPage;
