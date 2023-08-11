import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Header from "components/SearchBar/Header";
import { Box, Grid } from "@mui/material";
import FMTable from "../../../components/TabsTable/TableInTabs/FMTable";
import { useDispatch, useSelector } from "react-redux";
import { getExploreCategoryChildren } from "redux/Slices/ExploreCategoryChildren/ExploreCategoryChildren";
import FMTypography from "components/FMTypography/FMTypography";
import detailIcon from "assets/detailIcon.svg";
import editIcon from "assets/editIcon.svg";
import deleteIcon from "assets/deleteIcon.svg";
import ExploreCategoryDetailPage from "container/DetailPages/ExploreCategoryDetailPage";
import { deleteCategory } from "redux/Slices/HomePage/HomePageCategories";
import EditHomePageCategoryChildren from "container/EditPages/EditExploreCategoryChildren";
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
            displayText={"View Products"}
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

// export const ExploreCategoryChildrenTableConfig = (type) => [
//   {
//     headername: "S.NO.",
//     field: "S.NO.",
//     width: "15%",
//   },
//   {
//     headername: "Name",
//     field: "Name",
//     width: "20%",
//   },

//   {
//     headername: "Images",
//     field: "Images",
//     align: "left",
//     width: "15%",
//     renderColumn: (row) => {
//       return type === "homePageBannerString" ? (
//         <>
//           <img
//             src={row?.Images?.[0]?.img}
//             alt="img"
//             width="50px"
//             height="40px"
//             className="img-responsive img-fluid "
//             loading="lazy"
//           />
//         </>
//       ) : (
//         <>
//           <img
//             src={row?.Images}
//             alt="img"
//             width="50px"
//             height="40px"
//             className="img-responsive img-fluid "
//             loading="lazy"
//           />
//         </>
//       );
//     },
//   },
//   {
//     headername: "Image Alt Text",
//     field: "imageAltText",
//     align: "left",
//     width: "17%",
//   },

//   {
//     headername: "Actions",
//     field: "Actions",
//     align: "left",
//     width: "28%",
//   },
// ];

// config above

const ExploreCategoryChildren = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  const [exploreCatId, setExploreCatId] = React.useState(null);
  const [openExploreCatDetail, setOpenExploreCatDetail] = React.useState(false);
  const [editedCategoryId, setEditedCategoryId] = React.useState(null);
  const [editHomeCategory, setEditHomeCategory] = React.useState(false);

  useEffect(() => {
    dispatch(getExploreCategoryChildren(id));
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

  // const getRowData = () => {
  //   let rowDataVal = [];

  //   exploreCategoryChildren?.map((element, index) => {
  //     const rowData = {
  //       "S.NO.": index + 1,
  //       Name: element?.name,
  //       Images: element?.categoryImage,
  //       imageAltText: element?.imageAltText,
  //       id: element?._id,
  //       Actions: (
  //         <Grid style={{ display: "flex" }}>
  //           <img
  //             src={detailIcon}
  //             alt="img"
  //             width="20px"
  //             height="20px"
  //             className="img-responsive img-fluid "
  //             loading="lazy"
  //             onClick={() => exploreCatdetailPageHandler(element?._id)}
  //             style={{ cursor: "pointer" }}
  //           />
  //           <img
  //             src={editIcon}
  //             alt="img"
  //             width="20px"
  //             height="20px"
  //             className="img-responsive img-fluid "
  //             loading="lazy"
  //             onClick={() => edithomepageCategoryFunc(element?._id)}
  //             style={{ marginLeft: "1.5rem", cursor: "pointer" }}
  //           />
  //           <img
  //             src={deleteIcon}
  //             alt="img"
  //             width="17px"
  //             height="17px"
  //             className="img-responsive img-fluid "
  //             loading="lazy"
  //             onClick={() => deleteCategoryFunc(element?._id)}
  //             style={{ marginLeft: "1.5rem", cursor: "pointer" }}
  //           />
  //         </Grid>
  //       ),
  //     };

  //     return rowDataVal.push(rowData);
  //   });

  //   return rowDataVal;
  // };

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
        .patch("http://64.227.150.49:5000/api/category/updateOrder", {
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
  console.log("exploreCategoryChildren ", exploreCategoryChildren);
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
            <TableContainer component={Paper}>
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
                        key={category?._doc?._id}
                        id={category?._doc?._id}
                        data={data?.length - 1}
                        index={index}
                        name={category?._doc?.name}
                        image={
                          <Grid style={{ display: "flex" }}>
                            <img
                              src={category?._doc?.categoryImage}
                              alt="img"
                              width="50px"
                              height="40px"
                              className="img-responsive img-fluid"
                              loading="lazy"
                            />
                          </Grid>
                        }
                        categoryProducts={category?._doc?._id}
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
                                exploreCatdetailPageHandler(category?._doc?._id)
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
                                edithomepageCategoryFunc(category?._doc?._id)
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
                                deleteCategoryFunc(category?._doc?._id)
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
          setOpen={setEditHomeCategory}
          id={editedCategoryId}
          // usersListData={usersListData}
          childId={id}
        />
      )}
    </>
  );
};

export default ExploreCategoryChildren;
