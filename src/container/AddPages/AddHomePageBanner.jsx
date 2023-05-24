import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";

import FMButton from "components/FMButton/FMButton";
import FMInput from "components/FMInput/FMInput";
import { Col, Row } from "react-bootstrap";
import { addBannerUploadSchema } from "validationSchema/HomePage/AddBannerSchema";
import {
  addHomepageBannerMain,
  getHomePageBanners,
} from "redux/Slices/HomePage/HomePageCategories";
import { notify } from "constants/utils";
import ModalWrapper from "container/HomePage/Modal";
import { commonStyle } from "Styles/commonStyles";
const AddHomePageBanner = (props) => {
  const { setOpen, open } = props;
  const [imagePreview, setImagePreview] = useState(null);
  const [banner, setBanner] = useState("");

  const handleClose = () => {
    setOpen(false);
    setValue("title", "");
    setValue("imageAltText", "");
    setBanner("");
    setImagePreview("");
  };
  const setCloseDialog = () => {
    setOpen(false);
    setValue("title", "");
    setValue("imageAltText", "");
    setBanner("");
    setImagePreview("");
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

  const dispatch = useDispatch();

  const handleBannerPictures = (e) => {
    setBanner(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data?.title?.toString());
    formData.append("banner", banner);
    formData.append("imageAltText", data?.imageAltText?.toString());
    dispatch(addHomepageBannerMain(formData)).then(() => {
      const usersListData = { page: 1 };
      dispatch(getHomePageBanners(usersListData));
    });
    setOpen(false);
    setValue("title", "");
    setValue("imageAltText", "");
    setBanner("");
    setImagePreview("");
    notify({ type: "success", messgae: "Data Added Successfully" });
  };

  return (
    <>
      <ModalWrapper
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        setCloseDialog={setCloseDialog}
        modalTitle={"Add HomePageBanner"}
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
    </>
  );
};

export default AddHomePageBanner;
