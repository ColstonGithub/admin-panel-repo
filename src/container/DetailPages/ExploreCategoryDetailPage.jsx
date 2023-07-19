import { Box} from "@mui/material";
import FMTypography from "components/FMTypography/FMTypography";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getBannersDetail,
  getCategoriesDetail,
} from "redux/Slices/HomePage/HomePageCategories";
import { getBannerProductDetail } from "redux/Slices/BannerProducts/BannerProducts";
import moment from "moment";
import ModalWrapper from "container/HomePage/Modal";

const ExploreCategoryDetailPage = (props) => {
  const { setOpen, open, id, type } = props;
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const setCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (type === "homePageBannerString") dispatch(getBannersDetail(id));
    else if (type === "homePageCategoryString")
      dispatch(getCategoriesDetail(id));
    else if (type === "brandProductString")
      dispatch(getBannerProductDetail(id));
  }, [id, dispatch]);

  const productDetailedData = useSelector(
    (state) => state?.exploreCategories?.getProductsListData?.category
  );

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Category Details"}
    >
      <Row style={{ marginBottom: "1rem", marginTop: "1rem" }}>
        <Col>
          <FMTypography displayText={"Name"} />
          <FMTypography
            displayText={productDetailedData?.name}
            styleData={{ color: "#717171" }}
          />
        </Col>
        <Col>
          <FMTypography displayText={"Date"} />
          <FMTypography
            displayText={moment(productDetailedData?.createdAt).format(
              "DD/MM/YYYY"
            )}
            styleData={{ color: "#717171" }}
          />
        </Col>
      </Row>
      <Row style={{ marginBottom: "1rem" }}>
        <Col>
          <FMTypography displayText={"Keyword"} />
          <FMTypography
            displayText={productDetailedData?.keyword}
            styleData={{ color: "#717171" }}
          />
        </Col>
        <Col>
          <FMTypography displayText={"Image Alt Text"} />
          <FMTypography
            displayText={productDetailedData?.imageAltText}
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
          src={productDetailedData?.categoryImage}
          alt="img"
          height="200px"
          width="100%"
          style={{ marginTop: "4px" }}
        />
      </Box>
    </ModalWrapper>
  );
};

export default ExploreCategoryDetailPage;
