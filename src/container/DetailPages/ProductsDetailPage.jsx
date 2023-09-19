import { Box } from "@mui/material";
import FMTypography from "components/FMTypography/FMTypography";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getBannerProductDetail } from "redux/Slices/BannerProducts/BannerProducts";
import ModalWrapper from "container/HomePage/Modal";
const ProductDetailPage = (props) => {
  const { setOpen, open, id } = props;
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const setCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getBannerProductDetail(id));
  }, [dispatch, id]);

  const productData = useSelector(
    (state) => state?.brandProduct?.getBannerProductData?.product
  );
  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Product Details"}
    >
      <Row style={{ marginBottom: "1rem" }}>
        <Col>
          <FMTypography displayText={"Name"} />
          <FMTypography
            displayText={productData?.name}
            styleData={{ color: "#717171" }}
          />
        </Col>
        <Col>
          <FMTypography displayText={"Date"} />
          <FMTypography
            displayText={moment(productData?.createdAt).format("DD/MM/YYYY")}
            styleData={{ color: "#717171" }}
          />
        </Col>
      </Row>

      <Row style={{ marginBottom: "1rem" }}>
        {productData?.colors?.map((elem, index) => (
          <Col key={index}>
            <FMTypography displayText={`Color ${index + 1}`} />
            <FMTypography displayText={`-> ${elem?.colorName}`} />

            {elem?.productPictures?.map((ele, i) => {
              let completeImageUrl = "";
              if (ele?.img && !ele?.img.startsWith("https://")) {
                completeImageUrl = `https://${ele?.img}`;
              } else {
                completeImageUrl = `${ele?.img}`;
              }

              return (
                <Col key={i}>
                  <Box sx={{ display: "flex" }}>
                    <FMTypography displayText={`-> ${i + 1}`} />
                    <Box className="mx-2 my-2">
                      <img
                        src={completeImageUrl}
                        alt={ele.imageAltText}
                        style={{ width: "200px", height: "200px" }}
                      />
                    </Box>
                  </Box>
                </Col>
              );
            })}
          </Col>
        ))}
      </Row>

      <Row style={{ marginBottom: "1rem" }}>
        <Col>
          <FMTypography displayText={"PDF"} />
          <a href={productData?.pdf}>Click to download</a>
        </Col>
      </Row>
      <Row style={{ marginBottom: "1rem" }}>
        <FMTypography displayText={"Specifications"} />
        <FMTypography
          displayText={productData?.specification}
          styleData={{ color: "#717171" }}
        />
      </Row>
      <Row style={{ marginBottom: "1rem" }}>
        <FMTypography displayText={"Description"} />
        <FMTypography
          displayText={productData?.description}
          styleData={{ color: "#717171" }}
        />
      </Row>
      <FMTypography displayText={"Images"} />
      {productData?.productPictures?.map((elem, index) => {
        let completeImageUrl = "";
        if (elem?.img && !elem?.img.startsWith("https://")) {
          completeImageUrl = `https://${elem?.img}`;
        } else {
          completeImageUrl = `${elem?.img}`;
        }

        return (
          <img
            key={index} // Add a unique key prop for each image
            src={completeImageUrl}
            alt="img"
            width="200px"
            height="200px"
            style={{ marginLeft: "2rem" }}
          />
        );
      })}
    </ModalWrapper>
  );
};

export default ProductDetailPage;
