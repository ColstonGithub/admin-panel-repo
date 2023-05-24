import { Box } from "@mui/material";
import FMTypography from "components/FMTypography/FMTypography";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { virtualTourBannerDetail } from "redux/Slices/VirtuaTour/VirtualTour";
import ModalWrapper from "container/HomePage/Modal";

const VirtualTourDetailPage = (props) => {
  const { setOpen, open, id } = props;
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const setCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(virtualTourBannerDetail(id));
  }, [id, dispatch]);

  const getVirtualTourDetails = useSelector(
    (state) => state?.virtualTourBanner?.getVirtualTourData?.banner
  );

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Virtual Tour Details"}
    >
      <Row style={{ marginBottom: "1rem" }}>
        <Col>
          <FMTypography displayText={"Title"} />
          <FMTypography
            displayText={getVirtualTourDetails?.title}
            styleData={{ color: "#717171" }}
          />
        </Col>
        <Col>
          <FMTypography displayText={"Date"} />
          <FMTypography
            displayText={moment(getVirtualTourDetails?.createdAt).format(
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
            displayText={getVirtualTourDetails?.bannerImageAltText}
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
          src={getVirtualTourDetails?.bannerImage}
          alt="img"
          height="200px"
          width="100%"
        />
      </Box>
    </ModalWrapper>
  );
};

export default VirtualTourDetailPage;
