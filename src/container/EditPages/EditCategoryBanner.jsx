import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Modal, Box, FormControl, Select, MenuItem } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import FMButton from "components/FMButton/FMButton";
import FMTypography from "components/FMTypography/FMTypography";
import FMInput from "components/FMInput/FMInput";
import crossIcon from "assets/crossIcon.svg";
import { Col, Container, Row } from "react-bootstrap";
import {
  editCategoryBanner,
  getCategoryBanners,
} from "redux/Slices/HomePage/CategoryBanner";
import { addCategoryBannerSchema } from "validationSchema/AddCategoryBannerSchema";
import { getCategoryBannerDetail } from "redux/Slices/HomePage/CategoryBanner";
import { notify } from "constants/utils";

const EditCategoryBanner = (props) => {
  const { setOpen, open, id } = props;

  const [bannerImage, setBannerImage] = useState("");
  const [image, setImage] = useState([]);

  const [bannerTextImage, setBannerTextImage] = useState("");
  const [imageText, setImageText] = useState([]);

  const [productTypes, setProductTypes] = React.useState("");

  const handleChange = (event) => {
    setProductTypes(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
    setValue("title", "");
    setValue("imageAltText", "");
    setValue("image", "");
    setValue("pdf", null);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(addCategoryBannerSchema),
    mode: "onChange",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryBannerDetail(id));
  }, [id, dispatch]);

  const getCategoryBannerDetails = useSelector(
    (state) => state?.categoryBanner?.getCategoryBannerData?.banner
  );

  const homepageCategoriess = useSelector(
    (state) => state?.exploreCategories?.getCategoriesListData?.categoryList
  );

  useEffect(() => {
    reset({
      title: getCategoryBannerDetails?.title,
      buttonText: getCategoryBannerDetails?.buttonText,
      bannerImageAltText: getCategoryBannerDetails?.bannerImageAltText,
      bannerImageTextAltText: getCategoryBannerDetails?.bannerImageTextAltText,
    });
    setBannerImage(getCategoryBannerDetails?.bannerImage);
    setBannerTextImage(getCategoryBannerDetails?.bannerImageText);
    setProductTypes(getCategoryBannerDetails?.categoryId);
  }, [getCategoryBannerDetails, reset]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("_id", id);
    formData.append("title", data?.title?.toString());
    formData.append("buttonText", data?.buttonText?.toString());
    formData.append("bannerImageAltText", data?.bannerImageAltText?.toString());
    // formData.append(
    //   "bannerImageTextAltText",
    //   data?.bannerImageTextAltText?.toString()
    // );
    if (image) formData.append("bannerImage", image);
    //  if (imageText) formData.append("bannerImageText", imageText);
    formData.append("categoryId", productTypes?.toString());

    dispatch(editCategoryBanner(formData)).then(() => {
      const usersListData = { page: 1 };
      dispatch(getCategoryBanners(usersListData));
      notify({ type: "success", messgae: "Data Edited Successfully" });
      setOpen(false);
      formData.append("title", "");
      formData.append("imageAltText", "");
      formData.append("image", "");
      formData.append("text", "");
    });
  };

  const handleBannerPictures = (e) => {
    setImage(e.target.files[0]);
    setBannerImage("");
  };

  const handleBannerTextPictures = (e) => {
    setImageText(e.target.files[0]);
    setBannerTextImage("");
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
                onClick={handleClose}
              />
            </Box>
            <FMTypography
              displayText="Edit Category Banner"
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
                  <FMTypography displayText={"Select Category"} />
                  <FormControl fullWidth sx={{ minWidth: "13rem" }}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={productTypes}
                      onChange={handleChange}
                      placeholder="type"
                      name="type"
                      error={errors.type}
                      errorDisplayText={errors.type?.message}
                      sx={{
                        height: "2.5rem",
                        marginTop: ".3rem",
                        border: "0.0625rem solid #1a1a1a1f",
                        "&:hover": { border: "0.0625rem solid #1a1a1a1f" },
                        "& .MuiSelect-root": {
                          border: "0.0625rem solid #1a1a1a1f",
                        },
                      }}
                    >
                      {homepageCategoriess?.map((elem) => (
                        <MenuItem value={elem?._id}>{elem?.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Col>
              </Row>
              {/* <Row>
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
              </Row> */}
              <Row style={{ marginTopop: "32px" }}>
                <Col>
                  <FMInput
                    required
                    readOnly={false}
                    displayText="Button Text"
                    id="buttonText"
                    name="buttonText"
                    register={register("buttonText")}
                    error={errors.buttonText}
                    errorDisplayText={errors.buttonText?.message}
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
                  {bannerImage && (
                    <div style={{ width: "auto", marginBottom: "10px" }}>
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
              {/* <Row>
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
              </Row> */}

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

export default EditCategoryBanner;
