import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Box,
  Button,
  FormControl,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import FMButton from "components/FMButton/FMButton";

import FMTypography from "components/FMTypography/FMTypography";
import FMInput from "components/FMInput/FMInput";

import crossIcon from "assets/crossIcon.svg";

import { Col, Container, Row } from "react-bootstrap";

import { addProductSchema } from "validationSchema/HomePage/AddBannerSchema";
import { getHomePageCategories } from "redux/Slices/HomePage/HomePageCategories";
import {
  addProducts,
  getBannerProducts,
} from "redux/Slices/BannerProducts/BannerProducts";

import { useNavigate } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { notify } from "constants/utils";
import { commonStyle } from "Styles/commonStyles";
const AddProductComponent = () => {
  const navigate = useNavigate();
  const [imageAltText, setImageAltText] = useState([""]);
  
  const productListingData = useSelector(
    (state) => state?.exploreCategories?.getCategoriesListData?.categoryList
  );
  

  const [banner, setBanner] = useState([""]);
  const [productPdf, setProductPdf] = useState("");
  const dispatch = useDispatch();
  const [categoryId, setCategoryId] = useState("");
  const [productFile, setProductFile] = useState([]);

  const [pdfFile, setPdfFile] = useState();

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

  const handleColorNameChange = (event, index) => {
    const newColors = [...colors];
    newColors[index].name = event.target.value;
    setColors(newColors);
  };

  const handleImgChange = (event, colorIndex, pictureIndex) => {
    //    setBanner([...banner, event.target.files[0]]);
    setColors((colors) => {
      const newColors = [...colors];
      newColors[colorIndex].productPictures[pictureIndex].img =
        event.target.files[0];
      newColors[colorIndex].productPictures[pictureIndex].picturePreview =
        URL.createObjectURL(event.target.files[0]);
      return newColors;
    });
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
  }, []);

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

  const onSubmit = (data) => {
    const formData = new FormData();
    if (data?.name) formData.append("name", data.name?.toString());

    if (data?.description)
      formData.append("description", data.description?.toString());

    if (categoryId) formData.append("category", categoryId);
    // formData.append("amazonLink", data?.amazonLink?.toString());
    if (data?.specification)
      formData.append("specification", data.specification?.toString());

    if (productPdf) formData.append("pdf", productPdf);

    if (bannerPicture && bannerPicture?.length > 1) {
      bannerPicture?.map((file, index) => {
        return {
          img: formData.append("productPicture", file.img),
          imageAltText: formData.append("imageAltText", file.imageAltText),
        };
      });
    } else if (bannerPicture && bannerPicture?.length === 1) {
      bannerPicture[0]?.img &&
        formData.append("productPicture", bannerPicture[0]?.img);
      bannerPicture[0]?.imageAltText &&
        formData.append("imageAltText", bannerPicture[0]?.imageAltText);
    }

    if (colors && colors?.length > 0) {
      colors?.map((color, index) => {
        const productPictures = color?.productPictures?.map((picture, i) => {
          return {
            img: formData.append(`colorPicture${index}`, picture.img),
            colorImageAltText: formData.append(
              "colorImageAltText",
              picture.colorImageAltText
            ),
          };
        });

        return {
          colorName: formData.append("colorName", [color?.name]),
          productPictures,
        };
      });
    }

    dispatch(addProducts(formData)).then(() => {
      const usersListData = { page: 1 };
      dispatch(getBannerProducts(usersListData)).then(() => {
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      });
    });
    notify({ type: "success", messgae: "Data Added Successfully" });
    setValue("name", "");
    setValue("description", "");
    setValue("category", "");
    setValue("specification", "");
  };

  const handleBannerPictures = (e, i) => {
    setBannerPicture((bannerPicture) => {
      const newBannerPicture = [...bannerPicture];
      newBannerPicture[i].img = e.target.files[0];
      newBannerPicture[i].picturePreview = URL.createObjectURL(
        e.target.files[0]
      );
      return newBannerPicture;
    });
  };

  const handleImageAltText = (event, i) => {
    setBannerPicture((bannerPicture) => {
      const newBannerPicture = [...bannerPicture];
      newBannerPicture[i].imageAltText = event.target.value;
      return newBannerPicture;
    });
  };

  const handleBannerPdf = (e) => {
    setProductPdf(e.target.files[0]);
    setPdfFile(URL.createObjectURL(e.target.files[0]));
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
                displayText="Add Product"
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
                  defaultValue=""
                  id="grouped-native-select"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option></option>
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

            <Col
              md={12}
              style={{
                marginTop: "2rem",
                border: "0.0625rem solid rgba(26, 26, 26, 0.12)",
                borderRadius: "0.5rem",
                padding: "0.625rem 0.875rem",
              }}
            >
              {pdfFile && (
                <Box
                  sx={{
                    margin: "1rem 0",
                  }}
                >
                  <FMTypography
                    displayText={"Pdf Preview"}
                    styleData={{
                      color: "#a3a3a3",
                      fontSize: "14px",
                      marginBottom: "10px",
                    }}
                  />
                  <embed
                    src={pdfFile}
                    type="application/pdf"
                    frameBorder="0"
                    scrolling="auto"
                    height="400px"
                    width="100%"
                  ></embed>
                </Box>
              )}

              <FMInput
                type="file"
                required
                customInputStyle={{
                  marginTop: "10px",
                }}
                readOnly={false}
                accept="application/pdf"
                displayText={`Upload Pdf`}
                id="pdf"
                name="pdf"
                onChange={handleBannerPdf}
              />
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
              {colors?.map((color, colorIndex) => (
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
                        value={color.name}
                        onChange={(event) =>
                          handleColorNameChange(event, colorIndex)
                        }
                      />
                    </Box>

                    {color?.productPictures?.map((picture, pictureIndex) =>
                      picture ? (
                        <Box key={pictureIndex}>
                          {picture.picturePreview && (
                            <Box className="m-3">
                              <div>{`Image Preview ${pictureIndex + 1}`}</div>
                              <img
                                src={picture.picturePreview}
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
              <h5>Add atleast 4 Pictures</h5>
              <Box>
                {bannerPicture?.map((picture, index) => (
                  <Row key={index}>
                    {picture?.picturePreview && (
                      <Box className="m-3">
                        <div>{`Image Preview ${index + 1}`} </div>
                        <img
                          src={picture?.picturePreview}
                          style={{
                            width: "200px",
                            height: "200px",
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
              displayText="Add Product"
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
        </Container>
      </Grid>
    </div>
  );
};

export default AddProductComponent;
