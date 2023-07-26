import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { TextField, Box } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import FMButton from "components/FMButton/FMButton";
import FMTypography from "components/FMTypography/FMTypography";
import FMInput from "components/FMInput/FMInput";
import { Col, Row } from "react-bootstrap";
import { addExhibitionProductSchema } from "validationSchema/AddExhibitionProductSchema";
import {
  addExhibitionPage,
  getExhibitionPage,
} from "redux/Slices/Exhibition/ExhibitionPage";
import { notify } from "constants/utils";
import ModalWrapper from "container/HomePage/Modal";
import { commonStyle } from "Styles/commonStyles";

const AddExhibitionPageComponent = (props) => {
  const { setOpen, open } = props;
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState("");

  const handleClose = () => {
    setOpen(false);
    setValue("title", "");
    setValue("text", "");
    setValue("imageAltText", "");
    setImage("");
  };
  const setCloseDialog = () => {
    setOpen(false);
    setValue("title", "");
    setValue("text", "");
    setValue("imageAltText", "");
    setImage("");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(addExhibitionProductSchema),
    mode: "onChange",
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data?.title?.toString());
    formData.append("text", data?.text?.toString());
    formData.append("imageAltText", data?.imageAltText?.toString());
    formData.append("image", image);

    dispatch(addExhibitionPage(formData)).then(() => {
      const usersListData = { page: 1 };
      dispatch(getExhibitionPage(usersListData));
      setOpen(false);
      setValue("title", "");
      setValue("text", "");
      setValue("imageAltText", "");
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
      modalTitle={"Add Exhibition Product"}
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
            id="imageAltText"
            name="imageAltText"
            register={register("imageAltText")}
            error={errors.imageAltText}
            errorDisplayText={errors.imageAltText?.message}
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

export default AddExhibitionPageComponent;
