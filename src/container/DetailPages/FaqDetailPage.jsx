import React, { useEffect } from "react";
import FMTypography from "components/FMTypography/FMTypography";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getFaqById } from "redux/Slices/FAQS/FaqSlice";
import ModalWrapper from "container/HomePage/Modal";
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

  const faqDetail = useSelector((state) => state?.faq?.getFaqData?.faqData);
  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"FAQs Details"}
    >
      <Row style={{ marginTop: "1rem" }}>
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
            displayText={moment(faqDetail?.createdAt).format("DD/MM/YYYY")}
            styleData={{ color: "#717171" }}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: "1rem" }}>
        <Col>
          <FMTypography displayText={"Question"} />
          <FMTypography
            displayText={faqDetail?.question}
            styleData={{ color: "#717171" }}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: "1rem" }}>
        <Col>
          <FMTypography displayText={"Answer"} />
          <FMTypography
            displayText={faqDetail?.answer}
            styleData={{ color: "#717171" }}
          />
        </Col>
      </Row>
    </ModalWrapper>
  );
};

export default FaqDetailPage;
