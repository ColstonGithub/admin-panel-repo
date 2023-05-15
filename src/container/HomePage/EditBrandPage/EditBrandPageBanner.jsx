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
  editBrandPageBannerDetail,
  getBrandPageBanner,
  getBrandPageBannerDetail,
} from "redux/Slices/BrandPage/brandPageBanner";
import { EditBrandBannerSchema } from "validationSchema/HomePage/EditBannerSchema";
import { getImagePreview, notify } from "constants/utils";

const EditBrandPageBanner = (props) => {
  const { setOpen, open, id, usersListData } = props;
  const dispatch = useDispatch();

  const [previewImage, setPreviewImage] = useState("");
  const [previewUrlImageText, setPreviewUrlImageText] = useState("");

  useEffect(() => {
    dispatch(getBrandPageBannerDetail(id));
  }, [id, dispatch]);

  const bannerDetailedData = useSelector(
    (state) => state?.brandPageBanner?.getBrandPageBannerData?.banner
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(EditBrandBannerSchema),
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      title: bannerDetailedData?.title,
      bannerImageAltText: bannerDetailedData?.bannerImageAltText,
      bannerImageTextAltText: bannerDetailedData?.bannerImageTextAltText,
      bannerImage: bannerDetailedData?.bannerImage,
      bannerImageText: bannerDetailedData?.bannerImageText,
    });
    setValue("bannerImage", bannerDetailedData?.bannerImage);
    setValue("bannerImageText", bannerDetailedData?.bannerImageText);
  }, [bannerDetailedData, reset]);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setValue("bannerImage", selectedImage);
    getImagePreview({ selectedImage, setPreviewImage });
  };

  const handleImageTextChange = (event) => {
    const selectedImage = event.target.files[0];
    setValue("bannerImageText", selectedImage);
    getImagePreview({ selectedImage, setPreviewImage: setPreviewUrlImageText });
  };

  const imageSrc = watch("bannerImage");
  const imageTextSrc = watch("bannerImageText");

  const handleClose = () => {
    setOpen(false);
    setValue("title", "");
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("_id", id);
    formData.append("title", data?.title);
    formData.append("bannerImageAltText", data?.bannerImageAltText);
    formData.append("bannerImageTextAltText", data?.bannerImageTextAltText);
    formData.append("bannerImage", data?.bannerImage);
    formData.append("bannerImageText", data?.bannerImageText);

    dispatch(editBrandPageBannerDetail(formData)).then(() => {
      dispatch(getBrandPageBanner(usersListData));
    });
    notify({ type: "success", messgae: "Data Edited Successfully" });

    setOpen(false);
    setValue("title", "");
    setValue("text", "");
    setValue("imageAltText", "");
    setValue("bannerImage", null);
  };

  return (
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
          transform: "translate(0, 30%)",
        }}
      >
        <Grid
          sx={{
            backgroundColor: "white",
            width: "36.5rem",
            padding: "2.125rem",
            borderRadius: "0.5rem",
            marginTop: "2rem",
            height: "auto",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <img
              src={crossIcon}
              alt="cross-icon"
              style={{ cursor: "pointer", width: "1rem" }}
              onClick={handleClose}
            />
          </Box>
          <FMTypography
            displayText="Brand Page Banner"
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
                <FMTypography
                  displayText={"Banner Image Alt Text"}
                  styleData={{ color: "#717171" }}
                />
                <TextField
                  placeholder="Text"
                  multiline
                  rows={2}
                  maxRows={4}
                  id="text"
                  {...register("bannerImageAltText")}
                  error={errors.bannerImageAltText ? true : false}
                />
                {errors.bannerImageAltText && (
                  <FMTypography
                    displayText={errors.bannerImageAltText?.message}
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
                  displayText="Banner Image Text Alt Text"
                  id="imageAltText"
                  name="imageAltText"
                  {...register("bannerImageTextAltText")}
                  error={errors.bannerImageTextAltText}
                  errorDisplayText={errors.bannerImageTextAltText?.message}
                />
                {errors.bannerImageTextAltText && (
                  <FMTypography
                    displayText={errors.bannerImageTextAltText?.message}
                    styleData={{ color: "red" }}
                  />
                )}
              </Col>
            </Row>
            <Row>
              <Col style={{ marginTop: "2rem" }}>
                {previewImage ? (
                  <img src={previewImage} alt="Selected Image" />
                ) : (
                  imageSrc && (
                    <img
                      src={imageSrc}
                      alt="Selected Image"
                      width="400px"
                      height="200px"
                    />
                  )
                )}
                <input
                  type="hidden"
                  {...register("bannerImage")}
                  value={register("bannerImage").value}
                />
                <input
                  type="file"
                  name="bannerImage"
                  accept="image/*"
                  id="bannerImage"
                  {...register("bannerImage")}
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById("bannerImage").click();
                  }}
                >
                  Select Image
                </button>
              </Col>
            </Row>
            <Row>
              <Col style={{ marginTop: "2rem" }}>
                {previewUrlImageText ? (
                  <img src={previewUrlImageText} alt="Selected Image" />
                ) : (
                  imageTextSrc && (
                    <img
                      src={imageTextSrc}
                      alt="Selected Image"
                      width="400px"
                      height="200px"
                    />
                  )
                )}
                <input
                  type="hidden"
                  {...register("bannerImageText")}
                  value={register("bannerImageText").value}
                />
                <input
                  type="file"
                  name="bannerImageText"
                  accept="image/*"
                  id="bannerImageText"
                  {...register("bannerImageText")}
                  onChange={handleImageTextChange}
                  style={{ display: "none" }}
                />
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById("bannerImageText").click();
                  }}
                >
                  Select Image
                </button>
              </Col>
            </Row>
            <FMButton
              displayText="Edit Banner"
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
  );
};

export default EditBrandPageBanner;
