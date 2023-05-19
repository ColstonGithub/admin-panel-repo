import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {Box, FormControl, Select } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import FMButton from "components/FMButton/FMButton";
import FMTypography from "components/FMTypography/FMTypography";
import FMInput from "components/FMInput/FMInput";
import { Col, Row } from "react-bootstrap";
import { notify } from "constants/utils";
import {
  addHomepageExploreCat,
  getHomePageExploreCat,
} from "redux/Slices/HomePage/HomepageExploreCategory";
import { addHomepageExploreCategorySchema } from "validationSchema/AddHomepageExploreCatSchema";
import ModalWrapper from "container/HomePage/Modal";
import { commonStyle } from "Styles/commonStyles";
import { getHomePageCategories } from "redux/Slices/HomePage/HomePageCategories";

const AddHomepageExploreCategoryComponent = (props) => {
  const { setOpen, open } = props;
  const [imagePreview, setImagePreview] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const dispatch = useDispatch();


  const handleClose = () => {
    setValue("imageTitle", "");
    setValue("imageAltText", "");
    setCategoryId("");
    setImgFile("");
  };
  const setCloseDialog = () => {
    setOpen(false);
    setValue("name", "");
    setValue("imageAltText", "");
    setCategoryId("");
    setImgFile("");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(addHomepageExploreCategorySchema),
    mode: "onChange",
  });

  const [imgFile, setImgFile] = React.useState([]);

  const handleFileInputChange = (e) => {
    setImgFile(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("imageTitle", data?.imageTitle?.toString());
    formData.append("imageAltText", data?.imageAltText?.toString());
    formData.append("categoryId", categoryId);
    formData.append("image", imgFile);

    dispatch(addHomepageExploreCat(formData)).then(() => {
      const usersListData = { page: 1 };
      dispatch(getHomePageExploreCat(usersListData));
      setOpen(false);
      setValue("name", "");
      setValue("imageAltText", "");
      setCategoryId("");
      setImgFile("");
    });
    notify({ type: "success", messgae: "Data Added Successfully" });
  };

  useEffect(() => {
    const usersListData = { page: 1 };
    dispatch(getHomePageCategories(usersListData));
  }, []);

  const productListingData = useSelector(
    (state) => state?.exploreCategories?.getCategoriesListData?.categoryList
  );
  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Add Homepage Explore Category"}
    >
      <Row style={{ marginBottom: "1rem" }}>
        <Col>
          <FMInput
            required
            readOnly={false}
            displayText="Image Title"
            id="imageTitle"
            name="imageTitle"
            register={register("imageTitle")}
            error={errors.imageTitle}
            errorDisplayText={errors.imageTitle?.message}
          />
        </Col>

        <Col>
          <FMTypography
            displayText={"Select Category"}
            styleData={{ color: "#a3a3a3", fontSize: "14px" }}
          />

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
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option></option>
              {productListingData?.map((option) => (
                <optgroup key={option._id} label={option.name}>
                  {option?.children.map((e) => (
                    <option value={e?._id}>{e.name}</option>
                  ))}
                </optgroup>
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
            onChange={handleFileInputChange}
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

export default AddHomepageExploreCategoryComponent;
