import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/material";
import FMTypography from "components/FMTypography/FMTypography";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FMButton from "components/FMButton/FMButton";
import { Col, Row } from "react-bootstrap";
import FMInput from "components/FMInput/FMInput";
import { useDispatch, useSelector } from "react-redux";
import { getBrandPageDetail } from "redux/Slices/BrandPage/BrandPage";
import { virtualTourBannerDetail } from "redux/Slices/VirtuaTour/VirtualTour";
import { getCareCleanDetail } from "redux/Slices/CareClean/CareClean";
import {
  editVideoDetails,
  getVideoDetail,
  getVideos,
} from "redux/Slices/videosSlices/Video";
import { editVideoSchema } from "validationSchema/AddVideoSchema";
import { notify } from "constants/utils";
import ModalWrapper from "container/HomePage/Modal";
import { commonStyle } from "Styles/commonStyles";

const EditVideo = (props) => {
  const { setOpen, open, id, usersListData } = props;
  const [poster, setPoster] = useState("");
  const [videoFile, setVideoFile] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [videoFilePreview, setVideoFilePreview] = useState("");
  const [videoFilePrevious, setVideoFilePrevious] = useState("");
  const [editedImagePreview, setEditedImagePreview] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrandPageDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(virtualTourBannerDetail(id));
  }, [id, dispatch]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(editVideoSchema),
    mode: "onChange",
  });

  useEffect(() => {
    dispatch(getCareCleanDetail(id));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(getVideoDetail(id));
  }, [id, dispatch]);

  const videoDetail = useSelector((state) => state?.video?.getVideoData?.Video);

  useEffect(() => {
    reset({
      title: videoDetail?.title,
      metaData: videoDetail?.metaData,
    });
    setEditedImagePreview(videoDetail?.poster);
    setVideoFilePrevious(videoDetail?.video);
  }, [videoDetail, reset]);

  const handleClose = () => {
    setOpen(false);
    setValue("metaData", "");
    setValue("title", "");
    setPoster("");
  };
  const setCloseDialog = () => {
    setOpen(false);
    setValue("metaData", "");
    setValue("title", "");
    setPoster("");
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data?.title?.toString());
    formData.append("metaData", data?.metaData?.toString());
    if (poster !== " ") {
      formData.append("poster", poster);
    }
    if (videoFile !== " ") {
      formData.append("video", videoFile);
    }
    formData.append("_id", id);

    dispatch(editVideoDetails(formData)).then(() => {
      dispatch(getVideos(usersListData));
      notify({ type: "success", messgae: "Data Edited Successfully" });
      setOpen(false);
      setValue("metaData", "");
      setValue("title", "");
      setPoster("");
    });
  };

  const handleProductPictures = (e) => {
    setPoster(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setEditedImagePreview("");
  };

  const handleFileChange = (event) => {
    setVideoFile(event.target.files[0]);
    setVideoFilePrevious("");
    setVideoFilePreview(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Edit Video"}
    >
      <Row style={{ marginBottom: "1rem" }}>
        <Col>
          <FMInput
            required
            readOnly={false}
            displayText="Title"
            id="title"
            name="title"
            register={register("title")}
            error={errors.title}
            errorDisplayText={errors.title?.message}
          />
        </Col>
        <Col>
          <FMInput
            required
            readOnly={false}
            displayText="Meta Data"
            id="metaData"
            name="metaData"
            register={register("metaData")}
            error={errors.metaData}
            errorDisplayText={errors.metaData?.message}
          />{" "}
          {errors.metaData && (
            <FMTypography
              displayText={errors.metaData?.message}
              styleData={{ color: "red" }}
            />
          )}
        </Col>
      </Row>

      <Row style={{ marginTop: "1rem" }}>
        <Col>
          <FMInput
            required
            readOnly={false}
            displayText={"Poster"}
            type="file"
            accept="image/*"
            name="poster"
            id="poster"
            onChange={handleProductPictures}
          />
        </Col>

        {editedImagePreview && (
          <Box className="mt-2">
            <div style={commonStyle.commonModalTitleStyle}>
              {`Image Preview`}
            </div>
            <img
              src={editedImagePreview}
              style={{
                width: "200px",
                height: "200px",
                marginTop: "4px",
              }}
            />
          </Box>
        )}

        {imagePreview && (
          <Box className="mt-2">
            <div style={commonStyle.commonModalTitleStyle}>
              {`Image Preview`}
            </div>
            <img
              src={imagePreview}
              style={{
                width: "200px",
                height: "200px",
                marginTop: "4px",
              }}
            />
          </Box>
        )}
      </Row>

      <Row style={{ marginBottom: "1rem" }}>
        <Col md={12}>
          <FMInput
            required
            customInputLabelStyle={{
              ...commonStyle.commonModalTitleStyle,
            }}
            readOnly={false}
            displayText={"Video"}
            type="file"
            accept="video/mp4, video/mov"
            onChange={handleFileChange}
          />
        </Col>
        <Col md={12}>
          {videoFilePreview && (
            <Box className="mt-2">
              <div style={commonStyle.commonModalTitleStyle}>
                {`Video Preview`}
              </div>
              <video
                src={videoFilePreview}
                width="100%"
                height="200"
                controls
                style={{ marginTop: "4px" }}
              >
                Your browser does not support the video tag.
              </video>
            </Box>
          )}

          {videoFilePrevious && (
            <Box className="mt-2">
              <div style={commonStyle.commonModalTitleStyle}>
                {`Video Preview`}
              </div>
              <video
                src={videoFilePrevious}
                width="100%"
                height="200"
                controls
                style={{ marginTop: "4px" }}
              >
                Your browser does not support the video tag.
              </video>
            </Box>
          )}
        </Col>
      </Row>

      <FMButton
        displayText="Update"
        variant="contained"
        disabled={false}
        styleData={{
          textTransform: "capitalize",
          marginTop: "2rem",
          "&:hover": {
            border: "none",
            textDecoration: "none",
          },
        }}
        onClick={handleSubmit(onSubmit)}
      />
    </ModalWrapper>
  );
};

export default EditVideo;
