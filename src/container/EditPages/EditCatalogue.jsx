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

  const [image, setImage] = useState(null);
  const [bannerImage, setBannerImage] = useState("");
  const [pdf, setPdf] = useState("");
  const [pdfPreview, setPdfPreview] = useState("");

  const handleClose = () => {
    setOpen(false);
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
    setPdfPreview(filename);
  }, [cataloguesDetail, reset]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("_id", id);
    formData.append("title", data?.title?.toString());
    formData.append("imageAltText", data?.imageAltText?.toString());

    if (image) formData.append("image", image);
    if (pdf) formData.append("pdf", pdf);

    dispatch(editCatalogue(formData)).then(() => {
      const usersListData = { page: 1 };
      dispatch(getCatalogues(usersListData));
      notify({ type: "success", messgae: "Data Edited Successfully" });
      setOpen(false);
      formData.append("title", "");
      formData.append("imageAltText", "");
      formData.append("image", "");
      formData.append("pdf", null);
    });
  };

  const handleBannerPictures = (e) => {
    setImage(e.target.files[0]);
    setBannerImage("");
  };
  const handleBannerPdf = (e) => {
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

          {pdfPreview && (
            <Box className="mt-2">
              <div
                style={commonStyle.commonModalTitleStyle}
              >{`Pdf Preview`}</div>
              <div style={{ width: "auto" }}>
                <p>{pdfPreview}</p>
              </div>
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
          <Box className="mt-2">
            <div
              style={commonStyle.commonModalTitleStyle}
            >{`Image Preview`}</div>
            <div style={{ width: "auto" }}>
              <img src={bannerImage} alt="img" width="200px" height="200px" />
            </div>
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
