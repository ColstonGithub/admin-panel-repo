import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import FMButton from "components/FMButton/FMButton";
import FMInput from "components/FMInput/FMInput";
import { Col, Row } from "react-bootstrap";

import { addNewsPressBannerSchema } from "validationSchema/AddNewsPressProductSchema";
import {
  editNewsPressBanner,
  getNewsPressBanner,
  newsPressBannerDetail,
} from "redux/Slices/NewsPress/NewsPressBanner";
import { notify } from "constants/utils";
import ModalWrapper from "container/HomePage/Modal";
import { commonStyle } from "Styles/commonStyles";

const EditNewsPressBanner = (props) => {
  const dispatch = useDispatch();
  const { setOpen, open, id } = props;
  const [bannerImage, setBannerImage] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const handleClose = () => {
    setOpen(false);
    setValue("title", "");
    setValue("bannerImageAltText", "");
    setImage("");
    setImagePreview("");
  };
  const setCloseDialog = () => {
    setOpen(false);
    setValue("title", "");
    setValue("bannerImageAltText", "");
    setImage("");
    setImagePreview("");
  };

  useEffect(() => {
    dispatch(newsPressBannerDetail(id));
  }, [id, dispatch]);

  const getNewsPressBannerDetails = useSelector(
    (state) => state?.newsPressBanner?.getNewsPressBannerData?.banner
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(addNewsPressBannerSchema),
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      title: getNewsPressBannerDetails?.title,
      bannerImageAltText: getNewsPressBannerDetails?.bannerImageAltText,
    });
    setBannerImage(getNewsPressBannerDetails?.bannerImage);
  }, [getNewsPressBannerDetails, reset]);

  const handleBannerPictures = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
    setBannerImage("");
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("_id", id);
    formData.append("title", data?.title);
    formData.append("bannerImageAltText", data?.bannerImageAltText);
    if (image) formData.append("bannerImage", image);
    dispatch(editNewsPressBanner(formData)).then(() => {
      const usersListData = { page: 1 };
      dispatch(getNewsPressBanner(usersListData));
      setOpen(false);
      notify({ type: "success", messgae: "Data Edited Successfully" });
      setValue("title", "");
      setValue("bannerImageAltText", "");
      setBannerImage("");
      setImage("");
      setImagePreview("");
    });
  };

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Edit News & Press Banner"}
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

        {bannerImage && (
          <Box className="mt-4">
            <div style={commonStyle.commonModalTitleStyle}>
              {`Image Preview`}
            </div>
            <img
              src={bannerImage}
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

export default EditNewsPressBanner;
