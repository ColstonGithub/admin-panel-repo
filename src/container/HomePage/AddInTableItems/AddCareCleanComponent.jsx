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
import { addCareCleanSchema } from "validationSchema/AddCareCleanSchema";
import { addCareClean, getCareClean } from "redux/Slices/CareClean/CareClean";
import { notify } from "constants/utils";

const AddCareCleanComponent = (props) => {
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
    resolver: yupResolver(addCareCleanSchema),
    mode: "onChange",
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data?.title?.toString());
    formData.append("text", data?.text?.toString());
    formData.append("heading", data?.heading?.toString());
    formData.append("bannerImageAltText", data?.bannerImageAltText?.toString());
    formData.append("image", categoryImage);

    dispatch(addCareClean(formData)).then(() => {
      const usersListData = { page: 1 };
      dispatch(getCareClean(usersListData));
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
                onClick={setCloseDialog}
              />
            </Box>
            <FMTypography
              displayText="Add Care & Clean"
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
                    id="bannerImageAltText"
                    name="bannerImageAltText"
                    register={register("bannerImageAltText")}
                    error={errors.bannerImageAltText}
                    errorDisplayText={errors.bannerImageAltText?.message}
                  />
                </Col>

                <Col>
                  <FMInput
                    required
                    readOnly={false}
                    displayText="Heading"
                    id="heading"
                    name="heading"
                    register={register("heading")}
                    error={errors.heading}
                    errorDisplayText={errors.heading?.message}
                  />
                </Col>
              </Row>
              <Row>
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
            </Container>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

export default AddCareCleanComponent;
