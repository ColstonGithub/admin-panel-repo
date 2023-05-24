import { yupResolver } from "@hookform/resolvers/yup";
import { Box, TextField } from "@mui/material";
import FMTypography from "components/FMTypography/FMTypography";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FMButton from "components/FMButton/FMButton";
import { Col, Row } from "react-bootstrap";
import FMInput from "components/FMInput/FMInput";
import { useDispatch, useSelector } from "react-redux";
import { getBrandPageDetail } from "redux/Slices/BrandPage/BrandPage";
import { virtualTourBannerDetail } from "redux/Slices/VirtuaTour/VirtualTour";
import {
  editCareAndClean,
  getCareClean,
  getCareCleanDetail,
} from "redux/Slices/CareClean/CareClean";
import { editCareCleanSchema } from "validationSchema/AddCareCleanSchema";
import { notify } from "constants/utils";
import { commonStyle } from "Styles/commonStyles";
import ModalWrapper from "container/HomePage/Modal";
const EditCareClean = (props) => {
  const { setOpen, open, id, usersListData } = props;
  const [editedImage, setEditedImage] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrandPageDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(virtualTourBannerDetail(id));
  }, [id, dispatch]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(editCareCleanSchema),
    mode: "onChange",
  });

  useEffect(() => {
    dispatch(getCareCleanDetail(id));
  }, [id, dispatch]);

  const getCareCleanDetails = useSelector(
    (state) => state?.careClean?.getCareCleanData?.CareClean
  );

  useEffect(() => {
    reset({
      title: getCareCleanDetails?.title,
      text: getCareCleanDetails?.text,
      heading: getCareCleanDetails?.heading,
      bannerImageAltText: getCareCleanDetails?.bannerImageAltText,
    });
    setEditedImage(getCareCleanDetails?.bannerImage);
  }, [getCareCleanDetails, reset]);

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
    // setCategoryImage(" ");
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data?.title?.toString());
    formData.append("text", data?.text?.toString());
    formData.append("heading", data?.heading?.toString());
    formData.append("bannerImageAltText", data?.bannerImageAltText?.toString());
    if (image !== " ") {
      formData.append("image", image);
    }
    formData.append("_id", id);

    dispatch(editCareAndClean(formData)).then(() => {
      dispatch(getCareClean(usersListData));
      notify({ type: "success", messgae: "Data Edited Successfully" });
      setOpen(false);
      setValue("text", "");
      setValue("title", "");
      setValue("bannerImageAltText", "");
      setValue("heading", "");
      setImage("");
    });
  };

  const handleProductPictures = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
    setEditedImage("");
  };

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Edit Care & Clean"}
    >
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
            displayText="Heading"
            id="heading"
            name="heading"
            register={register("heading")}
            error={errors.heading}
            errorDisplayText={errors.heading?.message}
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
        />{" "}
        <TextField
          placeholder="Text"
          multiline
          rows={2}
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
            name="image"
            id="image"
            onChange={handleProductPictures}
          />
        </Col>
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

        {editedImage && (
          <Box className="mt-4">
            <div style={commonStyle.commonModalTitleStyle}>
              {`Image Preview`}
            </div>
            <img
              src={editedImage}
              style={{
                width: "200px",
                height: "200px",
                marginTop: "4px",
              }}
            />
          </Box>
        )}

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

export default EditCareClean;
