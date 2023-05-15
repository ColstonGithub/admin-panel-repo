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
import { addBannerSchema } from "validationSchema/HomePage/AddBannerSchema";
import {
  editHomepageCategory,
  getCategoriesDetail,
  getHomePageCategories,
} from "redux/Slices/HomePage/HomePageCategories";
import { notify } from "constants/utils";

const EditHomePageCategory = (props) => {
  const { setOpen, open, id, usersListData } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoriesDetail(id));
  }, [dispatch, id]);

  const homepageCategories = useSelector(
    (state) => state?.exploreCategories?.getProductsListData?.category
  );

  const [productTypes, setProductTypes] = React.useState("");
  const [categoryImage, setCategoryImage] = useState(" ");
  //   edit
  const [editedCategoryImage, setEditedCategoryImage] = useState("");

  const homepageCategoriess = useSelector(
    (state) => state?.exploreCategories?.getCategoriesListData?.categoryList
  );

  const handleChange = (event) => {
    setProductTypes(event.target.value);
  };

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
    // setProductTypes(homepageCategories?.)
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

    formData.append("parentId", productTypes?.toString());
    formData.append("_id", id);

    dispatch(editHomepageCategory(formData)).then(() => {
      dispatch(getHomePageCategories(usersListData));
      notify({ type: "success", messgae: "Data Edited Successfully" });

      setOpen(false);
      setValue("type", "");
      setValue("title", "");
      setValue("buttonText", "");
      setValue("categoryImage", "");
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
              displayText="Banner"
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
                    displayText="Keyword"
                    id="type"
                    name="type"
                    register={register("type")}
                    error={errors.type}
                    errorDisplayText={errors.type?.message}
                  />
                </Col>
                <Col>
                  <FMTypography displayText={"Type"} />
                  <FormControl fullWidth sx={{ minWidth: "13rem" }}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={productTypes}
                      // label="productTypes"
                      onChange={handleChange}
                      placeholder="type"
                      name="type"
                      // register={register("type")}
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
              <Row className="mt-2">
                <Col>
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
                <Col></Col>
              </Row>
              <Row style={{ marginTop: "2rem" }}>
                {editedCategoryImage && (
                  <div style={{ width: "auto" }}>
                    <img
                      src={editedCategoryImage}
                      alt="img"
                      width="100%"
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
              </Row>
              <FMButton
                displayText="Edit Category"
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

export default EditHomePageCategory;
