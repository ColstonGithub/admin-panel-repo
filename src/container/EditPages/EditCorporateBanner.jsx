import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import FMButton from "components/FMButton/FMButton";
import FMInput from "components/FMInput/FMInput";
import { Col, Row } from "react-bootstrap";

import {
  getCorporateBannerDetail,
  editCorporateBanner,
  getcorporateBanner,
} from "redux/Slices/CorporatePageSlices/CorporateBanner";
import { addCorporateBannerSchema } from "validationSchema/AddCorporateProductSchema";
import { notify } from "constants/utils";
import ModalWrapper from "container/HomePage/Modal";
import { commonStyle } from "Styles/commonStyles";

const EditCorporateBanner = (props) => {
  const dispatch = useDispatch();
  const { setOpen, open, id } = props;
  const [editedCorporateImage, setEditedCorporateImage] = useState("");
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

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
  useEffect(() => {
    dispatch(getCorporateBannerDetail(id));
  }, [id, dispatch]);

  const CorporateBanner = useSelector(
    (state) => state?.corporateBanner?.getCorporateBannerData?.banner
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(addCorporateBannerSchema),
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      title: CorporateBanner?.title,
      bannerImageAltText: CorporateBanner?.bannerImageAltText,
    });
    setEditedCorporateImage(CorporateBanner?.bannerImage);
  }, [CorporateBanner, reset]);

  const handleBannerPictures = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
    setEditedCorporateImage("");
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("_id", id);
    formData.append("title", data?.title);
    formData.append("bannerImageAltText", data?.bannerImageAltText);
    if (image) formData.append("bannerImage", image);

    dispatch(editCorporateBanner(formData)).then(() => {
      const usersListData = { page: 1 };
      dispatch(getcorporateBanner(usersListData));
      notify({ type: "success", messgae: "Data Edited Successfully" });
      setOpen(false);
      setValue("title", "");
      setValue("bannerImageAltText", "");
    });
  };

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Edit Corporate Banner"}
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

        {editedCorporateImage && (
          <Box className="mt-4">
            <div style={commonStyle.commonModalTitleStyle}>
              {`Image Preview`}
            </div>
            <img
              src={editedCorporateImage}
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

export default EditCorporateBanner;
