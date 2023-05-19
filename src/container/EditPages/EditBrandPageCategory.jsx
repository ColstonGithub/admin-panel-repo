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
import { notify } from "constants/utils";
import { commonStyle } from "Styles/commonStyles";

const EditBrandPageCategory = (props) => {
  const { setOpen, open, id, usersListData } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrandPageDetail(id));
  }, [dispatch, id]);

  const brandPageDetailedData = useSelector(
    (state) => state?.brandPage?.getBrandPageData?.brandproduct
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
    resolver: yupResolver(addBrandPageSchema),
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      title: brandPageDetailedData?.title,
      text: brandPageDetailedData?.text,
      imageAltText: brandPageDetailedData?.imageAltText,
    });
    setEditedCategoryImage(brandPageDetailedData?.image);
  }, [brandPageDetailedData, reset]);

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
    formData.append("text", data?.text?.toString());
    formData.append("imageAltText", data?.imageAltText?.toString());
    // if (categoryImage !== " ") {
    formData.append("image", categoryImage);
    // }

    formData.append("_id", id);

    dispatch(editBrandPage(formData)).then(() => {
      dispatch(getBrandPage(usersListData));
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
                  <FMTypography
                    displayText={"Text"}
                    styleData={{ color: "#717171" }}
                  />
                  <TextField
                    placeholder="Text"
                    multiline
                    rows={2}
                    maxRows={4}
                    id="text"
                    {...register("text")}
                    error={errors.text ? true : false}
                  />
                  {errors.text && (
                    <FMTypography
                      displayText={errors.text?.message}
                      styleData={{ color: "red" }}
                    />
                  )}
                </Col>
              </Row>
              <Row style={{ marginTop: "2rem" }}>
                <Col>
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
              </Row>
              <FMButton
                displayText=" Edit Brand Page"
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

export default EditBrandPageCategory;
