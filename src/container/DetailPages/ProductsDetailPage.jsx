import { Box } from "@mui/material";
import FMTypography from "components/FMTypography/FMTypography";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getBannerProductDetail } from "redux/Slices/BannerProducts/BannerProducts";
import ModalWrapper from "container/HomePage/Modal";
const ProductDetailPage = (props) => {
  const { setOpen, open, id, type } = props;
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const setCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getBannerProductDetail(id));
  }, [id, dispatch]);

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
          <Col>
            <FMTypography displayText={`Color ${index + 1}`} />
            {/* <div style={{ display: "flex" }}> */}
            <FMTypography
              displayText={`-> ${elem?.colorName}`}
              // styleData={{ color: elem?.colorCode }}
            />

            {/* </div> */}
            {elem?.productPictures?.map((ele, i) => (
              <Col>
                <Box sx={{ display: "flex" }}>
                  <FMTypography
                    displayText={`-> ${i + 1}`}
                    // styleData={{ color: elem?.colorCode }}
                  />
                  <Box className="mx-2 my-2">
                    <img
                      src={ele.img}
                      alt={ele.imageAltText}
                      style={{ width: "100px", height: "50px" }}
                    />
                  </Box>
                </Box>
                {/* </div> */}
              </Col>
            ))}
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
        <FMTypography displayText={"Specifications:"} />
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
      {productData?.productPictures?.map((elem) => (
        <img
          src={elem?.img}
          alt="img"
          width="100px"
          height="100px"
          style={{ marginLeft: "2rem" }}
        />
      ))}
    </ModalWrapper>
  );
};

export default ProductDetailPage;
