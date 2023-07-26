import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Box, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import FMButton from "components/FMButton/FMButton";
import FMTypography from "components/FMTypography/FMTypography";
import FMInput from "components/FMInput/FMInput";
import { Col, Row } from "react-bootstrap";
import { commonStyle } from "Styles/commonStyles";
import ModalWrapper from "container/HomePage/Modal";
import {
  editExhibitionPage,
  getExhibitionPageDetail,
  getExhibitionPage,
} from "redux/Slices/Exhibition/ExhibitionPage";
import { addExhibitionProductSchema } from "validationSchema/AddExhibitionProductSchema";
import { notify } from "constants/utils";

const EditExhibitionPage = (props) => {
  const dispatch = useDispatch();
  const { setOpen, open, id } = props;
  const [imagePreview, setImagePreview] = useState(null);
  const [editedExhibitionImage, setEditedExhibitionImage] = useState("");
  const [image, setImage] = useState([]);

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

  useEffect(() => {
    dispatch(getExhibitionPageDetail(id));
  }, [id, dispatch]);

  const ExhibitionData = useSelector(
    (state) =>
      state?.exhibitionProduct?.getExhibitionProductData?.exhibitionproduct
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(addExhibitionProductSchema),
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      title: ExhibitionData?.title,
      text: ExhibitionData?.text,
      imageAltText: ExhibitionData?.imageAltText,
    });
    setEditedExhibitionImage(ExhibitionData?.image);
  }, [ExhibitionData, reset]);

  const handleExhibitionPicture = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
    setEditedExhibitionImage("");
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("_id", id);
    formData.append("title", data?.title);
    formData.append("text", data?.text);
    formData.append("imageAltText", data?.imageAltText);
    if (image) formData.append("image", image);

    dispatch(editExhibitionPage(formData)).then(() => {
      const usersListData = { page: 1 };
      dispatch(getExhibitionPage(usersListData));
      notify({ type: "success", messgae: "Data Edited Successfully" });
      setOpen(false);
      setValue("title", "");
      setValue("imageAltText", "");
      setValue("text", "");
      setImage("");
    });
  };

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Edit Exhibition Product"}
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
            name="bannerImage"
            id="bannerImage"
            onChange={handleExhibitionPicture}
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

        {editedExhibitionImage && (
          <Box className="mt-4">
            <div style={commonStyle.commonModalTitleStyle}>
              {`Image Preview`}
            </div>
            <img
              src={editedExhibitionImage}
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

export default EditExhibitionPage;
