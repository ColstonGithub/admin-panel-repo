import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Modal, Box } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import FMButton from "components/FMButton/FMButton";
import FMTypography from "components/FMTypography/FMTypography";
import FMInput from "components/FMInput/FMInput";
import crossIcon from "assets/crossIcon.svg";
import { Col, Container, Row } from "react-bootstrap";
import {
  editBlogCategory,
  getBlogCategory,
  getBlogCategoryDetails,
} from "redux/Slices/Blogs/BlogsCategory";
import { addBlogCategorySchema } from "validationSchema/AddBlogCategorySchema";
import { notify } from "constants/utils";

const EditBlogsCategory = (props) => {
  const { setOpen, open, id } = props;

  const handleClose = () => {
    setOpen(false);
    setValue("name", "");
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogCategoryDetails(id));
  }, [id, dispatch]);

  const blogCategoryDetail = useSelector(
    (state) => state?.blogsCategory?.getBlogCategoryDetails?.blogCategory
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(addBlogCategorySchema),
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      name: blogCategoryDetail?.name,
    });
  }, [blogCategoryDetail, reset]);

  const onSubmit = (data) => {
    dispatch(editBlogCategory({ _id: id, name: data?.name })).then(() => {
      const usersListData = { page: 1 };
      dispatch(getBlogCategory(usersListData));
      setOpen(false);
      notify({ type: "success", messgae: "Data Edited Successfully" });
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
                onClick={handleClose}
              />
            </Box>
            <FMTypography
              displayText="Edit Blog Category"
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

export default EditBlogsCategory;
