import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Box, FormControl, Select, MenuItem } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import FMButton from "components/FMButton/FMButton";
import FMTypography from "components/FMTypography/FMTypography";
import FMInput from "components/FMInput/FMInput";
import { Col, Row } from "react-bootstrap";
import {
  editCategoryBanner,
  getCategoryBanners,
} from "redux/Slices/HomePage/CategoryBanner";
import { addCategoryBannerSchema } from "validationSchema/AddCategoryBannerSchema";
import { getCategoryBannerDetail } from "redux/Slices/HomePage/CategoryBanner";
import { notify } from "constants/utils";
import ModalWrapper from "container/HomePage/Modal";
import { commonStyle } from "Styles/commonStyles";

const EditCategoryBanner = (props) => {
  const { setOpen, open, id } = props;
  const [imagePreview, setImagePreview] = useState(null);
  const [bannerImage, setBannerImage] = useState("");
  const [image, setImage] = useState([]);
  const [productTypes, setProductTypes] = React.useState("");

  const handleChange = (event) => {
    setProductTypes(event.target.value);
  };

  const handleClose = () => {
    setValue("title", "");
    setValue("imageAltText", "");
    setImage("");
    setImagePreview("");
  };
  const setCloseDialog = () => {
    setOpen(false);
    setValue("title", "");
    setValue("imageAltText", "");
    setImage("");
    setImagePreview("");
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
    });
    setBannerImage(getCategoryBannerDetails?.bannerImage);
    setProductTypes(getCategoryBannerDetails?.categoryId);
  }, [getCategoryBannerDetails, reset]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("_id", id);
    formData.append("title", data?.title?.toString());
    formData.append("bannerImageAltText", data?.bannerImageAltText?.toString());
    if (image) formData.append("bannerImage", image);
    formData.append("categoryId", productTypes?.toString());

    dispatch(editCategoryBanner(formData)).then(() => {
      const usersListData = { page: 1 };
      dispatch(getCategoryBanners(usersListData));
      notify({ type: "success", messgae: "Data Edited Successfully" });
      setOpen(false);
    });
  };

  const handleBannerPictures = (e) => {
    setImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setBannerImage("");
  };

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Edit Category Banner"}
    >
      <Row style={{ marginTopop: "1rem" }}>
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

      <Row style={{ marginTop: "1rem" }}>
        <Col md={6}>
          <FMInput
            required
            customInputLabelStyle={{
              ...commonStyle.commonModalTitleStyle,
            }}
            readOnly={false}
            displayText={"Image"}
            type="file"
            accept="image/*"
            name="banner"
            id="banner"
            onChange={handleBannerPictures}
          />
        </Col>
        <Col md={6}>
          {" "}
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
          {bannerImage && (
            <Box className="mt-3">
              <div style={commonStyle.commonModalTitleStyle}>
                {`Image Preview`}{" "}
              </div>
              <img
                src={bannerImage}
                style={{
                  width: "200px",
                  height: "200px",
                  marginTop: "4px",
                }}
              />
            </Box>
          )}
          {imagePreview && (
            <Box className="mt-3">
              <div style={commonStyle.commonModalTitleStyle}>
                {`Image Preview`}{" "}
              </div>
              <img
                src={imagePreview}
                style={{
                  width: "200px",
                  height: "200px",
                  marginTop: "4px",
                }}
              />
            </Box>
          )}
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
    </ModalWrapper>
  );
};

export default EditCategoryBanner;
