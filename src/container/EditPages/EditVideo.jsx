import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, Modal } from "@mui/material";
import FMTypography from "components/FMTypography/FMTypography";
import React, { useEffect, useState } from "react";
import crossIcon from "assets/crossIcon.svg";
import { useForm } from "react-hook-form";
import FMButton from "components/FMButton/FMButton";
import { Col, Container, Row } from "react-bootstrap";
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

const EditVideo = (props) => {
  const { setOpen, open, id, usersListData } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrandPageDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(virtualTourBannerDetail(id));
  }, [id, dispatch]);

  const [editedCategoryImage, setEditedCategoryImage] = useState("");
  const [categoryImage, setCategoryImage] = useState(" ");
  const [videoFile, setVideoFile] = useState(null);

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
    setEditedCategoryImage(videoDetail?.poster);
    setVideoFile(videoDetail?.video);
  }, [videoDetail, reset]);

  const handleClose = () => {
    setOpen(false);
    setValue("type", "");
    setValue("title", "");
    setValue("buttonText", "");
    setValue("categoryImage", "");
  };
  const setCloseDialog = () => {
    setOpen(false);
    setValue("type", "");
    setValue("title", "");
    setValue("buttonText", "");
    setValue("categoryImage", "");
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data?.title?.toString());

    formData.append("metaData", data?.metaData?.toString());
    if (categoryImage !== " ") {
      formData.append("poster", categoryImage);
    }

    if (videoFile !== " ") {
      formData.append("video", videoFile);
    }

    formData.append("_id", id);

    dispatch(editVideoDetails(formData)).then(() => {
      dispatch(getVideos(usersListData));
      notify({ type: "success", messgae: "Data Edited Successfully" });
      setOpen(false);
      setValue("type", "");
      setValue("title", "");
      setValue("buttonText", "");
      setValue("image", "");
      setCategoryImage(" ");
    });
  };

  const handleProductPictures = (e) => {
    setCategoryImage(e.target.files[0]);
    setEditedCategoryImage("");
  };

  const handleFileChange = (event) => {
    setVideoFile(event.target.files[0]);
  };

  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "#FFF",
        padding: "15px",
        zIndex: "1000",
        width: "35%",
        borderRadius: ".5em",
      }}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          position: "fixed",
          display: "flex",
          justifyContent: "center",
          top: "0",
          left: "0",
          width: "100%",
          height: "auto",
          backgroundColor: "rgba(0,0,0, .8)",
          zIndex: "1000",
          overflowY: "auto",
        }}
      >
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            border: "none",
          }}
        >
          <Grid
            sx={{
              backgroundColor: "white",
              width: "36.5rem",
              padding: "2.125rem",
              borderRadius: "0.5rem",
              //   marginTop: "2rem",
              // height: "43.75rem",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <img
                src={crossIcon}
                alt="cross-icon"
                style={{ cursor: "pointer", width: "1rem" }}
                onClick={setCloseDialog}
              />
            </Box>
            <FMTypography
              displayText="Update"
              styleData={{
                fontWeight: "600",
                fontSize: "1.125rem",
                marginBottom: "1.5rem",
                fontFamily: " 'Inter', sans-serif",
              }}
            />
            <Container>
              <Row>
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
                </Col>
              </Row>

              <Row style={{ marginTop: "2rem" }}>
                <FMTypography displayText={"Poster"} />
                <Col>
                  {editedCategoryImage && (
                    <div style={{ width: "auto" }}>
                      <img
                        src={editedCategoryImage}
                        alt="img"
                        width="150px"
                        height="100px"
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    name="categoryImage"
                    id="categoryImage"
                    onChange={handleProductPictures}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="mt-4">
                  <FMTypography
                    displayText={"Video: "}
                    styleData={{ color: "#A3A3A3" }}
                  />
                  {videoFile && (
                    <div style={{ width: "auto" }}>
                      <video
                        width="150"
                        height="auto"
                        controls
                        // style={{ marginLeft: "3rem" }}
                      >
                        <source src={videoFile} />
                      </video>
                    </div>
                  )}

                  <input type="file" onChange={handleFileChange} />
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
            </Container>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

export default EditVideo;
