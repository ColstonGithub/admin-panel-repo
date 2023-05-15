import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  Grid,
  Modal,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";

import FMButton from "components/FMButton/FMButton";
import FMTypography from "components/FMTypography/FMTypography";
import FMInput from "components/FMInput/FMInput";
import crossIcon from "assets/crossIcon.svg";
import { Col, Container, Row } from "react-bootstrap";
import { addBannerSchema } from "validationSchema/HomePage/AddBannerSchema";
import {
  addHomepageBanner,
  getHomePageCategories,
} from "redux/Slices/HomePage/HomePageCategories";
import { notify } from "constants/utils";

const AddBanner = (props) => {
  const { setOpen, open, homepageCategoriess } = props;

  const [productTypes, setProductTypes] = React.useState("");
  const [categoryImage, setCategoryImage] = useState("");

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
            <Row style={{ marginTop: "2rem" }}>
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
              displayText="Add Banner"
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

export default AddBanner;
