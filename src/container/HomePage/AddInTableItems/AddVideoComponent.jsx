import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Grid, Modal, Box, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import FMButton from "components/FMButton/FMButton";
import FMTypography from "components/FMTypography/FMTypography";
import FMInput from "components/FMInput/FMInput";
import crossIcon from "assets/crossIcon.svg";
import { Col, Container, Row } from "react-bootstrap";
import { addCareCleanSchema } from "validationSchema/AddCareCleanSchema";
import { addCareClean, getCareClean } from "redux/Slices/CareClean/CareClean";
import { addVideoSchema } from "validationSchema/AddVideoSchema";
import { addVideoData, getVideos } from "redux/Slices/videosSlices/Video";
import { notify } from "constants/utils";

const AddVideoComponent = (props) => {
  const { setOpen, open } = props;

  const [productTypes, setProductTypes] = React.useState("");
  const [poster, setPoster] = useState("");
  const [videoFile, setVideoFile] = useState(null);

  const handleChange = (event) => {
    setProductTypes(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
    setValue("text", "");
    setValue("title", "");
    setPoster(" ");
  };
  const setCloseDialog = () => {
    setOpen(false);
    setValue("text", "");
    setValue("title", "");
    setPoster(" ");
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
      formData.append("title", "");
      formData.append("metaData", "");
      formData.append("poster", "");
      formData.append("video", null);
    });
    notify({ type: "success", messgae: "Data Added Successfully" });
  };

  const handleProductPictures = (e) => {
    setPoster(e.target.files[0]);
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
          height: "100%",
          backgroundColor: "rgba(0,0,0, .8)",
          zIndex: "1000",
          overflowY: "auto",
        }}
      >
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid
            sx={{
              backgroundColor: "white",
              width: "36.5rem",
              padding: "2.125rem",
              borderRadius: "0.5rem",
              marginTop: "2rem",
              // height: "43.75rem",
              height: "auto",
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
              displayText="Add Video"
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
                  {errors.metaData && (
                    <FMTypography
                      displayText={errors.metaData?.message}
                      styleData={{ color: "red" }}
                    />
                  )}
                </Col>
              </Row>

              <Row>
                <Col style={{ marginTop: "2rem" }}>
                  <FMTypography
                    displayText={"Poster: "}
                    styleData={{ color: "#A3A3A3" }}
                  />
                  <input
                    type="file"
                    name="categoryImage"
                    id="categoryImage"
                    onChange={handleProductPictures}
                  />
                </Col>
              </Row>

              <Row className="mt-5">
                <Col>
                  <FMTypography
                    displayText={"Video: "}
                    styleData={{ color: "#A3A3A3" }}
                  />
                  <input type="file" onChange={handleFileChange} />
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
            </Container>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

export default AddVideoComponent;
