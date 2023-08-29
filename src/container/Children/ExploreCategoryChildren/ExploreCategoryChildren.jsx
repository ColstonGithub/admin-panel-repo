import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Header from "components/SearchBar/Header";
import { Box, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getExploreCategoryChildren } from "redux/Slices/ExploreCategoryChildren/ExploreCategoryChildren";
import FMTypography from "components/FMTypography/FMTypography";
import ExploreCategoryDetailPage from "container/DetailPages/ExploreCategoryDetailPage";
import { deleteCategory } from "redux/Slices/HomePage/HomePageCategories";
import EditHomePageCategoryChildren from "container/EditPages/EditExploreCategoryChildren";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { InfinitySpin } from "react-loader-spinner";
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
import { getInitialImagesAdmin } from "redux/Slices/InitialImagesAdmin/InitialImagesAdminSlice";

const CategoryRow = ({
  id,
  index,
  name,
  data,
  image,
  sNo,
  categoryProducts,
  productCount,
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
  const navigate = useNavigate();
  const handleMoveUp = () => {
    moveRow(index, index - 1);
  };

  const handleMoveDown = () => {
    moveRow(index, index + 1);
  };
  const ViewParticularUserHandler = (id) => {
    navigate(`/category-product/${id}`);
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
      <TableCell>
        {productCount > 0 ? (
          <FMTypography
            styleData={{
              fontSize: "12px",
              marginRight: "1rem",
              fontFamily: "Inter",
              cursor: "pointer",
              textDecoration: "none",
              fontWeight: "bold",
              transition: "text-decoration 0.2s ease-in-out",
              ":hover": {
                textDecoration: "underline", // Apply underline on hover
              },
            }}
            displayText={`View Products (${productCount})`}
            onClick={() => ViewParticularUserHandler(categoryProducts)}
          />
        ) : (
          <FMTypography
            style={{
              fontSize: "12px",
              marginRight: "1rem",
              fontFamily: "Inter",
              textDecoration: "none",
              fontWeight: "bold",
              transition: "text-decoration 0.2s ease-in-out", // Add the transition effect
            }}
            displayText={"No Products"}
          />
        )}
      </TableCell>

      <TableCell>{actions}</TableCell>
      {/* Add more cells for other category properties */}
    </TableRow>
  );
};

const ExploreCategoryChildren = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  const [exploreCatId, setExploreCatId] = React.useState(null);
  const [openExploreCatDetail, setOpenExploreCatDetail] = React.useState(false);
  const [editedCategoryId, setEditedCategoryId] = React.useState(null);
  const [editHomeCategory, setEditHomeCategory] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    dispatch(getInitialImagesAdmin());
  }, [dispatch]);

  const initialImagesAdmin = useSelector(
    (state) => state?.InitialImagesAdmin?.initialImagesAdmin?.initialImages
  );

  const editIcon = initialImagesAdmin && initialImagesAdmin[8]?.image;
  const detailIcon = initialImagesAdmin && initialImagesAdmin[9]?.image;
  const deleteIcon = initialImagesAdmin && initialImagesAdmin[10]?.image;
  useEffect(() => {
    dispatch(getExploreCategoryChildren(id))
      .then(() => setIsLoading(false)) // Set loading to false after API call completes
      .catch(() => setIsLoading(false)); // Handle error and still set loading to false
  }, [dispatch, id]);

  const exploreCategoryChildTitle = useSelector(
    (state) => state?.ExploreCategoryChildren?.getExploreCategoryChildrenData
  );

  const exploreCategoryChildren = useSelector(
    (state) =>
      state?.ExploreCategoryChildren?.getExploreCategoryChildrenData
        ?.subCategoryList
  );
  const [data, setData] = useState([exploreCategoryChildren]);

  useEffect(() => {
    setData(exploreCategoryChildren);
  }, [exploreCategoryChildren]);

  useEffect(() => {
    if (exploreCatId !== null && exploreCatId) {
      setOpenExploreCatDetail(true);
    }
  }, [exploreCatId]);

  useEffect(() => {
    if (editedCategoryId !== null && editedCategoryId)
      setEditHomeCategory(true);
  }, [editedCategoryId]);

  const exploreCatdetailPageHandler = (cId) => {
    setExploreCatId(cId);
    // cId.stopPropagation();
  };

  const deleteCategoryFunc = (cId) => {
    const payload = {
      ids: [
        {
          _id: cId,
        },
      ],
    };
    dispatch(deleteCategory(payload)).then((res) => {
      if (res) {
        dispatch(getExploreCategoryChildren(id));
      }
    });
  };

  const edithomepageCategoryFunc = (cId) => {
    setEditedCategoryId(cId);
  };

  const navigate = useNavigate();
  const moveRow = (fromIndex, toIndex) => {
    const newData = [...data];
    console.log("getCategoryProducts ", data);
    const movedItem = newData.splice(fromIndex, 1)[0];
    newData.splice(toIndex, 0, movedItem);
    setData(newData);
  };

  const handleSaveOrder = async () => {
    const categoryOrder = data?.map((category) => category?._id);
    try {
      await axios
        .patch("https://colstonconcepts.com:5000/api/category/updateOrder", {
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
            displayText={exploreCategoryChildTitle?.pageTitle}
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
                      <TableCell>Category Products</TableCell>
                      <TableCell>Actions</TableCell>
                      {/* Add more cells for other category properties */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data &&
                      data.map((category, index) => (
                        <CategoryRow
                          key={category?._id}
                          id={category?._id}
                          data={data?.length - 1}
                          index={index}
                          name={category?.name}
                          image={
                            <Grid style={{ display: "flex" }}>
                              <img
                                src={category?.categoryImage}
                                alt="img"
                                width="50px"
                                height="40px"
                                className="img-responsive img-fluid"
                                loading="lazy"
                              />
                            </Grid>
                          }
                          categoryProducts={category?._id}
                          productCount={category?.productCount}
                          sNo={index + 1}
                          actions={
                            <Grid style={{ display: "flex" }}>
                              <img
                                src={detailIcon}
                                alt="img"
                                width="20px"
                                height="20px"
                                className="img-responsive img-fluid"
                                loading="lazy"
                                onClick={() =>
                                  exploreCatdetailPageHandler(category?._id)
                                }
                                style={{ cursor: "pointer" }}
                              />
                              <img
                                src={editIcon}
                                alt="img"
                                width="20px"
                                height="20px"
                                className="img-responsive img-fluid"
                                loading="lazy"
                                onClick={() =>
                                  edithomepageCategoryFunc(category?._id)
                                }
                                style={{
                                  marginLeft: "1.5rem",
                                  cursor: "pointer",
                                }}
                              />
                              <img
                                src={deleteIcon}
                                alt="img"
                                width="17px"
                                height="17px"
                                className="img-responsive img-fluid"
                                loading="lazy"
                                onClick={() =>
                                  deleteCategoryFunc(category?._id)
                                }
                                style={{
                                  marginLeft: "1.5rem",
                                  cursor: "pointer",
                                }}
                              />
                            </Grid>
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
      <ExploreCategoryDetailPage
        open={openExploreCatDetail}
        setOpen={() => {
          setOpenExploreCatDetail(false);
          setExploreCatId(null);
        }}
        id={exploreCatId}
        type={"homePageCategoryString"}
      />
      {editedCategoryId && (
        <EditHomePageCategoryChildren
          open={editHomeCategory}
          setOpen={() => {
            setEditHomeCategory(false);
            setEditedCategoryId(null);
          }}
          id={editedCategoryId}
          // usersListData={usersListData}
          childId={id}
        />
      )}
    </>
  );
};

export default ExploreCategoryChildren;
