import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import FMButton from "components/FMButton/FMButton";
import FMInput from "components/FMInput/FMInput";
import { Col, Row } from "react-bootstrap";
import { addBannerUploadSchema } from "validationSchema/HomePage/AddBannerSchema";
import {
  editHomepageBannerMain,
  getBannersDetail,
  getHomePageBanners,
} from "redux/Slices/HomePage/HomePageCategories";
import { notify } from "constants/utils";
import ModalWrapper from "container/HomePage/Modal";
import { commonStyle } from "Styles/commonStyles";

const EditHomePageBanner = (props) => {
  const { setOpen, open, id, usersListData } = props;
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const [bannerImagePreview, setBannerImagePreview] = useState(null);

  useEffect(() => {
    dispatch(getBannersDetail(id));
  }, [id, dispatch]);

  const bannerDetailedData = useSelector(
    (state) => state?.exploreCategories?.getParticularBannerData?.banner
  );

  const [banner, setBanner] = useState("");

  const handleClose = () => {
    setOpen(false);
    setValue("title", "");
    setValue("imageAltText", "");
    setBanner([]);
  };
  const setCloseDialog = () => {
    setOpen(false);
    setValue("title", "");
    setValue("imageAltText", "");
    setBanner([]);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(addBannerUploadSchema),
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      title: bannerDetailedData?.title,
      imageAltText: bannerDetailedData?.imageAltText,
    });

    setBannerImagePreview(bannerDetailedData?.banner);
  }, [bannerDetailedData, reset]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data?.title?.toString());
    formData.append("_id", id);
    if (data?.imageAltText != undefined && data?.imageAltText != "") {
      formData.append("imageAltText", data?.imageAltText?.toString());
    }
    if (banner != undefined && banner != "") {
      formData.append("banner", banner);
    }
    dispatch(editHomepageBannerMain(formData)).then(() => {
      dispatch(getHomePageBanners(usersListData));
      notify({ type: "success", messgae: "Data Edited Successfully" });
    });
    setOpen(false);
    setValue("title", "");
    setValue("imageAltText", "");
    setBanner("");
  };

  const handleBannerPictures = (e) => {
    setBannerImagePreview("");
    setBanner(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Edit HomePageBanner"}
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
            name="imageAltText"
            register={register("imageAltText")}
            error={errors.imageAltText}
            errorDisplayText={errors.imageAltText?.message}
          />
        </Col>
        {bannerImagePreview && (
          <Box className="mt-3">
            <div
              style={{
                ...commonStyle.commonModalTitleStyle,
                marginBottom: "4px",
              }}
            >{`Image Preview`}</div>
            <div>
              <img
                src={bannerImagePreview}
                alt="image"
                width="200px"
                height="200px"
              />
            </div>
          </Box>
        )}

        {imagePreview && (
          <Box className="mt-3">
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

export default EditHomePageBanner;
