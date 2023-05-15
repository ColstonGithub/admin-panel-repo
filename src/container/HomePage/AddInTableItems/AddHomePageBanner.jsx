import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  Grid,
  Modal,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";

import FMButton from "components/FMButton/FMButton";
// import FMInputLabel from "Components/FMInputLabel";
import FMTypography from "components/FMTypography/FMTypography";
import FMInput from "components/FMInput/FMInput";
// import FMInput from "Components/FMInput/FMInput";
import crossIcon from "assets/crossIcon.svg";
import FMInputLabel from "components/FMInputLabel/FMInputLabel";
import { Col, Container, Row } from "react-bootstrap";
import FormUpload from "components/uploadFilesDropzone/FormUpload";
import {
  addBannerSchema,
  addBannerUploadSchema,
} from "validationSchema/HomePage/AddBannerSchema";
import {
  addHomepageBannerMain,
  getHomePageBanners,
  getHomePageCategories,
} from "redux/Slices/HomePage/HomePageCategories";
import { notify } from "constants/utils";

const AddHomePageBanner = (props) => {
  const { setOpen, open, homepageBanners } = props;

  const [productTypes, setProductTypes] = React.useState("");
  const [banner, setBanner] = useState([]);
  const [imageAltText, setImageAltText] = useState([]);

  const handleChange = (event) => {
    setProductTypes(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
    setValue("title", "");
    setBanner([]);
  };
  const setCloseDialog = () => {
    setOpen(false);
    setValue("title", "");
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

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data?.title?.toString());
    // for (let pic of banner) {
    //   formData.append("banner", pic);
    // }
    banner.map((file, index) => {
      return {
        img: formData.append("banner", file),
        imageAltText: formData.append("imageAltText", "imageAltText[index]"),
      };
    });

    dispatch(addHomepageBannerMain(formData)).then(() => {
      const usersListData = { page: 1 };
      dispatch(getHomePageBanners(usersListData));
    });

    setOpen(false);
    setValue("title", "");
    setBanner([]);
    notify({ type: "success", messgae: "Data Added Successfully" });
  };

  const handleBannerPictures = (e) => {
    setBanner([...banner, e.target.files[0]]);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          transform: "translate(0, 30%)",
        }}
      >
        <Grid
          sx={{
            backgroundColor: "white",
            width: "36.5rem",
            padding: "2.125rem",
            borderRadius: "0.5rem",
            marginTop: "2rem",
            height: "auto",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <img
              src={crossIcon}
              alt="cross-icon"
              style={{ cursor: "pointer", width: "1rem" }}
              onClick={setCloseDialog}
            />
          </Box>
          <FMTypography
            displayText="Banner"
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
            </Row>
            <Row style={{ marginTop: "2rem" }}>
              {banner.length > 0
                ? banner.map((pic, index) => <div key={index}>{pic.name}</div>)
                : null}
              <input
                type="file"
                name="banner"
                id="banner"
                onChange={handleBannerPictures}
              />
            </Row>
            <FMButton
              displayText="Add Banner"
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
  );
};

export default AddHomePageBanner;
