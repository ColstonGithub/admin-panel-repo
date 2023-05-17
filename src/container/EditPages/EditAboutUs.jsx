import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Modal, Box, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import FMButton from "components/FMButton/FMButton";
import FMTypography from "components/FMTypography/FMTypography";
import FMInput from "components/FMInput/FMInput";
import crossIcon from "assets/crossIcon.svg";
import { Col, Container, Row } from "react-bootstrap";
import {
  editAboutUs,
  getAboutUsData,
  getAboutusById,
} from "redux/Slices/AboutUs/AboutUs";
import { addAboutUsSchema } from "validationSchema/AddAboutUsSchema";
import { notify } from "constants/utils";

const EditAboutUs = (props) => {
  const { setOpen, open, id } = props;

  const [image, setImage] = useState([]);
  const [bannerImage, setBannerImage] = useState("");

  const handleClose = () => {
    setOpen(false);
    setValue("title", "");
    setValue("imageAltText", "");
    setValue("image", "");
    setValue("pdf", null);
  };
  const setCloseDialog = () => {
    setOpen(false);
    setValue("text", "");
    setValue("title", "");
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAboutusById(id));
  }, [id, dispatch]);

  const aboutUsDetail = useSelector(
    (state) => state?.aboutUs?.getAboutUsData?.AboutUs
  );

  

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(addAboutUsSchema),
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      title: aboutUsDetail?.title,
      text: aboutUsDetail?.text,
      bannerImageAltText: aboutUsDetail?.bannerImageAltText,
      bannerImageTextAltText: aboutUsDetail?.bannerImageTextAltText,
      image: aboutUsDetail?.bannerImage,
    });
    setImage(aboutUsDetail?.bannerImage);
    setBannerImage(aboutUsDetail?.bannerImageText);
  }, [reset, aboutUsDetail]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("_id", id);
    formData.append("title", data?.title);
    formData.append("text", data?.text);
    formData.append("bannerImageTextAltText", data?.bannerImageTextAltText);
    formData.append("bannerImageAltText", data?.bannerImageAltText);
    if (image) formData.append("bannerImage", image);
    if (bannerImage) formData.append("bannerImageText", bannerImage);

    dispatch(editAboutUs(formData)).then(() => {
      const usersListData = { page: 1 };
      dispatch(getAboutUsData(usersListData));
      setOpen(false);
      notify({ type: "success", messgae: "Data Edited Successfully" });
      formData.append("title", "");
      formData.append("imageAltText", "");
      formData.append("image", "");
      formData.append("pdf", null);
    });
  };

  const handleBannerPictures = (e) => {
    setImage(e.target.files[0]);
    setBannerImage("");
  };
  // const handleBannerPdf = (e) => {
  //   setPdf(e.target.files[0]);
  //   setPdfPreview("");
  // };
  const handleBannerImageTextPictures = (e) => {
    setBannerImage(e.target.files[0]);
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
              displayText="Edit About Us"
              styleData={{
                fontWeight: "600",
                fontSize: "1.125rem",
                marginBottom: "1.5rem",
                fontFamily: "'Inter', sans-serif",
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
                  <FMTypography
                    displayText={"Text"}
                    styleData={{ color: "#717171" }}
                  />
                  <TextField
                    placeholder="Text"
                    multiline
                    rows={2}
                    maxRows={4}
                    id="text"
                    {...register("text")}
                    error={errors.text ? true : false}
                  />
                  {errors.text && (
                    <FMTypography
                      displayText={errors.text?.message}
                      styleData={{ color: "red" }}
                    />
                  )}
                </Col>
              </Row>
              <Row style={{ marginTop: "2rem" }}>
                <Col>
                  <FMInput
                    required
                    readOnly={false}
                    displayText=" Banner Image Alt Text"
                    id="bannerImageAltText"
                    name="bannerImageAltText"
                    register={register("bannerImageAltText")}
                    error={errors.bannerImageAltText}
                    errorDisplayText={errors.bannerImageAltText?.message}
                  />
                </Col>

                <Col>
                  <FMInput
                    required
                    readOnly={false}
                    displayText="Banner Image Text Alt Text"
                    id="bannerImageTextAltText"
                    name="bannerImageTextAltText"
                    register={register("bannerImageTextAltText")}
                    error={errors.bannerImageTextAltText}
                    errorDisplayText={errors.bannerImageTextAltText?.message}
                  />
                </Col>
              </Row>
              <Row>
                <Col style={{ marginTop: "2rem" }}>
                  <FMTypography
                    displayText={"Image: "}
                    styleData={{ color: "#A3A3A3" }}
                  />
                  {image && (
                    <div style={{ width: "auto" }}>
                      <img src={image} alt="img" width="150px" height="100px" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    name="banner"
                    id="banner"
                    onChange={handleBannerPictures}
                  />
                </Col>
              </Row>
              <Row>
                <Col style={{ marginTop: "2rem" }}>
                  <FMTypography
                    displayText={" Banner Image: "}
                    styleData={{ color: "#A3A3A3" }}
                  />
                  {bannerImage && (
                    <div style={{ width: "auto" }}>
                      <img
                        src={bannerImage}
                        alt="img"
                        width="150px"
                        height="100px"
                      />
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    name="bannerImageText"
                    id="bannerImageText"
                    onChange={handleBannerImageTextPictures}
                  />
                </Col>
              </Row>
              <FMButton
                displayText="Edit"
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

export default EditAboutUs;
