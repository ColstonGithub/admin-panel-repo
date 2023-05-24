import React, { useEffect } from "react";
import FMTypography from "components/FMTypography/FMTypography";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getWarrantyRegById } from "redux/Slices/WarrantyRegistration/WarrantyRegistration";
import ModalWrapper from "container/HomePage/Modal";
const WarrantyRegDetailPage = (props) => {
  const { setOpen, open, id } = props;

  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const setCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getWarrantyRegById(id));
  }, [id, dispatch]);

  const warrantyRegDetail = useSelector(
    (state) =>
      state?.warrantyRegistration?.getWarrantyRegData?.warrentyRegistration
  );
  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Warranty Registration Details"}
    >
      <Row style={{ marginTop: "1rem" }}>
        <Col>
          <FMTypography displayText={"Name"} />
          <FMTypography
            displayText={warrantyRegDetail?.name}
            styleData={{ color: "#717171" }}
          />
        </Col>
        <Col>
          <FMTypography displayText={"Date"} />
          <FMTypography
            displayText={moment(warrantyRegDetail?.createdAt).format(
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
            displayText={warrantyRegDetail?.mobileNo}
            styleData={{ color: "#717171" }}
          />
        </Col>
        <Col>
          <FMTypography displayText={"Subject"} />
          <FMTypography
            displayText={warrantyRegDetail?.subject}
            styleData={{ color: "#717171" }}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: "1rem" }}>
        <Col>
          <FMTypography displayText={"Email"} />
          <FMTypography
            displayText={warrantyRegDetail?.email}
            styleData={{ color: "#717171" }}
          />
        </Col>
      </Row>
    </ModalWrapper>
  );
};

export default WarrantyRegDetailPage;
