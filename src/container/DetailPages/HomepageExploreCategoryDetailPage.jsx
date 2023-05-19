import { Box } from "@mui/material";
import FMTypography from "components/FMTypography/FMTypography";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getHomePageExploreCatById } from "redux/Slices/HomePage/HomepageExploreCategory";
import ModalWrapper from "container/HomePage/Modal";

const HomepageExploreCategoryDetailPage = (props) => {
  const { setOpen, open, id } = props;

  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const setCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getHomePageExploreCatById(id));
  }, [id, dispatch]);

  const homepageExploreCatData = useSelector(
    (state) =>
      state?.homepageExploreCategory.getHomepageexploreCatData.exploreCategory
  );

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Homepage Explore Category Details"}
    >
      <Row style={{ marginBottom: "1rem" }}>
        <Col>
          <FMTypography displayText={"Title"} />
          <FMTypography
            displayText={homepageExploreCatData?.imageTitle}
            styleData={{ color: "#717171" }}
          />
        </Col>
        <Col>
          <FMTypography displayText={"Date"} />
          <FMTypography
            displayText={moment(homepageExploreCatData?.createdAt).format(
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
            displayText={homepageExploreCatData?.imageAltText}
            styleData={{ color: "#717171" }}
          />
        </Col>{" "}
        <Col>
          <FMTypography displayText={"categoryId"} />
          <FMTypography
            displayText={homepageExploreCatData?.categoryId}
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
          src={homepageExploreCatData?.image}
          alt="img"
          height="200px"
          width="100%"
          style={{ marginTop: "4px" }}
        />
      </Box>
    </ModalWrapper>
  );
};

export default HomepageExploreCategoryDetailPage;
