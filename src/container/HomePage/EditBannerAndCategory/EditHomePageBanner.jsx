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
import { addBannerUploadSchema } from "validationSchema/HomePage/AddBannerSchema";
import {
  editHomepageBannerMain,
  getBannersDetail,
  getHomePageBanners,
} from "redux/Slices/HomePage/HomePageCategories";
import { notify } from "constants/utils";

const EditHomePageBanner = (props) => {
  const { setOpen, open, id, usersListData } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBannersDetail(id));
  }, [id, dispatch]);

  const bannerDetailedData = useSelector(
    (state) => state?.exploreCategories?.getParticularBannerData?.banner
  );

  const [productTypes, setProductTypes] = React.useState("");

  const [banner, setBanner] = useState([]);
  const [editedBanner, setEditedBanner] = useState([]);

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

  useEffect(() => {
    reset({
      title: bannerDetailedData?.title,
    });
    bannerDetailedData?.banners?.map((elem) => {
      return setEditedBanner([...editedBanner, elem?.img]);
    });
  }, [bannerDetailedData, reset]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data?.title?.toString());

    {
      banner &&
        banner.map((file, index) => {
          return {
            img: formData.append("banner", file),
            imageAltText: formData.append(
              "imageAltText",
              "imageAltText[index]"
            ),
          };
        });
    }
    formData.append("_id", id);

    dispatch(editHomepageBannerMain(formData)).then(() => {
      dispatch(getHomePageBanners(usersListData));
      notify({ type: "success", messgae: "Data Edited Successfully" });
    });

    setOpen(false);
    setValue("title", "");
    setBanner([]);
  };

  const handleBannerPictures = (e) => {
    setEditedBanner([]);
    setBanner([...banner, e.target.files[0]]);
  };
  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "#FFF",
        padding: "15px",
        zIndex: "1000",
        width: "35%",
        // height:'300px'
        borderRadius: ".5em",
      }}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
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
            transform: "translate(0, 30%)",
            height: "450px",
          }}
        >
          <Grid
            sx={{
              backgroundColor: "white",
              width: "36.5rem",
              padding: "2.125rem",
              borderRadius: "0.5rem",
              // marginTop: "2rem",
              height: "500px",
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
                {editedBanner.length > 0
                  ? editedBanner?.map((pic, index) => (
                      <div key={index}>
                        <img src={pic} alt="imgs" width="100px" />
                      </div>
                    ))
                  : null}
                {banner.length > 0
                  ? banner?.map((pic, index) => (
                      <div key={index}>{pic.name}</div>
                    ))
                  : null}
                <input
                  type="file"
                  name="banner"
                  id="banner"
                  onChange={handleBannerPictures}
                />
              </Row>
              <FMButton
                displayText="Edit Banner"
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

export default EditHomePageBanner;
