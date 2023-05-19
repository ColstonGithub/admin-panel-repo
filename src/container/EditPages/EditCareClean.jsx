import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, Modal, TextField } from "@mui/material";
import FMTypography from "components/FMTypography/FMTypography";
import React, { useEffect, useState } from "react";
import crossIcon from "assets/crossIcon.svg";
import { useForm } from "react-hook-form";
import FMButton from "components/FMButton/FMButton";
import { Col, Container, Row } from "react-bootstrap";
import FMInput from "components/FMInput/FMInput";
import { useDispatch, useSelector } from "react-redux";
import {
  editBrandPage,
  getBrandPage,
  getBrandPageDetail,
} from "redux/Slices/BrandPage/BrandPage";
import { addBrandPageSchema } from "validationSchema/HomePage/AddBannerSchema";
import {
  editVirtualTourBanner,
  getVirtualTourBanner,
  virtualTourBannerDetail,
} from "redux/Slices/VirtuaTour/VirtualTour";
import { editVirtualTourSchema } from "validationSchema/VirtualTourSchema";
import {
  editCareAndClean,
  getCareClean,
  getCareCleanDetail,
} from "redux/Slices/CareClean/CareClean";
import { editCareCleanSchema } from "validationSchema/AddCareCleanSchema";
import { notify } from "constants/utils";

const EditCareClean = (props) => {
  const { setOpen, open, id, usersListData } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrandPageDetail(id));
  }, [dispatch, id]);

  const brandPageDetailedData = useSelector(
    (state) => state?.brandPage?.getBrandPageData?.brandproduct
  );

  useEffect(() => {
    dispatch(virtualTourBannerDetail(id));
  }, [id, dispatch]);

  const getVirtualTourDetails = useSelector(
    (state) => state?.virtualTourBanner?.getVirtualTourData?.banner
  );

  const [editedCategoryImage, setEditedCategoryImage] = useState("");
  const [categoryImage, setCategoryImage] = useState(" ");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(editCareCleanSchema),
    mode: "onChange",
  });

  useEffect(() => {
    dispatch(getCareCleanDetail(id));
  }, [id, dispatch]);

  const getCareCleanDetails = useSelector(
    (state) => state?.careClean?.getCareCleanData?.CareClean
  );

  useEffect(() => {
    reset({
      title: getCareCleanDetails?.title,
      text: getCareCleanDetails?.text,
      heading: getCareCleanDetails?.heading,
      bannerImageAltText: getCareCleanDetails?.bannerImageAltText,
    });
    setEditedCategoryImage(getCareCleanDetails?.bannerImage);
  }, [getCareCleanDetails, reset]);

  const handleClose = () => {
    setOpen(false);
    setValue("type", "");
    setValue("title", "");
    setValue("buttonText", "");
    setValue("categoryImage", "");
    // setCategoryImage(" ");
  };
  const setCloseDialog = () => {
    setOpen(false);
    setValue("type", "");
    setValue("title", "");
    setValue("buttonText", "");
    setValue("categoryImage", "");
    // setCategoryImage(" ");
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data?.title?.toString());
    formData.append("text", data?.text?.toString());
    formData.append("heading", data?.heading?.toString());
    formData.append("bannerImageAltText", data?.bannerImageAltText?.toString());
    if (categoryImage !== " ") {
      formData.append("image", categoryImage);
    }

    formData.append("_id", id);

    dispatch(editCareAndClean(formData)).then(() => {
      dispatch(getCareClean(usersListData));
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
              <Row>
                <Col>
                  <FMInput
                    required
                    readOnly={false}
                    displayText="Image Alt Text"
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
                    displayText="Heading"
                    id="heading"
                    name="heading"
                    register={register("heading")}
                    error={errors.heading}
                    errorDisplayText={errors.heading?.message}
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: "1rem" }}>
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

export default EditCareClean;
