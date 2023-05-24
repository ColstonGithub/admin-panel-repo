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
import { notify } from "constants/utils";
import Editor from "components/ReactQuill/Editor";
import { useNavigate, useParams } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EditBlogs = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const blogCategories = useSelector(
    (state) => state?.blogsCategory?.getBlogCategoryListData?.blogCategoryList
  );

  const blogsDetail = useSelector((state) => state?.blogs?.getBlogsData?.Blogs);
  const [dataText, setDataText] = useState(null);
  const [image, setImage] = useState();
  const [editedBlogsImage, setEditedBlogsImage] = useState();

  useEffect(() => {
    dispatch(getBlogCategory({ page: 1 }));
    dispatch(getBlogsDetail(id));
  }, [id, dispatch]);

  const setCloseDialog = () => {
    setValue("title", "");
    setValue("imageAltText", "");
    setValue("text", "");
    setValue("pageTitle", "");
    setValue("pageHeading", "");
    setValue("blogCategory", "");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(addBlogsSchema),
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      title: blogsDetail?.title,
      text: blogsDetail?.text,
      imageAltText: blogsDetail?.imageAltText,
      pageTitle: blogsDetail?.pageTitle,
      pageHeading: blogsDetail?.pageHeading,
      blogCategory: blogsDetail?.blogCategory,
    });
    setEditedBlogsImage(blogsDetail?.image);
  }, [blogsDetail, reset, setValue]);

  const onSubmit = (data) => {
   // props?.setLoader(true);
    const formData = new FormData();
    formData.append("_id", id);
    formData.append("title", data?.title?.toString());
    formData.append("text", dataText);
    formData.append("imageAltText", data?.imageAltText?.toString());
    formData.append("pageTitle", data?.pageTitle?.toString());
    formData.append("pageHeading", data?.pageHeading?.toString());
    formData.append("blogCategory", data?.blogCategory);
    if (image) formData.append("image", image);

    dispatch(editBlogs(formData))
      .then(() => {
        const usersListData = { page: 1 };
        dispatch(getBlogs(usersListData)).then(() => {
          setTimeout(() => {
            navigate(-1);
          }, 1000);
        });
        notify({ type: "success", messgae: "Data Edited Successfully" });
      })
      .finally(() => {
     //   props?.setLoader(false);
      });
  };

  const handleBannerPictures = (e) => {
    setImage(e.target.files[0]);
    setEditedBlogsImage("");
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleChildData = (childData) => {
    const div = document.createElement("div");
    div.innerHTML = childData;
    const text = div.textContent || div.innerText || "";
    console.log(text);
    setDataText(text);
  };

  // if (!blogCategories || blogCategories.length === 0) {
  //   return <div>Loading...</div>;
  // }

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
                  displayText="Edit Blog"
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
                      defaultValue={blogsDetail?.blogCategory}
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
                <Col md={6}>
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
                <Col md={6}>
                  <FMInput
                    required
                    readOnly={false}
                    customInputLabelStyle={{
                      ...commonStyle.commonModalTitleStyle,
                    }}
                    displayText="Image Alt Text"
                    id="imageAltText"
                    name="imageAltText"
                    register={register("imageAltText")}
                    error={errors.imageAltText}
                    errorDisplayText={errors.imageAltText?.message}
                  />
                </Col>
                <div style={commonStyle.commonModalTitleStyle}>
                  {`Preview`}{" "}
                </div>
                {editedBlogsImage && (
                  <div style={{ width: "auto" }}>
                    <img
                      src={editedBlogsImage}
                      alt="img"
                      width="150px"
                      height="100px"
                    />
                  </div>
                )}
                {imagePreview && (
                  <Box className="mt-3">
                    <img
                      src={imagePreview}
                      style={{
                        width: "200px",
                        height: "200px",
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
                      ...commonStyle.commonModalTitleStyle,marginBottom:"2px"
                    }}
                  />
                  <Editor
                    onData={handleChildData}
                    dataText={blogsDetail?.text}
                  />
                </Col>
              </Row>

              <FMButton
                displayText="Update"
                variant="contained"
                disabled={false}
                styleData={{
                  textTransform: "capitalize",
                  fontFamily: "Inter",
                  fontStyle: "normal",
                  fontWeight: "500",
                  fontSize: "16px",
                  color: "#222222",
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

export default EditBlogs;
