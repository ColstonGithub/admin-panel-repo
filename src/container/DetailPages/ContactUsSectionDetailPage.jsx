import { Box, Grid, Modal } from "@mui/material";
import FMTypography from "components/FMTypography/FMTypography";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import crossIcon from "assets/crossIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getContactUsSecById } from "redux/Slices/ContactUsSection/ContactUsSection";
import ModalWrapper from "container/HomePage/Modal";

const ContactUsSectionDetailPage = (props) => {
  const { setOpen, open, id } = props;

  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const setCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getContactUsSecById(id));
  }, [id, dispatch]);

  const contactUsSectionDetail = useSelector(
    (state) => state?.contactUsSection?.getContactUsSecData?.contactUs
  );

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Contact Us Details"}
    >
      <Row style={{ marginTop: "1rem" }}>
        <Col>
          <FMTypography displayText={"Name"} />
          <FMTypography
            displayText={contactUsSectionDetail?.name}
            styleData={{ color: "#717171" }}
          />
        </Col>
        <Col>
          <FMTypography displayText={"Date"} />
          <FMTypography
            displayText={moment(contactUsSectionDetail?.createdAt).format(
              "DD/MM/YYYY"
            )}
            styleData={{ color: "#717171" }}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: "1rem" }}>
      <Col>
          <FMTypography displayText={"Message"} />
          <FMTypography
            displayText={contactUsSectionDetail?.message}
            styleData={{ color: "#717171" }}
          />
        </Col>
        <Col>
          <FMTypography displayText={"Email"} />
          <FMTypography
            displayText={contactUsSectionDetail?.email}
            styleData={{ color: "#717171" }}
          />
        </Col>

      </Row>
      <Row style={{ marginTop: "1rem" }}>
        <Col>
          <FMTypography displayText={"Mobile Number"} />
          <FMTypography
            displayText={contactUsSectionDetail?.mobileNo}
            styleData={{ color: "#717171" }}
          />
        </Col>
        <Col>
          <FMTypography displayText={"Subject"} />
          <FMTypography
            displayText={contactUsSectionDetail?.subject}
            styleData={{ color: "#717171" }}
          />
        </Col>
      </Row>
    </ModalWrapper>
  );
};

export default ContactUsSectionDetailPage;
