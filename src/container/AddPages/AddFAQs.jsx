import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Modal, Box, FormControl, Select, MenuItem } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import FMButton from "components/FMButton/FMButton";
import FMTypography from "components/FMTypography/FMTypography";
import FMInput from "components/FMInput/FMInput";
import crossIcon from "assets/crossIcon.svg";
import { Col, Container, Row } from "react-bootstrap";
import { getBlogCategory } from "redux/Slices/Blogs/BlogsCategory";
import { addBlogsSchema } from "validationSchema/AddBlogCategorySchema";
import { editBlogs, getBlogs, getBlogsDetail } from "redux/Slices/Blogs/Blogs";
import { commonStyle } from "Styles/commonStyles";
import { getFaqCategoryData } from "redux/Slices/FAQS/FaqCategorySlice";
import { addFaqsSchema } from "validationSchema/addFaqCategorySchema";
import { addNewFaq, getFaqData } from "redux/Slices/FAQS/FaqSlice";

const AddFAQs = (props) => {
  const { setOpen, open, id } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFaqCategoryData({ page: 1 }));
  }, [id, dispatch]);

  const faqCategory = useSelector(
    (state) => state?.faqCategory?.getFaqCategoryListData?.faqCategoryList
  );

  const handleClose = () => {
    setOpen(false);
    setValue("question", "");
    setValue("answer", "");
  };
  const setCloseDialog = () => {
    setOpen(false);
    setValue("question", "");
    setValue("answer", "");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(addFaqsSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    dispatch(addNewFaq(data)).then(() => {
      const usersListData = { page: 1 };
      dispatch(getFaqData(usersListData));
      setOpen(false);
    });
  };

  // if (!faqCategory || faqCategory.length === 0) {
  //   return <div>Loading...</div>;
  // }
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
                onClick={setCloseDialog}
              />
            </Box>
            <FMTypography
              displayText="Add FAQs"
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
                    displayText="Question"
                    id="question"
                    name="question"
                    register={register("question")}
                    error={errors.question}
                    errorDisplayText={errors.question?.message}
                  />
                </Col>

                <Col>
                  <FMInput
                    required
                    readOnly={false}
                    displayText="Answer"
                    id="answer"
                    name="answer"
                    register={register("answer")}
                    error={errors.answer}
                    errorDisplayText={errors.answer?.message}
                  />
                </Col>
                <Col>
                  <FMTypography displayText={"Select Category"} />
                  <FormControl fullWidth sx={{ minWidth: "13rem" }}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      {...register("faqCategory")}
                      placeholder="type"
                      name="faqCategory"
                      sx={{
                        height: "2.5rem",
                        marginTop: ".3rem",
                        border: "0.0625rem solid #1a1a1a1f",
                        "&:hover": { border: "0.0625rem solid #1a1a1a1f" },
                        "& .MuiSelect-root": {
                          border: "0.0625rem solid #1a1a1a1f",
                        },
                      }}
                    >
                      {faqCategory?.map((elem) => (
                        <MenuItem value={elem?._id}>{elem?.name}</MenuItem>
                      ))}
                    </Select>
                    {errors?.faqCategory && (
                      <FMTypography
                        displayText={errors.faqCategory?.message}
                        styleData={commonStyle.errorText}
                      />
                    )}
                  </FormControl>
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

export default AddFAQs;
