import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/material";
import FMTypography from "components/FMTypography/FMTypography";
import React, { useEffect, useState } from "react";
import crossIcon from "assets/crossIcon.svg";
import { useForm } from "react-hook-form";
import FMButton from "components/FMButton/FMButton";
import { Col, Row } from "react-bootstrap";
import FMInput from "components/FMInput/FMInput";
import { useDispatch, useSelector } from "react-redux";
import { getBrandPageDetail } from "redux/Slices/BrandPage/BrandPage";
import {
  editVirtualTourBanner,
  getVirtualTourBanner,
  virtualTourBannerDetail,
} from "redux/Slices/VirtuaTour/VirtualTour";
import { editVirtualTourSchema } from "validationSchema/VirtualTourSchema";
import { notify } from "constants/utils";
import ModalWrapper from "container/HomePage/Modal";
import { commonStyle } from "Styles/commonStyles";

const EditVirtualTourBanner = (props) => {
  const { setOpen, open, id, usersListData } = props;
  const [imagePreview, setImagePreview] = useState("");
  const [editedbannerImage, setEditedBannerImage] = useState("");
  const [bannerImage, setBannerImage] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrandPageDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(virtualTourBannerDetail(id));
  }, [id, dispatch]);

  const getVirtualTourDetails = useSelector(
    (state) => state?.virtualTourBanner?.getVirtualTourData?.banner
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(editVirtualTourSchema),
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      title: getVirtualTourDetails?.title,
      bannerImageAltText: getVirtualTourDetails?.bannerImageAltText,
    });
    setEditedBannerImage(getVirtualTourDetails?.bannerImage);
  }, [getVirtualTourDetails, reset]);

  const handleClose = () => {
    setOpen(false);
    setValue("title", "");
    setValue("bannerImageAltText", "");
  };
  const setCloseDialog = () => {
    setOpen(false);
    setValue("title", "");
    setValue("bannerImageAltText", "");
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data?.title?.toString());
    formData.append("bannerImageAltText", data?.bannerImageAltText?.toString());
    if (bannerImage !== "" && bannerImage != undefined) {
      formData.append("bannerImage", bannerImage);
    }
    formData.append("_id", id);
    dispatch(editVirtualTourBanner(formData)).then(() => {
      dispatch(getVirtualTourBanner(usersListData));
      notify({ type: "success", messgae: "Data Edited Successfully" });
      setOpen(false);
      setValue("bannerImageAltText", "");
      setValue("title", "");
      setBannerImage("");
    });
  };

  const handleBannerPictures = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setBannerImage(e.target.files[0]);
    setEditedBannerImage("");
  };

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Edit Virtual Tour"}
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

        {editedbannerImage && (
          <Box className="mt-4">
            <div style={commonStyle.commonModalTitleStyle}>
              {`Image Preview`}
            </div>
            <img
              src={editedbannerImage}
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

export default EditVirtualTourBanner;
