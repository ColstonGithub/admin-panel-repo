import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Grid, Modal, Box } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import FMButton from "components/FMButton/FMButton";
import FMTypography from "components/FMTypography/FMTypography";
import FMInput from "components/FMInput/FMInput";
import crossIcon from "assets/crossIcon.svg";
import { Col, Container, Row } from "react-bootstrap";
import {
  addNewCategoryBanner,
  getCategoryBanners,
} from "redux/Slices/HomePage/CategoryBanner";
import { addCategoryBannerSchema } from "validationSchema/AddCategoryBannerSchema";
import {
  addBlogCategory,
  getBlogCategory,
} from "redux/Slices/Blogs/BlogsCategory";
import { addBlogCategorySchema } from "validationSchema/AddBlogCategorySchema";

const AddBlogCategoryComponent = (props) => {
  const { setOpen, open } = props;
  const dispatch = useDispatch();

  const handleClose = () => {
    setValue("name", "");
  };
  const setCloseDialog = () => {
    setOpen(false);
    setValue("name", "");
  };

  //   useEffect(() => {
  //     dispatch(getBlogCategory());
  //   }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(addBlogCategorySchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    // const formData = new FormData();
    // formData.append("name", data?.name?.toString());

    dispatch(addBlogCategory(data)).then(() => {
      const usersListData = { page: 1 };
      dispatch(getBlogCategory(usersListData));
      setOpen(false);
      // formData.append("name", "");
    });
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
              displayText="Add Blog Category"
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
                    displayText="Name"
                    id="name"
                    name="name"
                    register={register("name")}
                    error={errors.name}
                    errorDisplayText={errors.name?.message}
                  />
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
            </Container>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

export default AddBlogCategoryComponent;
