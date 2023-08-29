import { Box, Button } from "@mui/material";
import FMTypography from "components/FMTypography/FMTypography";
import Header from "components/SearchBar/Header";
import React, { useState, useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import FMButton from "components/FMButton/FMButton";
import TabsTable from "components/TabsTable/TabsTable";
import AddBanner from "container/AddPages/AddCategory";
import "../HomePage/homePageBannerStyle.css";
import {
  ABOUT_US,
  BLOGS,
  BLOGS_CATEGORY,
  BRAND_PAGE,
  BRAND_PAGE_BANNER,
  BRAND_PRODUCTS,
  CAREER_SECTION,
  CARE_CLEAN,
  CATALOGUE,
  CATEGORY_BANNER,
  CONTACT_US_SECTION,
  CORPORATE_BANNER,
  CORPORATE_PRODUCT,
  EXHIBITION_BANNER,
  EXHIBITION_PRODUCT,
  FAQS,
  FAQ_CATEGORY,
  HOME,
  HOME_PAGE_EXPLORE_CATEGORY,
  NEWS_PRESS_BANNER,
  NEWS_PRESS_PRODUCTS,
  QUOTATION_SECTION,
  VIRTUAL_TOUR_BANNER,
  WARRANTY_REGISTRATION,
  orientationCenter,
  WHERE_TO_BUY,
  CAREERS_DETAILS,
  MAIN_CATEGORY,
} from "Routes/Routes";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import AddHomePageBanner from "container/AddPages/AddHomePageBanner";
import AddBrandPageComponent from "container/AddPages/AddBrandPageComponent";
import AddCareCleanComponent from "container/AddPages/AddCareCleanComponent";
import AddCatalogueComponent from "container/AddPages/AddCatalogueComponent";
import AddVirtualTourComponent from "container/AddPages/AddVirtualTourComponent";
import AddExhibitionBannerComponent from "container/AddPages/AddExhibitionBannerComponent";
import AddNewsPressProductComponent from "container/AddPages/AddNewsPressProductComponent";
import AddNewsPressBannerComponent from "container/AddPages/AddNewsPressBannerComponent";
import AddCorporateProductComponent from "container/AddPages/AddCorporateProductComponent";
import AddCorporateBannerComponent from "container/AddPages/AddCorporateBannerComponent";
import AddBrandPageBannerComponent from "container/AddPages/AddBrandPageBannerComponent";
import AddCategoryBannerComponent from "container/AddPages/AddCategoryBannerComponent";
import AddBlogCategoryComponent from "container/AddPages/AddBlogCategoryComponent";
import AddAboutUsComponent from "container/AddPages/AddAboutUsComponent";
import AddFaqCategoryComponent from "container/AddPages/AddFaqCategoryComponent";
import AddFAQs from "container/AddPages/AddFAQs";
import AddHomepageExploreCategoryComponent from "container/AddPages/AddHomepageExploreCategoryComponent";
import AddOrientationCenter from "container/AddPages/AddOrientationCenter";
import AddWhereToBuyComponent from "container/AddPages/AddWhereToBuyComponent";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import AddExhibitionPageComponent from "container/AddPages/AddExhibitionPageComponent";
import AddCareerDetailsPageComponent from "container/AddPages/AddCareerDetailsPageComponent";
import { useDispatch } from "react-redux";
import { getInitialImagesAdmin } from "redux/Slices/InitialImagesAdmin/InitialImagesAdminSlice";

const HomePageBanners = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { children, value, index, type, ...other } = props;
  const [openFirst, setOpenFirst] = useState(false);
  const [corporatePage, setCorporatePage] = useState(false);
  const [exhibitionPage, setExhibitionPage] = useState(false);
  const [addBanners, setAddBanners] = useState(false);
  const [addBrandPage, setAddBrandPage] = useState(false);
  const [addCareerDetailsPage, setAddCareerDetailsPage] = useState(false);
  const [addHomePageBanners, setAddHomePageBanners] = useState(false);
  const [openBrandPage, setOpenBrandPage] = useState(false);
  const [newsPressOpen, setNewsPressOpen] = useState(false);
  const [blogsMenuOpen, setBlogsMenuOpen] = useState(false);
  const [careersMenuOpen, setCareersMenuOpen] = useState(false);
  const [faqsOpen, setFaqsOpen] = useState(false);
  const [addCareClean, setAddCareClean] = useState(false);
  const [addCatalogue, setAddCatalogue] = useState(false);
  const [addVirtualTour, setAddVirtualTour] = useState(false);
  const [addExhibitionBanner, setAddExhibitionBanner] = useState(false);
  const [addNewsPressProduct, setAddNewsPressProduct] = useState(false);
  const [addNewsPressBanner, setAddNewsPressBanner] = useState(false);
  const [addCorporateProduct, setAddCorporateProduct] = useState(false);
  const [addCorporateBanner, setAddCorporateBanner] = useState(false);
  const [addBrandPageBanner, setAddBrandPageBanner] = useState(false);
  const [addOrientationCenter, setAddOrientationCenter] = useState(false);
  const [addWhereToBuy, setAddWhereToBuy] = useState(false);
  const [addCategoryBanner, setAddCategoryBanner] = useState(false);
  const [addBlogCategory, setAddBlogCategory] = useState(false);
  const [addAboutUs, setAddAboutUs] = useState(false);
  const [addFaqCategory, setAddFaqCategory] = useState(false);

  const [addExhibitionPage, setAddExhibitionPage] = useState(false);

  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  const [addHomepageExploreCategory, setAddHomepageExploreCategory] =
    useState(false);
  const [addFaqs, setAddFaqs] = useState(false);

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  // add states above

  const homepageDisplay = () => {
    setOpenFirst(!openFirst);
  };

  const newsPressDisplay = () => {
    setNewsPressOpen(!newsPressOpen);
    // setActiveOption(!activeOption);
  };

  const blogsMenuDisplay = () => {
    setBlogsMenuOpen(!blogsMenuOpen);
    // setActiveOption(!activeOption);
  };
  const careersMenuDisplay = () => {
    setCareersMenuOpen(!careersMenuOpen);
    // setActiveOption(!activeOption);
  };

  const faqsMenuDisplay = () => {
    setFaqsOpen(!faqsOpen);
  };

  const brandPageDisplay = () => {
    setOpenBrandPage(!openBrandPage);
  };

  const corporatePageDisplay = () => {
    setCorporatePage(!corporatePage);
  };
  const exhibitionPageDisplay = () => {
    setExhibitionPage(!exhibitionPage);
  };

  const addBanner = () => {
    setAddBanners(true);
  };

  const addCareCleanModal = () => {
    setAddCareClean(true);
  };

  const addCatalogueModal = () => {
    setAddCatalogue(true);
  };

  const addVirtualTourModal = () => {
    setAddVirtualTour(true);
  };
  const addExhibitionBannerModal = () => {
    setAddExhibitionBanner(true);
  };

  const addExhibitionPageModal = () => {
    setAddExhibitionPage(true);
  };

  const addNewsPressProductModal = () => {
    setAddNewsPressProduct(true);
  };
  const addNewsPressBannerModal = () => {
    setAddNewsPressBanner(true);
  };
  const addCorporateProductModal = () => {
    setAddCorporateProduct(true);
  };
  const addCorporateBannerModal = () => {
    setAddCorporateBanner(true);
  };

  const addBrandPageBannerModal = () => {
    setAddBrandPageBanner(true);
  };
  const addOrientationCenterModal = () => {
    setAddOrientationCenter(true);
  };

  const addWhereToBuyModal = () => {
    setAddWhereToBuy(true);
  };

  const addCategoryBannerModal = () => {
    setAddCategoryBanner(true);
  };

  const addBlogModal = () => {
    navigate("/blogs/add-blog");
  };
  const addBlogCategoryModal = () => {
    setAddBlogCategory(true);
  };
  const addAboutUsModal = () => {
    setAddAboutUs(true);
  };
  const addFaqCategoryModal = () => {
    setAddFaqCategory(true);
  };

  const addHomepageExploreCategoryModal = () => {
    setAddHomepageExploreCategory(true);
  };

  const addFaqsModal = () => {
    setAddFaqs(true);
  };

  const addProductFunc = () => {
    navigate("/products/add-product");
  };

  const addBrandPageFunc = () => {
    setAddBrandPage(true);
  };

  const addCareerDetailsModal = () => {
    setAddCareerDetailsPage(true);
  };

  const addHomePageBannerFunc = () => {
    setAddHomePageBanners(true);
  };

  const categoryNavigatorHandler = () => {
    navigate(MAIN_CATEGORY);
    // navigate(EXPLORE_CATEGORY_HOME);
  };

  const homePageNavigatorHandler = () => {
    navigate(HOME);
    handleOptionClick(1);
  };
  const categoryBannerNavigator = () => {
    navigate(CATEGORY_BANNER);
    handleOptionClick(2);
  };
  const homePageExploreCategoryavigatorHandler = () => {
    navigate(HOME_PAGE_EXPLORE_CATEGORY);
  };

  // edit funcs

  const homepageCategoriess = useSelector(
    (state) => state?.exploreCategories?.getCategoriesListData?.categoryList
  );

  const homepageBanners = useSelector(
    (state) => state?.exploreCategories?.getBannersListingData?.Homepagebanner
  );

  const brandProductNavigator = () => {
    navigate(BRAND_PRODUCTS);
  };

  const brandPageNavigator = () => {
    navigate(BRAND_PAGE);
  };

  const brandBannerNavigator = () => {
    navigate(BRAND_PAGE_BANNER);
  };

  const corporateProductNavigator = () => {
    navigate(CORPORATE_PRODUCT);
  };
  const exhibitionProductNavigator = () => {
    navigate(EXHIBITION_PRODUCT);
  };
  const corporateBannerNavigator = () => {
    navigate(CORPORATE_BANNER);
  };

  const exhibitionNavigator = () => {
    navigate(EXHIBITION_BANNER);
  };

  const newsPressProductsNavigator = () => {
    navigate(NEWS_PRESS_PRODUCTS);
  };
  const newsPressBannerNavigator = () => {
    navigate(NEWS_PRESS_BANNER);
  };
  const virtualTourNavigator = () => {
    navigate(VIRTUAL_TOUR_BANNER);
  };

  const careCleanNavigator = () => {
    navigate(CARE_CLEAN);
  };
  const aboutusNavigator = () => {
    navigate(ABOUT_US);
  };
  const warrantyNavigator = () => {
    navigate(WARRANTY_REGISTRATION);
  };
  const quotationNavigator = () => {
    navigate(QUOTATION_SECTION);
  };
  const careerSectionNavigator = () => {
    navigate(CAREER_SECTION);
  };
  const ContactUsSectionNavigator = () => {
    navigate(CONTACT_US_SECTION);
  };

  const blogsNavigator = () => {
    navigate(BLOGS);
  };
  const careerDetailsPageNavigator = () => {
    navigate(CAREERS_DETAILS);
  };
  const blogsCategoryNavigator = () => {
    navigate(BLOGS_CATEGORY);
  };
  const catalogueNavigator = () => {
    navigate(CATALOGUE);
  };

  const orientationNavigator = () => {
    navigate(orientationCenter);
  };
  const whereToBuyNavigator = () => {
    navigate(WHERE_TO_BUY);
  };

  const faqsNavigator = () => {
    navigate(FAQS);
  };

  const faqCategoryNavigator = () => {
    navigate(FAQ_CATEGORY);
  };

  const [activeOption, setActiveOption] = useState(false);

  const isShowButton =
    type !== "warrantyRegistrationString" &&
    type !== "quotationSectionString" &&
    type !== "careerSectionString" &&
    type !== "contactUsSectionString";

  const initialImagesAdmin = useSelector(
    (state) => state?.InitialImagesAdmin?.initialImagesAdmin?.initialImages
  );

  const orientationSidebarIcon =
    initialImagesAdmin && initialImagesAdmin[0]?.image;
  const whereToBuySidebarIcon =
    initialImagesAdmin && initialImagesAdmin[1]?.image;
  const warrantyRegIcon = initialImagesAdmin && initialImagesAdmin[2]?.image;
  const virtualTourIcon = initialImagesAdmin && initialImagesAdmin[3]?.image;
  const newsPressIcon = initialImagesAdmin && initialImagesAdmin[4]?.image;
  const homeIcon = initialImagesAdmin && initialImagesAdmin[5]?.image;
  const faqsIcon = initialImagesAdmin && initialImagesAdmin[6]?.image;
  const exhibitionIcon = initialImagesAdmin && initialImagesAdmin[7]?.image;
  const corporatePageIcon = initialImagesAdmin && initialImagesAdmin[12]?.image;
  const quotationSecIcon = initialImagesAdmin && initialImagesAdmin[13]?.image;
  const contactUsIcon = initialImagesAdmin && initialImagesAdmin[14]?.image;
  const catalogueIcon = initialImagesAdmin && initialImagesAdmin[15]?.image;
  const careerSecIcon = initialImagesAdmin && initialImagesAdmin[16]?.image;
  const careCleanIcon = initialImagesAdmin && initialImagesAdmin[17]?.image;
  const productIcon = initialImagesAdmin && initialImagesAdmin[18]?.image;
  const brandPageIcon = initialImagesAdmin && initialImagesAdmin[19]?.image;
  const blogspageIcon = initialImagesAdmin && initialImagesAdmin[20]?.image;
  const blogsIcon = initialImagesAdmin && initialImagesAdmin[21]?.image;
  const aboutUsIcon = initialImagesAdmin && initialImagesAdmin[22]?.image;

  return (
    <>
      <Header />
      <Container fluid>
        <Row>
          <Col
            className="col-md-3"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "88vh",
              padding: "0 3.5rem",
              background: "#FAFBFD",
              paddingTop: "2rem",
              boxShadow: "8px 0px 8px rgba(181, 180, 180, 0.12)",
            }}
          >
            <div
              style={{
                overflowY: "scroll",
                width: "280px",
                height: "75vh",
              }}
              className="scroll-bar-class"
            >
              <div style={{ marginBottom: "20px" }}>
                <Button
                  sx={{
                    "&:hover": { background: "#EBECEF", borderRadius: "8px" },
                  }}
                >
                  <img
                    src={homeIcon}
                    alt="icon"
                    style={{ marginRight: "24px", width: "15px" }}
                  />
                  <FMTypography
                    displayText={"Home Page"}
                    onClick={() => homepageDisplay()}
                    styleData={{
                      fontSize: "16px",
                      fontFamily: " 'Inter', sans-serif",
                      fontWeight: "400",
                      color: "#222222",
                    }}
                  />
                  {openFirst ? (
                    <KeyboardArrowUpIcon sx={{ color: "black" }} />
                  ) : (
                    <KeyboardArrowDownIcon sx={{ color: "black" }} />
                  )}
                </Button>
                <Box
                  className="dropdown-homepage"
                  style={{
                    display: openFirst ? "flex" : "none",
                    paddingLeft: "3rem",
                    height: "90px",
                    // display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                  }}
                >
                  <FMTypography
                    displayText={"Home Page Banner"}
                    styleData={{
                      color: activeOption === 1 ? "#008060" : "#717171",
                      cursor: "pointer",
                      fontSize: "16px",
                      marginBottom: "10px",
                      marginTop: "10px",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                    onClick={homePageNavigatorHandler}
                  />

                  <FMTypography
                    displayText={"Category Banner"}
                    styleData={{
                      color: activeOption === 2 ? "#008060" : "#717171",
                      cursor: "pointer",
                      fontSize: "16px",
                      marginBottom: "10px",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                    onClick={categoryBannerNavigator}
                  />
                  <FMTypography
                    displayText={"Explore Category"}
                    styleData={{
                      color: activeOption === 3 ? "#008060" : "#717171",
                      cursor: "pointer",
                      fontSize: "16px",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                    onClick={homePageExploreCategoryavigatorHandler}
                  />
                </Box>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Button
                  sx={{
                    "&:hover": { background: "#EBECEF", borderRadius: "8px" },
                  }}
                >
                  <img
                    src={blogspageIcon}
                    alt="icon"
                    style={{ marginRight: "24px", width: "15px" }}
                  />
                  <FMTypography
                    displayText={"Category"}
                    onClick={categoryNavigatorHandler}
                    styleData={{
                      fontSize: "16px",
                      color: "#222222",
                      fontWeight: "400",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                  />
                </Button>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Button
                  sx={{
                    "&:hover": { background: "#EBECEF", borderRadius: "8px" },
                  }}
                >
                  <img
                    src={productIcon}
                    alt="icon"
                    style={{ marginRight: "24px", width: "15px" }}
                  />
                  <FMTypography
                    displayText={"Product"}
                    onClick={() => brandProductNavigator()}
                    styleData={{
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "#222222",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                  />
                </Button>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Button
                  sx={{
                    "&:hover": { background: "#EBECEF", borderRadius: "8px" },
                  }}
                >
                  <img
                    src={brandPageIcon}
                    alt="icon"
                    style={{ marginRight: "24px", width: "15px" }}
                  />
                  <FMTypography
                    displayText={"Brand Page"}
                    onClick={() => brandPageDisplay()}
                    styleData={{
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "#222222",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                  />
                  {openBrandPage ? (
                    <KeyboardArrowUpIcon sx={{ color: "black" }} />
                  ) : (
                    <KeyboardArrowDownIcon sx={{ color: "black" }} />
                  )}
                </Button>

                <Box
                  className="dropdown-homepage"
                  style={{
                    display: openBrandPage ? "flex" : "none",
                    paddingLeft: "3rem",
                    height: "60px",
                    // display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                  }}
                >
                  <FMTypography
                    displayText={"Brand Product"}
                    onClick={() => brandPageNavigator()}
                    styleData={{
                      color: "#717171",
                      cursor: "pointer",
                      fontSize: "16px",
                      fontWeight: "400",
                      marginBottom: "10px",
                      marginTop: "10px",
                    }}
                  />

                  <FMTypography
                    displayText={"Brand Page Banner"}
                    onClick={() => brandBannerNavigator()}
                    styleData={{
                      color: "#717171",
                      cursor: "pointer",
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                  />
                </Box>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Button
                  sx={{
                    "&:hover": { background: "#EBECEF", borderRadius: "8px" },
                  }}
                >
                  <img
                    src={corporatePageIcon}
                    alt="icon"
                    style={{ marginRight: "24px", width: "15px" }}
                  />
                  <FMTypography
                    displayText={"Corporate Page"}
                    onClick={() => corporatePageDisplay()}
                    styleData={{
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "#222222",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                  />
                  {corporatePage ? (
                    <KeyboardArrowUpIcon sx={{ color: "black" }} />
                  ) : (
                    <KeyboardArrowDownIcon sx={{ color: "black" }} />
                  )}
                </Button>
                <Box
                  className="dropdown-homepage"
                  style={{
                    display: corporatePage ? "block" : "none",
                    paddingLeft: "3rem",
                    height: "60px",
                    // display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                  }}
                >
                  <FMTypography
                    displayText={"Corporate Product"}
                    styleData={{
                      color: "#717171",
                      cursor: "pointer",
                      fontSize: "16px",
                      fontWeight: "400",
                      marginBottom: "10px",
                      marginTop: "10px",
                    }}
                    onClick={() => corporateProductNavigator()}
                  />

                  <FMTypography
                    displayText={"Corporate Page Banner"}
                    styleData={{
                      color: "#717171",
                      cursor: "pointer",
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                    onClick={() => corporateBannerNavigator()}
                  />
                </Box>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Button
                  sx={{
                    "&:hover": { background: "#EBECEF", borderRadius: "8px" },
                  }}
                >
                  <img
                    src={exhibitionIcon}
                    alt="icon"
                    style={{ marginRight: "24px", width: "15px" }}
                  />
                  <FMTypography
                    displayText={"Exhibition Page"}
                    onClick={() => exhibitionPageDisplay()}
                    styleData={{
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "#222222",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                  />
                  {exhibitionPage ? (
                    <KeyboardArrowUpIcon sx={{ color: "black" }} />
                  ) : (
                    <KeyboardArrowDownIcon sx={{ color: "black" }} />
                  )}
                </Button>

                <Box
                  className="dropdown-homepage"
                  style={{
                    display: exhibitionPage ? "block" : "none",
                    paddingLeft: "3rem",
                    height: "60px",
                    // display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                  }}
                >
                  <FMTypography
                    displayText={"Exhibition Product"}
                    styleData={{
                      color: "#717171",
                      cursor: "pointer",
                      fontSize: "16px",
                      fontWeight: "400",
                      marginBottom: "10px",
                      marginTop: "10px",
                    }}
                    onClick={() => exhibitionProductNavigator()}
                  />

                  <FMTypography
                    displayText={"Exhibition Banner"}
                    onClick={() => exhibitionNavigator()}
                    styleData={{
                      color: "#717171",
                      cursor: "pointer",
                      fontSize: "16px",
                      fontWeight: "400",
                      marginBottom: "10px",
                      marginTop: "10px",
                    }}
                  />
                </Box>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Button
                  sx={{
                    "&:hover": { background: "#EBECEF", borderRadius: "8px" },
                  }}
                >
                  <img
                    src={virtualTourIcon}
                    alt="icon"
                    style={{ marginRight: "24px", width: "15px" }}
                  />
                  <FMTypography
                    displayText={"Virtual Tour"}
                    onClick={() => virtualTourNavigator()}
                    styleData={{
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "#222222",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                  />
                </Button>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Button
                  sx={{
                    "&:hover": { background: "#EBECEF", borderRadius: "8px" },
                  }}
                >
                  <img
                    src={newsPressIcon}
                    alt="icon"
                    style={{ marginRight: "24px", width: "15px" }}
                  />
                  <FMTypography
                    displayText={"News & Press"}
                    onClick={() => newsPressDisplay()}
                    styleData={{
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "#222222",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                  />
                  {newsPressOpen ? (
                    <KeyboardArrowUpIcon sx={{ color: "black" }} />
                  ) : (
                    <KeyboardArrowDownIcon sx={{ color: "black" }} />
                  )}
                </Button>
                <Box
                  className="dropdown-homepage"
                  style={{
                    display: newsPressOpen ? "flex" : "none",
                    paddingLeft: "3rem",
                    height: "60px",
                    flexDirection: "column",
                    justifyContent: "space-around",
                  }}
                >
                  <FMTypography
                    displayText={"News & Press Banner"}
                    styleData={{
                      color: "#717171",
                      cursor: "pointer",
                      marginBottom: "10px",
                      marginTop: "10px",
                      fontWeight: "400",
                      fontSize: "16px",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                    onClick={newsPressBannerNavigator}
                  />

                  <FMTypography
                    displayText={"News & Press Product"}
                    styleData={{
                      color: "#717171",
                      cursor: "pointer",
                      fontWeight: "400",
                      fontSize: "16px",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                    onClick={newsPressProductsNavigator}
                  />
                </Box>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Button
                  sx={{
                    "&:hover": { background: "#EBECEF", borderRadius: "8px" },
                  }}
                >
                  <img
                    src={blogsIcon}
                    alt="icon"
                    style={{ marginRight: "24px", width: "15px" }}
                  />
                  <FMTypography
                    displayText={"Blogs"}
                    onClick={() => blogsMenuDisplay()}
                    styleData={{
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "#222222",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                  />
                  {blogsMenuOpen ? (
                    <KeyboardArrowUpIcon sx={{ color: "black" }} />
                  ) : (
                    <KeyboardArrowDownIcon sx={{ color: "black" }} />
                  )}
                </Button>

                <Box
                  className="dropdown-homepage"
                  style={{
                    display: blogsMenuOpen ? "flex" : "none",
                    paddingLeft: "3rem",
                    height: "60px",
                    flexDirection: "column",
                    justifyContent: "space-around",
                  }}
                >
                  <FMTypography
                    displayText={"Blogs Category"}
                    styleData={{
                      color: "#717171",
                      cursor: "pointer",
                      fontWeight: "400",
                      marginBottom: "10px",
                      marginTop: "10px",
                      fontSize: "16px",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                    onClick={() => blogsCategoryNavigator()}
                  />

                  <FMTypography
                    displayText={"Blogs"}
                    styleData={{
                      color: "#717171",
                      cursor: "pointer",
                      fontWeight: "400",
                      fontSize: "16px",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                    onClick={() => blogsNavigator()}
                  />
                </Box>

                {/* blog dropdown above */}
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Button
                  sx={{
                    "&:hover": { background: "#EBECEF", borderRadius: "8px" },
                  }}
                >
                  <img
                    src={catalogueIcon}
                    alt="icon"
                    style={{ marginRight: "24px", width: "15px" }}
                  />
                  <FMTypography
                    displayText={"Catalogue"}
                    onClick={() => catalogueNavigator()}
                    styleData={{
                      cursor: "pointer",
                      fontWeight: "400",
                      color: "#222222",
                      fontSize: "16px",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                  />
                </Button>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Button
                  sx={{
                    "&:hover": { background: "#EBECEF", borderRadius: "8px" },
                  }}
                >
                  <img
                    src={careCleanIcon}
                    alt="icon"
                    style={{ marginRight: "24px", width: "15px" }}
                  />
                  <FMTypography
                    displayText={"Care & Clean"}
                    onClick={() => careCleanNavigator()}
                    styleData={{
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "#222222",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                  />
                </Button>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Button
                  sx={{
                    "&:hover": { background: "#EBECEF", borderRadius: "8px" },
                  }}
                >
                  <img
                    src={aboutUsIcon}
                    alt="icon"
                    style={{ marginRight: "24px", width: "15px" }}
                  />
                  <FMTypography
                    displayText={"About us"}
                    onClick={() => aboutusNavigator()}
                    styleData={{
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "#222222",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                  />
                </Button>
              </div>

              {/*  */}
              <div style={{ marginBottom: "20px" }}>
                <Button
                  sx={{
                    "&:hover": { background: "#EBECEF", borderRadius: "8px" },
                  }}
                >
                  <img
                    src={faqsIcon}
                    alt="icon"
                    style={{ marginRight: "24px", width: "15px" }}
                  />
                  <FMTypography
                    displayText={"FAQs"}
                    onClick={() => faqsMenuDisplay()}
                    styleData={{
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "#222222",
                      fontFamily: " 'Inter', sans-serif",
                      // color: activeOption ? "#f00" : "#555",
                    }}
                  />
                  {faqsOpen ? (
                    <KeyboardArrowUpIcon sx={{ color: "black" }} />
                  ) : (
                    <KeyboardArrowDownIcon sx={{ color: "black" }} />
                  )}
                </Button>
                <Box
                  className="dropdown-homepage"
                  style={{
                    display: faqsOpen ? "flex" : "none",
                    paddingLeft: "3rem",
                    height: "60px",
                    // display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                  }}
                >
                  <FMTypography
                    displayText={"FAQs Category"}
                    styleData={{
                      color: "#717171",
                      cursor: "pointer",
                      fontSize: "16px",
                      marginBottom: "10px",
                      marginTop: "10px",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                    onClick={faqCategoryNavigator}
                  />
                  <FMTypography
                    displayText={"FAQs"}
                    styleData={{
                      color: "#717171",
                      cursor: "pointer",
                      fontSize: "16px",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                    onClick={faqsNavigator}
                  />
                </Box>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Button
                  sx={{
                    "&:hover": { background: "#EBECEF", borderRadius: "8px" },
                  }}
                >
                  <img
                    src={warrantyRegIcon}
                    alt="icon"
                    style={{ marginRight: "24px", width: "15px" }}
                  />
                  <FMTypography
                    displayText={"Warranty Registration"}
                    onClick={() => warrantyNavigator()}
                    styleData={{
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "#222222",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                  />
                </Button>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Button
                  sx={{
                    "&:hover": { background: "#EBECEF", borderRadius: "8px" },
                  }}
                >
                  <img
                    src={quotationSecIcon}
                    alt="icon"
                    style={{ marginRight: "24px", width: "15px" }}
                  />
                  <FMTypography
                    displayText={"Quotation Section"}
                    onClick={() => quotationNavigator()}
                    styleData={{
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "#222222",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                  />
                </Button>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Button
                  sx={{
                    "&:hover": { background: "#EBECEF", borderRadius: "8px" },
                  }}
                >
                  <img
                    src={careerSecIcon}
                    alt="icon"
                    style={{ marginRight: "24px", width: "15px" }}
                  />
                  <FMTypography
                    displayText={"Careers"}
                    onClick={() => careersMenuDisplay()}
                    styleData={{
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "#222222",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                  />
                  {careersMenuOpen ? (
                    <KeyboardArrowUpIcon sx={{ color: "black" }} />
                  ) : (
                    <KeyboardArrowDownIcon sx={{ color: "black" }} />
                  )}
                </Button>

                <Box
                  className="dropdown-homepage"
                  style={{
                    display: careersMenuOpen ? "flex" : "none",
                    paddingLeft: "3rem",
                    height: "60px",
                    flexDirection: "column",
                    justifyContent: "space-around",
                  }}
                >
                  <FMTypography
                    displayText={"Careers Form"}
                    styleData={{
                      color: "#717171",
                      cursor: "pointer",
                      fontWeight: "400",
                      marginBottom: "10px",
                      marginTop: "10px",
                      fontSize: "16px",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                    onClick={() => careerSectionNavigator()}
                  />

                  <FMTypography
                    displayText={"Carrers Page Details"}
                    styleData={{
                      color: "#717171",
                      cursor: "pointer",
                      fontWeight: "400",
                      fontSize: "16px",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                    onClick={() => careerDetailsPageNavigator()}
                  />
                </Box>

                {/* blog dropdown above */}
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Button
                  sx={{
                    "&:hover": { background: "#EBECEF", borderRadius: "8px" },
                  }}
                >
                  <img
                    src={contactUsIcon}
                    alt="icon"
                    style={{ marginRight: "24px", width: "15px" }}
                  />
                  <FMTypography
                    displayText={"Contact Us Section"}
                    onClick={() => ContactUsSectionNavigator()}
                    styleData={{
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "#222222",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                  />
                </Button>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Button
                  sx={{
                    "&:hover": { background: "#EBECEF", borderRadius: "8px" },
                  }}
                >
                  <img
                    src={orientationSidebarIcon}
                    alt="icon"
                    style={{ marginRight: "24px", width: "15px" }}
                  />
                  <FMTypography
                    displayText={"Live Display Centre"}
                    onClick={() => orientationNavigator()}
                    styleData={{
                      cursor: "pointer",
                      fontWeight: "400",
                      color: "#222222",
                      fontSize: "16px",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                  />
                </Button>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Button
                  sx={{
                    "&:hover": { background: "#EBECEF", borderRadius: "8px" },
                  }}
                >
                  <img
                    src={whereToBuySidebarIcon}
                    alt="icon"
                    style={{ marginRight: "24px", width: "15px" }}
                  />
                  <FMTypography
                    displayText={"Where To Buy"}
                    onClick={() => whereToBuyNavigator()}
                    styleData={{
                      cursor: "pointer",
                      fontWeight: "400",
                      color: "#222222",
                      fontSize: "16px",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                  />
                </Button>
              </div>
            </div>
          </Col>
          <Col className="col-md-9" style={{ padding: "50px 50px 0px 50px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FMTypography
                displayText={
                  type === "homePageCategoryString"
                    ? "Categories"
                    : type === "homePageBannerString"
                    ? "Banners"
                    : type === "brandProductString"
                    ? "Products"
                    : type === "brandPageString"
                    ? "Brand Products"
                    : type === "corporateProductString"
                    ? "Corporate Products"
                    : type === "corporateBannerString"
                    ? "Corporate Banners"
                    : type === "exhibitionBannerString"
                    ? "Exhibition Banners"
                    : type === "newsPressProductString"
                    ? "News & Press Products"
                    : type === "newsPressBannerString"
                    ? "News & Press Banners"
                    : type === "virtualTourBannerString"
                    ? "Virtual Tour Banners"
                    : type === "careCleanString"
                    ? "Care & Clean"
                    : type === "blogsString"
                    ? "Blogs"
                    : type === "blogsCategoryString"
                    ? "Blogs Categories"
                    : type === "catalogueString"
                    ? "Catalogues"
                    : type === "categoryBannerString"
                    ? "Category Banners"
                    : type === "brandPageBannerString"
                    ? "Brand Page Banners"
                    : type === "aboutUsString"
                    ? "About Us"
                    : type === "faqsString"
                    ? "FAQS"
                    : type === "faqCategoryString"
                    ? "FAQ Categories"
                    : type === "warrantyRegistrationString"
                    ? "Warranty Registration"
                    : type === "quotationSectionString"
                    ? "Quotation"
                    : type === "careerSectionString"
                    ? "Career"
                    : type === "contactUsSectionString"
                    ? "Contact Us"
                    : type === "homepageExploreCategory"
                    ? "Homepage Explore Category"
                    : type === "orientationCenterString"
                    ? "Live Display Centre"
                    : type === "careerDetailsPageString"
                    ? "Career Details"
                    : type === "exhibitionPageString"
                    ? "Exhibition Page"
                    : type === "whereToBuyString"
                    ? "Where To Buy"
                    : "New Page"
                }
                styleData={{
                  fontWeight: "500",
                  fontSize: "24px",
                  fontFamily: " 'Inter', sans-serif",
                }}
              />

              {isShowButton ? (
                <FMButton
                  displayText={"Add"}
                  variant="contained"
                  styleData={{
                    backgroundColor: "#008060",
                    borderRadius: "8px",
                  }}
                  onClick={
                    type === "homePageBannerString"
                      ? addHomePageBannerFunc
                      : type === "homePageCategoryString"
                      ? addBanner
                      : type === "brandProductString"
                      ? addProductFunc
                      : type === "brandPageString"
                      ? addBrandPageFunc
                      : type === "careCleanString"
                      ? addCareCleanModal
                      : type === "catalogueString"
                      ? addCatalogueModal
                      : type === "virtualTourBannerString"
                      ? addVirtualTourModal
                      : type === "exhibitionBannerString"
                      ? addExhibitionBannerModal
                      : type === "newsPressProductString"
                      ? addNewsPressProductModal
                      : type === "newsPressBannerString"
                      ? addNewsPressBannerModal
                      : type === "corporateProductString"
                      ? addCorporateProductModal
                      : type === "corporateBannerString"
                      ? addCorporateBannerModal
                      : type === "brandPageBannerString"
                      ? addBrandPageBannerModal
                      : type === "categoryBannerString"
                      ? addCategoryBannerModal
                      : type === "blogsString"
                      ? addBlogModal
                      : type === "blogsCategoryString"
                      ? addBlogCategoryModal
                      : type === "orientationCenterString"
                      ? addOrientationCenterModal
                      : type === "whereToBuyString"
                      ? addWhereToBuyModal
                      : type === "aboutUsString"
                      ? addAboutUsModal
                      : type === "faqsString"
                      ? addFaqsModal
                      : type === "careerDetailsPageString"
                      ? addCareerDetailsModal
                      : type === "exhibitionPageString"
                      ? addExhibitionPageModal
                      : type === "faqCategoryString"
                      ? addFaqCategoryModal
                      : addHomepageExploreCategoryModal
                  }
                />
              ) : (
                <></>
              )}
            </Box>
            <Box
              sx={{
                boxShadow:
                  "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
                borderRadius: "1rem",
                marginTop: "24px",
                padding: "0",
              }}
            >
              <TabsTable type={type} />
            </Box>
          </Col>
        </Row>
        <AddBanner
          open={addBanners}
          setOpen={setAddBanners}
          homepageCategoriess={homepageCategoriess}
        />
        <AddHomePageBanner
          open={addHomePageBanners}
          setOpen={setAddHomePageBanners}
          homepageBanners={homepageBanners}
        />

        <AddBrandPageComponent
          open={addBrandPage}
          setOpen={setAddBrandPage}
          // homepageBanners={totalProducts}
        />
        <AddCareerDetailsPageComponent
          open={addCareerDetailsPage}
          setOpen={setAddCareerDetailsPage}
          // homepageBanners={totalProducts}
        />
        <AddCareCleanComponent open={addCareClean} setOpen={setAddCareClean} />

        <AddCatalogueComponent open={addCatalogue} setOpen={setAddCatalogue} />
        <AddVirtualTourComponent
          open={addVirtualTour}
          setOpen={setAddVirtualTour}
        />
        <AddExhibitionBannerComponent
          open={addExhibitionBanner}
          setOpen={setAddExhibitionBanner}
        />

        <AddExhibitionPageComponent
          open={addExhibitionPage}
          setOpen={setAddExhibitionPage}
        />

        <AddNewsPressProductComponent
          open={addNewsPressProduct}
          setOpen={setAddNewsPressProduct}
        />
        <AddNewsPressBannerComponent
          open={addNewsPressBanner}
          setOpen={setAddNewsPressBanner}
        />
        <AddCorporateProductComponent
          open={addCorporateProduct}
          setOpen={setAddCorporateProduct}
        />
        <AddCorporateBannerComponent
          open={addCorporateBanner}
          setOpen={setAddCorporateBanner}
        />
        <AddBrandPageBannerComponent
          open={addBrandPageBanner}
          setOpen={setAddBrandPageBanner}
        />
        <AddOrientationCenter
          open={addOrientationCenter}
          setOpen={setAddOrientationCenter}
        />
        <AddWhereToBuyComponent
          open={addWhereToBuy}
          setOpen={setAddWhereToBuy}
        />
        <AddCategoryBannerComponent
          open={addCategoryBanner}
          setOpen={setAddCategoryBanner}
          homepageCategoriess={homepageCategoriess}
        />
        <AddBlogCategoryComponent
          open={addBlogCategory}
          setOpen={setAddBlogCategory}
          // homepageCategoriess={blogCategories}
        />
        <AddAboutUsComponent open={addAboutUs} setOpen={setAddAboutUs} />
        <AddFaqCategoryComponent
          open={addFaqCategory}
          setOpen={setAddFaqCategory}
        />
        <AddHomepageExploreCategoryComponent
          open={addHomepageExploreCategory}
          setOpen={setAddHomepageExploreCategory}
          homepageCategoriess={homepageCategoriess}
        />

        <AddFAQs open={addFaqs} setOpen={setAddFaqs} />
      </Container>
    </>
  );
};

export default HomePageBanners;
