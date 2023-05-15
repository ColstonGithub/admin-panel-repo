import { Box, Button } from "@mui/material";
import FMTypography from "components/FMTypography/FMTypography";
import Header from "components/SearchBar/Header";
import React, {useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import homeIcon from "assets/homeIcon.svg";
import blogspageIcon from "assets/blogspage.svg";
import brandIcon from "assets/brandIcon.svg";
import corporateIcon from "assets/corporateIcon.svg";
import FMButton from "components/FMButton/FMButton";
import TabsTable from "components/TabsTable/TabsTable";
import AddBanner from "./AddInTableItems/AddBanner";
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
  EXPLORE_CATEGORY_HOME,
  FAQS,
  FAQ_CATEGORY,
  HOME,
  HOME_PAGE_EXPLORE_CATEGORY,
  NEWS_PRESS_BANNER,
  NEWS_PRESS_PRODUCTS,
  QUOTATION_SECTION,
  VIDEO,
  VIRTUAL_TOUR_BANNER,
  WARRANTY_REGISTRATION,
} from "Routes/Routes";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import AddHomePageBanner from "./AddInTableItems/AddHomePageBanner";
import AddBrandPageComponent from "./AddInTableItems/AddBrandPageComponent";
import AddCareCleanComponent from "./AddInTableItems/AddCareCleanComponent";
import AddVideoComponent from "./AddInTableItems/AddVideoComponent";
import AddCatalogueComponent from "./AddInTableItems/AddCatalogueComponent";
import AddVirtualTourComponent from "./AddInTableItems/AddVirtualTourComponent";
import AddExhibitionBannerComponent from "./AddInTableItems/AddExhibitionBannerComponent";
import AddNewsPressProductComponent from "./AddInTableItems/AddNewsPressProductComponent";
import AddNewsPressBannerComponent from "./AddInTableItems/AddNewsPressBannerComponent";
import AddCorporateProductComponent from "./AddInTableItems/AddCorporateProductComponent";
import AddCorporateBannerComponent from "./AddInTableItems/AddCorporateBannerComponent";
import AddBrandPageBannerComponent from "./AddInTableItems/AddBrandPageBannerComponent";
import AddCategoryBannerComponent from "./AddInTableItems/AddCategoryBannerComponent";
import AddBlogCategoryComponent from "./AddInTableItems/AddBlogCategoryComponent";
import AddAboutUsComponent from "./AddInTableItems/AddAboutUsComponent";
import AddFaqCategoryComponent from "./AddInTableItems/AddFaqCategoryComponent";
import AddFAQs from "./AddInTableItems/AddFAQs";

const HomePageBanners = (props) => {
  const navigate = useNavigate();
  const { children, value, index, type, ...other } = props;

  const [openFirst, setOpenFirst] = useState(false);

  const [corporatePage, setCorporatePage] = useState(false);
  const [addBanners, setAddBanners] = useState(false);
  const [addBrandPage, setAddBrandPage] = useState(false);
  const [addHomePageBanners, setAddHomePageBanners] = useState(false);
  const [openBrandPage, setOpenBrandPage] = useState(false);
  const [newsPressOpen, setNewsPressOpen] = useState(false);
  const [blogsMenuOpen, setBlogsMenuOpen] = useState(false);
  const [faqsOpen, setFaqsOpen] = useState(false);
  const [addCareClean, setAddCareClean] = useState(false);
  const [addVideo, setAddVideo] = useState(false);
  const [addCatalogue, setAddCatalogue] = useState(false);
  const [addVirtualTour, setAddVirtualTour] = useState(false);
  const [addExhibitionBanner, setAddExhibitionBanner] = useState(false);
  const [addNewsPressProduct, setAddNewsPressProduct] = useState(false);
  const [addNewsPressBanner, setAddNewsPressBanner] = useState(false);
  const [addCorporateProduct, setAddCorporateProduct] = useState(false);
  const [addCorporateBanner, setAddCorporateBanner] = useState(false);
  const [addBrandPageBanner, setAddBrandPageBanner] = useState(false);
  const [addCategoryBanner, setAddCategoryBanner] = useState(false);
  const [addBlogCategory, setAddBlogCategory] = useState(false);
  const [addAboutUs, setAddAboutUs] = useState(false);
  const [addFaqCategory, setAddFaqCategory] = useState(false);
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

  const faqsMenuDisplay = () => {
    setFaqsOpen(!faqsOpen);
  };

  const brandPageDisplay = () => {
    setOpenBrandPage(!openBrandPage);
  };

  const corporatePageDisplay = () => {
    setCorporatePage(!corporatePage);
  };

  const addBanner = () => {
    setAddBanners(true);
  };

  const addCareCleanModal = () => {
    setAddCareClean(true);
  };
  const addVideoModal = () => {
    setAddVideo(true);
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
  const addCategoryBannerModal = () => {
    setAddCategoryBanner(true);
  };

  const addBlogPage = () => {
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

  const addFaqsModal = () => {
    setAddFaqs(true);
  };

  const addProductFunc = () => {
    navigate("/products/add-product");
  };

  const addBrandPageFunc = () => {
    setAddBrandPage(true);
  };

  const addHomePageBannerFunc = () => {
    setAddHomePageBanners(true);
  };

  const categoryNavigatorHandler = () => {
    navigate(EXPLORE_CATEGORY_HOME);
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

  const videoNavigator = () => {
    navigate(VIDEO);
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
  const blogsCategoryNavigator = () => {
    navigate(BLOGS_CATEGORY);
  };
  const catalogueNavigator = () => {
    navigate(CATALOGUE);
  };

  const faqsNavigator = () => {
    navigate(FAQS);
  };

  const faqCategoryNavigator = () => {
    navigate(FAQ_CATEGORY);
  };

  const [activeOption, setActiveOption] = useState(false);

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
              paddingTop: "2rem",
              boxShadow: "8px 0px 8px rgba(181, 180, 180, 0.12)",
            }}
          >
            <div
              style={{
                overflowY: "scroll",
                width: "280px",
                height: "75vh",

                // scrollbarWidth: "thin",
                // scrollbarColor: "#ccc #f0f",
                // ...styles.customSrollBar,
              }}
              className="scroll-bar-class"
            >
              <div style={{ marginBottom: "20px" }}>
                <Button sx={{ "&:hover": { backgroundColor: "white" } }}>
                  <img
                    src={homeIcon}
                    alt="icon"
                    style={{ marginRight: "24px", width: "15px" }}
                  />
                  <FMTypography
                    displayText={"Home Page"}
                    onClick={() => homepageDisplay()}
                    styleData={{
                      fontSize: "15px",
                      fontFamily: " 'Inter', sans-serif",
                      fontWeight: "400",
                    }}
                  />
                </Button>
                <Box
                  className="dropdown-homepage"
                  style={{
                    display: openFirst ? "flex" : "none",
                    paddingLeft: "3rem",
                    height: "100px",
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
                      fontFamily: " 'Inter', sans-serif",
                    }}
                    onClick={homePageNavigatorHandler}
                  />

                  <FMTypography
                    displayText={"Category banner"}
                    styleData={{
                      color: activeOption === 2 ? "#008060" : "#717171",
                      cursor: "pointer",
                      fontSize: "16px",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                    onClick={categoryBannerNavigator}
                  />
                  <FMTypography
                    displayText={"Explore Category"}
                    styleData={{
                      // color: activeOption === 1 ? "#008060" : "#717171",
                      color: "#717171",
                      cursor: "pointer",
                      fontSize: "16px",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                    onClick={homePageExploreCategoryavigatorHandler}
                  />
                </Box>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Button sx={{ "&:hover": { backgroundColor: "white" } }}>
                  <img
                    src={blogspageIcon}
                    alt="icon"
                    style={{ marginRight: "24px", width: "15px" }}
                  />
                  <FMTypography
                    displayText={"Explore Categories"}
                    onClick={categoryNavigatorHandler}
                    styleData={{
                      fontSize: "15px",
                      fontWeight: "400",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                  />
                </Button>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Button sx={{ "&:hover": { backgroundColor: "white" } }}>
                  <img
                    src={brandIcon}
                    alt="icon"
                    style={{ marginRight: "24px", width: "15px" }}
                  />
                  <FMTypography
                    displayText={"Product"}
                    onClick={() => brandProductNavigator()}
                    styleData={{
                      fontSize: "15px",
                      fontWeight: "400",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                  />
                </Button>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Button sx={{ "&:hover": { backgroundColor: "white" } }}>
                  <img
                    src={brandIcon}
                    alt="icon"
                    style={{ marginRight: "24px", width: "15px" }}
                  />
                  <FMTypography
                    displayText={"Brand Page"}
                    onClick={() => brandPageDisplay()}
                    styleData={{
                      fontSize: "15px",
                      fontWeight: "400",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                  />
                </Button>

                <Box
                  className="dropdown-homepage"
                  style={{
                    display: openBrandPage ? "flex" : "none",
                    paddingLeft: "3rem",
                    height: "50px",
                    // display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                  }}
                >
                  <FMTypography
                    displayText={"Brand Product"}
                    onClick={() => brandPageNavigator()}
                    styleData={{ color: "#717171", cursor: "pointer" }}
                  />

                  <FMTypography
                    displayText={"Brand Page Banner"}
                    onClick={() => brandBannerNavigator()}
                    styleData={{ color: "#717171", cursor: "pointer" }}
                  />
                </Box>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Button sx={{ "&:hover": { backgroundColor: "white" } }}>
                  <img
                    src={corporateIcon}
                    alt="icon"
                    style={{ marginRight: "24px", width: "15px" }}
                  />
                  <FMTypography
                    displayText={"Corporate Page"}
                    onClick={() => corporatePageDisplay()}
                    styleData={{
                      fontSize: "15px",
                      fontWeight: "400",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                  />
                </Button>
                <Box
                  className="dropdown-homepage"
                  style={{
                    display: corporatePage ? "block" : "none",
                    paddingLeft: "3rem",
                    height: "50px",
                    // display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                  }}
                >
                  <FMTypography
                    displayText={"Corporate Product"}
                    styleData={{ color: "#717171", cursor: "pointer" }}
                    onClick={() => corporateProductNavigator()}
                  />

                  <FMTypography
                    displayText={"Corporate Banner"}
                    styleData={{ color: "#717171", cursor: "pointer" }}
                    onClick={() => corporateBannerNavigator()}
                  />
                </Box>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Button sx={{ "&:hover": { backgroundColor: "white" } }}>
                  <img
                    src={corporateIcon}
                    alt="icon"
                    style={{ marginRight: "24px", width: "15px" }}
                  />
                  <FMTypography
                    displayText={"Exhibition"}
                    onClick={() => exhibitionNavigator()}
                    styleData={{
                      fontSize: "15px",
                      fontWeight: "400",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                  />
                </Button>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Button sx={{ "&:hover": { backgroundColor: "white" } }}>
                  <img
                    src={corporateIcon}
                    alt="icon"
                    style={{ marginRight: "24px", width: "15px" }}
                  />
                  <FMTypography
                    displayText={"Virtual Tour"}
                    onClick={() => virtualTourNavigator()}
                    styleData={{
                      fontSize: "15px",
                      fontWeight: "400",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                  />
                </Button>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Button sx={{ "&:hover": { backgroundColor: "white" } }}>
                  <img
                    src={corporateIcon}
                    alt="icon"
                    style={{ marginRight: "24px", width: "15px" }}
                  />
                  <FMTypography
                    displayText={"News & Press Page"}
                    onClick={() => newsPressDisplay()}
                    styleData={{
                      fontSize: "15px",
                      fontWeight: "400",
                      fontFamily: " 'Inter', sans-serif",
                      // color: activeOption ? "#f00" : "#555",
                    }}
                  />
                </Button>
                <Box
                  className="dropdown-homepage"
                  style={{
                    display: newsPressOpen ? "flex" : "none",
                    paddingLeft: "3rem",
                    height: "50px",
                    // display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                  }}
                >
                  <FMTypography
                    displayText={"News & Press Banner"}
                    styleData={{
                      color: "#717171",
                      cursor: "pointer",
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
                      fontSize: "15.5px",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                    onClick={newsPressProductsNavigator}
                  />
                </Box>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Button>
                  <img
                    src={corporateIcon}
                    alt="icon"
                    style={{ marginRight: "24px", width: "15px" }}
                  />
                  <FMTypography
                    displayText={"Blogs"}
                    onClick={() => blogsMenuDisplay()}
                    styleData={{
                      fontSize: "15px",
                      fontWeight: "400",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                  />
                </Button>

                <Box
                  className="dropdown-homepage"
                  style={{
                    display: blogsMenuOpen ? "flex" : "none",
                    paddingLeft: "3rem",
                    height: "50px",
                    // display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                  }}
                >
                  <FMTypography
                    displayText={"Blogs Category"}
                    styleData={{
                      color: "#717171",
                      cursor: "pointer",
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
                      fontSize: "15.5px",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                    onClick={() => blogsNavigator()}
                  />
                </Box>

                {/* blog dropdown above */}
              </div>
              <div style={{ marginBottom: "20px" }}>
                <Button>
                  <img
                    src={corporateIcon}
                    alt="icon"
                    style={{ marginRight: "24px", width: "15px" }}
                  />
                  <FMTypography
                    displayText={"Catalogue"}
                    onClick={() => catalogueNavigator()}
                    styleData={{
                      fontSize: "15px",
                      fontWeight: "400",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                  />
                </Button>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Button>
                  <img
                    src={corporateIcon}
                    alt="icon"
                    style={{ marginRight: "24px", width: "15px" }}
                  />
                  <FMTypography
                    displayText={"Videos"}
                    onClick={() => videoNavigator()}
                    styleData={{
                      fontSize: "15px",
                      fontWeight: "400",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                  />
                </Button>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Button>
                  <img
                    src={corporateIcon}
                    alt="icon"
                    style={{ marginRight: "24px", width: "15px" }}
                  />
                  <FMTypography
                    displayText={"Care & Clean"}
                    onClick={() => careCleanNavigator()}
                    styleData={{
                      fontSize: "15px",
                      fontWeight: "400",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                  />
                </Button>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Button>
                  <img
                    src={corporateIcon}
                    alt="icon"
                    style={{ marginRight: "24px", width: "15px" }}
                  />
                  <FMTypography
                    displayText={"About us"}
                    onClick={() => aboutusNavigator()}
                    styleData={{
                      fontSize: "15px",
                      fontWeight: "400",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                  />
                </Button>
              </div>

              {/*  */}
              <div style={{ marginBottom: "20px" }}>
                <Button sx={{ "&:hover": { backgroundColor: "white" } }}>
                  <img
                    src={corporateIcon}
                    alt="icon"
                    style={{ marginRight: "24px", width: "15px" }}
                  />
                  <FMTypography
                    displayText={"FAQs"}
                    onClick={() => faqsMenuDisplay()}
                    styleData={{
                      fontSize: "15px",
                      fontWeight: "400",
                      fontFamily: " 'Inter', sans-serif",
                      // color: activeOption ? "#f00" : "#555",
                    }}
                  />
                </Button>
                <Box
                  className="dropdown-homepage"
                  style={{
                    display: faqsOpen ? "flex" : "none",
                    paddingLeft: "3rem",
                    height: "50px",
                    // display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                  }}
                >
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

                  <FMTypography
                    displayText={"FAQs Category"}
                    styleData={{
                      color: "#717171",
                      cursor: "pointer",
                      fontSize: "15.5px",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                    onClick={faqCategoryNavigator}
                  />
                </Box>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Button>
                  <img
                    src={corporateIcon}
                    alt="icon"
                    style={{ marginRight: "24px", width: "15px" }}
                  />
                  <FMTypography
                    displayText={"Warranty Registration"}
                    onClick={() => warrantyNavigator()}
                    styleData={{
                      fontSize: "15px",
                      fontWeight: "400",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                  />
                </Button>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Button>
                  <img
                    src={corporateIcon}
                    alt="icon"
                    style={{ marginRight: "24px", width: "15px" }}
                  />
                  <FMTypography
                    displayText={"Quotation Section"}
                    onClick={() => quotationNavigator()}
                    styleData={{
                      fontSize: "15px",
                      fontWeight: "400",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                  />
                </Button>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Button>
                  <img
                    src={corporateIcon}
                    alt="icon"
                    style={{ marginRight: "24px", width: "15px" }}
                  />
                  <FMTypography
                    displayText={"Career Section"}
                    onClick={() => careerSectionNavigator()}
                    styleData={{
                      fontSize: "15px",
                      fontWeight: "400",
                      fontFamily: " 'Inter', sans-serif",
                    }}
                  />
                </Button>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Button>
                  <img
                    src={corporateIcon}
                    alt="icon"
                    style={{ marginRight: "24px", width: "15px" }}
                  />
                  <FMTypography
                    displayText={"Contact Us Section"}
                    onClick={() => ContactUsSectionNavigator()}
                    styleData={{
                      fontSize: "15px",
                      fontWeight: "400",
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
                    ? "Explore Categories"
                    : type === "homePageBannerString"
                    ? "Banners"
                    : type === "brandProductString"
                    ? "Products"
                    : type === "brandPageString"
                    ? "Brand Page"
                    : type === "corporateProductString"
                    ? "Corporate Products"
                    : type === "corporateBannerString"
                    ? "Corporate Banners"
                    : type === "exhibitionBannerString"
                    ? "Exhibition Banner"
                    : type === "newsPressProductString"
                    ? "News & Press Product"
                    : type === "newsPressBannerString"
                    ? "News & Press Banners"
                    : type === "virtualTourBannerString"
                    ? "Virtual Tour Banners"
                    : type === "video"
                    ? "Videos"
                    : type === "careCleanString"
                    ? "Care & Clean"
                    : type === "blogsString"
                    ? "Blogs"
                    : type === "blogsCategoryString"
                    ? "Blogs Category"
                    : type === "catalogueString"
                    ? "Catalogues"
                    : type === "categoryBannerString"
                    ? "Category Banners"
                    : type === "brandPageBannerString"
                    ? "Brand Page Banner"
                    : type === "aboutUsString"
                    ? "About us"
                    : type === "faqsString"
                    ? "FAQS"
                    : type === "faqCategoryString"
                    ? "FAQ Category"
                    : type === "warrantyRegistrationString"
                    ? "Warranty Registration"
                    : type === "quotationSectionString"
                    ? "Quotation Section"
                    : type === "careerSectionString"
                    ? "Career section"
                    : type === "contactUsSectionString"
                    ? "Contact Us Section"
                    : "HomePage Explore Category"
                }
                styleData={{
                  fontWeight: "500",
                  fontSize: "24px",
                  fontFamily: " 'Inter', sans-serif",
                }}
              />
              <FMButton
                displayText={"Add"}
                variant="contained"
                styleData={{ backgroundColor: "#008060", borderRadius: "8px" }}
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
                    : type === "video"
                    ? addVideoModal
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
                    ? addBlogPage
                    : type === "blogsCategoryString"
                    ? addBlogCategoryModal
                    : type === "aboutUsString"
                    ? addAboutUsModal
                    : type === "faqsString"
                    ? addFaqsModal
                    : addFaqCategoryModal
                }
              />
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

          <AddCareCleanComponent
            open={addCareClean}
            setOpen={setAddCareClean}
          />
          <AddVideoComponent open={addVideo} setOpen={setAddVideo} />
          <AddCatalogueComponent
            open={addCatalogue}
            setOpen={setAddCatalogue}
          />
          <AddVirtualTourComponent
            open={addVirtualTour}
            setOpen={setAddVirtualTour}
          />
          <AddExhibitionBannerComponent
            open={addExhibitionBanner}
            setOpen={setAddExhibitionBanner}
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
          <AddFAQs open={addFaqs} setOpen={setAddFaqs} />
        </Row>
      </Container>
    </>
  );
};

export default HomePageBanners;
