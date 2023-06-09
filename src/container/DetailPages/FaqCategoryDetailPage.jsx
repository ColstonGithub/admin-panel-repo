import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import FMTypography from "components/FMTypography/FMTypography";
import { getFaqCategoryById } from "redux/Slices/FAQS/FaqCategorySlice";
import ModalWrapper from "container/HomePage/Modal";

const FaqCategoryDetailPage = (props) => {
  const { setOpen, open, id } = props;
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const setCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getFaqCategoryById(id));
  }, [id, dispatch]);

  const faqCategoryDetail = useSelector(
    (state) => state?.faqCategory?.getFaqCategoryData?.faqCategory
  );
  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"FAQs Category Details"}
    >
      <Row style={{ marginBottom: "1rem" }}>
        <Col>
          <FMTypography displayText={"Name"} />
          <FMTypography
            displayText={faqCategoryDetail?.name}
            styleData={{ color: "#717171" }}
          />
        </Col>
        <Col>
          <FMTypography displayText={"Date"} />
          <FMTypography
            displayText={moment(faqCategoryDetail?.createdAt).format(
              "DD/MM/YYYY"
            )}
            styleData={{ color: "#717171" }}
          />
        </Col>
      </Row>
    </ModalWrapper>
  );
};

export default FaqCategoryDetailPage;
