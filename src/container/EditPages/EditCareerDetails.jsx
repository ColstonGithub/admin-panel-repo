import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Box, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import FMButton from "components/FMButton/FMButton";
import FMTypography from "components/FMTypography/FMTypography";
import FMInput from "components/FMInput/FMInput";
import { Col, Row } from "react-bootstrap";
import { addCareerDetailsSchema } from "validationSchema/AddCareerDetailsSchema";
import { commonStyle } from "Styles/commonStyles";
import { notify } from "constants/utils";
import {
  editCareerDetails,
  getCareerDetailData,
  getCareerDetailsById,
} from "redux/Slices/CareerDetails/CareerDetails";
import ModalWrapper from "container/HomePage/Modal";

const EditCareerDetails = (props) => {
  const { setOpen, open, id } = props;
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState("");
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    setValue("contentHeading", "");
    setValue("imageAltText", "");
    setValue("contentText", "");
    setImagePreview("");
    setImage("");
  };
  const setCloseDialog = () => {
    setOpen(false);
    setValue("contentHeading", "");
    setValue("imageAltText", "");
    setValue("contentText", "");
    setImagePreview("");
    setImage("");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(addCareerDetailsSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("contentHeading", data?.contentHeading?.toString());
    formData.append("contentText", data?.contentText?.toString());
    formData.append("imageAltText", data?.imageAltText?.toString());
    if (image) formData.append("image", image);
    formData.append("_id", id);
    dispatch(editCareerDetails(formData)).then(() => {
      const usersListData = { page: 1 };
      dispatch(getCareerDetailData(usersListData)).then(() => {});
      notify({ type: "success", messgae: "Data Added Successfully" });
      setOpen(false);
      setValue("contentHeading", "");
      setValue("imageAltText", "");
      setValue("contentText", "");
      setImagePreview("");
      setImage("");
    });
  };

  const handleBannerPictures = (e) => {
    setImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };
  useEffect(() => {
    dispatch(getCareerDetailsById(id));
  }, [id, dispatch]);

  const careerDetail = useSelector(
    (state) => state?.careerDetails?.getCareerDetailsData?.CareerDetails
  );

  useEffect(() => {
    reset({
      contentHeading: careerDetail?.contentHeading,
      contentText: careerDetail?.contentText,
      imageAltText: careerDetail?.imageAltText,
    });
    setImage(careerDetail?.image);
    setImagePreview(careerDetail?.image);
  }, [careerDetail, reset]);

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Edit Career Details"}
    >
      <Row>
        <Col>
          <FMInput
            required
            readOnly={false}
            displayText="Content Heading"
            id="contentHeading"
            name="contentHeading"
            register={register("contentHeading")}
            customInputLabelStyle={{
              ...commonStyle.commonModalTitleStyle,
            }}
            error={errors.contentHeading}
            errorDisplayText={errors.contentHeading?.message}
          />
        </Col>
      </Row>

      <Row style={{ marginTop: "1rem", padding: " 0.75rem" }}>
        <FMTypography
          displayText={"Content Text"}
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
          id="contentText"
          name="contentText"
          {...register("contentText")}
          error={errors.text ? true : false}
        />
      </Row>

      <Row style={{ marginTop: "32px" }}>
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
            displayText="Image Alt Text"
            id="imageAltText"
            customInputLabelStyle={{
              ...commonStyle.commonModalTitleStyle,
            }}
            name="imageAltText"
            register={register("imageAltText")}
            error={errors.imageAltText}
            errorDisplayText={errors.imageAltText?.message}
          />
        </Col>
        {imagePreview && (
          <Box className="mt-3">
            <div style={commonStyle.commonModalTitleStyle}>{`Preview`} </div>
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
        displayText="Submit"
        variant="contained"
        disabled={false}
        styleData={{
          ...commonStyle.commonModalTitleStyle,
          textTransform: "capitalize",
          color: "#fff",
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

export default EditCareerDetails;
