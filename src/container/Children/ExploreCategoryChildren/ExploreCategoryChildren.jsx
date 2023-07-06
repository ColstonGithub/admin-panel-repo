import React, { useEffect } from "react";
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

export const ExploreCategoryChildrenTableConfig = (type) => [
  {
    headername: "S.NO.",
    field: "S.NO.",
    width: "15%",
  },
  {
    headername: "Name",
    field: "Name",
    width: "20%",
  },

  {
    headername: "Images",
    field: "Images",
    align: "left",
    width: "15%",
    renderColumn: (row) => {
      return type === "homePageBannerString" ? (
        <>
          <img
            src={row?.Images?.[0]?.img}
            alt="img"
            width="50px"
            height="40px"
            className="img-responsive img-fluid "
            loading="lazy"
          />
        </>
      ) : (
        <>
          <img
            src={row?.Images}
            alt="img"
            width="50px"
            height="40px"
            className="img-responsive img-fluid "
            loading="lazy"
          />
        </>
      );
    },
  },
  {
    headername: "Image Alt Text",
    field: "imageAltText",
    align: "left",
    width: "17%",
  },

  {
    headername: "Actions",
    field: "Actions",
    align: "left",
    width: "28%",
  },
];

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

  const getRowData = () => {
    let rowDataVal = [];

    exploreCategoryChildren?.map((element, index) => {
      const rowData = {
        "S.NO.": index + 1,
        Name: element?.name,
        Images: element?.categoryImage,
        imageAltText: element?.imageAltText,
        id: element?._id,
        Actions: (
          <Grid style={{ display: "flex" }}>
            <img
              src={detailIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => exploreCatdetailPageHandler(element?._id)}
              style={{ cursor: "pointer" }}
            />
            <img
              src={editIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => edithomepageCategoryFunc(element?._id)}
              style={{ marginLeft: "1.5rem", cursor: "pointer" }}
            />
            <img
              src={deleteIcon}
              alt="img"
              width="17px"
              height="17px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => deleteCategoryFunc(element?._id)}
              style={{ marginLeft: "1.5rem", cursor: "pointer" }}
            />
          </Grid>
        ),
      };

      return rowDataVal.push(rowData);
    });

    return rowDataVal;
  };
  const navigate = useNavigate();

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
          <FMTable
            rows={getRowData()}
            columns={ExploreCategoryChildrenTableConfig()}
          />
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
