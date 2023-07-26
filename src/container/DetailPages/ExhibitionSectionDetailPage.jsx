import { Box } from "@mui/material";
import FMTypography from "components/FMTypography/FMTypography";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getExhibitionPageDetail } from "redux/Slices/Exhibition/ExhibitionPage";
import moment from "moment";
import ModalWrapper from "container/HomePage/Modal";

const ExhibitionSectionDetailPage = (props) => {
  const { setOpen, open, id, type } = props;
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  const setCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    // if (id) {
    dispatch(getExhibitionPageDetail(id));
    // }
  }, [id, dispatch]);

  const exhibitionPageDetailedData = useSelector(
    (state) => state?.exhibitionPage?.getExhibitionCenterData
  );

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Exhibition Product Details"}
    >
      <Row style={{ marginBottom: "1rem" }}>
        <Col>
          <FMTypography displayText={"Name"} />
          <FMTypography
            displayText={exhibitionPageDetailedData?.exhibitionproduct?.title}
            styleData={{ color: "#717171" }}
          />
        </Col>
        <Col>
          <FMTypography displayText={"Date"} />
          <FMTypography
            displayText={moment(exhibitionPageDetailedData?.exhibitionproduct?.createdAt).format(
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
            displayText={exhibitionPageDetailedData?.exhibitionproduct?.text}
            styleData={{ color: "#717171" }}
          />
        </Col>
      </Row>
      <Row style={{ marginBottom: "1rem" }}>
        <Col>
          <FMTypography displayText={"Image Alt Text"} />
          <FMTypography
            displayText={exhibitionPageDetailedData?.exhibitionproduct?.imageAltText}
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
          src={exhibitionPageDetailedData?.exhibitionproduct?.image}
          alt="img"
          height="200px"
          width="100%"
        />
      </Box>
    </ModalWrapper>
  );
};

export default ExhibitionSectionDetailPage;
