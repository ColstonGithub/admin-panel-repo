import React, { useEffect } from "react";
import FMTypography from "components/FMTypography/FMTypography";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import ModalWrapper from "container/HomePage/Modal";
import { Link } from "react-router-dom";
import DirectionsIcon from "@mui/icons-material/Directions";
import { whereToBuyDetail } from "redux/Slices/WhereToBuy/whereToBuy";
const WhereToBuyDetailPage = (props) => {
  const { setOpen, open, id } = props;
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const setCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(whereToBuyDetail(id));
  }, [id, dispatch]);

  const getWhereToBuyDetails = useSelector(
    (state) => state?.whereToBuy?.getWhereToBuyData?.whereToBuyProd
  );

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Where To Buy Details"}
    >
      <Row style={{ marginBottom: "1rem" }}>
        <Col md={6}>
          <FMTypography displayText={"City"} />
          <FMTypography
            displayText={getWhereToBuyDetails?.city}
            styleData={{ color: "#717171" }}
          />
        </Col>
        <Col md={6}>
          <FMTypography displayText={"Date"} />
          <FMTypography
            displayText={moment(getWhereToBuyDetails?.createdAt).format(
              "DD/MM/YYYY"
            )}
            styleData={{ color: "#717171" }}
          />
        </Col>
      </Row>
      <Row style={{ marginBottom: "1rem" }}>
        <Col md={6}>
          <FMTypography displayText={"Center Name"} />
          <FMTypography
            displayText={getWhereToBuyDetails?.centerName}
            styleData={{ color: "#717171" }}
          />
        </Col>

        <Col md={6}>
          <FMTypography displayText={"Email"} />
          <FMTypography
            displayText={getWhereToBuyDetails?.email}
            styleData={{ color: "#717171" }}
          />
        </Col>
      </Row>{" "}
      <Row style={{ marginBottom: "1rem" }}>
        <Col md={6}>
          <FMTypography displayText={"Center Address"} />
          <FMTypography
            displayText={getWhereToBuyDetails?.centerAddress}
            styleData={{ color: "#717171" }}
          />
        </Col>
        <Col md={6}>
          <FMTypography displayText={"Location"} />
          <Link to={getWhereToBuyDetails?.location} target="_blank">
            <DirectionsIcon style={{ width: "25px", height: "25px" }} />
            Get Directions
          </Link>
        </Col>
      </Row>
    </ModalWrapper>
  );
};

export default WhereToBuyDetailPage;
