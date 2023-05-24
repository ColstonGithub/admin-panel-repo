import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Box, } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import FMButton from "components/FMButton/FMButton";
import FMInput from "components/FMInput/FMInput";
import { Col, Row } from "react-bootstrap";
import {
  editBrandPageBannerDetail,
  getBrandPageBanner,
  getBrandPageBannerDetail,
} from "redux/Slices/BrandPage/brandPageBanner";
import { EditBrandBannerSchema } from "validationSchema/HomePage/EditBannerSchema";
import {  notify } from "constants/utils";
import ModalWrapper from "container/HomePage/Modal";
import { commonStyle } from "Styles/commonStyles";
const EditBrandPageBanner = (props) => {
  const { setOpen, open, id, usersListData } = props;
  const dispatch = useDispatch();
  const [editedCategoryImage, setEditedCategoryImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState("");

  useEffect(() => {
    dispatch(getBrandPageBannerDetail(id));
  }, [id, dispatch]);

  const bannerDetailedData = useSelector(
    (state) => state?.brandPageBanner?.getBrandPageBannerData?.banner
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(EditBrandBannerSchema),
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      title: bannerDetailedData?.title,
      bannerImageAltText: bannerDetailedData?.bannerImageAltText,
    });
    setEditedCategoryImage(bannerDetailedData?.bannerImage);
  }, [bannerDetailedData, reset]);

  const handleImageChange = (event) => {
    setImagePreview(URL.createObjectURL(event.target.files[0]));
    setImage(event.target.files[0]);
    setEditedCategoryImage("");
  };

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
    formData.append("_id", id);
    formData.append("title", data?.title);
    formData.append("bannerImageAltText", data?.bannerImageAltText);
    formData.append("bannerImage", image);

    dispatch(editBrandPageBannerDetail(formData)).then(() => {
      dispatch(getBrandPageBanner(usersListData));
    });
    notify({ type: "success", messgae: "Data Edited Successfully" });
    setOpen(false);
    setValue("title", "");
    setValue("bannerImageAltText", "");
  };

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Edit Brand Banner"}
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
            name="bannerImage"
            accept="image/*"
            id="bannerImage"
            {...register("bannerImage")}
            onChange={handleImageChange}
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

export default EditBrandPageBanner;
