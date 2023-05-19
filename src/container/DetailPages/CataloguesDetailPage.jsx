import { Box } from "@mui/material";
import FMTypography from "components/FMTypography/FMTypography";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getCatalogueDetail } from "redux/Slices/Catalogue/Catalogue";
import ModalWrapper from "container/HomePage/Modal";

const CataloguesDetailPage = (props) => {
  const { setOpen, open, id,  } = props;
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const setCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getCatalogueDetail(id));
  }, [id, dispatch]);


  const cataloguesDetail = useSelector(
    (state) => state?.catalogues?.getCatalogueData?.Catalogue
  );
  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Catalogue Details"}
    >
      <Row style={{ marginTop: "1rem" }}>
        <Col>
          <FMTypography displayText={"Title"} />
          <FMTypography
            displayText={cataloguesDetail?.title}
            styleData={{ color: "#717171" }}
          />
        </Col>
        <Col>
          <FMTypography displayText={"Date"} />
          <FMTypography
            displayText={moment(cataloguesDetail?.createdAt).format(
              "DD/MM/YYYY"
            )}
            styleData={{ color: "#717171" }}
          />
        </Col>
      </Row>

      <Row style={{ marginTop: "1rem" }}>
        <Col>
          <FMTypography displayText={"PDF"} />
          <a href={cataloguesDetail?.pdf}> Click here to download </a>
        </Col>
        <Col>
          <FMTypography displayText={"Image Alt Text"} />
          <FMTypography
            displayText={cataloguesDetail?.imageAltText}
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
          src={cataloguesDetail?.image}
          alt="img"
          height="200px"
          width="100%"
        />
      </Box>
    </ModalWrapper>
  );
};

export default CataloguesDetailPage;
