import { Box } from "@mui/material";
import FMTypography from "components/FMTypography/FMTypography";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getExhibitionBannerDetail } from "redux/Slices/Exhibition/ExhibitionBanner";
import ModalWrapper from "container/HomePage/Modal";

const ExhibitionDetailPage = (props) => {
  const { setOpen, open, id, type } = props;
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const setCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getExhibitionBannerDetail(id));
  }, [id, dispatch]);

  const exhibitionBannerDetail = useSelector(
    (state) => state?.exhibitionBanner?.getExhibtionBannerData?.banner
  );

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Exhibition Details"}
    >
      <Row style={{ marginBottom: "1rem" }}>
        <Col>
          <FMTypography displayText={"Title"} />
          <FMTypography
            displayText={exhibitionBannerDetail?.title}
            styleData={{ color: "#717171" }}
          />
        </Col>
        <Col>
          <FMTypography displayText={"Date"} />
          <FMTypography
            displayText={moment(exhibitionBannerDetail?.createdAt).format(
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
            displayText={exhibitionBannerDetail?.bannerImageAltText}
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
          src={exhibitionBannerDetail?.bannerImage}
          alt="img"
          height="200px"
          width="100%"
        />
      </Box>
    </ModalWrapper>
  );
};

export default ExhibitionDetailPage;
