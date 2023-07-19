import FMTypography from "components/FMTypography/FMTypography";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getBannersDetail } from "redux/Slices/HomePage/HomePageCategories";
import moment from "moment";
import ModalWrapper from "container/HomePage/Modal";

const HomePageBannerDetailPage = (props) => {
  const { setOpen, open, id, type } = props;
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const setCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getBannersDetail(id));
  }, [id, dispatch]);

  const bannerDetailedData = useSelector(
    (state) => state?.exploreCategories?.getParticularBannerData?.banner
  );

  const productData = useSelector(
    (state) => state?.brandProduct?.getBannerProductData?.product
  );

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Banner Details"}
    >
      <Row style={{ marginBottom: "1rem" }}>
        <Col>
          <FMTypography displayText={"Name"} />
          <FMTypography
            displayText={bannerDetailedData?.title}
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
      <FMTypography displayText={"Images"} />
      {bannerDetailedData?.banners?.map((elem) => (
        <img
          src={elem?.img}
          alt="img"
          width="550px"
          style={{ marginRight: "2rem", marginTop: "1rem" }}
        />
      ))}
    </ModalWrapper>
  );
};

export default HomePageBannerDetailPage;
