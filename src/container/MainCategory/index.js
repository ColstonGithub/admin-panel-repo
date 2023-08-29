import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Header from "components/SearchBar/Header";
import { Box, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getHomePageCategories,
} from "redux/Slices/HomePage/HomePageCategories";
import FMTypography from "components/FMTypography/FMTypography";
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

import EditHomePageCategory from "container/EditPages/EditHomePageCategory";
import FMButton from "components/FMButton/FMButton";
import ExploreCategoryDetailPage from "container/DetailPages/ExploreCategoryDetailPage";
import AddBanner from "container/AddPages/AddCategory";

const CategoryRow = ({
  id,
  index,
  name,
  data,
  image,
  sNo,
  subCategories,
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
    navigate(`/explore-category-child/${id}`);
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
        {subCategories && subCategories ? (
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
            displayText={`View SubCategories (${subCategories?.length})`}
            onClick={() => ViewParticularUserHandler(id)}
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
            displayText={"No SubCategories"}
          />
        )}
      </TableCell>

      <TableCell>{actions}</TableCell>
      {/* Add more cells for other category properties */}
    </TableRow>
  );
};

const MainCategory = () => {
  const dispatch = useDispatch();

  const [exploreCatId, setExploreCatId] = React.useState(null);
  const [openExploreCatDetail, setOpenExploreCatDetail] = React.useState(false);
  const [editedCategoryId, setEditedCategoryId] = React.useState(null);
  const [editHomeCategory, setEditHomeCategory] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [addHomepageExploreCategory, setAddHomepageExploreCategory] =
    useState(false);

  const initialImagesAdmin = useSelector(
    (state) => state?.InitialImagesAdmin?.initialImagesAdmin?.initialImages
  );
  const editIcon = initialImagesAdmin && initialImagesAdmin[8]?.image;
  const detailIcon = initialImagesAdmin && initialImagesAdmin[9]?.image;
  const deleteIcon = initialImagesAdmin && initialImagesAdmin[10]?.image;

  useEffect(() => {
    dispatch(getHomePageCategories())
      .then(() => setIsLoading(false)) // Set loading to false after API call completes
      .catch(() => setIsLoading(false)); // Handle error and still set loading to false
  }, [dispatch]);

  const homepageCategories = useSelector(
    (state) => state?.exploreCategories?.getCategoriesListData?.categoryList
  );

  const [data, setData] = useState([homepageCategories]);

  useEffect(() => {
    setData(homepageCategories);
  }, [homepageCategories]);

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
        dispatch(getHomePageCategories())
          .then(() => setIsLoading(false)) // Set loading to false after API call completes
          .catch(() => setIsLoading(false)); // Handle error and still set loading to false
      }
    });
  };

  const edithomepageCategoryFunc = (cId) => {
    setEditedCategoryId(cId);
  };

  const navigate = useNavigate();
  const moveRow = (fromIndex, toIndex) => {
    const newData = [...data];
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
          dispatch(getHomePageCategories())
            .then(() => setIsLoading(false)) // Set loading to false after API call completes
            .catch(() => setIsLoading(false)); // Handle error and still set loading to false
        }); // Use the correct API endpoint
    } catch (error) {
      dispatch(getHomePageCategories())
        .then(() => setIsLoading(false)) // Set loading to false after API call completes
        .catch(() => setIsLoading(false)); // Handle error and still set loading to false
      console.error("Error saving order:", error);
    }
  };
  const addHomepageExploreCategoryModal = () => {
    setAddHomepageExploreCategory(true);
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
            justifyContent: "space-between",
          }}
        >
          <ArrowBackIcon
            sx={{ marginRight: "3rem", cursor: "pointer" }}
            onClick={() => navigate(-1)}
          />
          <FMTypography
            displayText={"Main Categories"}
            styleData={{ fontSize: "2rem", fontFamily: "Inter" }}
          />

          <FMButton
            displayText={"Add"}
            variant="contained"
            styleData={{
              backgroundColor: "#008060",
              borderRadius: "8px",
            }}
            onClick={addHomepageExploreCategoryModal}
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
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Order</TableCell>
                      <TableCell>S.No.</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Image</TableCell>
                      <TableCell>Sub Categories</TableCell>
                      <TableCell>Actions</TableCell>
                      {/* Add more cells for other category properties */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data &&
                      data?.map((category, index) => (
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
                          subCategories={category?.children}
                          sNo={index + 1}
                          actions={
                            <Grid style={{ display: "flex" }}>
                              <img
                                src={detailIcon}
                                alt="img"
                                width="20px"
                                height="20px"
                                className="img-responsive img-fluid "
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
                                className="img-responsive img-fluid "
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
                                className="img-responsive img-fluid "
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
              style={{ marginTop: "30px" }}
            >
              Save Order
            </Button>
          </DndProvider>
        </Box>
      </Grid>

      {addHomepageExploreCategory && (
        <AddBanner
          open={addHomepageExploreCategory}
          setOpen={setAddHomepageExploreCategory}
          homepageCategoriess={homepageCategories}
        />
      )}
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
        <EditHomePageCategory
          open={editHomeCategory}
          setOpen={() => {
            setEditHomeCategory(false);
            setEditedCategoryId(null);
          }}
          id={editedCategoryId}
          // usersListData={usersListData}
        />
      )}
    </>
  );
};

export default MainCategory;
