import { Box, Grid, Modal } from "@mui/material";
import FMTypography from "components/FMTypography/FMTypography";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import crossIcon from "assets/crossIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getVideoDetail } from "redux/Slices/videosSlices/Video";
import ModalWrapper from "container/HomePage/Modal";

const VideoDetailPage = (props) => {
  const { setOpen, open, id, type } = props;
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const setCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getVideoDetail(id));
  }, [id, dispatch]);

  const videoDetail = useSelector((state) => state?.video?.getVideoData?.Video);

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Video Details"}
    >
      <Row style={{ marginBottom: "1rem" }}>
        <Col>
          <FMTypography displayText={"Title"} />
          <FMTypography
            displayText={videoDetail?.title}
            styleData={{ color: "#717171" }}
          />
        </Col>
        <Col>
          <FMTypography displayText={"Date"} />
          <FMTypography
            displayText={moment(videoDetail?.createdAt).format("DD/MM/YYYY")}
            styleData={{ color: "#717171" }}
          />
        </Col>
      </Row>

      <Row style={{ marginBottom: "1rem" }}>
        <Col>
          <FMTypography displayText={"Meta Data"} />
          <FMTypography
            displayText={videoDetail?.metaData}
            styleData={{ color: "#717171" }}
          />
        </Col>
      </Row>
      <FMTypography
        displayText={"Poster"}
        styleData={{ marginBottom: "4px", marginTop: "1rem" }}
      />
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <img src={videoDetail?.poster} alt="img" height="200px" width="100%" />
      </Box>

      <Row style={{ marginTop: "1rem" }}>
        <Col>
          <FMTypography displayText={"Video"} />
          <video
            src={videoDetail?.video}
            width="100%"
            height="200"
            controls
            style={{ marginTop: "4px" }}
          >
            Your browser does not support the video tag.
          </video>
        </Col>
      </Row>
    </ModalWrapper>
  );
};

export default VideoDetailPage;
