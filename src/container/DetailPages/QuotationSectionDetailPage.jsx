import React, { useEffect } from "react";
import FMTypography from "components/FMTypography/FMTypography";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getQuotationSecById } from "redux/Slices/QuotationSection/QuotationSection";
import ModalWrapper from "container/HomePage/Modal";
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
      <Row style={{ marginTop: "1rem" }}>
        <Col>
          <FMTypography displayText={"Address"} />
          <FMTypography
            displayText={quotationSecDetail?.address}
            styleData={{ color: "#717171" }}
          />
        </Col>
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
            displayText={moment(quotationSecDetail?.purchaseDate).format(
              "DD/MM/YYYY"
            )}
            styleData={{ color: "#717171" }}
          />
        </Col>
      </Row>
    </ModalWrapper>
  );
};

export default QuotationSectionDetailPage;
