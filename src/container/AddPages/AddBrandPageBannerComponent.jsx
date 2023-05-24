import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import FMButton from "components/FMButton/FMButton";
import FMInput from "components/FMInput/FMInput";
import { Col, Row } from "react-bootstrap";
import { addBrandPageBannerSchema } from "validationSchema/AddBrandPageBannerSchema";
import {
  addNewBrandPageBanner,
  getBrandPageBanner,
} from "redux/Slices/BrandPage/brandPageBanner";
import { notify } from "constants/utils";
import ModalWrapper from "container/HomePage/Modal";
import { commonStyle } from "Styles/commonStyles";

const AddBrandPageBannerComponent = (props) => {
  const { setOpen, open } = props;
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState("");

  const handleClose = () => {
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(addBrandPageBannerSchema),
    mode: "onChange",
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data?.title?.toString());
    formData.append("bannerImageAltText", data?.bannerImageAltText?.toString());
    formData.append("bannerImage", image);

    dispatch(addNewBrandPageBanner(formData)).then(() => {
      const usersListData = { page: 1 };
      dispatch(getBrandPageBanner(usersListData));
      setOpen(false);
      setValue("title", "");
      setValue("bannerImageAltText", "");
      setImage("");
    });
    notify({ type: "success", messgae: "Data Added Successfully" });
  };

  const handleBannerPictures = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Add Brand Banner"}
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
            name="banner"
            id="banner"
            onChange={handleBannerPictures}
          />
        </Col>
        <Col md={6}>
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

export default AddBrandPageBannerComponent;
