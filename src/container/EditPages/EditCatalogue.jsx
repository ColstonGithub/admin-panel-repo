import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Modal, Box } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import FMButton from "components/FMButton/FMButton";
import FMTypography from "components/FMTypography/FMTypography";
import FMInput from "components/FMInput/FMInput";
import crossIcon from "assets/crossIcon.svg";
import { Col, Container, Row } from "react-bootstrap";
import { addCatalogueSchema } from "validationSchema/AddCatalogueSchema";
import {
  editCatalogue,
  getCatalogueDetail,
  getCatalogues,
} from "redux/Slices/Catalogue/Catalogue";
import { notify } from "constants/utils";
import ModalWrapper from "container/HomePage/Modal";
import { commonStyle } from "Styles/commonStyles";

const EditCatalogue = (props) => {
  const { setOpen, open, id } = props;
  const [image, setImage] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [pdf, setPdf] = useState("");
  const [pdfPreview, setPdfPreview] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [pdfFile, setPdfFile] = useState();

  const handleClose = () => {
    setOpen(false);
    setValue("title", "");
    setValue("imageAltText", "");
    setImage("");
    setBannerImage("");
    setImagePreview("");
    setPdfPreview("");
    setPdf("");
  };

  const setCloseDialog = () => {
    setOpen(false);
    setValue("title", "");
    setValue("imageAltText", "");
    setImage("");
    setBannerImage("");
    setImagePreview("");
    setPdfPreview("");
    setPdf("");
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCatalogueDetail(id));
  }, [id, dispatch]);

  const cataloguesDetail = useSelector(
    (state) => state?.catalogues?.getCatalogueData?.Catalogue
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(addCatalogueSchema),
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      title: cataloguesDetail?.title,
      imageAltText: cataloguesDetail?.imageAltText,
    });
    setBannerImage(cataloguesDetail?.image);
    const filename = cataloguesDetail?.pdf?.replace(
      "http://localhost:5000/public/",
      ""
    );
    setPdfPreview(cataloguesDetail?.pdf);
  }, [cataloguesDetail, reset]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("_id", id);
    formData.append("title", data?.title?.toString());
    formData.append("imageAltText", data?.imageAltText?.toString());
    if (image != undefined) formData.append("image", image);
    if (pdf != undefined) formData.append("pdf", pdf);
    
    dispatch(editCatalogue(formData)).then(() => {
      const usersListData = { page: 1 };
      dispatch(getCatalogues(usersListData));
      notify({ type: "success", messgae: "Data Edited Successfully" });
      setOpen(false);
      setValue("title", "");
      setValue("imageAltText", "");
      setImage("");
      setBannerImage("");
      setImagePreview("");
      setPdfPreview("");
      setPdf("");
    });
  };

  const handleBannerPictures = (e) => {
    setImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setBannerImage("");
  };
  const handleBannerPdf = (e) => {
    setPdfFile(URL.createObjectURL(e.target.files[0]));
    setPdf(e.target.files[0]);
    setPdfPreview("");
  };

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Edit Catalogue"}
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
          {pdfPreview && (
            <Box className="mt-2">
              <FMTypography displayText={"Pdf Preview"} />
              <embed
                src={pdfPreview}
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

export default EditCatalogue;
