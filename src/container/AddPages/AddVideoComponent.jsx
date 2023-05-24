import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import FMButton from "components/FMButton/FMButton";
import FMTypography from "components/FMTypography/FMTypography";
import FMInput from "components/FMInput/FMInput";
import { Col, Row } from "react-bootstrap";
import { addVideoSchema } from "validationSchema/AddVideoSchema";
import { addVideoData, getVideos } from "redux/Slices/videosSlices/Video";
import { notify } from "constants/utils";
import ModalWrapper from "container/HomePage/Modal";
import { commonStyle } from "Styles/commonStyles";

const AddVideoComponent = (props) => {
  const { setOpen, open } = props;
  const [poster, setPoster] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [videoFilePreview, setVideoFilePreview] = useState(null);

  const handleClose = () => {
    setOpen(false);
    setValue("metaData", "");
    setValue("title", "");
    setPoster("");
    setVideoFile("");
    setVideoFilePreview("");
    setImagePreview("");
  };
  const setCloseDialog = () => {
    setOpen(false);
    setValue("metaData", "");
    setValue("title", "");
    setPoster("");
    setVideoFile("");
    setVideoFilePreview("");
    setImagePreview("");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(addVideoSchema),
    mode: "onChange",
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data?.title?.toString());
    formData.append("metaData", data?.metaData?.toString());
    formData.append("poster", poster);
    formData.append("video", videoFile);

    dispatch(addVideoData(formData)).then(() => {
      const usersListData = { page: 1 };
      dispatch(getVideos(usersListData));
      setOpen(false);
      setValue("metaData", "");
      setValue("title", "");
      setPoster("");
      setVideoFile("");
      setVideoFilePreview("");
      setImagePreview("");
    });
    notify({ type: "success", messgae: "Data Added Successfully" });
  };

  const handleProductPictures = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setPoster(e.target.files[0]);
  };

  const handleFileChange = (event) => {
    setVideoFile(event.target.files[0]);
    setVideoFilePreview(URL.createObjectURL(event.target.files[0]));
    var media = URL.createObjectURL(event.target.files[0]);
    var video = document.getElementById("video");
    video.src = media;
    video.style.display = "block";
    video.play();
  };

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Add Video"}
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
          />
          {errors.metaData && (
            <FMTypography
              displayText={errors.metaData?.message}
              styleData={{ color: "red" }}
            />
          )}
        </Col>
      </Row>

      <Row style={{ marginBottom: "1rem" }}>
        <Col md={12}>
          <FMInput
            required
            customInputLabelStyle={{
              ...commonStyle.commonModalTitleStyle,
            }}
            readOnly={false}
            displayText={"Poster"}
            type="file"
            accept="image/*"
            name="categoryImage"
            id="categoryImage"
            onChange={handleProductPictures}
          />
        </Col>
        <Col md={12}>
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
        </Col>
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
                id="video"
                width="100%"
                height="200"
                controls
                style={{ display: "none", marginTop: "4px" }}
              ></video>
            </Box>
          )}
        </Col>
      </Row>
      <FMButton
        displayText="Submit"
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

export default AddVideoComponent;
