import { yupResolver } from "@hookform/resolvers/yup";
import { Box, TextField } from "@mui/material";
import FMTypography from "components/FMTypography/FMTypography";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FMButton from "components/FMButton/FMButton";
import { Col, Row } from "react-bootstrap";
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
import ModalWrapper from "container/HomePage/Modal";

const EditBrandPageCategory = (props) => {
  const { setOpen, open, id, usersListData } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrandPageDetail(id));
  }, [dispatch, id]);

  const brandPageDetailedData = useSelector(
    (state) => state?.brandPage?.getBrandPageData?.brandproduct
  );
  const [imagePreview, setImagePreview] = useState(null);
  const [editedCategoryImage, setEditedImage] = useState("");
  const [image, setImage] = useState(" ");

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
    setEditedImage(brandPageDetailedData?.image);
  }, [brandPageDetailedData, reset]);

  const handleClose = () => {
    setOpen(false);
    setValue("title", "");
    setValue("imageAltText", "");
    setValue("text", "");
    setImage("");
  };
  const setCloseDialog = () => {
    setOpen(false);
    setValue("title", "");
    setValue("imageAltText", "");
    setValue("text", "");
    setImage("");
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data?.title?.toString());
    formData.append("text", data?.text?.toString());
    formData.append("imageAltText", data?.imageAltText?.toString());
    formData.append("image", image);
    formData.append("_id", id);

    dispatch(editBrandPage(formData)).then(() => {
      dispatch(getBrandPage(usersListData));
      notify({ type: "success", messgae: "Data Edited Successfully" });
      setOpen(false);
      setValue("title", "");
      setValue("imageAltText", "");
      setValue("text", "");
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
      modalTitle={"Edit Brand Product"}
    >
      <Row style={{ marginTop: "1rem"}}>
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
            id="imageAltText"
            name="imageAltText"
            register={register("imageAltText")}
            error={errors.imageAltText}
            errorDisplayText={errors.imageAltText?.message}
          />
        </Col>

        {editedCategoryImage && (
          <Box className="mt-4">
            <div style={commonStyle.commonModalTitleStyle}>
              {`Image Preview`}
            </div>
            <img
              src={editedCategoryImage}
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

export default EditBrandPageCategory;
