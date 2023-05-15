import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Modal, Box } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import FMButton from "components/FMButton/FMButton";
import FMTypography from "components/FMTypography/FMTypography";
import FMInput from "components/FMInput/FMInput";
import crossIcon from "assets/crossIcon.svg";
import { Col, Container, Row } from "react-bootstrap";

import { addNewsPressBannerSchema } from "validationSchema/AddNewsPressProductSchema";
import {
  editNewsPressBanner,
  getNewsPressBanner,
  newsPressBannerDetail,
} from "redux/Slices/NewsPress/NewsPressBanner";
import { notify } from "constants/utils";

const EditNewsPressBanner = (props) => {
  const dispatch = useDispatch();

  const { setOpen, open, id } = props;

  const [bannerImage, setBannerImage] = useState("");
  const [image, setImage] = useState([]);

  const [bannerTextImage, setBannerTextImage] = useState("");
  const [imageText, setImageText] = useState([]);

  const handleClose = () => {
    setOpen(false);
    setValue("title", "");
    setValue("bannerImageAltText", "");
    setValue("bannerImage", "");
  };

  useEffect(() => {
    dispatch(newsPressBannerDetail(id));
  }, [id, dispatch]);

  const getNewsPressBannerDetails = useSelector(
    (state) => state?.newsPressBanner?.getNewsPressBannerData?.banner
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(addNewsPressBannerSchema),
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      title: getNewsPressBannerDetails?.title,
      bannerImageAltText: getNewsPressBannerDetails?.bannerImageAltText,
      bannerImageTextAltText: getNewsPressBannerDetails?.bannerImageTextAltText,
    });
    setBannerImage(getNewsPressBannerDetails?.bannerImage);
    setBannerTextImage(getNewsPressBannerDetails?.bannerImageText);
  }, [getNewsPressBannerDetails, reset]);

  const handleBannerPictures = (e) => {
    setImage(e.target.files[0]);
    setBannerImage("");
  };

  const handleBannerTextPictures = (e) => {
    setImageText(e.target.files[0]);
    setBannerTextImage("");
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("_id", id);
    formData.append("title", data?.title);
    formData.append("bannerImageAltText", data?.bannerImageAltText);
    formData.append("bannerImageTextAltText", data?.bannerImageTextAltText);
    if (image) formData.append("bannerImage", image);
    if (imageText) formData.append("bannerImageText", imageText);

    dispatch(editNewsPressBanner(formData)).then(() => {
      const usersListData = { page: 1 };
      dispatch(getNewsPressBanner(usersListData));
      setOpen(false);
      notify({ type: "success", messgae: "Data Edited Successfully" });
      formData.append("title", "");
      formData.append("bannerImageAltText", "");
      formData.append("bannerImage", "");
    });
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
            height: "800px",
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
                onClick={handleClose}
              />
            </Box>
            <FMTypography
              displayText="Edit News Press Banner"
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
                  {bannerTextImage && (
                    <div style={{ width: "auto" }}>
                      <img
                        src={bannerTextImage}
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
                    onChange={handleBannerTextPictures}
                  />
                </Col>
              </Row>

              <FMButton
                displayText="Edit Brand Page"
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

export default EditNewsPressBanner;
