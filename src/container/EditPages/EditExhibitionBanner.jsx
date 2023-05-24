import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FMButton from "components/FMButton/FMButton";
import { Col, Row } from "react-bootstrap";
import FMInput from "components/FMInput/FMInput";
import { useDispatch, useSelector } from "react-redux";

import {
  editExhibitionBanner,
  getExhibitionBanner,
  getExhibitionBannerDetail,
} from "redux/Slices/Exhibition/ExhibitionBanner";
import { editExhibitionBannerSchema } from "validationSchema/VirtualTourSchema";
import { notify } from "constants/utils";
import ModalWrapper from "container/HomePage/Modal";
import { commonStyle } from "Styles/commonStyles";

const EditExhibitionBanner = (props) => {
  const { setOpen, open, id, usersListData } = props;
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState("");
  const [editedExhibitionImage, setEditedExhibitionImage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(editExhibitionBannerSchema),
    mode: "onChange",
  });

  useEffect(() => {
    dispatch(getExhibitionBannerDetail(id));
  }, [id, dispatch]);

  const exhibitionBannerDetail = useSelector(
    (state) => state?.exhibitionBanner?.getExhibtionBannerData?.banner
  );

  useEffect(() => {
    reset({
      title: exhibitionBannerDetail?.title,
      bannerImageAltText: exhibitionBannerDetail?.bannerImageAltText,
    });
    setEditedExhibitionImage(exhibitionBannerDetail?.bannerImage);
  }, [exhibitionBannerDetail, reset]);

  const handleClose = () => {
    setOpen(false);
    setValue("title", "");
    setValue("bannerImageAltText", "");
    setImage("");
  };
  const setCloseDialog = () => {
    setOpen(false);
    setValue("title", "");
    setValue("bannerImageAltText", "");
    setImage("");
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data?.title?.toString());
    formData.append("bannerImageAltText", data?.bannerImageAltText?.toString());
    if (image !== "" && image != undefined) {
      formData.append("bannerImage", image);
    }
    formData.append("_id", id);

    dispatch(editExhibitionBanner(formData)).then(() => {
      dispatch(getExhibitionBanner(usersListData));
      notify({ type: "success", messgae: "Data Edited Successfully" });
      setOpen(false);
      setValue("title", "");
      setValue("bannerImageAltText", "");
      setImage("");
    });
  };

  const handleBannerPictures = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
    setEditedExhibitionImage("");
  };

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Edit Exhibition"}
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
            displayText="Banner Image Alt Text"
            id="bannerImageAltText"
            name="bannerImageAltText"
            register={register("bannerImageAltText")}
            error={errors.bannerImageAltText}
            errorDisplayText={errors.bannerImageAltText?.message}
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

export default EditExhibitionBanner;
