import { Box } from "@mui/material";
import FMTypography from "components/FMTypography/FMTypography";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getBannersDetail } from "redux/Slices/HomePage/HomePageCategories";
import ModalWrapper from "container/HomePage/Modal";

const HomepageCategoryBannerDetailPage = (props) => {
  const { setOpen, open, id } = props;

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

  const homepageExploreCatDetail = useSelector(
    (state) => state?.exploreCategories.getParticularBannerData?.banner
  );
  console.log("homepageExploreCatDetail ", homepageExploreCatDetail);
  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"HomePage Banner Details"}
    >
      <Row style={{ marginBottom: "1rem" }}>
        <Col>
          <FMTypography displayText={"Title"} />
          <FMTypography
            displayText={homepageExploreCatDetail?.title}
            styleData={{ color: "#717171" }}
          />
        </Col>
        <Col>
          <FMTypography displayText={"Date"} />
          <FMTypography
            displayText={moment(homepageExploreCatDetail?.createdAt).format(
              "DD/MM/YYYY"
            )}
            styleData={{ color: "#717171" }}
          />
        </Col>
      </Row>
      <Row style={{ marginBottom: "1rem" }}>
        <Col>
          <FMTypography displayText={"Image Alt Text"} />
          <FMTypography
            displayText={homepageExploreCatDetail?.imageAltText}
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
          src={homepageExploreCatDetail?.banner}
          alt="img"
          height="200px"
          width="100%"
          style={{ marginTop: "4px" }}
        />
      </Box>
    </ModalWrapper>
  );
};

export default HomepageCategoryBannerDetailPage;
