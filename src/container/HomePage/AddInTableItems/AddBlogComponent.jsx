import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Box, FormControl, Select, MenuItem } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import FMButton from "components/FMButton/FMButton";
import FMTypography from "components/FMTypography/FMTypography";
import FMInput from "components/FMInput/FMInput";
import { Col, Container, Row } from "react-bootstrap";
import { getBlogCategory } from "redux/Slices/Blogs/BlogsCategory";
import { addBlogsSchema } from "validationSchema/AddBlogCategorySchema";
import { addBlogs, getBlogs } from "redux/Slices/Blogs/Blogs";
import { commonStyle } from "Styles/commonStyles";
import { notify } from "constants/utils";
import Editor from "components/ReactQuill/Editor";

import { useNavigate } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AddBlogComponent = () => {
  const [dataText, setDataText] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blogCategories = useSelector(
    (state) => state?.blogsCategory?.getBlogCategoryListData?.blogCategoryList
  );

  const [image, setImage] = useState([]);

  useEffect(() => {
    dispatch(getBlogCategory({ page: 1 }));
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(addBlogsSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data?.title?.toString());
    formData.append("text", dataText?.toString());
    formData.append("imageAltText", data?.imageAltText?.toString());
    formData.append("pageTitle", data?.pageTitle?.toString());
    formData.append("pageHeading", data?.pageHeading?.toString());
    formData.append("blogCategory", data?.blogCategory);
    if (image) formData.append("image", image);
    dispatch(addBlogs(formData)).then(() => {
      const usersListData = { page: 1 };
      dispatch(getBlogs(usersListData)).then(() => {
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      });
    });
    notify({ type: "success", messgae: "Data Added Successfully" });
    setValue("title", "");
    setValue("imageAltText", "");
    setValue("pageTitle", "");
    setValue("pageHeading", "");
    setValue("blogCategory", "");
    setDataText("");
  };

  const handleBannerPictures = (e) => {
    setImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleChildData = (childData) => {
    const div = document.createElement("div");
    div.innerHTML = childData;
    const text = div.textContent || div.innerText || "";
    setDataText(text);
  };

  return (
    <div>
      <Grid
        sx={{
          backgroundColor: "#f8f8f8",
          padding: "2.125rem",
        }}
      >
        <Container>
          <Row>
            <Box sx={{ marginBottom: "1.5rem" }}>
              <div>
                <FMButton
                  startIcon={<ArrowBackIcon />}
                  displayText={"Back"}
                  onClick={() => navigate(-1)}
                />
              </div>
            </Box>
            <Box
              style={{
                background: "#fff",
                padding: "20px",
                border: "0.0625rem solid #1a1a1a1f",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                }}
              >
                <FMTypography
                  displayText="Add Blog"
                  styleData={{
                    fontWeight: "600",
                    fontSize: "2rem",
                    textAlign: "center",
                    fontFamily: " 'Inter', sans-serif",
                  }}
                />
              </div>

              <Row>
                <Col>
                  <FMInput
                    required
                    readOnly={false}
                    displayText="Title"
                    id="title"
                    name="title"
                    register={register("title")}
                    customInputLabelStyle={{
                      ...commonStyle.commonModalTitleStyle,
                    }}
                    error={errors.title}
                    errorDisplayText={errors.title?.message}
                  />
                </Col>

                <Col>
                  <FMTypography
                    displayText={"Select Category"}
                    styleData={{
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: "16px",
                      color: "#222222",
                    }}
                  />
                  <FormControl fullWidth sx={{ minWidth: "13rem" }}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      {...register("blogCategory")}
                      placeholder="type"
                      name="blogCategory"
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
                      {blogCategories?.map((elem) => (
                        <MenuItem value={elem?._id}>{elem?.name}</MenuItem>
                      ))}
                    </Select>
                    {errors?.blogCategory && (
                      <FMTypography
                        displayText={errors.blogCategory?.message}
                        styleData={commonStyle.errorText}
                      />
                    )}
                  </FormControl>
                </Col>
              </Row>

              <Row style={{ marginTop: "32px" }}>
                <Col>
                  <FMInput
                    required
                    readOnly={false}
                    displayText="Page Heading"
                    customInputLabelStyle={{
                      ...commonStyle.commonModalTitleStyle,
                    }}
                    id="pageHeading"
                    name="pageHeading"
                    register={register("pageHeading")}
                    error={errors.pageHeading}
                    errorDisplayText={errors.pageHeading?.message}
                  />
                </Col>
                <Col>
                  <FMInput
                    required
                    readOnly={false}
                    displayText="Page Title"
                    id="pageTitle"
                    name="pageTitle"
                    customInputLabelStyle={{
                      ...commonStyle.commonModalTitleStyle,
                    }}
                    register={register("pageTitle")}
                    error={errors.pageTitle}
                    errorDisplayText={errors.pageTitle?.message}
                  />
                </Col>
              </Row>

              <Row style={{ marginTop: "32px" }}>
                <Col>
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

                <Col>
                  <FMInput
                    required
                    readOnly={false}
                    displayText="Image Alt Text"
                    id="imageAltText"
                    customInputLabelStyle={{
                      ...commonStyle.commonModalTitleStyle,
                    }}
                    name="imageAltText"
                    register={register("imageAltText")}
                    error={errors.imageAltText}
                    errorDisplayText={errors.imageAltText?.message}
                  />
                </Col>
                {imagePreview && (
                  <Box className="mt-3">
                    <div style={commonStyle.commonModalTitleStyle}>
                      {`Preview`}{" "}
                    </div>
                    <img
                      src={imagePreview}
                      style={{
                        width: "100px",
                        height: "100px",
                      }}
                    />
                  </Box>
                )}
              </Row>

              <Row style={{ marginTop: "32px" }}>
                <Col>
                  <FMTypography
                    displayText={"Text"}
                    styleData={{
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: "16px",
                      color: "#222222",
                    }}
                  />
                  <Editor onData={handleChildData} />
                </Col>
              </Row>
              <FMButton
                displayText="Add"
                variant="contained"
                disabled={false}
                styleData={{
                  ...commonStyle.commonModalTitleStyle,
                  textTransform: "capitalize",
                  marginTop: "2rem",
                  "&:hover": {
                    border: "none",
                    textDecoration: "none",
                  },
                }}
                onClick={handleSubmit(onSubmit)}
              />
            </Box>
          </Row>
        </Container>
      </Grid>
    </div>
  );
};

export default AddBlogComponent;
