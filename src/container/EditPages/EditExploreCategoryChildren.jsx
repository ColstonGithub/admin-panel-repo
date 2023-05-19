import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Box, FormControl, Select, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { Col, Row } from "react-bootstrap";
import { addBannerSchema } from "validationSchema/HomePage/AddBannerSchema";
import {
  editHomepageCategory,
  getCategoriesDetail,
} from "redux/Slices/HomePage/HomePageCategories";
import { getExploreCategoryChildren } from "redux/Slices/ExploreCategoryChildren/ExploreCategoryChildren";
import { notify } from "constants/utils";
import { commonStyle } from "Styles/commonStyles";
import ModalWrapper from "container/HomePage/Modal";
import FMButton from "components/FMButton/FMButton";
import FMTypography from "components/FMTypography/FMTypography";
import FMInput from "components/FMInput/FMInput";
const EditHomePageCategoryChildren = (props) => {
  const { setOpen, open, id, childId, usersListData } = props;
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const [productTypes, setProductTypes] = React.useState("");
  const [categoryImage, setCategoryImage] = useState(" ");
  const [editedCategoryImage, setEditedCategoryImage] = useState("");

  useEffect(() => {
    dispatch(getCategoriesDetail(id));
  }, [dispatch, id]);

  const homepageCategories = useSelector(
    (state) => state?.exploreCategories?.getProductsListData?.category
  );
  const productListingData = useSelector(
    (state) => state?.exploreCategories?.getCategoriesListData?.categoryList
  );

  const handleClose = () => {
    setOpen(false);
    setValue("type", "");
    setValue("title", "");
    setValue("buttonText", "");
    setValue("categoryImage", "");
    setCategoryImage(" ");
  };
  const setCloseDialog = () => {
    setOpen(false);
    setValue("type", "");
    setValue("title", "");
    setValue("buttonText", "");
    setValue("categoryImage", "");
    setCategoryImage(" ");
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(addBannerSchema),
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      title: homepageCategories?.name,
      type: homepageCategories?.keyword,
      imageAltText: homepageCategories?.imageAltText,
    });
    setEditedCategoryImage(homepageCategories?.categoryImage);
  }, [homepageCategories, reset]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data?.title?.toString());
    formData.append("keyword", data?.type?.toString());
    formData.append("imageAltText", data?.imageAltText?.toString());
    if (categoryImage !== " ") {
      formData.append("categoryImage", categoryImage);
    }

    // : formData.append("categoryImage", editedCategoryImage);

    if (productTypes != "") {
      formData.append("parentId", productTypes?.toString());
    }
    formData.append("_id", id);

    dispatch(editHomepageCategory(formData)).then(() => {
      dispatch(getExploreCategoryChildren(childId));
      notify({ type: "success", messgae: "Data Edited Successfully" });

      setOpen(false);
      setValue("type", "");
      setValue("title", "");
      setValue("buttonText", "");
      setValue("categoryImage", "");
      setCategoryImage("");
      setImagePreview("");
    });
  };

  const handleProductPictures = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setCategoryImage(e.target.files[0]);
    setEditedCategoryImage("");
  };

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Edit Category"}
    >
      <Row style={{ marginTop: "1rem" }}>
        <Col md={6}>
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
        <Col md={6}>
          <FMTypography displayText={"Select Category"} />
          <FormControl fullWidth sx={{ minWidth: "13rem" }}>
            <Select
              sx={{
                height: "2.5rem",
                marginTop: ".3rem",
                border: "0.0625rem solid #1a1a1a1f",
                "&:hover": { border: "0.0625rem solid #1a1a1a1f" },
                "& .MuiSelect-root": {
                  border: "0.0625rem solid #1a1a1a1f",
                },
              }}
              native
              defaultValue=""
              id="grouped-native-select"
              value={productTypes}
              onChange={(e) => setProductTypes(e.target.value)}
            >
              <option></option>
              {productListingData?.map((option) => (
                <>
                  <option value={option?._id}>{option.name}</option>
                  {option?.children.map((e) => (
                    <option value={e?._id}>{e.name}</option>
                  ))}
                </>
              ))}
            </Select>
          </FormControl>
        </Col>
      </Row>
      <Row style={{ marginTop: "1rem", padding: " 0.75rem" }}>
        <FMTypography
          displayText={"Keyword"}
          styleData={{
            ...commonStyle.commonModalTitleStyle,
            marginLeft: "-11px",
            opacity: "0.9",
            marginBottom: "4px",
          }}
        />
        <TextField
          required
          multiline
          rows={3}
          id="type"
          name="type"
          {...register("type")}
        />
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
            name="categoryImage"
            id="categoryImage"
            onChange={handleProductPictures}
          />
        </Col>
        <Col md={6}>
          {" "}
          <FMInput
            required
            readOnly={false}
            displayText="Image Alt Text"
            id="imageAltText"
            name="imageAltText"
            register={register("imageAltText")}
            error={errors.imageAltText}
            errorDisplayText={errors.imageAltText?.message}
          />
        </Col>
        <Col>
          {editedCategoryImage
            ? editedCategoryImage && (
                <Box className="mt-3">
                  <div style={commonStyle.commonModalTitleStyle}>
                    {`Preview`}
                  </div>
                  <img
                    src={editedCategoryImage}
                    alt="img"
                    width="100%"
                    height="100px"
                    style={{ marginTop: "4px" }}
                  />
                </Box>
              )
            : imagePreview && (
                <Box className="mt-3">
                  <div style={commonStyle.commonModalTitleStyle}>
                    {`Preview`}{" "}
                  </div>
                  <img
                    src={imagePreview}
                    style={{
                      width: "100%",
                      height: "100px",
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

export default EditHomePageCategoryChildren;
