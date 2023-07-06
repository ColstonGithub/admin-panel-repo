import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Grid,
  Modal,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";

import FMButton from "components/FMButton/FMButton";
// import FMInputLabel from "Components/FMInputLabel";
import FMTypography from "components/FMTypography/FMTypography";
import FMInput from "components/FMInput/FMInput";
// import FMInput from "Components/FMInput/FMInput";
import crossIcon from "assets/crossIcon.svg";
import { Col, Container, Row } from "react-bootstrap";
import { addProductSchema } from "validationSchema/HomePage/AddBannerSchema";
import { getHomePageCategories } from "redux/Slices/HomePage/HomePageCategories";
import {
  editProducts,
  getBannerProducts,
  getBannerProductDetail,
} from "redux/Slices/BannerProducts/BannerProducts";
import { useParams, useNavigate } from "react-router";
import { commonStyle } from "Styles/commonStyles";

const EditProductComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productPdf, setProductPdf] = useState("");
  const dispatch = useDispatch();

  const [categoryId, setCategoryId] = useState("");
  const [pdfPreview, setPdfPreview] = useState("");
  const [imageAltText, setImageAltText] = useState([""]);

  const [preColors, setPreColors] = useState([
    {
      name: "",
      productPictures: [
        {
          img: "",
          colorImageAltText: "",
          picturePreview: "",
        },
      ],
    },
  ]);

  const [colors, setColors] = useState([
    {
      name: "",
      productPictures: [
        {
          img: "",
          colorImageAltText: "",
          picturePreview: "",
        },
      ],
    },
  ]);
  const [bannerPicture, setBannerPicture] = useState([
    {
      img: "",
      imageAltText: "",
      picturePreview: "",
    },
  ]);

  const [preBannerPicture, setPreBannerPicture] = useState([
    {
      img: "",
      imageAltText: "",
      picturePreview: "",
    },
  ]);

  const productListingData = useSelector(
    (state) => state?.exploreCategories?.getCategoriesListData?.categoryList
  );

  const handleColorNameChange = (event, index) => {
    const newColors = [...colors];
    newColors[index].name = event.target.value;
    setColors(newColors);
  };

  const handleImgChange = (event, colorIndex, pictureIndex) => {
    setColors((colors) => {
      const newColors = [...colors];
      newColors[colorIndex].productPictures[pictureIndex].img =
        event.target.files[0];
      newColors[colorIndex].productPictures[pictureIndex].picturePreview =
        URL.createObjectURL(event.target.files[0]);
      return newColors;
    });
    setPreColors("");
  };

  const handleColorImageAltTextChange = (event, colorIndex, pictureIndex) => {
    setColors((colors) => {
      const newColors = [...colors];
      newColors[colorIndex].productPictures[pictureIndex].colorImageAltText =
        event.target.value;
      return newColors;
    });
  };

  const addColor = () => {
    setColors([
      ...colors,
      {
        name: "",
        productPictures: [
          {
            img: "",
            colorImageAltText: "",
            picturePreview: "",
          },
        ],
      },
    ]);
  };

  const addProductPicture = (colorIndex) => {
    setColors((colors) => {
      const newState = [...colors];
      newState[colorIndex].productPictures.push([
        {
          img: "",
          colorImageAltText: "",
          picturePreview: "",
        },
      ]);
      return newState;
    });
  };

  const onRemovePicture = (colorIndex, pictureIndex) => {
    const list = [...colors];
    list[colorIndex].productPictures.splice(pictureIndex, 1);
    setColors(list);
  };

  const onRemoveBannerPicture = (index) => {
    const inputList = [...bannerPicture];
    inputList.splice(index, 1);
    setBannerPicture(inputList);
    const list2 = [...imageAltText];
    list2.splice(index, 1);
    setImageAltText(list2);
  };

  const onRemoveColor = (colorIndex) => {
    const list = [...colors];
    list.splice(colorIndex, 1);
    setColors(list);
  };

  useEffect(() => {
    const usersListData = { page: 1 };
    dispatch(getHomePageCategories(usersListData));
    dispatch(getBannerProductDetail(id));
  }, [id, dispatch]);

  const productData = useSelector(
    (state) => state?.brandProduct?.getBannerProductData?.product
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(addProductSchema),
    mode: "onChange",
  });

  const handleBannerPictures = (e, i) => {
    setBannerPicture((bannerPicture) => {
      const newBannerPicture = [...bannerPicture];
      newBannerPicture[i].img = e.target.files[0];
      newBannerPicture[i].picturePreview = URL.createObjectURL(
        e.target.files[0]
      );
      return newBannerPicture;
    });
    setPreBannerPicture("");
  };
  const handleImageAltText = (event, i) => {
    setBannerPicture((bannerPicture) => {
      const newBannerPicture = [...bannerPicture];
      newBannerPicture[i].imageAltText = event.target.value;
      return newBannerPicture;
    });
  };
  const addBannerPicture = () => {
    setBannerPicture([
      ...bannerPicture,
      {
        img: "",
        imageAltText: "",
        picturePreview: "",
      },
    ]);
  };

  const handleBannerPdf = (e) => {
    setProductPdf(e.target.files[0]);
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    if (data?.name) formData.append("name", data?.name?.toString());
    if (data?.description)
      formData.append("description", data?.description?.toString());
    if (id) formData.append("_id", id?.toString());
    if (categoryId) formData.append("category", categoryId);
    if (data?.specification)
      formData.append("specification", data?.specification?.toString());
    if (productPdf) formData.append("pdf", productPdf);

    if (bannerPicture != [] && bannerPicture?.length > 1) {
      console.log("bannerPicture 1 ", bannerPicture);
      bannerPicture?.map((file, index) => {
        return {
          img: formData.append("productPicture", file?.img),
          imageAltText: formData.append("imageAltText", file?.imageAltText),
        };
      });
    } else if (bannerPicture[0]?.img != "" && bannerPicture?.length === 1) {
      console.log("bannerPicture 2 ", bannerPicture);
      bannerPicture[0]?.img &&
        formData.append("productPicture", bannerPicture[0]?.img);
      bannerPicture[0]?.imageAltText &&
        formData.append(
          "imageAltText",
          bannerPicture[0]?.imageAltText
            ? bannerPicture[0]?.imageAltText
            : "alt text"
        );
    }

    if (colors && colors?.length > 0) {
      colors?.map((color, index) => {
        const productPictures = color?.productPictures?.map((picture, i) => {
          return {
            img: formData.append(`colorPicture${index}`, picture?.img),
            colorImageAltText: formData.append(
              "colorImageAltText",
              picture?.colorImageAltText
            ),
          };
        });

        return {
          colorName: formData.append("colorName", [color?.name]),
          productPictures,
        };
      });
    }

    dispatch(editProducts(formData)).then(() => {
      const usersListData = { page: 1 };
      dispatch(getBannerProducts(usersListData)).then(() => {
        setTimeout(() => {
          navigate(-1);
        }, 1000);
        toast("product updated successfully redirecting to previous page");
      });
    });
  };

  useEffect(() => {
    reset({
      name: productData?.name,
      description: productData?.description,
      specification: productData?.specification,
      category: productData?.category,
      setBannerPicture,
    });
    const filename = productData?.pdf?.replace("http://localhost:5000/", "");
    setPdfPreview(filename);
    setPreColors(productData?.colors);
    setPreBannerPicture(productData?.productPictures);
    setCategoryId(productData?.category);
  }, [productData, reset]);

  return (
    <div>
      <Grid
        sx={{
          backgroundColor: "#f8f8f8",
          padding: "2.125rem",
        }}
      >
        <Container>
          <Box sx={{ marginBottom: "1.5rem" }}>
            <div>
              <FMButton
                startIcon={<ArrowBackIcon />}
                displayText={"Back"}
                onClick={() => navigate(-1)}
              />
            </div>
          </Box>
          <Row
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
                displayText="Edit Product"
                styleData={{
                  fontWeight: "600",
                  fontSize: "2rem",
                  textAlign: "center",
                  fontFamily: " 'Inter', sans-serif",
                }}
              />
            </div>
            <Col md={6}>
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

            <Col md={6}>
              <FMTypography
                displayText={"Select Category"}
                styleData={{ color: "#a3a3a3", fontSize: "14px" }}
              />
              <FormControl fullWidth sx={{ minWidth: "13rem" }}>
                <Select
                  sx={{
                    height: "2.5rem",
                    marginTop: ".3rem",
                    border: "0.0625rem solid #1a1a1a1f",
                    "&:hover": { border: "0.0625rem solid #1a1a1a1f" },
                    "& .MuiSelect-root": {
                      border: "0.0625rem solid #1a1a1a1f",
                    },
                  }}
                  native
                  defaultValue={"categoryId"}
                  id="grouped-native-select"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option aria-label="None" value="Select Category" />
                  {productListingData?.map((option) => (
                    <optgroup key={option._id} label={option.name}>
                      {option?.children.map((e) => (
                        <option value={e?._id}>{e.name}</option>
                      ))}
                    </optgroup>
                  ))}
                </Select>
              </FormControl>
            </Col>

            <Col md={6} style={{ marginTop: "2rem" }}>
              <FMInput
                type="file"
                required
                readOnly={false}
                accept="application/pdf"
                displayText={`Pdf`}
                id="pdf"
                name="pdf"
                onChange={(e) => handleBannerPdf(e)}
              />

              {pdfPreview && (
                <div style={{ width: "auto", marginTop: "10px" }}>
                  <FMTypography
                    displayText={"PDF Name"}
                    styleData={{
                      color: "#a3a3a3",
                      fontSize: "0.875rem",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: "500",
                    }}
                  />
                  <FMTypography
                    displayText={pdfPreview}
                    styleData={{ color: "#222", fontSize: "14px" }}
                  />
                </div>
              )}
            </Col>
            <Row style={{ marginTop: "2rem" }}>
              <FMTypography
                displayText={"Specifications"}
                styleData={{
                  ...commonStyle.commonModalTitleStyle,
                  marginLeft: "-11px",
                  opacity: "0.9",
                  marginBottom: "4px",
                }}
              />
              <TextField
                required
                multiline
                rows={3}
                id="specification"
                name="specification"
                {...register("specification")}
              />
            </Row>
            <Row style={{ marginTop: "2rem" }}>
              <FMTypography
                displayText={"Description"}
                styleData={{
                  ...commonStyle.commonModalTitleStyle,
                  marginLeft: "-11px",
                  opacity: "0.9",
                  marginBottom: "4px",
                }}
              />
              <TextField
                required
                multiline
                rows={3}
                id="description"
                name="description"
                {...register("description")}
              />
            </Row>

            <Col
              md={12}
              style={{
                border: "0.0625rem solid #1a1a1a1f",
                borderRadius: "0.5rem",
                marginTop: "2rem",
                padding: "0.625rem 0.875rem",
              }}
            >
              <h5>Add Upto 4 Color Variant </h5>

              {preColors &&
                preColors?.map((color, colorIndex) => (
                  <div key={colorIndex}>
                    <Box
                      style={{
                        border: "0.0625rem solid #1a1a1a1f",
                        borderRadius: "0.5rem",
                        margin: "10px 0",
                        padding: "0.625rem 0.875rem",
                        display: "flex",
                      }}
                    >
                      <Box>
                        <FMTypography
                          displayText={`Color Name ${colorIndex + 1}`}
                          styleData={{
                            color: "#a3a3a3",
                            fontSize: "0.875rem",
                            fontWeight: "500",
                            fontFamily: " 'Inter', sans-serif",
                          }}
                        />

                        <FMTypography
                          displayText={color.colorName}
                          styleData={{
                            color: "#222",
                            fontSize: "14px",
                            fontFamily: " 'Inter', sans-serif",
                          }}
                        />
                      </Box>

                      {color?.productPictures?.map((picture, pictureIndex) =>
                        picture ? (
                          <Box key={pictureIndex} className="mx-5">
                            {picture.img && (
                              <Box className="mb-2">
                                <FMTypography
                                  displayText={`Image ${pictureIndex + 1}`}
                                  styleData={{
                                    color: "#a3a3a3",
                                    fontSize: "0.875rem",
                                    fontFamily: " 'Inter', sans-serif",
                                    fontWeight: "500",
                                  }}
                                />
                                <img
                                  src={
                                    !picture.picturePreview
                                      ? picture.img
                                      : picture.picturePreview
                                  }
                                  style={{
                                    width: "200px",
                                    height: "200px",
                                  }}
                                />
                              </Box>
                            )}

                            <FMTypography
                              displayText={`Color Image Alt Text ${
                                pictureIndex + 1
                              }`}
                              styleData={{
                                color: "#a3a3a3",
                                fontSize: "0.875rem",
                                fontFamily: " 'Inter', sans-serif",
                                fontWeight: "500",
                              }}
                            />
                            <FMTypography
                              displayText={picture?.colorImageAltText}
                              styleData={{
                                color: "#222",
                                fontSize: "14px",
                                fontFamily: " 'Inter', sans-serif",
                              }}
                            />
                          </Box>
                        ) : (
                          <></>
                        )
                      )}
                    </Box>
                  </div>
                ))}

              {colors &&
                colors?.map((color, colorIndex) => (
                  <div key={colorIndex}>
                    <Box
                      style={{
                        border: "0.0625rem solid #1a1a1a1f",
                        borderRadius: "0.5rem",
                        margin: "10px 0",
                        padding: "0.625rem 0.875rem",
                      }}
                    >
                      <Box>
                        <FMInput
                          required
                          readOnly={false}
                          displayText={`Color Name ${colorIndex + 1}`}
                          id="colorName"
                          name="colorName"
                          style={{ marginBottom: "10px" }}
                          value={color.colorName}
                          onChange={(event) =>
                            handleColorNameChange(event, colorIndex)
                          }
                        />
                      </Box>
                      {color?.productPictures?.map((picture, pictureIndex) =>
                        picture ? (
                          <Box key={pictureIndex}>
                            {picture.img && (
                              <Box className="mb-3">
                                <FMTypography
                                  displayText={`Preview ${pictureIndex + 1}`}
                                  styleData={{
                                    color: "#a3a3a3",
                                    fontSize: "0.875rem",
                                    fontFamily: " 'Inter', sans-serif",
                                    fontWeight: "500",
                                  }}
                                />
                                <img
                                  src={
                                    !picture.picturePreview
                                      ? picture.img
                                      : picture.picturePreview
                                  }
                                  style={{
                                    width: "200px",
                                    height: "200px",
                                  }}
                                />
                              </Box>
                            )}
                            <Row>
                              <Col md={6}>
                                <FMInput
                                  type="file"
                                  required
                                  readOnly={false}
                                  accept="image/*"
                                  displayText={`Color Picture ${
                                    pictureIndex + 1
                                  }`}
                                  id="colorPicture"
                                  name="colorPicture"
                                  onChange={(event) =>
                                    handleImgChange(
                                      event,
                                      colorIndex,
                                      pictureIndex
                                    )
                                  }
                                />
                              </Col>
                              <Col md={6}>
                                <FMInput
                                  required
                                  readOnly={false}
                                  value={picture?.colorImageAltText}
                                  displayText="Image Alt Text"
                                  id="colorImageAltText"
                                  name="colorImageAltText"
                                  onChange={(event) =>
                                    handleColorImageAltTextChange(
                                      event,
                                      colorIndex,
                                      pictureIndex
                                    )
                                  }
                                />
                              </Col>
                            </Row>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                paddingTop: "10px",
                              }}
                            >
                              <Button
                                onClick={() =>
                                  onRemovePicture(colorIndex, pictureIndex)
                                }
                              >
                                <img
                                  src={crossIcon}
                                  alt="cross-icon"
                                  style={{
                                    cursor: "pointer",
                                    width: "1rem",
                                  }}
                                />
                              </Button>
                            </Box>
                          </Box>
                        ) : (
                          <></>
                        )
                      )}
                      <Box>
                        <FMButton
                          displayText="Add Color Picture"
                          variant="contained"
                          disabled={false}
                          styleData={{
                            textTransform: "capitalize",
                            "&:hover": {
                              border: "none",
                              textDecoration: "none",
                            },
                          }}
                          onClick={() => addProductPicture(colorIndex)}
                        />
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        padding: "5px 0px 20px 0px",
                      }}
                    >
                      <Button onClick={() => onRemoveColor(colorIndex)}>
                        <img
                          src={crossIcon}
                          alt="cross-icon"
                          style={{ cursor: "pointer", width: "1rem" }}
                        />
                      </Button>
                    </Box>
                  </div>
                ))}

              <Box>
                <FMButton
                  displayText="Add Color"
                  variant="contained"
                  disabled={false}
                  styleData={{
                    textTransform: "capitalize",
                    marginBottom: "20px",
                    "&:hover": {
                      border: "none",
                      textDecoration: "none",
                    },
                  }}
                  onClick={addColor}
                />
              </Box>
            </Col>

            <Col
              md={12}
              style={{
                border: "0.0625rem solid #1a1a1a1f",
                borderRadius: "0.5rem",
                marginTop: "2rem",
                padding: "0.625rem 0.875rem",
              }}
            >
              <Box>
                <h5>Add atleast 4 Pictures</h5>
                <Box className="d-flex">
                  {preBannerPicture &&
                    preBannerPicture?.map(
                      (pic, index) =>
                        pic?.img && (
                          <Box className="d-flex me-4 mb-3">
                            <Box>
                              <FMTypography
                                displayText={`Image ${index + 1}`}
                                styleData={{
                                  color: "#a3a3a3",
                                  fontFamily: " 'Inter', sans-serif",
                                  fontSize: "0.875rem",
                                  fontWeight: "500",
                                }}
                              />
                              <img
                                src={pic.img ? pic.img : pic.picturePreview}
                                style={{
                                  width: "70px",
                                  height: "50px",
                                }}
                              />
                              <FMTypography
                                displayText={`Image Alt Text ${index + 1}`}
                                styleData={{
                                  color: "#a3a3a3",
                                  fontSize: "0.875rem",
                                  fontWeight: "500",
                                  fontFamily: " 'Inter', sans-serif",
                                  marginTop: "10px",
                                }}
                              />
                              <FMTypography
                                displayText={pic?.imageAltText}
                                styleData={{
                                  color: "#222",
                                  fontSize: "14px",
                                  fontFamily: " 'Inter', sans-serif",
                                }}
                              />{" "}
                            </Box>{" "}
                          </Box>
                        )
                    )}
                </Box>
                {bannerPicture?.map((picture, index) => (
                  <Row key={index}>
                    {picture?.img && (
                      <Box className="mb-3">
                        <FMTypography
                          displayText={`Preview ${index + 1}`}
                          styleData={{
                            color: "#a3a3a3",
                            fontSize: "0.875rem",
                            fontFamily: " 'Inter', sans-serif",
                            fontWeight: "500",
                          }}
                        />
                        <img
                          src={picture.picturePreview}
                          style={{
                            width: "70px",
                            height: "50px",
                          }}
                        />
                      </Box>
                    )}
                    <Col md={6}>
                      <FMInput
                        type="file"
                        required
                        readOnly={false}
                        accept="image/*"
                        displayText={`Picture ${index + 1}`}
                        id="banner"
                        name="banner"
                        onChange={(event) => handleBannerPictures(event, index)}
                      />
                    </Col>

                    <Col md={6}>
                      <FMInput
                        required
                        readOnly={false}
                        displayText="Image Alt Text"
                        value={picture.imageAltText}
                        name="imageAltText"
                        id="imageAltText"
                        error={errors.imageAltText}
                        errorDisplayText={errors.imageAltText?.message}
                        onChange={(e) => handleImageAltText(e, index)}
                      />
                    </Col>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        paddingTop: "10px",
                      }}
                    >
                      <Button onClick={() => onRemoveBannerPicture(index)}>
                        <img
                          src={crossIcon}
                          alt="cross-icon"
                          style={{
                            cursor: "pointer",
                            width: "1rem",
                          }}
                        />
                      </Button>
                    </Box>
                  </Row>
                ))}

                <Box>
                  <FMButton
                    displayText="Add Picture"
                    variant="contained"
                    disabled={false}
                    styleData={{
                      textTransform: "capitalize",
                      "&:hover": {
                        border: "none",
                        textDecoration: "none",
                      },
                    }}
                    onClick={addBannerPicture}
                  />
                </Box>
              </Box>
            </Col>
            <FMButton
              displayText="Update"
              type="submit"
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
          </Row>
          <ToastContainer />
        </Container>
      </Grid>
    </div>
  );
};

export default EditProductComponent;
