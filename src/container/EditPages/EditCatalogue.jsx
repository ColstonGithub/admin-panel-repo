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
      "https://colston-app.s3.ap-south-1.amazonaws.com/",
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
    <div
      style={{
        position: "absolute",
        backgroundColor: "#FFF",
        padding: "15px",
        zIndex: "1000",
        width: "35%",
        borderRadius: ".5em",
      }}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          position: "fixed",
          display: "flex",
          justifyContent: "center",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0, .8)",
          zIndex: "1000",
          overflowY: "auto",
        }}
      >
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid
            sx={{
              backgroundColor: "white",
              width: "36.5rem",
              padding: "2.125rem",
              borderRadius: "0.5rem",
              marginTop: "2rem",
              // height: "43.75rem",
              height: "auto",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <img
                src={crossIcon}
                alt="cross-icon"
                style={{ cursor: "pointer", width: "1rem" }}
                onClick={handleClose}
              />
            </Box>
            <FMTypography
              displayText="Edit Catalogue"
              styleData={{
                fontWeight: "600",
                fontSize: "1.125rem",
                marginBottom: "1.5rem",
                fontFamily: " 'Inter', sans-serif",
              }}
            />

            <Container>
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
              </Row>

              <Row>
                <Col style={{ marginTop: "2rem" }}>
                  <FMTypography
                    displayText={"Image: "}
                    styleData={{ color: "#A3A3A3" }}
                  />
                  {bannerImage && (
                    <div style={{ width: "auto" }}>
                      <img
                        src={bannerImage}
                        alt="img"
                        width="150px"
                        height="200px"
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    name="banner"
                    id="banner"
                    onChange={handleBannerPictures}
                  />
                </Col>
              </Row>

              <Row className="mt-5">
                <Col>
                  <FMTypography
                    displayText={"PDF: "}
                    styleData={{ color: "#A3A3A3" }}
                  />
                  {pdfPreview && (
                    <div style={{ width: "auto" }}>
                      <p>{pdfPreview}</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="application/pdf"
                    name="pdf"
                    id="pdf"
                    onChange={handleBannerPdf}
                  />
                </Col>
              </Row>
              <FMButton
                displayText="Edit"
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
            </Container>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

export default EditCatalogue;
