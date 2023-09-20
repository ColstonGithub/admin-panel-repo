import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  ArrowUpward,
  ArrowDownward,
} from "@mui/icons-material";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Header from "components/SearchBar/Header";
import FMTypography from "components/FMTypography/FMTypography";
import ProductDetailPage from "container/DetailPages/ProductsDetailPage";
import { InfinitySpin } from "react-loader-spinner";
import { getInitialImagesAdmin } from "redux/Slices/InitialImagesAdmin/InitialImagesAdminSlice";
import { useDispatch, useSelector } from "react-redux";

const CategoryRow = ({
  id,
  index,
  name,
  image,
  actions,
  moveRow,
  dataLength,
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
        const draggedIndex = item.index;
        const targetIndex = index;
        moveRow(draggedIndex, targetIndex);
        item.index = targetIndex;
      }
    },
  });

  const opacity = isDragging ? 0.5 : 1;
  return (
    <TableRow ref={(node) => dragRef(dropRef(node))} style={{ opacity }}>
      <TableCell>
        <IconButton
          disabled={index === 0}
          onClick={() => moveRow(index, index - 1)}
        >
          <ArrowUpward />
        </IconButton>
        <IconButton
          disabled={index === dataLength - 1}
          onClick={() => moveRow(index, index + 1)}
        >
          <ArrowDownward />
        </IconButton>
      </TableCell>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{image}</TableCell>
      <TableCell>{actions}</TableCell>
    </TableRow>
  );
};

const CategoryProducts = () => {
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();
  const [openExploreCatDetail, setOpenExploreCatDetail] = useState(false);
  const [getCategoryProducts, setGetCategoryProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [exploreCatId, setExploreCatId] = React.useState(null);
  const navigate = useNavigate();

  const initialImagesAdmin = useSelector(
    (state) => state?.InitialImagesAdmin?.initialImagesAdmin?.initialImages
  );

  const detailIcon = initialImagesAdmin && initialImagesAdmin[9]?.image;

  const fetchCategoryProducts = async () => {
    try {
      const response = await axios.post(
        "https://colstonconcepts.com:5000/api/product/getProducts/categoryid",
        { id }
      );
      setGetCategoryProducts(response.data);
      setIsLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.error("Error fetching category products:", error);
      setIsLoading(false); // Set loading to false even on error
    }
  };
  useEffect(() => {
    fetchCategoryProducts();
  }, [id]);

  const moveRow = (fromIndex, toIndex) => {
    const newData = [...getCategoryProducts.products];
    const movedItem = newData.splice(fromIndex, 1)[0];
    newData.splice(toIndex, 0, movedItem);
    setGetCategoryProducts({ ...getCategoryProducts, products: newData });
  };
  const handleSaveOrder = async () => {
    const productOrder = getCategoryProducts?.products?.map(
      (category) => category?._id
    );
    try {
      await axios.patch(
        "https://colstonconcepts.com:5000/api/product/updateOrder",
        {
          productOrder,
        }
      );
      fetchCategoryProducts();
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };
  useEffect(() => {
    if (exploreCatId !== null && exploreCatId) {
      setOpenExploreCatDetail(true);
    }
  }, [exploreCatId]);

  const exploreCatdetailPageHandler = (cId) => {
    setExploreCatId(cId);
    // cId.stopPropagation();
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
            displayText={getCategoryProducts?.pageTitle || ""}
            styleData={{ fontSize: "2rem", fontFamily: "Inter" }}
          />
        </Box>
        <Box>
          <DndProvider backend={HTML5Backend}>
            {isLoading && isLoading ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="300px"
              >
                <InfinitySpin />
              </Box>
            ) : (
              <TableContainer
                component={Paper}
                style={{
                  overflowY: "scroll",
                  height: "62vh",
                }}
                className="scroll-bar-class"
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Order</TableCell>
                      <TableCell>S.No.</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Image</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getCategoryProducts &&
                      getCategoryProducts?.products?.map((element, index) => (
                        <CategoryRow
                          key={element?._id}
                          id={element?._id}
                          index={index}
                          name={element?.name}
                          dataLength={getCategoryProducts?.products?.length}
                          image={
                            <img
                              src={element?.productPictures[0]?.img}
                              alt="img"
                              width="50px"
                              height="40px"
                            />
                          }
                          actions={
                            <img
                              src={detailIcon}
                              alt="img"
                              width="20px"
                              height="20px"
                              onClick={() =>
                                exploreCatdetailPageHandler(element?._id)
                              }
                              style={{ cursor: "pointer" }}
                            />
                          }
                          moveRow={moveRow}
                        />
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
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
      {exploreCatId && (
        <ProductDetailPage
          open={openExploreCatDetail}
          setOpen={() => {
            setOpenExploreCatDetail(false);
            setExploreCatId(null);
          }}
          id={exploreCatId}
        />
      )}
    </>
  );
};

export default CategoryProducts;
