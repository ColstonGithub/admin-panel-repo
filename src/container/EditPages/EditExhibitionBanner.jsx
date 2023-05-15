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
  editExhibitionBanner,
  getExhibitionBanner,
  getExhibitionBannerDetail,
} from "redux/Slices/Exhibition/ExhibitionBanner";
import { editExhibitionBannerSchema } from "validationSchema/VirtualTourSchema";
import { notify } from "constants/utils";

const EditExhibitionBanner = (props) => {
  const { setOpen, open, id, usersListData } = props;
  const dispatch = useDispatch();
  console.log("ids", id);

  const [editedCategoryImage, setEditedCategoryImage] = useState("");
  const [image, setImage] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(editExhibitionBannerSchema),
    mode: "onChange",
  });

  useEffect(() => {
    dispatch(getExhibitionBannerDetail(id));
  }, [id, dispatch]);

  const exhibitionBannerDetail = useSelector(
    (state) => state?.exhibitionBanner?.getExhibtionBannerData?.banner
  );

  console.log("exhibitionBannerDetail", exhibitionBannerDetail);

  useEffect(() => {
    reset({
      title: exhibitionBannerDetail?.title,
      bannerImageAltText: exhibitionBannerDetail?.bannerImageAltText,
    });
    setEditedCategoryImage(exhibitionBannerDetail?.bannerImage);
  }, [exhibitionBannerDetail, reset]);
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
    if (image !== " ") {
      formData.append("bannerImage", image);
    }

    formData.append("_id", id);

    dispatch(editExhibitionBanner(formData)).then(() => {
      dispatch(getExhibitionBanner(usersListData));
      notify({ type: "success", messgae: "Data Edited Successfully" });
      setOpen(false);
      setValue("type", "");
      setValue("title", "");
      setValue("buttonText", "");
      setValue("image", "");
      setImage(" ");
    });
  };

  const handleBannerPictures = (e) => {
    setImage(e.target.files[0]);
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
              displayText="Edit Exhibition Banner"
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
                    displayText="Banner Image Alt Text"
                    id="bannerImageAltText"
                    name="bannerImageAltText"
                    register={register("bannerImageAltText")}
                    error={errors.bannerImageAltText}
                    errorDisplayText={errors.bannerImageAltText?.message}
                  />
                </Col>
              </Row>

              <Row>
                <Col style={{ marginTop: "2rem" }}>
                  <FMTypography
                    displayText={"Image: "}
                    styleData={{ color: "#A3A3A3" }}
                  />
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
                    accept="image/*"
                    name="bannerImage"
                    id="bannerImage"
                    onChange={handleBannerPictures}
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

export default EditExhibitionBanner;
