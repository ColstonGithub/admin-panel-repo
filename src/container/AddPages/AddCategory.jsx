import React, {  useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  FormControl,
  Select,
  TextField,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";

import FMButton from "components/FMButton/FMButton";
import FMTypography from "components/FMTypography/FMTypography";
import FMInput from "components/FMInput/FMInput";
import { Col, Row } from "react-bootstrap";
import { addBannerSchema } from "validationSchema/HomePage/AddBannerSchema";
import {
  addHomepageBanner,
  getHomePageCategories,
} from "redux/Slices/HomePage/HomePageCategories";
import { notify } from "constants/utils";
import { commonStyle } from "Styles/commonStyles";
import ModalWrapper from "container/HomePage/Modal";

const AddBanner = (props) => {
  const { setOpen, open, homepageCategoriess } = props;
  const [imagePreview, setImagePreview] = useState(null);
  const [productTypes, setProductTypes] = React.useState("");
  const [categoryImage, setCategoryImage] = useState("");

  const handleChange = (event) => {
    setProductTypes(event.target.value);
  };

  const productListingData = useSelector(
    (state) => state?.exploreCategories?.getCategoriesListData?.categoryList
  );

  const handleClose = () => {
    setOpen(false);
    setValue("type", "");
    setValue("title", "");
    setValue("buttonText", "");
    setValue("categoryImage", "");
    setCategoryImage("");
    setImagePreview("");
    setValue("imageAltText", "");
  };
  const setCloseDialog = () => {
    setOpen(false);
    setValue("type", "");
    setValue("title", "");
    setValue("buttonText", "");
    setValue("categoryImage", "");
    setCategoryImage("");
    setValue("imageAltText", "");
    setImagePreview("");
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(addBannerSchema),
    mode: "onChange",
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data?.title?.toString());
    formData.append("imageAltText", data?.imageAltText?.toString());
    formData.append("keyword", data?.type?.toString());
    formData.append("categoryImage", categoryImage);
    formData.append("parentId", productTypes?.toString());

    dispatch(addHomepageBanner(formData)).then(() => {
      const usersListData = { page: 1 };
      dispatch(getHomePageCategories(usersListData));

      setOpen(false);
      setValue("type", "");
      setValue("title", "");
      setValue("buttonText", "");
      setValue("categoryImage", "");
      setValue("imageAltText", "");
      setCategoryImage("");
      setImagePreview("");
    });
    notify({ type: "success", messgae: "Data Added Successfully" });
  };

  const handleProductPictures = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setCategoryImage(e.target.files[0]);
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
          {imagePreview && (
            <Box className="mt-4">
              <div style={commonStyle.commonModalTitleStyle}>{`Preview`} </div>
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
    </ModalWrapper>
  );
};

export default AddBanner;
