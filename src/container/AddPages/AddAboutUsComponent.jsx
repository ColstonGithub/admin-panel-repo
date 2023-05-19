import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Grid, Box, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import FMButton from "components/FMButton/FMButton";
import FMTypography from "components/FMTypography/FMTypography";
import FMInput from "components/FMInput/FMInput";
import crossIcon from "assets/crossIcon.svg";
import { Col, Container, Row } from "react-bootstrap";
import { addCareCleanSchema } from "validationSchema/AddCareCleanSchema";
import { addCareClean, getCareClean } from "redux/Slices/CareClean/CareClean";
import { addNewAboutUs, getAboutUsData } from "redux/Slices/AboutUs/AboutUs";
import { addAboutUsSchema } from "validationSchema/AddAboutUsSchema";
import { notify } from "constants/utils";
import { commonStyle } from "Styles/commonStyles";
import ModalWrapper from "container/HomePage/Modal";
const AddAboutUsComponent = (props) => {
  const { setOpen, open } = props;

  const [productTypes, setProductTypes] = React.useState("");

  const [image, setImage] = useState([]);
  const [bannerImage, setBannerImage] = useState([]);

  const handleChange = (event) => {
    setProductTypes(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
    setValue("text", "");
    setValue("title", "");
  };
  const setCloseDialog = () => {
    setOpen(false);
    setValue("text", "");
    setValue("title", "");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(addAboutUsSchema),
    mode: "onChange",
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data?.title?.toString());
    formData.append("text", data?.text?.toString());
    formData.append(
      "bannerImageTextAltText",
      data?.bannerImageTextAltText?.toString()
    );
    formData.append("bannerImageAltText", data?.bannerImageAltText?.toString());
    formData.append("bannerImage", image);
    formData.append("bannerImageText", bannerImage);

    dispatch(addNewAboutUs(formData)).then(() => {
      const usersListData = { page: 1 };
      dispatch(getAboutUsData(usersListData));
      setOpen(false);
      setValue("title", "");
      setValue("text", "");
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
    <>
      <ModalWrapper open={open} setOpen={setOpen} setCloseDialog={setCloseDialog} handleClose={handleClose} modalTitle={"Add About Us"}>
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
        </Row>

        <Row style={{ marginTop: "1rem", padding: " 0.75rem" }}>
          <FMTypography
            displayText={"Text"}
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
            id="text"
            name="text"
            {...register("text")}
            error={errors.text ? true : false}
          />
        </Row>

        <Row style={{ marginTop: "1rem" }}>
          <Col>
            <FMInput
              required
              readOnly={false}
              displayText={"Banner Image"}
              type="file"
              accept="image/*"
              name="banner"
              id="banner"
              onChange={handleBannerPictures}
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
        <Row style={{ marginTop: "1rem" }}>
          <Col>
            <FMInput
              required
              readOnly={false}
              displayText={"Banner Image Text"}
              type="file"
              accept="image/*"
              name="bannerImageText"
              id="bannerImageText"
              onChange={handleBannerImageTextPictures}
            />
          </Col>
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
    </>
  );
};

export default AddAboutUsComponent;
