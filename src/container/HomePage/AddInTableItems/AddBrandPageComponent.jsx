import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Grid, Modal, Box, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import FMButton from "components/FMButton/FMButton";
import FMTypography from "components/FMTypography/FMTypography";
import FMInput from "components/FMInput/FMInput";
import crossIcon from "assets/crossIcon.svg";
import { Col, Container, Row } from "react-bootstrap";
import { addBrandPageSchema } from "validationSchema/HomePage/AddBannerSchema";
import { addBrandPage, getBrandPage } from "redux/Slices/BrandPage/BrandPage";
import { notify } from "constants/utils";

const AddBrandPageComponent = (props) => {
  const { setOpen, open } = props;

  const [productTypes, setProductTypes] = React.useState("");
  const [categoryImage, setCategoryImage] = useState("");

  const handleChange = (event) => {
    setProductTypes(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
    setValue("text", "");
    setValue("title", "");
    setCategoryImage(" ");
  };
  const setCloseDialog = () => {
    setOpen(false);
    setValue("text", "");
    setValue("title", "");
    setCategoryImage(" ");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(addBrandPageSchema),
    mode: "onChange",
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data?.title?.toString());
    formData.append("text", data?.text?.toString());
    formData.append("imageAltText", data?.imageAltText?.toString());
    formData.append("image", categoryImage);

    dispatch(addBrandPage(formData)).then(() => {
      const usersListData = { page: 1 };
      dispatch(getBrandPage(usersListData));
      setOpen(false);
      setValue("title", "");
      setValue("text", "");
      setCategoryImage(" ");
    });
    notify({ type: "success", messgae: "Data Added Successfully" });
  };

  const handleProductPictures = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  return (
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
            displayText="Brand Page"
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
                <input
                  type="file"
                  name="categoryImage"
                  id="categoryImage"
                  onChange={handleProductPictures}
                />
              </Col>
            </Row>
            <FMButton
              displayText="Add Brand Page"
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
  );
};

export default AddBrandPageComponent;
