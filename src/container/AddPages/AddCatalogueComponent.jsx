import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Grid, Modal, Box, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import FMButton from "components/FMButton/FMButton";
import FMTypography from "components/FMTypography/FMTypography";
import FMInput from "components/FMInput/FMInput";
import crossIcon from "assets/crossIcon.svg";
import { Col, Container, Row } from "react-bootstrap";
import { addCareCleanSchema } from "validationSchema/AddCareCleanSchema";
import { addCareClean, getCareClean } from "redux/Slices/CareClean/CareClean";
import { addVideoSchema } from "validationSchema/AddVideoSchema";
import { addVideoData, getVideos } from "redux/Slices/videosSlices/Video";
import { addCatalogueSchema } from "validationSchema/AddCatalogueSchema";
import {
  addNewCatalogue,
  getCatalogues,
} from "redux/Slices/Catalogue/Catalogue";
import { notify } from "constants/utils";
import ModalWrapper from "container/HomePage/Modal";
import { commonStyle } from "Styles/commonStyles";
const AddCatalogueComponent = (props) => {
  const { setOpen, open } = props;
  const [pdfFile, setPdfFile] = useState();
  const [image, setImage] = useState([]);
  const [pdf, setPdf] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleClose = () => {
    setValue("title", "");
    setValue("imageAltText", "");
    setValue("image", "");
    setValue("pdf", null);
  };
  const setCloseDialog = () => {
    setOpen(false);
    setValue("title", "");
    setValue("imageAltText", "");
    setValue("image", "");
    setValue("pdf", null);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(addCatalogueSchema),
    mode: "onChange",
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data?.title?.toString());
    formData.append("imageAltText", data?.imageAltText?.toString());
    formData.append("image", image);
    formData.append("pdf", pdf);

    dispatch(addNewCatalogue(formData)).then(() => {
      const usersListData = { page: 1 };
      dispatch(getCatalogues(usersListData));
      setOpen(false);
      formData.append("title", "");
      formData.append("imageAltText", "");
      formData.append("image", "");
      formData.append("pdf", null);
    });
    notify({ type: "success", messgae: "Data Added Successfully" });
  };

  const handleBannerPictures = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };
  const handleBannerPdf = (e) => {
    setPdfFile(URL.createObjectURL(e.target.files[0]));
    setPdf(e.target.files[0]);
  };

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Add Catalogue"}
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
            displayText={"PDF"}
            type="file"
            accept="application/pdf"
            name="pdf"
            id="pdf"
            onChange={handleBannerPdf}
          />

          {pdfFile && (
            <Box
              sx={{
                margin: "1rem 0",
              }}
            >
              <FMTypography
                displayText={"Pdf Preview"}
                styleData={commonStyle.commonModalTitleStyle}
              />
              <embed
                src={pdfFile}
                type="application/pdf"
                frameBorder="0"
                scrolling="auto"
                height="200px"
                width="100%"
              ></embed>
            </Box>
          )}
        </Col>
      </Row>

      <Row style={{ marginTop: "1rem" }}>
        <Col md={6}>
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
              <div style={commonStyle.commonModalTitleStyle}>{`Image Preview`} </div>
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

export default AddCatalogueComponent;
