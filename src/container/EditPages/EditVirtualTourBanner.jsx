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
import { notify } from "constants/utils";

const EditVirtualTourBanner = (props) => {
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
    getValues,
  } = useForm({
    resolver: yupResolver(editVirtualTourSchema),
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      title: getVirtualTourDetails?.title,
      bannerImageAltText: getVirtualTourDetails?.bannerImageAltText,
    });
    setEditedCategoryImage(getVirtualTourDetails?.bannerImage);
  }, [getVirtualTourDetails, reset]);

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
    formData.append("bannerImageAltText", data?.bannerImageAltText?.toString());
    if (categoryImage !== " ") {
      formData.append("bannerImage", categoryImage);
    }

    formData.append("_id", id);

    dispatch(editVirtualTourBanner(formData)).then(() => {
      dispatch(getVirtualTourBanner(usersListData));
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
            transform: "translate(0, 30%)",
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
              displayText="Edit Virtual Tour Banner"
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
                    displayText="Image Alt Text"
                    id="bannerImageAltText"
                    name="bannerImageAltText"
                    register={register("bannerImageAltText")}
                    error={errors.bannerImageAltText}
                    errorDisplayText={errors.bannerImageAltText?.message}
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: "2rem" }}>
                <Col style={{ marginTop: "2rem" }}>
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

export default EditVirtualTourBanner;
