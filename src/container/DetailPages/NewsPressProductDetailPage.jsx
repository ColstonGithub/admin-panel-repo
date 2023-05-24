import { Box } from "@mui/material";
import FMTypography from "components/FMTypography/FMTypography";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { newsPressProductDetail } from "redux/Slices/NewsPress/NewsPressProducts";
import ModalWrapper from "container/HomePage/Modal";

const NewsPressProductDetailPage = (props) => {
  const { setOpen, open, id } = props;
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const setCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(newsPressProductDetail(id));
  }, [id, dispatch]);

  const getNewsPressProductDetails = useSelector(
    (state) => state?.newsPressProduct?.getNewsPressProductData?.newsPress
  );

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"News & Press Product Details"}
    >
      <Row style={{ marginBottom: "1rem" }}>
        <Col>
          <FMTypography displayText={"Title"} />
          <FMTypography
            displayText={getNewsPressProductDetails?.title}
            styleData={{ color: "#717171" }}
          />
        </Col>
        <Col>
          <FMTypography displayText={"Date"} />
          <FMTypography
            displayText={moment(getNewsPressProductDetails?.createdAt).format(
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
            displayText={getNewsPressProductDetails?.text}
            styleData={{ color: "#717171" }}
          />
        </Col>
      </Row>{" "}
      <Row style={{ marginBottom: "1rem" }}>
        <Col>
          <FMTypography displayText={"Image Alt Text"} />
          <FMTypography
            displayText={getNewsPressProductDetails?.imageAltText}
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
          src={getNewsPressProductDetails?.image}
          alt="img"
          height="200px"  
          width="100%"
        />
      </Box>
    </ModalWrapper>
  );
};

export default NewsPressProductDetailPage;
