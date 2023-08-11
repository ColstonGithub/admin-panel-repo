import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Header from "components/SearchBar/Header";
import { Box, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getExploreCategoryChildren } from "redux/Slices/ExploreCategoryChildren/ExploreCategoryChildren";
import FMTypography from "components/FMTypography/FMTypography";
import detailIcon from "assets/detailIcon.svg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import ExploreCategoryChildrenTableConfig from "./tableConfig";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductDetailPage from "container/DetailPages/ProductsDetailPage";

const CategoryRow = ({
  id,
  index,
  name,
  data,
  image,
  sNo,
  actions,
  moveRow,
}) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "category",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, dropRef] = useDrop({
    accept: "category",
    hover: (item, monitor) => {
      if (item.index !== index) {
        // Swap the positions of the dragged item and the current item
        const draggedIndex = item.index;
        const targetIndex = index;
        moveRow(draggedIndex, targetIndex);
        item.index = targetIndex;
      }
    },
  });

  const opacity = isDragging ? 0.5 : 1;
  const handleMoveUp = () => {
    moveRow(index, index - 1);
  };

  const handleMoveDown = () => {
    moveRow(index, index + 1);
  };

  return (
    <TableRow ref={(node) => dragRef(dropRef(node))} style={{ opacity }}>
      <TableCell>
        <IconButton disabled={index === 0} onClick={handleMoveUp}>
          <ArrowUpward />
        </IconButton>
        <IconButton disabled={index === data} onClick={handleMoveDown}>
          <ArrowDownward />
        </IconButton>
      </TableCell>
      <TableCell>{sNo}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{image}</TableCell>
      <TableCell>{actions}</TableCell>
      {/* Add more cells for other category properties */}
    </TableRow>
  );
};

const CategoryProducts = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const [exploreCatId, setExploreCatId] = React.useState(null);
  const [openExploreCatDetail, setOpenExploreCatDetail] = React.useState(false);
  const [getCategoryProducts, setGetCategoryProducts] = React.useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/product/getProducts/categoryid",
          { id }
        );
        // Handle the response data here
        setGetCategoryProducts(response.data);
        console.log("Fetched category products:", response.data);
      } catch (error) {
        // Handle errors here
        console.error("Error fetching category products:", error);
      }
    };

    fetchCategoryProducts();
  }, [id]);
  console.log("Fetched category products:", getCategoryProducts);
  useEffect(() => {
    dispatch(getExploreCategoryChildren(id));
  }, [dispatch, id]);
  const [data, setData] = useState([getCategoryProducts]);

  useEffect(() => {
    setData(getCategoryProducts);
  }, [getCategoryProducts]);

  useEffect(() => {
    if (exploreCatId !== null && exploreCatId) {
      setOpenExploreCatDetail(true);
    }
  }, [exploreCatId]);

  const exploreCatdetailPageHandler = (cId) => {
    setExploreCatId(cId);
    // cId.stopPropagation();
  };

  const navigate = useNavigate();
  const moveRow = (fromIndex, toIndex) => {
    const newData = [...data?.products];
    const movedItem = newData.splice(fromIndex, 1)[0];
    newData.splice(toIndex, 0, movedItem);
    setData(newData);
  };

  const handleSaveOrder = async () => {
    const categoryOrder = data?.products?.map((category) => category?._id);
    try {
      await axios
        .patch("http://64.227.150.49:5000/api/product/updateOrder", {
          categoryOrder,
        })
        .then((response) => {
          dispatch(getExploreCategoryChildren(id));
        }); // Use the correct API endpoint
    } catch (error) {
      dispatch(getExploreCategoryChildren(id));
      console.error("Error saving order:", error);
    }
  };

  return (
    <>
      <Header />

      <Grid sx={{ padding: "5rem" }}>
        <Box
          sx={{
            padding: "0 2rem 2rem 2rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ArrowBackIcon
            sx={{ marginRight: "3rem", cursor: "pointer" }}
            onClick={() => navigate(-1)}
          />
          <FMTypography
            displayText={
              getCategoryProducts && getCategoryProducts?.pageTitle
                ? getCategoryProducts?.pageTitle
                : ""
            }
            styleData={{ fontSize: "2rem", fontFamily: "Inter" }}
          />
        </Box>
        <Box>
          <DndProvider backend={HTML5Backend}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order</TableCell>
                    <TableCell>S.No.</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Actions</TableCell>
                    {/* Add more cells for other category properties */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data &&
                    data?.products?.map((element, index) => (
                      <CategoryRow
                        key={element?._id}
                        id={element?._id}
                        data={data?.products?.length - 1}
                        index={index}
                        name={element?.name}
                        image={
                          <Grid style={{ display: "flex" }}>
                            <img
                              src={element?.productPictures?.[0]?.img}
                              alt="img"
                              width="50px"
                              height="40px"
                              className="img-responsive img-fluid"
                              loading="lazy"
                            />
                          </Grid>
                        }
                        sNo={index + 1}
                        actions={
                          <Grid>
                            <img
                              src={detailIcon}
                              alt="img"
                              width="20px"
                              height="20px"
                              className="img-responsive img-fluid "
                              loading="lazy"
                              onClick={() =>
                                exploreCatdetailPageHandler(element?._id)
                              }
                              style={{ cursor: "pointer" }}
                            />
                          </Grid>
                        }
                        moveRow={moveRow}
                      />
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              variant="contained"
              onClick={handleSaveOrder}
              style={{ marginTop: "16px" }}
            >
              Save Order
            </Button>
          </DndProvider>
        </Box>
      </Grid>

      <ProductDetailPage
        open={openExploreCatDetail}
        setOpen={() => {
          setOpenExploreCatDetail(false);
          setExploreCatId(null);
        }}
        id={exploreCatId}
        type="brandProductString"
      />
    </>
  );
};

export default CategoryProducts;
