import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  Grid,
  Modal,
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import FMButton from "components/FMButton/FMButton";
import FMTypography from "components/FMTypography/FMTypography";
import FMInput from "components/FMInput/FMInput";
import crossIcon from "assets/crossIcon.svg";
import { Col, Container, Row } from "react-bootstrap";

import { addNewsPressBannerSchema } from "validationSchema/AddNewsPressProductSchema";

import {
  addNewNewsPressBanner,
  getNewsPressBanner,
} from "redux/Slices/NewsPress/NewsPressBanner";
import { addBrandPageBannerSchema } from "validationSchema/AddBrandPageBannerSchema";
import {
  addNewBrandPageBanner,
  getBrandPageBanner,
} from "redux/Slices/BrandPage/brandPageBanner";
import {
  addNewCategoryBanner,
  getCategoryBanners,
} from "redux/Slices/HomePage/CategoryBanner";
import { addCategoryBannerSchema } from "validationSchema/AddCategoryBannerSchema";
import { notify } from "constants/utils";

const AddCategoryBannerComponent = (props) => {
  const { setOpen, open, homepageCategoriess } = props;

  const [image, setImage] = useState([]);
  const [bannerImage, setBannerImage] = useState([]);
  const [productTypes, setProductTypes] = React.useState("");

  const handleChange = (event) => {
    setProductTypes(event.target.value);
  };

  const handleClose = () => {
    setValue("title", "");
    setValue("imageAltText", "");
    setValue("image", "");
    setValue("pdf", null);
  };
  const setCloseDialog = () => {
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
  } = useForm({
    resolver: yupResolver(addCategoryBannerSchema),
    mode: "onChange",
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data?.title?.toString());
    formData.append("buttonText", data?.buttonText?.toString());
    formData.append("bannerImageAltText", data?.bannerImageAltText?.toString());
    // formData.append(
    //   "bannerImageTextAltText",
    //   data?.bannerImageTextAltText?.toString()
    // );

    formData.append("bannerImage", image);
    //    formData.append("bannerImageText", bannerImage);
    formData.append("categoryId", productTypes?.toString());

    dispatch(addNewCategoryBanner(formData)).then(() => {
      const usersListData = { page: 1 };
      dispatch(getCategoryBanners(usersListData));
      setOpen(false);
      formData.append("title", "");
      formData.append("imageAltText", "");
      formData.append("image", "");
      formData.append("text", "");
    });
    notify({ type: "success", messgae: "Data Added Successfully" });
  };

  const handleBannerPictures = (e) => {
    setImage(e.target.files[0]);
  };
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
              displayText="Add Category Banner"
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
              <Row style={{marginTop:"32px"}}>
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
                  <input
                    type="file"
                    accept="image/*"
                    name="bannerImageText"
                    id="bannerImageText"
                    onChange={handleBannerImageTextPictures}
                  />
                </Col>
              </Row> */}

              <FMButton
                displayText="Add"
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

export default AddCategoryBannerComponent;
