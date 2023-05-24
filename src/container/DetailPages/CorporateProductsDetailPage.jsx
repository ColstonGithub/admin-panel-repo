import { Box, } from "@mui/material";
import FMTypography from "components/FMTypography/FMTypography";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getCorporateProductDetail } from "redux/Slices/CorporatePageSlices/CorporateProduct";
import ModalWrapper from "container/HomePage/Modal";

const CorporateProductsDetailPage = (props) => {
  const { setOpen, open, id } = props;
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const setCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getCorporateProductDetail(id));
  }, [id, dispatch]);


  const getCorporateProductDetails = useSelector(
    (state) =>
      state?.corporateProduct?.getCorporateProductData?.corporateproduct
  );

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Corporate Product Details"}
    >
      <Row style={{ marginBottom: "1rem" }}>
        <Col>
          <FMTypography displayText={"Title"} />
          <FMTypography
            displayText={getCorporateProductDetails?.title}
            styleData={{ color: "#717171" }}
          />
        </Col>
        <Col>
          <FMTypography displayText={"Date"} />
          <FMTypography
            displayText={moment(getCorporateProductDetails?.createdAt).format(
              "DD/MM/YYYY"
            )}
            styleData={{ color: "#717171" }}
          />
        </Col>
      </Row>
      <Row style={{ marginBottom: "1rem" }}>
        <Col>
          <FMTypography displayText={"Text"} />
          <FMTypography
            displayText={getCorporateProductDetails?.text}
            styleData={{ color: "#717171" }}
          />
        </Col>
      </Row>{" "}
      <Row style={{ marginBottom: "1rem" }}>
        <Col>
          <FMTypography displayText={"Image Alt Text"} />
          <FMTypography
            displayText={getCorporateProductDetails?.imageAltText}
            styleData={{ color: "#717171" }}
          />
        </Col>
      </Row>
      <FMTypography
        displayText={"Image"}
        styleData={{ marginBottom: "4px", marginTop: "1rem" }}
      />
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={getCorporateProductDetails?.image}
          alt="img"
          height="200px"
          width="100%"
        />
      </Box>
    </ModalWrapper>
  );
};

export default CorporateProductsDetailPage;
