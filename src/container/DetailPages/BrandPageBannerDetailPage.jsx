import FMTypography from "components/FMTypography/FMTypography";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getBrandPageBannerDetail } from "redux/Slices/BrandPage/brandPageBanner";
import { Box, } from "@mui/material";
import ModalWrapper from "container/HomePage/Modal";

const BrandPageBannerDetailPage = (props) => {
  const { setOpen, open, id, type } = props;
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  const setCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getBrandPageBannerDetail(id));
  }, [id, dispatch]);

  const brandPageBannerDetailedData = useSelector(
    (state) => state?.brandPageBanner?.getBrandPageBannerData?.banner
  );

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Brand Banner Details"}
    >
      <Row style={{ marginBottom: "1rem" }}>
        <Col>
          <FMTypography displayText={"Title"} />
          <FMTypography
            displayText={brandPageBannerDetailedData?.title}
            styleData={{ color: "#717171" }}
          />
        </Col>
        <Col>
          <FMTypography displayText={"Date"} />
          <FMTypography
            displayText={moment(brandPageBannerDetailedData?.createdAt).format(
              "DD/MM/YYYY"
            )}
            styleData={{ color: "#717171" }}
          />
        </Col>
      </Row>

      <Row style={{ marginBottom: "1rem" }}>
        <Col>
          <FMTypography displayText={"Banner Image Alt Text"} />
          <FMTypography
            displayText={brandPageBannerDetailedData?.bannerImageAltText}
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
          src={brandPageBannerDetailedData?.bannerImage}
          alt="img"
          height="200px"
          width="100%"
        />
      </Box>
    </ModalWrapper>
  );
};

export default BrandPageBannerDetailPage;
