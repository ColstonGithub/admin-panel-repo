import FMTypography from "components/FMTypography/FMTypography";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { orientationCenterDetail } from "redux/Slices/OrientationCenter/orientation";
import ModalWrapper from "container/HomePage/Modal";
import { Link } from "react-router-dom";
import DirectionsIcon from "@mui/icons-material/Directions";
const OrientationCenterDetailPage = (props) => {
  const { setOpen, open, id } = props;
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const setCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(orientationCenterDetail(id));
  }, [id, dispatch]);

  //   const getOrientationCenterDetails = useSelector(
  //     (state) => state?
  //   );

  const getOrientationCenterDetails = useSelector(
    (state) =>
      state?.orientationCenter?.getOrientationCenterData?.orientationProd
  );

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Live Display Centre Details"}
    >
      <Row style={{ marginBottom: "1rem" }}>
        <Col md={6}>
          <FMTypography displayText={"City"} />
          <FMTypography
            displayText={getOrientationCenterDetails?.city}
            styleData={{ color: "#717171" }}
          />
        </Col>
        <Col md={6}>
          <FMTypography displayText={"Date"} />
          <FMTypography
            displayText={moment(getOrientationCenterDetails?.createdAt).format(
              "DD/MM/YYYY"
            )}
            styleData={{ color: "#717171" }}
          />
        </Col>
      </Row>
      <Row style={{ marginBottom: "1rem" }}>
        <Col md={6}>
          <FMTypography displayText={"Center Name"} />
          <FMTypography
            displayText={getOrientationCenterDetails?.centerName}
            styleData={{ color: "#717171" }}
          />
        </Col>

        <Col md={6}>
          <FMTypography displayText={"Email"} />
          <FMTypography
            displayText={getOrientationCenterDetails?.email}
            styleData={{ color: "#717171" }}
          />
        </Col>
      </Row>{" "}
      <Row style={{ marginBottom: "1rem" }}>
        <Col md={6}>
          <FMTypography displayText={"Location"} />
          <Link to={getOrientationCenterDetails?.location} target="_blank">
            <DirectionsIcon style={{ width: "25px", height: "25px" }} />
            Get Directions
          </Link>
        </Col>

        <Col md={6}>
          <FMTypography displayText={"Service"} />
          <FMTypography
            displayText={getOrientationCenterDetails?.service}
            styleData={{ color: "#717171" }}
          />
        </Col>
      </Row>
      <Row style={{ marginBottom: "1rem" }}>
        <Col md={6}>
          <FMTypography displayText={"Purchase Assistance"} />
          <FMTypography
            displayText={getOrientationCenterDetails?.purchaseAssistance}
            styleData={{ color: "#717171" }}
          />
        </Col>
        <Col md={6}>
          <FMTypography displayText={"Oc Appointment"} />
          <FMTypography
            displayText={getOrientationCenterDetails?.ocAppointment}
            styleData={{ color: "#717171" }}
          />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <FMTypography displayText={"Center Address"} />
          <FMTypography
            displayText={getOrientationCenterDetails?.centerAddress}
            styleData={{ color: "#717171" }}
          />
        </Col>
      </Row>
    </ModalWrapper>
  );
};

export default OrientationCenterDetailPage;
