import { Box, Grid, Modal } from "@mui/material";
import FMTypography from "components/FMTypography/FMTypography";
import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import crossIcon from "assets/crossIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getBannerProductDetail } from "redux/Slices/BannerProducts/BannerProducts";

const ProductDetailPage = (props) => {
  const { setOpen, open, id, type } = props;
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const setCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getBannerProductDetail(id));
  }, [id, dispatch]);

  const productData = useSelector(
    (state) => state?.brandProduct?.getBannerProductData?.product
  );

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
            height: "fit-content",
          }}
        >
          <Grid
            sx={{
              backgroundColor: "white",
              width: "36.5rem",
              borderRadius: "0.5rem",
              height: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                boxShadow: " 0px 1px 12px rgba(181, 180, 180, 0.12)",
              }}
            >
              <Col className="col-11">
                <FMTypography
                  displayText={"Product Details"}
                  styleData={{
                    fontWeight: "500",
                    fontSize: "1.125rem",
                    fontFamily: " 'Inter', sans-serif",
                    margin: "1rem",
                    textAlign: "center",
                  }}
                />
              </Col>
              <Col className="col-1">
                <img
                  src={crossIcon}
                  alt="cross-icon"
                  style={{ cursor: "pointer", width: "1rem", margin: "1rem" }}
                  onClick={setCloseDialog}
                />
              </Col>
            </Box>

            <Grid sx={{ margin: "1rem" }}>
              <Row style={{ marginBottom: "1rem" }}>
                <Col>
                  <FMTypography displayText={"Name"} />
                  <FMTypography
                    displayText={productData?.name}
                    styleData={{ color: "#717171" }}
                  />
                </Col>
                <Col>
                  <FMTypography displayText={"Date"} />
                  <FMTypography
                    displayText={moment(productData?.createdAt).format(
                      "DD/MM/YYYY"
                    )}
                    styleData={{ color: "#717171" }}
                  />
                </Col>
              </Row>
{/* 
              <Row style={{ marginBottom: "1rem" }}>
                <Col>
                  <FMTypography displayText={"Amazon Link"} />
                  <FMTypography
                    displayText={productData?.amazonLink}
                    styleData={{ color: "#717171" }}
                  />
                </Col>
                <Col></Col>
              </Row> */}
              <Row style={{ marginBottom: "1rem" }}>
                {productData?.colors?.map((elem, index) => (
                  <Col>
                    <FMTypography displayText={`Color ${index + 1}`} />
                    {/* <div style={{ display: "flex" }}> */}
                    <FMTypography
                      displayText={`-> ${elem?.colorName}`}
                      // styleData={{ color: elem?.colorCode }}
                    />

                    {/* </div> */}
                    {elem?.productPictures?.map((ele, i) => (
                      <Col>
                        <Box sx={{display:"flex"}}>
                          <FMTypography
                            displayText={`-> ${i + 1}`}
                            // styleData={{ color: elem?.colorCode }}
                          />
                          <Box className="mx-2 my-2">
                          <img src={ele.img} alt={ele.imageAltText} style={{width:"100px",height:"50px"}} />
                          </Box>
                        </Box>
                        {/* </div> */}
                      </Col>
                    ))}
                  </Col>
                ))}

         
              </Row>
         <Row>
         <Col>
                  <FMTypography displayText={"PDF"} />
                  <a href={productData?.pdf}>Click to download</a>
                </Col>
         </Row>
              <Row style={{ marginBottom: "1rem" }}>
                <FMTypography displayText={"Specifications:"} />
                <FMTypography
                  displayText={productData?.specification}
                  styleData={{ color: "#717171" }}
                />
              </Row>
              <Row style={{ marginBottom: "1rem" }}>
                <FMTypography displayText={"Description"} />
                <FMTypography
                  displayText={productData?.description}
                  styleData={{ color: "#717171" }}
                />
              </Row>

              <FMTypography
                displayText={"Images:"}
                styleData={{ color: "#717171" }}
              />
              {productData?.productPictures?.map((elem) => (
                <img
                  src={elem?.img}
                  alt="img"
                  width="100px"
                  height="100px"
                  style={{ marginLeft: "2rem" }}
                />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

export default ProductDetailPage;
