import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Box, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import FMButton from "components/FMButton/FMButton";
import FMTypography from "components/FMTypography/FMTypography";
import FMInput from "components/FMInput/FMInput";
import { Col, Row } from "react-bootstrap";
import { addCareCleanSchema } from "validationSchema/AddCareCleanSchema";
import { addCareClean, getCareClean } from "redux/Slices/CareClean/CareClean";
import { notify } from "constants/utils";
import ModalWrapper from "container/HomePage/Modal";
import { commonStyle } from "Styles/commonStyles";

const AddCareCleanComponent = (props) => {
  const { setOpen, open } = props;
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const handleClose = () => {
    setOpen(false);
    setValue("text", "");
    setValue("title", "");
    setValue("bannerImageAltText", "");
    setValue("heading", "");
    setImage("");
  };
  const setCloseDialog = () => {
    setOpen(false);
    setValue("text", "");
    setValue("title", "");
    setValue("bannerImageAltText", "");
    setValue("heading", "");
    setImage("");
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
    formData.append("image", image);

    dispatch(addCareClean(formData)).then(() => {
      const usersListData = { page: 1 };
      dispatch(getCareClean(usersListData));
      setOpen(false);
      setValue("text", "");
      setValue("title", "");
      setValue("bannerImageAltText", "");
      setValue("heading", "");
      setImage("");
    });
    notify({ type: "success", messgae: "Data Added Successfully" });
  };

  const handleProductPictures = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Add Care & Clean"}
    >
      <Row style={{ marginBottom: "1rem" }}>
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
            displayText="Heading"
            id="heading"
            name="heading"
            register={register("heading")}
            error={errors.heading}
            errorDisplayText={errors.heading?.message}
          />
        </Col>
      </Row>

      <Row style={{ marginBottom: "1rem", padding: " 0.75rem" }}>
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
          {...register("text")}
          error={errors.text ? true : false}
        />
        {errors.text && (
          <FMTypography
            displayText={errors.text?.message}
            styleData={{ color: "red" }}
          />
        )}
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
            name="image"
            id="image"
            onChange={handleProductPictures}
          />
        </Col>
        <Col md={6}>
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
          {imagePreview && (
            <Box className="mt-4">
              <div style={commonStyle.commonModalTitleStyle}>
                {`Image Preview`}
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

export default AddCareCleanComponent;
