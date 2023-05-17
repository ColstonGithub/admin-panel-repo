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
import { notify } from "constants/utils";
import { addHomepageExploreCat, getHomePageExploreCat } from "redux/Slices/HomePage/HomepageExploreCategory";
import { addHomepageExploreCategorySchema } from "validationSchema/AddHomepageExploreCatSchema";
import { getHomePageCategories } from "redux/Slices/HomePage/HomePageCategories";


const AddHomepageExploreCategoryComponent = (props) => {
  const { setOpen, open, } = props;

  const homepageCategoriess = useSelector(
    (state) => state?.exploreCategories?.getCategoriesListData?.categoryList
  );

  console.log("homepageCategoriess",homepageCategoriess)
  const dispatch = useDispatch();

  useEffect(() => {
    const usersListData = { page: 1 };
    dispatch(getHomePageCategories(usersListData));
  }, [dispatch]);

  const handleClose = () => {
    setValue("name", "");
  };
  const setCloseDialog = () => {
    setOpen(false);
    setValue("name", "");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(addHomepageExploreCategorySchema),
    mode: "onChange",
  });




  const [previewSource, setPreviewSource] = useState("");
  const [productTypes, setProductTypes] = React.useState("");
  const [imgFile, setImgFile] = React.useState([]);


  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setImgFile(e.target.files[0]);
    
    previewFile(file);
  };
  

  const handleChange = (event) => {
    setProductTypes(event.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };



const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("imageTitle", data?.imageTitle?.toString());
    formData.append("imageAltText", data?.imageAltText?.toString());
    
    formData.append("categoryId", productTypes?.toString());
    formData.append("image", imgFile);
    
    dispatch(addHomepageExploreCat(formData)).then(() => {
      const usersListData = { page: 1 };
      dispatch(getHomePageExploreCat(usersListData));
      setOpen(false);
      formData.append("title", "");
      formData.append("imageAltText", "");
      formData.append("image", "");
      formData.append("text", "");
    });
    notify({ type: "success", messgae: "Data Added Successfully" });
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
              displayText="Add FAQ Category"
              styleData={{
                fontWeight: "600",
                fontSize: "1.125rem",
                marginBottom: "1.5rem",
                fontFamily: " 'Poppins', sans-serif",
              }}
            />

            <Container>
              <Row style={{ marginBottom: "1rem" }}>
                <Col>
                  <FMInput
                    required
                    readOnly={false}
                    displayText="Image Title"
                    id="imageTitle"
                    name="imageTitle"
                    register={register("imageTitle")}
                    error={errors.imageTitle}
                    errorDisplayText={errors.imageTitle?.message}
                  />
                </Col>
              </Row>
              <Row>
              <Col  style={{marginBottom:'1rem'}}> 
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
              <Col>
                <FMTypography displayText={"Select Category"} />
                <FormControl fullWidth sx={{ minWidth: "13rem" }}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={productTypes}
                    onChange={handleChange}
                    placeholder="type"
                    name="type"
                    error={errors.type}
                    // errorDisplayText={errors.type?.message}
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
                    {homepageCategoriess?.map((elem) => (
                      <MenuItem value={elem?._id}>{elem?.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Col>
              </Row>

              <Row>
                <Col>
                {previewSource && (
                    <img
                      src={previewSource}
                      alt="Preview"
                      style={{ height: "80px", display:'block' }}
                    />
                  )}
                  <input type="file" onChange={handleFileInputChange} accept="image/*" />
                 

                </Col>
              
              </Row>

              <FMButton
                displayText="Add"
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

export default AddHomepageExploreCategoryComponent;
