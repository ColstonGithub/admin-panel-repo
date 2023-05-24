import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Box, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import FMButton from "components/FMButton/FMButton";
import FMTypography from "components/FMTypography/FMTypography";
import FMInput from "components/FMInput/FMInput";
import { Col, Row } from "react-bootstrap";
import {
  editAboutUs,
  getAboutUsData,
  getAboutusById,
} from "redux/Slices/AboutUs/AboutUs";
import { addAboutUsSchema } from "validationSchema/AddAboutUsSchema";
import { notify } from "constants/utils";
import { commonStyle } from "Styles/commonStyles";
import ModalWrapper from "container/HomePage/Modal";
const EditAboutUs = (props) => {
  const { setOpen, open, id } = props;
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const handleClose = () => {
    setOpen(false);
    setValue("text", "");
    setValue("title", "");
    setValue("bannerImageAltText", "");
    setImage("");
    setImagePreview("");
  };
  const setCloseDialog = () => {
    setOpen(false);
    setValue("text", "");
    setValue("title", "");
    setValue("bannerImageAltText", "");
    setImagePreview("");
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAboutusById(id));
  }, [id, dispatch]);

  const aboutUsDetail = useSelector(
    (state) => state?.aboutUs?.getAboutUsData?.AboutUs
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(addAboutUsSchema),
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      title: aboutUsDetail?.title,
      text: aboutUsDetail?.text,
      bannerImageAltText: aboutUsDetail?.bannerImageAltText,
    });
    setImagePreview(aboutUsDetail?.bannerImage);
  }, [reset, aboutUsDetail]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("_id", id);
    formData.append("title", data?.title);
    formData.append("text", data?.text);
    formData.append("bannerImageAltText", data?.bannerImageAltText);
    if (image) formData.append("bannerImage", image);

    dispatch(editAboutUs(formData)).then(() => {
      const usersListData = { page: 1 };
      dispatch(getAboutUsData(usersListData));
      setOpen(false);
      notify({ type: "success", messgae: "Data Edited Successfully" });
      setValue("text", "");
      setValue("title", "");
      setValue("bannerImageAltText", "");
      setImage("");
      setImagePreview("");
    });
  };

  const handleBannerPictures = (e) => {
    setImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      setCloseDialog={setCloseDialog}
      handleClose={handleClose}
      modalTitle={"Edit About Us"}
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

        <Col>
          <FMInput
            required
            readOnly={false}
            customInputLabelStyle={{
              ...commonStyle.commonModalTitleStyle,
            }}
            displayText="Banner Image Alt Text"
            id="bannerImageAltText"
            name="bannerImageAltText"
            register={register("bannerImageAltText")}
            error={errors.bannerImageAltText}
            errorDisplayText={errors.bannerImageAltText?.message}
          />
        </Col>
        {imagePreview && (
          <Box className="mt-2">
            <div style={commonStyle.commonModalTitleStyle}>
              {`Image Preview`}{" "}
            </div>
            <img
              src={imagePreview}
              style={{
                width: "200px",
                height: "200px",
              }}
            />
          </Box>
        )}
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

export default EditAboutUs;
