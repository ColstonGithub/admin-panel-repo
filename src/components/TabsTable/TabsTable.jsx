import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FMTable from "./TableInTabs/FMTable";
import {
  aboutUsConfig,
  blogsCategoryConfig,
  blogsConfig,
  brandPageBannerConfig,
  brandPageTableConfig,
  brandProductTableConfig,
  careCleanConfig,
  careerSectionConfig,
  cataloguesConfig,
  categoryBannerConfig,
  contactUsSectionConfig,
  corporateBannerTableConfig,
  corporateProductTableConfig,
  exhibitionBannerTableConfig,
  faqCategoryConfig,
  faqConfig,
  homepageExploreCatSectionConfig,
  homePageTableConfig,
  newsPressBannerConfig,
  newsPressProductConfig,
  quotationSectionConfig,
  virtualTourBannerConfig,
  warrantyRegistrationConfig,
  orientationCenterConfig,
  whereToBuyConfig,
  careerDetailsConfig,
  exhibitionPageTableConfig,
} from "./TableInTabs/tableConfig";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteCategory,
  getHomePageCategories,
  getHomePageBanners,
  deleteBanner,
} from "redux/Slices/HomePage/HomePageCategories";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router";

import {
  deleteProduct,
  getBannerProducts,
} from "redux/Slices/BannerProducts/BannerProducts";
import EditHomePageBanner from "container/EditPages/EditHomePageBanner";
import EditHomePageCategory from "container/EditPages/EditHomePageCategory";
import {
  deleteBrandPage,
  getBrandPage,
} from "redux/Slices/BrandPage/BrandPage";
import BrandPageDetailPage from "container/DetailPages/BrandPageDetailPage";
import EditBrandPageCategory from "container//EditPages/EditBrandPageCategory";
import {
  deleteCorporateProduct,
  getcorporateProducts,
} from "redux/Slices/CorporatePageSlices/CorporateProduct";
import {
  deleteCorporateBanner,
  getcorporateBanner,
} from "redux/Slices/CorporatePageSlices/CorporateBanner";
import {
  deleteCategoryBanner,
  getCategoryBanners,
} from "redux/Slices/HomePage/CategoryBanner";
import {
  deleteExhibitionBanner,
  getExhibitionBanner,
  getExhibitionBannerDetail,
} from "redux/Slices/Exhibition/ExhibitionBanner";

import {
  deleteExhibitionPage,
  getExhibitionPage,
} from "redux/Slices/Exhibition/ExhibitionPage";

import {
  deleteNewsPressProduct,
  getNewsPressProducts,
} from "redux/Slices/NewsPress/NewsPressProducts";
import {
  deleteNewsPressBanner,
  getNewsPressBanner,
} from "redux/Slices/NewsPress/NewsPressBanner";
import {
  deleteVirtualTour,
  getVirtualTourBanner,
} from "redux/Slices/VirtuaTour/VirtualTour";

import {
  deleteCareClean,
  getCareClean,
} from "redux/Slices/CareClean/CareClean";

import { deleteBlog, getBlogs } from "redux/Slices/Blogs/Blogs";

import {
  deleteCatalogue,
  getCatalogues,
} from "redux/Slices/Catalogue/Catalogue";

import {
  deleteBrandPageBanner,
  getBrandPageBanner,
} from "redux/Slices/BrandPage/brandPageBanner";

import {
  getOrientationCenterData,
  deleteOrientationCenter,
} from "redux/Slices/OrientationCenter/orientation";

import {
  getWhereToBuyData,
  deleteWhereToBuy,
} from "redux/Slices/WhereToBuy/whereToBuy";

import HomePageBannerDetailPage from "container/DetailPages/HomepageBannerDetailPage";
import ExploreCategoryDetailPage from "container/DetailPages/ExploreCategoryDetailPage";
import ProductDetailPage from "container/DetailPages/ProductsDetailPage";
import BrandPageBannerDetailPage from "container/DetailPages/BrandPageBannerDetailPage";
import ExhibitionDetailPage from "container/DetailPages/ExhibitionDetailPage";
import BlogDetailPage from "container/DetailPages/BlogDetailPage";
import CataloguesDetailPage from "container/DetailPages/CataloguesDetailPage";
import CareerDetailsPage from "container/DetailPages/CareerDetailsPage";

import CareAndCleanDetailPage from "container/DetailPages/CareAndCleanDetailPage";
import CategoryBannerDetailPage from "container/DetailPages/CategoryBannerDetailPage";
import CorporateProductsDetailPage from "container/DetailPages/CorporateProductsDetailPage";
import CorporateBannerDetailPage from "container/DetailPages/CorporateBannerDetailPage";
import VirtualTourDetailPage from "container/DetailPages/VirtualTourDetailPage";
import NewsPressBannerDetailPage from "container/DetailPages/NewsPressBannerDetailPage";
import NewsPressProductDetailPage from "container/DetailPages/NewsPressProductDetailPage";
import AboutUsDetailPage from "container/DetailPages/AboutUsDetailPage";
import FaqCategoryDetailPage from "container/DetailPages/FaqCategoryDetailPage";
import FaqDetailPage from "container/DetailPages/FaqDetailPage";
import WarrantyRegDetailPage from "container/DetailPages/WarrantyRegDetailPage";
import QuotationSectionDetailPage from "container/DetailPages/QuotationSectionDetailPage";
import EditBrandPageBanner from "container/EditPages/EditBrandPageBanner";
import EditCorporateProduct from "container/EditPages/EditCorporateProduct";
import EditCorporateBanner from "container/EditPages/EditCorporateBanner";
import EditNewsPressBanner from "container/EditPages/EditNewsPressBanner";
import EditCategoryBanner from "container/EditPages/EditCategoryBanner";
import EditCatalogue from "container/EditPages/EditCatalogue";
import EditAboutUs from "container/EditPages/EditAboutUs";
import EditFaqCategory from "container/EditPages/EditFaqCategory";
import EditCareerDetails from "container/EditPages/EditCareerDetails";
import {
  deleteBlogCategory,
  getBlogCategory,
} from "redux/Slices/Blogs/BlogsCategory";
import { deleteAboutUs, getAboutUsData } from "redux/Slices/AboutUs/AboutUs";
import EditBlogsCategory from "container/EditPages/EditBlogsCategory";
import EditBlogs from "container/EditPages/EditBlogs";
import ContentWrap from "components/ContentWrap/ContentWrap";
import {
  deleteFaqCategory,
  getFaqCategoryData,
} from "redux/Slices/FAQS/FaqCategorySlice";
import { deleteFaq, getFaqData } from "redux/Slices/FAQS/FaqSlice";
import {
  deleteWarrantyRegistration,
  getWarrantyRegistration,
} from "redux/Slices/WarrantyRegistration/WarrantyRegistration";
import {
  deleteQuotationSection,
  getQuotationSection,
} from "redux/Slices/QuotationSection/QuotationSection";
import {
  deleteCareerSection,
  getCareerSection,
} from "redux/Slices/CareerSection/CareerSection";
import {
  deleteAboutUsSection,
  getContactUsSection,
} from "redux/Slices/ContactUsSection/ContactUsSection";
import CareerSectionDetailPage from "container/DetailPages/CareerSectionDetailPage";
import ContactUsSectionDetailPage from "container/DetailPages/ContactUsSectionDetailPage";
import {
  deleteHomepageExploreCategory,
  getHomePageExploreCat,
} from "redux/Slices/HomePage/HomepageExploreCategory";

import EditExhibitionBanner from "container/EditPages/EditExhibitionBanner";
import EditVirtualTourBanner from "container/EditPages/EditVirtualTourBanner";
import EditNewsPressProduct from "container/EditPages/EditNewsPressProduct";

import EditCareClean from "container/EditPages/EditCareClean";
import EditFAQs from "container/EditPages/EditFAQs";
import { InfinitySpin } from "react-loader-spinner";
import HomepageCategoryBannerDetailPage from "container/DetailPages/HomepageBannerDetailPage";
import EditExploreCategoryComponent from "container/EditPages/EditExploreCategory";
import HomepageExploreCategoryDetailPage from "container/DetailPages/HomepageExploreCategoryDetailPage";
import BlogCategoryDetailPage from "container/DetailPages/BlogCategoryDetailPage";
import OrientationCenterDetailPage from "container/DetailPages/OrientationCenterDetailPage";
import EditOrientationCenter from "container/EditPages/EditOrientationCenter";
import WhereToBuyDetailPage from "container/DetailPages/WhereToBuyDetailPage";
import EditWhereToBuy from "container/EditPages/EditWhereToBuy";
import ExhibitionSectionDetailPage from "container/DetailPages/ExhibitionSectionDetailPage";
import EditExhibitionPage from "container/EditPages/EditExhibitionPage";
import {
  deleteCareerDetails,
  getCareerDetailData,
} from "redux/Slices/CareerDetails/CareerDetails";

import { getInitialImagesAdmin } from "redux/Slices/InitialImagesAdmin/InitialImagesAdminSlice";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ backgroundColor: "white" }}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabsTable({ type }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  const [loader, setLoader] = React.useState(false);

  // detail page open state below
  const [openDetailPage, setOpenDetailPage] = React.useState(false);
  const [openExploreCatDetail, setOpenExploreCatDetail] = React.useState(false);
  const [openCareerDetDetail, setOpenCareerDetDetail] = React.useState(false);
  const [openBrandPageDetailPage, setOpenBrandPageDetailPage] =
    React.useState(false);
  const [openBrandPageBannerDetailPage, setOpenBrandPageBannerDetailPage] =
    React.useState(false);
  const [openProductDetailPage, setOpenProductDetailPage] =
    React.useState(false);
  const [exhibitionDetailPage, setOpenExhibitionDetailPage] =
    React.useState(false);
  const [openBlogDetailPage, setOpenBlogDetailPage] = React.useState(false);
  const [openBlogCategoryDetailPage, setOpenBlogCategoryDetailPage] =
    React.useState(false);

  const [openCatalogueDetailPage, setOpenCatalogueDetailPage] =
    React.useState(false);

  const [openCareCleanDetailPage, setOpenCareCleanDetailPage] =
    React.useState(false);
  const [openCategoryBannerDetailPage, setOpenCategoryBannerDetailPage] =
    React.useState(false);
  const [
    openHomepageCategoryBannerDetailPage,
    setOpenHomepageCategoryBannerDetailPage,
  ] = React.useState(false);
  const [
    openHomepageExploreCategoryDetailPage,
    setOpenHomepageExploreCategoryDetailPage,
  ] = React.useState(false);

  const [openCorporateProductDetailPage, setOpenCorporateProductDetailPage] =
    React.useState(false);
  const [openCorporateBannerDetailPage, setOpenCorporateBannerDetailPage] =
    React.useState(false);
  const [openVirtualTourDetailPage, setOpenVirtualTourDetailPage] =
    React.useState(false);
  const [openNewsPressBannerDetailPage, setOpenNewsPressBannerDetailPage] =
    React.useState(false);
  const [openNewsPressProductDetailPage, setOpenNewsPressProductDetailPage] =
    React.useState(false);
  const [openAboutUsDetailPage, setOpenAboutUsDetailPage] =
    React.useState(false);
  const [openFaqCategoryDetailPage, setOpenFaqCategoryDetailPage] =
    React.useState(false);
  const [openFaqDetailPage, setOpenFaDetailPage] = React.useState(false);
  const [openWarrantyDetailPage, setOpenWarrantyDetailPage] =
    React.useState(false);
  const [openQuotationSecDetailPage, setOpenQuotationSecDetailPage] =
    React.useState(false);
  const [openCareerSecDetailPage, setOpenCareerSecDetailPage] =
    React.useState(false);
  const [openContactUsSecDetailPage, setOpenContactUsSecDetailPage] =
    React.useState(false);
  const [orientationDetailPage, setOrientationDetailPage] =
    React.useState(false);
  const [whereToBuyDetailPage, setWhereToBuyDetailPage] = React.useState(false);
  // id states fro detail page below
  const [prodId, setProdId] = React.useState(null);
  const [exploreCatId, setExploreCatId] = React.useState(null);
  const [careerDetailsId, setCareerDetailsId] = React.useState(null);
  const [bannerPageId, setBannerPageId] = React.useState(null);
  const [productPageId, setProductPageId] = React.useState(null);
  const [bannerPageBannerId, setBannerPageBannerId] = React.useState(null);
  const [exhibitionPageId, setExhibitionPageId] = React.useState(null);

  const [blogPageId, setBlogPageId] = React.useState(null);
  const [blogCategoryPageId, setBlogCategoryPageId] = React.useState(null);
  const [cataloguePageId, setCataloguePageId] = React.useState(null);

  const [careCleanPageId, setCareCleanPageId] = React.useState(null);
  const [categoryBannerPageId, setCategoryBannerPageId] = React.useState(null);
  const [homepageExploreCategoryPageId, setHomepageExploreCategoryPageId] =
    React.useState(null);
  const [homepageCategoryBannerPageId, setHomepageCategoryBannerPageId] =
    React.useState(null);
  const [corporateProductPageId, setCorporateProductPageId] =
    React.useState(null);
  const [corporateBannerPageId, setCorporateBannerPageId] =
    React.useState(null);
  const [virtualTourPageId, setVirtualTourPageId] = React.useState(null);
  const [newsPressBannerPageId, setNewsPressBannerPageId] =
    React.useState(null);
  const [newsPressProductPageId, setNewsPressProductPageId] =
    React.useState(null);
  const [aboutUsPageId, setAboutUsPageId] = React.useState(null);
  const [faqCategoryPageId, setFaqCategoryPageId] = React.useState(null);
  const [faqPageId, setFaqPageId] = React.useState(null);
  const [warrrantyRegistrationId, setWarrrantyRegistrationId] =
    React.useState(null);
  const [quotationSectionId, setQuotationSectionId] = React.useState(null);
  const [careerSectionId, setCareerSectionId] = React.useState(null);
  const [contactUsSectionId, setContactUsSectionId] = React.useState(null);
  const [orientationCenterId, setOrientationCenterId] = React.useState(null);
  const [whereToBuyId, setWhereToBuyId] = React.useState(null);
  // edit states
  const [editHomeBanner, setEditHomeBanner] = React.useState(false);
  const [editedCareerDetail, setEditedCareerDetail] = React.useState(false);
  const [editedProdId, setEditedProdId] = React.useState(null);
  const [editedCareerDetailId, setEditedCareerDetailId] = React.useState(null);

  // editopen
  const [editHomeCategory, setEditHomeCategory] = React.useState(false);
  const [editBrandPage, setEditBrandPage] = React.useState(false);
  const [editVirtualTourBanner, setEditVirtualTourBanner] =
    React.useState(false);
  const [editCareClean, setEditCareClean] = React.useState(false);

  const [editNewsPressProduct, setEditNewsPressProduct] = React.useState(false);
  const [editExhibitionBanner, setEditExhibitionBanner] = React.useState(false);

  // edit ids
  const [editedCategoryId, setEditedCategoryId] = React.useState(null);
  const [editedBrandPageId, setEditedBrandPageId] = React.useState(null);
  const [editedFaqCategoryId, setEditedFaqCategoryId] = React.useState(null);
  const [editedBrandPageBannerId, setEditedBrandPageBannerId] =
    React.useState(null);
  const [editedVirtualBannerId, setEditedVirtualBannerId] =
    React.useState(null);
  const [editedCareCleanId, setEditedCareCleanId] = React.useState(null);

  const [editedNewsPressProductId, setEditedNewsPressProductId] =
    React.useState(null);
  const [editedExhibitionBannerId, setEditedExhibitionBannerId] =
    React.useState(null);
  const [editCorporateProduct, setEditCorporateProduct] = React.useState(false);
  const [editCorporateBanner, setEditCorporateBanner] = React.useState(false);
  const [editNewsPressBanner, setEditNewsPressBanner] = React.useState(false);
  const [editCategoryBanner, setEditCategoryBanner] = React.useState(false);
  const [editCatalogue, setEditCatalogue] = React.useState(false);
  const [editAboutUs, setEditAboutUs] = React.useState(false);
  const [editBlogCategory, setEditBlogCategory] = React.useState(false);
  const [editBlogs, setEditBlogs] = React.useState(false);
  const [editFAQs, setEditFAQs] = React.useState(false);
  const [editExploreCategory, setEditExploreCategory] = React.useState(false);
  const [editOrientationCenter, setEditOrientationCenter] =
    React.useState(false);
  const [editWhereToBuy, setEditWhereToBuy] = React.useState(false);
  const [editFaqCategory, setEditFaqCategory] = React.useState(false);

  const [usersListData, setUsersListData] = React.useState({
    page: 1,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const editProductPage = (id) => {
    navigate(`/products/edit-product/${id}`);
  };

  const [exhibitionPageSectionId, setExhibitionPageSectionId] =
    React.useState(null);
  const [exhibitionPageDetailPage, setExhibitionPageDetailPage] =
    React.useState(false);
  const [editExhibitionPage, setEditExhibitionPage] = React.useState(false);
  const [editedExhibitionPageId, setEditedExhibitionPageId] =
    React.useState(null);
  const exhibitionPageData = useSelector(
    (state) =>
      state?.exhibitionPage?.getExhibitionPageListData?.exhibitionProducts
  );

  const exhibitionPagePagination = useSelector(
    (state) => state?.orientationCenter?.getOrientationCenterListData.pagination
  );

  const homepageCategories = useSelector(
    (state) => state?.exploreCategories?.getCategoriesListData?.categoryList
  );

  const homepageCategoriesPagination = useSelector(
    (state) => state?.exploreCategories?.getCategoriesListData?.pagination
  );

  const homepageBanners = useSelector(
    (state) => state?.exploreCategories?.getBannersListingData?.homepageBanner
  );

  const homepagePagination = useSelector(
    (state) => state?.exploreCategories?.getBannersListingData?.pagination
  );

  const brandproductss = useSelector(
    (state) => state?.brandProduct?.getBannerProductsListData?.products
  );
  const brandproductssPagination = useSelector(
    (state) => state?.brandProduct?.getBannerProductsListData?.pagination
  );

  const brandPage = useSelector(
    (state) => state?.brandPage?.getBrandPageListData?.brandProducts
  );

  const brandPagePagination = useSelector(
    (state) => state?.brandPage?.getBrandPageListData?.pagination
  );

  const corporateProduct = useSelector(
    (state) =>
      state?.corporateProduct?.getCorporateProductListData?.corporateProducts
  );
  const corporateProductPagination = useSelector(
    (state) => state?.corporateProduct?.getCorporateProductListData?.pagination
  );

  const corporateBanner = useSelector(
    (state) => state?.corporateBanner?.getCorporateBannerListData?.PageBanner
  );

  const corporateBannerPagination = useSelector(
    (state) => state?.corporateBanner?.getCorporateBannerListData?.pagination
  );

  const exhibitionBannerData = useSelector(
    (state) => state?.exhibitionBanner?.getExhibitionBannerListData?.PageBanner
  );

  const exhibitionBannerPagination = useSelector(
    (state) => state?.exhibitionBanner?.getExhibitionBannerListData?.pagination
  );

  const newsPressBannerData = useSelector(
    (state) => state?.newsPressBanner?.getNewsPressBannerListData?.PageBanner
  );

  const newsPressBannerPagination = useSelector(
    (state) => state?.newsPressBanner?.getNewsPressBannerListData?.pagination
  );

  const newsPressProductData = useSelector(
    (state) =>
      state?.newsPressProduct?.getNewsPressProductListData?.newsPressList
  );

  const newsPressProductPagination = useSelector(
    (state) => state?.newsPressProduct?.getNewsPressProductListData?.pagination
  );

  const virtualTourData = useSelector(
    (state) =>
      state?.virtualTourBanner?.getVirtualTourBannerListData?.PageBanner
  );
  const virtualTourPagination = useSelector(
    (state) =>
      state?.virtualTourBanner?.getVirtualTourBannerListData?.pagination
  );

  const careCleanData = useSelector(
    (state) => state?.careClean?.getCareCleanListData?.careCleanData
  );
  const careCleanPagination = useSelector(
    (state) => state?.careClean?.getCareCleanListData?.pagination
  );

  const blogData = useSelector(
    (state) => state?.blogs?.getBlogsListData?.blogsList
  );

  const blogPagination = useSelector(
    (state) => state?.blogs?.getBlogsListData?.pagination
  );
  const {
    getBlogCategoryListData: blogCategoryData,
    isFetching,
    isError,
  } = useSelector((state) => state?.blogsCategory);

  const blogCategoryPagination = useSelector(
    (state) => state?.blogsCategory?.getBlogCategoryListData?.pagination
  );

  const cataloguesData = useSelector(
    (state) => state?.catalogues?.getCataloguesListData?.catalogueList
  );
  const cataloguesPagination = useSelector(
    (state) => state?.catalogues?.getCataloguesListData?.pagination
  );
  const brandPageBannerData = useSelector(
    (state) => state?.brandPageBanner?.getCareCleanListData?.PageBanner
  );
  const brandPageBannerPagination = useSelector(
    (state) => state?.brandPageBanner?.getCareCleanListData?.pagination
  );

  const categoryBannerData = useSelector(
    (state) =>
      state?.categoryBanner?.getCategoryBannersListingData?.CategoryBanner
  );

  const categoryBannerPagination = useSelector(
    (state) => state?.categoryBanner?.getCategoryBannersListingData?.pagination
  );

  //
  const homepageExploreCategoryData = useSelector(
    (state) =>
      state?.homepageExploreCategory?.getExploreCategoryListData
        ?.exploreCategory
  );
  const homepageExploreCategoryPagination = useSelector(
    (state) =>
      state?.homepageExploreCategory?.getExploreCategoryListData?.pagination
  );

  const aboutUsData = useSelector(
    (state) => state?.aboutUs?.getAboutUsListData?.aboutUsData
  );

  const aboutUsPagination = useSelector(
    (state) => state?.aboutUs?.getAboutUsListData?.pagination
  );

  const faqCategoryData = useSelector(
    (state) => state?.faqCategory?.getFaqCategoryListData?.faqCategoryList
  );

  const faqCategoryPagination = useSelector(
    (state) => state?.faqCategory?.getFaqCategoryListData?.pagination
  );

  const faqData = useSelector((state) => state?.faq?.getFaqListData?.faqList);

  const faqPagination = useSelector(
    (state) => state?.faq?.getFaqListData?.pagination
  );

  const warrantyRegistrationData = useSelector(
    (state) =>
      state?.warrantyRegistration?.getWarrantyRegistrationListData
        ?.warrentyRegistration
  );

  const warrantyRegistrationPagination = useSelector(
    (state) =>
      state?.warrantyRegistration?.getWarrantyRegistrationListData?.pagination
  );

  const quotationSectionData = useSelector(
    (state) =>
      state?.quotationSection?.getQuotationSectionListData
        ?.requestForQuotationData
  );

  const quotationSectionPagination = useSelector(
    (state) => state?.quotationSection?.getQuotationSectionListData?.pagination
  );

  const careerSectionData = useSelector(
    (state) => state?.careerSection?.getCareerSectionListData?.careerData
  );

  const careerSectionPagination = useSelector(
    (state) => state?.careerSection?.getCareerSectionListData?.pagination
  );

  const contactUsSectionData = useSelector(
    (state) => state?.contactUsSection?.getContactUsSectionListData?.contactUs
  );

  const contactUsSectionPagination = useSelector(
    (state) => state?.contactUsSection?.getContactUsSectionListData?.pagination
  );

  const orientationCenterData = useSelector(
    (state) =>
      state?.orientationCenter?.getOrientationCenterListData
        ?.orientationProducts
  );

  const orientationCenterPagination = useSelector(
    (state) => state?.orientationCenter?.getOrientationCenterListData.pagination
  );

  const careerDetailsData = useSelector(
    (state) => state?.careerDetails?.getCareerDetailsListData?.careerDetailsList
  );

  const careerDetailsPagination = useSelector(
    (state) => state?.careerDetails?.getCareerDetailsListData?.pagination
  );

  const whereToBuyData = useSelector(
    (state) => state?.whereToBuy?.getWhereToBuyListData?.whereToBuyProducts
  );

  const whereToBuyPagination = useSelector(
    (state) => state?.whereToBuy?.getWhereToBuyListData?.pagination
  );

  const initialImagesAdmin = useSelector(
    (state) => state?.InitialImagesAdmin?.initialImagesAdmin?.initialImages
  );

  const editIcon = initialImagesAdmin && initialImagesAdmin[8]?.image;
  const detailIcon = initialImagesAdmin && initialImagesAdmin[9]?.image;
  const deleteIcon = initialImagesAdmin && initialImagesAdmin[10]?.image;

  useEffect(() => {
    if (type === "homePageBannerString") {
      dispatch(getHomePageBanners(usersListData));
    } else if (type === "categoryBannerString") {
      dispatch(getCategoryBanners(usersListData));
    } else if (type === "homePageCategoryString") {
      dispatch(getHomePageCategories(usersListData));
    } else if (type === "brandProductString") {
      dispatch(getBannerProducts(usersListData));
    } else if (type === "brandPageString") {
      dispatch(getBrandPage(usersListData));
    } else if (type === "corporateProductString") {
      dispatch(getcorporateProducts(usersListData));
    } else if (type === "corporateBannerString") {
      dispatch(getcorporateBanner(usersListData));
    } else if (type === "exhibitionBannerString") {
      dispatch(getExhibitionBanner(usersListData));
    } else if (type === "newsPressProductString") {
      dispatch(getNewsPressProducts(usersListData));
    } else if (type === "newsPressBannerString") {
      dispatch(getNewsPressBanner(usersListData));
    } else if (type === "virtualTourBannerString") {
      dispatch(getVirtualTourBanner(usersListData));
    } else if (type === "careCleanString") {
      dispatch(getCareClean(usersListData));
    } else if (type === "blogsString") {
      dispatch(getBlogs(usersListData));
    } else if (type === "blogsCategoryString") {
      dispatch(getBlogCategory(usersListData));
    } else if (type === "catalogueString") {
      dispatch(getCatalogues(usersListData));
    } else if (type === "brandPageBannerString") {
      dispatch(getBrandPageBanner(usersListData));
    } else if (type === "aboutUsString") {
      dispatch(getAboutUsData(usersListData));
    } else if (type === "faqCategoryString") {
      dispatch(getFaqCategoryData(usersListData));
    } else if (type === "faqsString") {
      dispatch(getFaqData(usersListData));
    } else if (type === "warrantyRegistrationString") {
      dispatch(getWarrantyRegistration(usersListData));
    } else if (type === "quotationSectionString") {
      dispatch(getQuotationSection(usersListData));
    } else if (type === "careerSectionString") {
      dispatch(getCareerSection(usersListData));
    } else if (type === "contactUsSectionString") {
      dispatch(getContactUsSection(usersListData));
    } else if (type === "homepageExploreCategory") {
      dispatch(getHomePageExploreCat(usersListData));
    } else if (type === "orientationCenterString") {
      dispatch(getOrientationCenterData(usersListData));
    } else if (type === "exhibitionPageString") {
      dispatch(getExhibitionPage(usersListData));
    } else if (type === "careerDetailsPageString") {
      dispatch(getCareerDetailData(usersListData));
    } else if (type === "whereToBuyString") {
      dispatch(getWhereToBuyData(usersListData));
    }
  }, [dispatch, type, usersListData]);

  useEffect(() => {
    if (prodId !== null && prodId) {
      setOpenDetailPage(true);
    }
  }, [prodId]);

  useEffect(() => {
    if (exploreCatId !== null && exploreCatId) {
      setOpenExploreCatDetail(true);
    }
  }, [exploreCatId]);
  useEffect(() => {
    if (careerDetailsId !== null && careerDetailsId) {
      setOpenCareerDetDetail(true);
    }
  }, [careerDetailsId]);

  useEffect(() => {
    if (orientationCenterId !== null && orientationCenterId) {
      setOrientationDetailPage(true);
    }
  }, [orientationCenterId]);

  useEffect(() => {
    if (whereToBuyId !== null && whereToBuyId) {
      setWhereToBuyDetailPage(true);
    }
  }, [whereToBuyId]);

  useEffect(() => {
    if (bannerPageId !== null && bannerPageId) {
      setOpenBrandPageDetailPage(true);
    }
  }, [bannerPageId]);

  useEffect(() => {
    if (bannerPageBannerId !== null && bannerPageBannerId) {
      setOpenBrandPageBannerDetailPage(true);
    }
  }, [bannerPageBannerId]);

  useEffect(() => {
    if (productPageId !== null && productPageId) {
      setOpenProductDetailPage(true);
    }
  }, [productPageId]);

  useEffect(() => {
    if (exhibitionPageId !== null && exhibitionPageId) {
      setOpenExhibitionDetailPage(true);
    }
  }, [exhibitionPageId]);

  useEffect(() => {
    if (exhibitionPageSectionId !== null && exhibitionPageSectionId) {
      setExhibitionPageDetailPage(true);
    }
  }, [exhibitionPageSectionId]);

  useEffect(() => {
    if (blogPageId !== null && blogPageId) {
      setOpenBlogDetailPage(true);
    } else {
      setOpenBlogDetailPage(false);
    }
  }, [blogPageId]);

  useEffect(() => {
    if (blogCategoryPageId !== null && blogCategoryPageId) {
      setOpenBlogCategoryDetailPage(true);
    } else {
      setOpenBlogCategoryDetailPage(false);
    }
  }, [blogCategoryPageId]);

  useEffect(() => {
    if (cataloguePageId !== null && cataloguePageId) {
      setOpenCatalogueDetailPage(true);
    }
  }, [cataloguePageId]);

  useEffect(() => {
    if (careCleanPageId !== null && careCleanPageId) {
      setOpenCareCleanDetailPage(true);
    }
  }, [careCleanPageId]);

  useEffect(() => {
    if (categoryBannerPageId !== null && categoryBannerPageId) {
      setOpenCategoryBannerDetailPage(true);
    }
  }, [categoryBannerPageId]);

  useEffect(() => {
    if (homepageCategoryBannerPageId !== null && homepageCategoryBannerPageId) {
      setOpenHomepageCategoryBannerDetailPage(true);
    }
  }, [homepageCategoryBannerPageId]);

  useEffect(() => {
    if (
      homepageExploreCategoryPageId !== null &&
      homepageExploreCategoryPageId
    ) {
      setOpenHomepageExploreCategoryDetailPage(true);
    }
  }, [homepageExploreCategoryPageId]);

  useEffect(() => {
    if (corporateProductPageId !== null && corporateProductPageId) {
      setOpenCorporateProductDetailPage(true);
    }
  }, [corporateProductPageId]);

  useEffect(() => {
    if (corporateBannerPageId !== null && corporateBannerPageId) {
      setOpenCorporateBannerDetailPage(true);
    }
  }, [corporateBannerPageId]);

  useEffect(() => {
    if (virtualTourPageId !== null && virtualTourPageId) {
      setOpenVirtualTourDetailPage(true);
    }
  }, [virtualTourPageId]);
  useEffect(() => {
    if (newsPressBannerPageId !== null && newsPressBannerPageId) {
      setOpenNewsPressBannerDetailPage(true);
    }
  }, [newsPressBannerPageId]);
  useEffect(() => {
    if (newsPressProductPageId !== null && newsPressProductPageId) {
      setOpenNewsPressProductDetailPage(true);
    }
  }, [newsPressProductPageId]);

  useEffect(() => {
    if (aboutUsPageId !== null && aboutUsPageId) {
      setOpenAboutUsDetailPage(true);
    }
  }, [aboutUsPageId]);

  useEffect(() => {
    if (faqCategoryPageId !== null && faqCategoryPageId) {
      setOpenFaqCategoryDetailPage(true);
    }
  }, [faqCategoryPageId]);

  useEffect(() => {
    if (faqPageId !== null && faqPageId) {
      setOpenFaDetailPage(true);
    }
  }, [faqPageId]);

  useEffect(() => {
    if (warrrantyRegistrationId !== null && warrrantyRegistrationId) {
      setOpenWarrantyDetailPage(true);
    }
  }, [warrrantyRegistrationId]);

  useEffect(() => {
    if (quotationSectionId !== null && quotationSectionId) {
      setOpenQuotationSecDetailPage(true);
    }
  }, [quotationSectionId]);

  useEffect(() => {
    if (careerSectionId !== null && careerSectionId) {
      setOpenCareerSecDetailPage(true);
    }
  }, [careerSectionId]);

  useEffect(() => {
    if (contactUsSectionId !== null && contactUsSectionId) {
      setOpenContactUsSecDetailPage(true);
    }
  }, [contactUsSectionId]);

  // detail page useeffects above
  useEffect(() => {
    if (editedProdId !== null && editedProdId) setEditHomeBanner(true);
  }, [editedProdId]);

  const edithomepageDisplay = (cId) => {
    setEditedProdId(cId);
  };

  useEffect(() => {
    if (editedCareerDetailId !== null && editedCareerDetailId)
      setEditedCareerDetail(true);
  }, [editedCareerDetailId]);

  const editCareerDetailsPage = (cId) => {
    setEditedCareerDetailId(cId);
  };

  useEffect(() => {
    if (editedCategoryId !== null && editedCategoryId)
      setEditHomeCategory(true);
  }, [editedCategoryId]);

  useEffect(() => {
    if (editedBrandPageId !== null && editedBrandPageId) setEditBrandPage(true);
  }, [editedBrandPageId]);

  useEffect(() => {
    if (editedFaqCategoryId !== null && editedFaqCategoryId)
      setEditFaqCategory(true);
  }, [editedFaqCategoryId]);

  useEffect(() => {
    if (editedVirtualBannerId !== null && editedVirtualBannerId)
      setEditVirtualTourBanner(true);
  }, [editedVirtualBannerId]);

  useEffect(() => {
    if (editedCareCleanId !== null && editedCareCleanId) setEditCareClean(true);
  }, [editedCareCleanId]);

  useEffect(() => {
    if (editedNewsPressProductId !== null && editedNewsPressProductId)
      setEditNewsPressProduct(true);
  }, [editedNewsPressProductId]);

  useEffect(() => {
    if (editedExhibitionBannerId !== null && editedExhibitionBannerId)
      setEditExhibitionBanner(true);
  }, [editedExhibitionBannerId]);

  useEffect(() => {
    if (editedExhibitionPageId !== null && editedExhibitionPageId)
      setEditExhibitionPage(true);
  }, [editedExhibitionPageId]);

  // edit useEffect above

  const edithomepageCategoryFunc = (cId) => {
    setEditedCategoryId(cId);
  };

  const editBrandPageFunc = (cId) => {
    setEditedBrandPageId(cId);
  };
  const editFaqCategoryFunc = (cId) => {
    setEditedFaqCategoryId(cId);
  };

  const editVirtualTourBannerFunc = (cId) => {
    setEditedVirtualBannerId(cId);
  };
  const editCareCleanFunc = (cId) => {
    setEditedCareCleanId(cId);
  };

  const editNewsPressProductFunc = (cId) => {
    setEditedNewsPressProductId(cId);
  };

  const editExhibitionBannerFunc = (cId) => {
    setEditedExhibitionBannerId(cId);
  };
  const editExhibitionPageFunc = (cId) => {
    setEditedExhibitionPageId(cId);
  };
  useEffect(() => {
    type === "exhibitionBannerString" &&
      dispatch(getExhibitionBannerDetail(editedExhibitionBannerId));
  }, [editedExhibitionBannerId, dispatch, type]);

  const exhibitionBannerDetail = useSelector(
    (state) => state?.exhibitionBanner?.getExhibtionBannerData?.banner
  );

  const editBrandPageBannerFunc = (cId) => {
    setEditedBrandPageBannerId(cId);
  };

  const editCorporateProductFunc = (cId) => {
    setEditCorporateProduct(cId);
  };

  const editCorporateBannerFunc = (cId) => {
    setEditCorporateBanner(cId);
  };

  const editNewsPressBannerFunc = (cId) => {
    setEditNewsPressBanner(cId);
  };

  const editCategoryBannerFunc = (cId) => {
    setEditCategoryBanner(cId);
  };
  const editExploreCategoryFunc = (cId) => {
    setEditExploreCategory(cId);
  };

  const editCatalogueFunc = (cId) => {
    setEditCatalogue(cId);
  };
  const editAboutUsFunc = (cId) => {
    setEditAboutUs(cId);
  };
  const editOrientationCenterFunc = (cId) => {
    setEditOrientationCenter(cId);
  };

  const editWhereToBuyFunc = (cId) => {
    setEditWhereToBuy(cId);
  };

  const editBlogCategoryFunc = (cId) => {
    setEditBlogCategory(cId);
  };

  const editBlogsFunc = (cId) => {
    navigate(`/colstonconcept/edit/${cId}`);
    // setEditBlogs(cId);
  };

  const editFAQsFunc = (cId) => {
    setEditFAQs(cId);
  };

  const editExhibitionFunc = (cId) => {
    setEditedExhibitionPageId(cId);
  };

  // detail page id setting states
  const detailPageHandler = (cId) => {
    setProdId(cId);
  };
  const exploreCatdetailPageHandler = (cId) => {
    setExploreCatId(cId);
    // cId.stopPropagation();
  };

  const brandDetailPageHandler = (cId) => {
    setBannerPageId(cId);
  };
  const brandPageBannerDetailPageHandler = (cId) => {
    setBannerPageBannerId(cId);
  };
  const productDetailPageHandler = (cId) => {
    setProductPageId(cId);
  };

  const exhibitionDetailPageHandler = (cId) => {
    setExhibitionPageId(cId);
  };
  const blogDetailPageHandler = (cId) => {
    setBlogPageId(cId);
  };
  const careerDetailsPageHandler = (cId) => {
    setCareerDetailsId(cId);
  };

  const blogCategoryDetailPageHandler = (cId) => {
    setBlogCategoryPageId(cId);
  };
  const catalogueDetailPageHandler = (cId) => {
    setCataloguePageId(cId);
  };

  const careCleanDetailPageHandler = (cId) => {
    setCareCleanPageId(cId);
  };
  const categoryBannerDetailPageHandler = (cId) => {
    setCategoryBannerPageId(cId);
  };

  const homepageCategoryBannerDetailPageHandler = (cId) => {
    setHomepageCategoryBannerPageId(cId);
  };

  const HomepageExploreCategoryDetailPageHandler = (cId) => {
    setHomepageExploreCategoryPageId(cId);
  };

  const corporateProductDetailPageHandler = (cId) => {
    setCorporateProductPageId(cId);
  };

  const corporateProductBannerPageHandler = (cId) => {
    setCorporateBannerPageId(cId);
  };

  const virtualTourPageHandler = (cId) => {
    setVirtualTourPageId(cId);
  };

  const newsPressBannerPageHandler = (cId) => {
    setNewsPressBannerPageId(cId);
  };
  const orientationCenterPageHandler = (cId) => {
    setOrientationCenterId(cId);
  };
  const whereToBuyPageHandler = (cId) => {
    setWhereToBuyId(cId);
  };
  const newsPressProductPageHandler = (cId) => {
    setNewsPressProductPageId(cId);
  };
  const aboutUsDetailPage = (cId) => {
    setAboutUsPageId(cId);
  };

  const faqCategoryDetailPageHandler = (cId) => {
    setFaqCategoryPageId(cId);
  };

  const faqDetailPageHandler = (cId) => {
    setFaqPageId(cId);
  };

  const warrantyRegistrationDetailPageHandler = (cId) => {
    setWarrrantyRegistrationId(cId);
  };
  const quotationSectionDetailPageHandler = (cId) => {
    setQuotationSectionId(cId);
  };

  const careerSectionDetailPageHandler = (cId) => {
    setCareerSectionId(cId);
  };

  const contactUsSectionDetailPageHandler = (cId) => {
    setContactUsSectionId(cId);
  };

  const exhibitionPageSectionDetailPageHandler = (cId) => {
    setExhibitionPageSectionId(cId);
  };

  function cropText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.slice(0, maxLength) + "...";
    }
  }

  // delete api callings below

  const deleteCategoryFunc = (cId) => {
    const payload = {
      ids: [
        {
          _id: cId,
        },
      ],
    };
    let bannerId = cId;
    let productId = cId;
    let brandProductId = cId;

    if (type === "homePageCategoryString")
      dispatch(deleteCategory(payload)).then((res) => {
        if (res) {
          dispatch(getHomePageCategories(usersListData));
        }
      });
    else if (type === "homePageBannerString")
      dispatch(deleteBanner(bannerId)).then((res) => {
        if (res) {
          dispatch(getHomePageBanners(usersListData));
        }
      });
    else if (type === "careerDetailsPageString")
      dispatch(deleteCareerDetails(cId)).then((res) => {
        if (res) {
          dispatch(getCareerDetailData(usersListData));
        }
      });
    else if (type === "brandProductString")
      dispatch(deleteProduct(productId)).then((res) => {
        if (res) {
          dispatch(getBannerProducts(usersListData));
        }
      });
    else if (type === "brandPageString")
      dispatch(deleteBrandPage(brandProductId)).then((res) => {
        if (res) {
          dispatch(getBrandPage(usersListData));
        }
      });
    else if (type === "corporateProductString")
      dispatch(deleteCorporateProduct(cId)).then((res) => {
        if (res) {
          dispatch(getcorporateProducts(usersListData));
        }
      });
    else if (type === "categoryBannerString")
      dispatch(deleteCategoryBanner(cId)).then((res) => {
        if (res) {
          dispatch(getCategoryBanners(usersListData));
        }
      });
    else if (type === "brandPageBannerString")
      dispatch(deleteBrandPageBanner(cId)).then((res) => {
        if (res) {
          dispatch(getBrandPageBanner(usersListData));
        }
      });
    else if (type === "corporateBannerString")
      dispatch(deleteCorporateBanner(cId)).then((res) => {
        if (res) {
          dispatch(getcorporateBanner(usersListData));
        }
      });
    else if (type === "exhibitionBannerString")
      dispatch(deleteExhibitionBanner(cId)).then((res) => {
        if (res) {
          dispatch(getExhibitionBanner(usersListData));
        }
      });
    else if (type === "virtualTourBannerString")
      dispatch(deleteVirtualTour(cId)).then((res) => {
        if (res) {
          dispatch(getVirtualTourBanner(usersListData));
        }
      });
    else if (type === "newsPressBannerString")
      dispatch(deleteNewsPressBanner(cId)).then((res) => {
        if (res) {
          dispatch(getNewsPressBanner(usersListData));
        }
      });
    else if (type === "newsPressProductString")
      dispatch(deleteNewsPressProduct(cId)).then((res) => {
        if (res) {
          dispatch(getNewsPressProducts(usersListData));
        }
      });
    else if (type === "blogsString")
      dispatch(deleteBlog(cId)).then((res) => {
        if (res) {
          dispatch(getBlogs(usersListData));
        }
      });
    else if (type === "blogsCategoryString")
      dispatch(deleteBlogCategory(cId)).then((res) => {
        if (res) {
          dispatch(getBlogCategory(usersListData));
        }
      });
    else if (type === "catalogueString")
      dispatch(deleteCatalogue(cId)).then((res) => {
        if (res) {
          dispatch(getCatalogues(usersListData));
        }
      });
    else if (type === "careCleanString")
      dispatch(deleteCareClean(cId)).then((res) => {
        if (res) {
          dispatch(getCareClean(usersListData));
        }
      });
    else if (type === "aboutUsString")
      dispatch(deleteAboutUs(cId)).then((res) => {
        if (res) {
          dispatch(getAboutUsData(usersListData));
        }
      });
    else if (type === "faqCategoryString")
      dispatch(deleteFaqCategory(cId)).then((res) => {
        if (res) {
          dispatch(getFaqCategoryData(usersListData));
        }
      });
    else if (type === "faqsString")
      dispatch(deleteFaq(cId)).then((res) => {
        if (res) {
          dispatch(getFaqData(usersListData));
        }
      });
    else if (type === "warrantyRegistrationString")
      dispatch(deleteWarrantyRegistration(cId)).then((res) => {
        if (res) {
          dispatch(getWarrantyRegistration(usersListData));
        }
      });
    else if (type === "quotationSectionString")
      dispatch(deleteQuotationSection(cId)).then((res) => {
        if (res) {
          dispatch(getQuotationSection(usersListData));
        }
      });
    else if (type === "careerSectionString")
      dispatch(deleteCareerSection(cId)).then((res) => {
        if (res) {
          dispatch(getCareerSection(usersListData));
        }
      });
    else if (type === "contactUsSectionString")
      dispatch(deleteAboutUsSection(cId)).then((res) => {
        if (res) {
          dispatch(getContactUsSection(usersListData));
        }
      });
    else if (type === "homepageExploreCategory")
      dispatch(deleteHomepageExploreCategory(cId)).then((res) => {
        if (res) {
          dispatch(getHomePageExploreCat(usersListData));
        }
      });
    else if (type === "orientationCenterString")
      dispatch(deleteOrientationCenter(cId)).then((res) => {
        if (res) {
          dispatch(getOrientationCenterData(usersListData));
        }
      });
    else if (type === "exhibitionPageString")
      dispatch(deleteExhibitionPage(cId)).then((res) => {
        if (res) {
          dispatch(getExhibitionPage(usersListData));
        }
      });
    else if (type === "whereToBuyString")
      dispatch(deleteWhereToBuy(cId)).then((res) => {
        if (res) {
          dispatch(getWhereToBuyData(usersListData));
        }
      });
  };

  const ViewParticularUserHandler = (id) => {
    navigate(`/explore-category-child/${id}`);
  };

  const getRowData = () => {
    let rowDataVal = [];

    homepageCategories?.map((element, index) => {
      const rowData = {
        "S.NO.": index + 1,
        Name: element?.name,
        Images: element?.categoryImage,
        // Keyword: element?.keyword,
        SubCategories: "View",
        rowChildren: element?.children,
        id: element?._id,
        children: element?.children,
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

  const getBannerRowData = () => {
    let BannerRowDataVal = [];
    homepageBanners?.map((element, index) => {
      const rowData = {
        "S.NO.": index + 1,
        Name: element?.title,
        Images: element?.banner,
        CreatedAt: element?.createdAt,
        id: element?._id,
        Actions: (
          <Grid>
            <img
              src={detailIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => detailPageHandler(element?._id)}
              style={{ cursor: "pointer" }}
            />
            <img
              src={editIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => edithomepageDisplay(element?._id)}
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

      return BannerRowDataVal.push(rowData);
    });
    return BannerRowDataVal;
  };

  const getBrandProductsRowData = () => {
    let BannerRowDataVal = [];

    brandproductss?.map((element, index) => {
      let completeImageUrl = "";
      console.log("element ", element?.productPictures[0]?.img);
      if (
        element?.productPictures &&
        !element?.productPictures[0]?.img.startsWith("https://")
      ) {
        completeImageUrl = `https://${element?.productPictures[0]?.img}`;
      } else if (
        element?.colors?.productPictures &&
        !element?.colors?.productPictures[0]?.img.startsWith(
          "https://"
        )
      ) {
        completeImageUrl = `https://${element?.colors[0]?.productPictures[0]?.img}`;
      } else {
        completeImageUrl = element?.productPictures[0]?.img || "";
      }
      const rowData = {
        "S.NO.": index + 1,
        Name: element?.name,
        Images: completeImageUrl,
        id: element?._id,
        Actions: (
          <Grid>
            <img
              src={detailIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => productDetailPageHandler(element?._id)}
              style={{ cursor: "pointer" }}
            />
            <img
              src={editIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              style={{ marginLeft: "1.5rem", cursor: "pointer" }}
              onClick={() => editProductPage(element?._id)}
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

      return BannerRowDataVal.push(rowData);
    });
    return BannerRowDataVal;
  };

  const getBrandPageRowData = () => {
    let rowDataVal = [];

    brandPage?.map((element, index) => {
      const rowData = {
        "S.NO.": index + 1,
        Title: element?.title,
        Images: element?.image,
        id: element?._id,
        Text: cropText(element?.text, 10),
        Actions: (
          <Grid>
            <img
              src={detailIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => brandDetailPageHandler(element?._id)}
              style={{ cursor: "pointer" }}
            />
            <img
              src={editIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => editBrandPageFunc(element?._id)}
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

  const getExhibitionPageRowData = () => {
    let rowDataVal = [];
    exhibitionPageData?.map((element, index) => {
      const rowData = {
        "S.NO.": index + 1,
        Title: element?.title,
        Images: element?.image,
        id: element?._id,
        Text: cropText(element?.text, 10),
        Actions: (
          <Grid>
            <img
              src={detailIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() =>
                exhibitionPageSectionDetailPageHandler(element?._id)
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
              onClick={() => editExhibitionFunc(element?._id)}
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

  const getCorporateProductRowData = () => {
    let rowDataVal = [];

    corporateProduct?.map((element, index) => {
      const rowData = {
        "S.NO.": index + 1,
        Title: element?.title,
        Images: element?.image,
        id: element?._id,
        Text: cropText(element?.text, 10),
        Actions: (
          <Grid>
            <img
              src={detailIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => corporateProductDetailPageHandler(element?._id)}
              style={{ cursor: "pointer" }}
            />
            <img
              src={editIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => editCorporateProductFunc(element?._id)}
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

  const getCorporateBannerRowData = () => {
    let rowDataVal = [];

    corporateBanner?.map((element, index) => {
      const rowData = {
        "S.NO.": index + 1,
        Title: element?.title,
        Images: element?.bannerImage,
        id: element?._id,
        Actions: (
          <Grid>
            <img
              src={detailIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => corporateProductBannerPageHandler(element?._id)}
              style={{ cursor: "pointer" }}
            />
            <img
              src={editIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => editCorporateBannerFunc(element?._id)}
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

  const getExhibitionBannerRowData = () => {
    let rowDataVal = [];

    exhibitionBannerData?.map((element, index) => {
      const rowData = {
        "S.NO.": index + 1,
        Title: element?.title,
        Images: element?.bannerImage,
        id: element?._id,
        Actions: (
          <Grid>
            <img
              src={detailIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => exhibitionDetailPageHandler(element?._id)}
              style={{ cursor: "pointer" }}
            />
            <img
              src={editIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => editExhibitionBannerFunc(element?._id)}
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

  const getNewsPressBannerRowData = () => {
    let rowDataVal = [];

    newsPressBannerData?.map((element, index) => {
      const rowData = {
        "S.NO.": index + 1,
        Title: element?.title,
        Images: element?.bannerImage,
        id: element?._id,
        Actions: (
          <Grid>
            <img
              src={detailIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => newsPressBannerPageHandler(element?._id)}
              style={{ cursor: "pointer" }}
            />
            <img
              src={editIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => editNewsPressBannerFunc(element?._id)}
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

  const getNewsPressProductRowData = () => {
    let rowDataVal = [];

    newsPressProductData?.map((element, index) => {
      const rowData = {
        "S.NO.": index + 1,
        Title: element?.title,
        Images: element?.image,
        Text: cropText(element?.text, 11),
        id: element?._id,
        Actions: (
          <Grid>
            <img
              src={detailIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => newsPressProductPageHandler(element?._id)}
              style={{ cursor: "pointer" }}
            />
            <img
              src={editIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => editNewsPressProductFunc(element?._id)}
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

  const getVirtualTourBannerRowData = () => {
    let rowDataVal = [];

    virtualTourData?.map((element, index) => {
      const rowData = {
        "S.NO.": index + 1,
        Title: element?.title,
        Images: element?.bannerImage,
        id: element?._id,
        Actions: (
          <Grid>
            <img
              src={detailIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => virtualTourPageHandler(element?._id)}
              style={{ cursor: "pointer" }}
            />
            <img
              src={editIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => editVirtualTourBannerFunc(element?._id)}
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

  const getCareCleanRowData = () => {
    let rowDataVal = [];

    careCleanData?.map((element, index) => {
      const rowData = {
        "S.NO.": index + 1,
        Title: element?.title,
        Images: element?.bannerImage,
        Video: element?.video,
        Heading: element?.heading,
        id: element?._id,
        Actions: (
          <Grid>
            <img
              src={detailIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => careCleanDetailPageHandler(element?._id)}
              style={{ cursor: "pointer" }}
            />
            <img
              src={editIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => editCareCleanFunc(element?._id)}
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

  const getBlogsRowData = () => {
    let rowDataVal = [];

    blogData?.map((element, index) => {
      const rowData = {
        "S.NO.": index + 1,
        Title: element?.title,
        Images: element?.image,
        Text: cropText(element?.text, 10),
        id: element?._id,
        Actions: (
          <Grid>
            <img
              src={detailIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => blogDetailPageHandler(element?._id)}
              style={{ cursor: "pointer" }}
            />
            <img
              src={editIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => editBlogsFunc(element?._id)}
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

  const getCareerDetailsRowData = () => {
    let rowDataVal = [];

    careerDetailsData?.map((element, index) => {
      const rowData = {
        "S.NO.": index + 1,
        ContentHeading: element?.contentHeading,
        ContentText: cropText(element?.contentText, 10),
        Images: element?.image,
        id: element?._id,
        Actions: (
          <Grid>
            <img
              src={detailIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => careerDetailsPageHandler(element?._id)}
              style={{ cursor: "pointer" }}
            />
            <img
              src={editIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => editCareerDetailsPage(element?._id)}
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

  const getBlogsCategoryRowData = () => {
    let rowDataVal = [];

    blogCategoryData?.blogCategoryList?.map((element, index) => {
      const rowData = {
        "S.NO.": index + 1,
        Name: element?.name,
        id: element?._id,
        Actions: (
          <Grid>
            <img
              src={detailIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => blogCategoryDetailPageHandler(element?._id)}
              style={{ cursor: "pointer" }}
            />
            <img
              src={editIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => editBlogCategoryFunc(element?._id)}
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

  const getCataloguesRowData = () => {
    let rowDataVal = [];

    cataloguesData?.map((element, index) => {
      const rowData = {
        "S.NO.": index + 1,
        Title: element?.title,
        Images: element?.image,
        id: element?._id,
        Actions: (
          <Grid>
            <img
              src={detailIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => catalogueDetailPageHandler(element?._id)}
              style={{ cursor: "pointer" }}
            />
            <img
              src={editIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => editCatalogueFunc(element?._id)}
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
  const getBrandPageBannerRowData = () => {
    let rowDataVal = [];

    brandPageBannerData?.map((element, index) => {
      const rowData = {
        "S.NO.": index + 1,
        Title: element?.title,
        Images: element?.bannerImage,
        id: element?._id,
        Actions: (
          <Grid>
            <img
              src={detailIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => brandPageBannerDetailPageHandler(element?._id)}
              style={{ cursor: "pointer" }}
            />
            <img
              src={editIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => editBrandPageBannerFunc(element?._id)}
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

  const getAboutUsRowData = () => {
    let rowDataVal = [];

    aboutUsData?.map((element, index) => {
      const rowData = {
        "S.NO.": index + 1,
        Title: element?.title,
        Images: element?.bannerImage,
        Text: element?.text,
        bannerImageAltText: element?.bannerImageAltText,
        id: element?._id,
        Actions: (
          <Grid>
            <img
              src={detailIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => aboutUsDetailPage(element?._id)}
              style={{ cursor: "pointer" }}
            />
            <img
              src={editIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => editAboutUsFunc(element?._id)}
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

  const getFaqCategoryRowData = () => {
    let rowDataVal = [];

    faqCategoryData?.map((element, index) => {
      const rowData = {
        "S.NO.": index + 1,
        Name: element?.name,
        id: element?._id,
        Actions: (
          <Grid>
            <img
              src={detailIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => faqCategoryDetailPageHandler(element?._id)}
              style={{ cursor: "pointer" }}
            />
            <img
              src={editIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => editFaqCategoryFunc(element?._id)}
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

  const getCategoryBannerRowData = () => {
    let rowDataVal = [];

    categoryBannerData?.map((element, index) => {
      const rowData = {
        "S.NO.": index + 1,
        Title: element?.title,
        Images: element?.bannerImage,
        id: element?._id,
        Actions: (
          <Grid>
            <img
              src={detailIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => categoryBannerDetailPageHandler(element?._id)}
              style={{ cursor: "pointer" }}
            />
            <img
              src={editIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => editCategoryBannerFunc(element?._id)}
              style={{ marginLeft: "1.5rem", cursor: "pointer" }}
            />
            <img
              src={deleteIcon}
              alt="img"
              width="17px"
              height="17px"
              className="img-responsive img-fluid"
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

  const getFaqRowData = () => {
    let rowDataVal = [];

    faqData?.map((element, index) => {
      const rowData = {
        "S.NO.": index + 1,
        FaqCategory: element?.faqCategory,
        Question: cropText(element?.question, 10),
        Answer: cropText(element?.answer, 10),
        id: element?._id,
        Actions: (
          <Grid>
            <img
              src={detailIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => faqDetailPageHandler(element?._id)}
              style={{ cursor: "pointer" }}
            />
            <img
              src={editIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => editFAQsFunc(element?._id)}
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

  const getWarrantyRegistrationRowData = () => {
    let rowDataVal = [];

    warrantyRegistrationData?.map((element, index) => {
      const rowData = {
        "S.NO.": index + 1,
        Name: element?.name,
        Email: element.email,
        MobileNo: element.mobileNo,
        id: element?._id,
        Actions: (
          <Grid>
            <img
              src={detailIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() =>
                warrantyRegistrationDetailPageHandler(element?._id)
              }
              style={{ cursor: "pointer" }}
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

  const getQuotationSectionRowData = () => {
    let rowDataVal = [];

    quotationSectionData?.map((element, index) => {
      const rowData = {
        "S.NO.": index + 1,
        Name: element?.name,
        Email: element.email,
        MobileNo: element.mobileNo,
        id: element?._id,
        Actions: (
          <Grid>
            <img
              src={detailIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => quotationSectionDetailPageHandler(element?._id)}
              style={{ cursor: "pointer" }}
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

  const getCareerSectionRowData = () => {
    let rowDataVal = [];

    careerSectionData?.map((element, index) => {
      const rowData = {
        "S.NO.": index + 1,
        Name: element?.name,
        Email: element.email,
        MobileNo: element.mobileNo,
        id: element?._id,
        Actions: (
          <Grid>
            <img
              src={detailIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => careerSectionDetailPageHandler(element?._id)}
              style={{ cursor: "pointer" }}
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

  const getContactUsSectionRowData = () => {
    let rowDataVal = [];

    contactUsSectionData?.map((element, index) => {
      const rowData = {
        "S.NO.": index + 1,
        Name: element?.name,
        Email: element.email,
        MobileNo: element.mobileNo,
        id: element?._id,
        Actions: (
          <Grid>
            <img
              src={detailIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() => contactUsSectionDetailPageHandler(element?._id)}
              style={{ cursor: "pointer" }}
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

  //
  const getHomepageExploreCatRowData = () => {
    let rowDataVal = [];

    homepageExploreCategoryData?.map((element, index) => {
      const rowData = {
        "S.NO.": index + 1,
        Title: element?.imageTitle,
        Images: element?.image,
        id: element?._id,
        Actions: (
          <Grid>
            <img
              src={detailIcon}
              alt="img"
              width="20px"
              height="20px"
              className="img-responsive img-fluid "
              loading="lazy"
              onClick={() =>
                HomepageExploreCategoryDetailPageHandler(element?._id)
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
              onClick={() => editExploreCategoryFunc(element?._id)}
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

  const getOrientationCenterRowData = () => {
    let rowDataVal = [];

    orientationCenterData &&
      orientationCenterData?.map((element, index) => {
        const rowData = {
          "S.NO.": index + 1,
          City: element?.city,
          CenterName: element?.centerName,
          centerAddress: element?.centerAddress,
          id: element?._id,
          Actions: (
            <Grid>
              <img
                src={detailIcon}
                alt="img"
                width="20px"
                height="20px"
                className="img-responsive img-fluid "
                loading="lazy"
                onClick={() => orientationCenterPageHandler(element?._id)}
                style={{ cursor: "pointer" }}
              />
              <img
                src={editIcon}
                alt="img"
                width="20px"
                height="20px"
                className="img-responsive img-fluid "
                loading="lazy"
                onClick={() => editOrientationCenterFunc(element?._id)}
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

  const getWhereToBuyRowData = () => {
    let rowDataVal = [];

    whereToBuyData &&
      whereToBuyData?.map((element, index) => {
        const rowData = {
          "S.NO.": index + 1,
          City: element?.city,
          CenterName: element?.centerName,
          centerAddress: element?.centerAddress,
          id: element?._id,
          Actions: (
            <Grid>
              <img
                src={detailIcon}
                alt="img"
                width="20px"
                height="20px"
                className="img-responsive img-fluid "
                loading="lazy"
                onClick={() => whereToBuyPageHandler(element?._id)}
                style={{ cursor: "pointer" }}
              />
              <img
                src={editIcon}
                alt="img"
                width="20px"
                height="20px"
                className="img-responsive img-fluid "
                loading="lazy"
                onClick={() => editWhereToBuyFunc(element?._id)}
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

  const handlePageChange = (event, value) => {
    setUsersListData({ page: event });
  };

  return (
    <>
      <Box sx={{ width: "100%", padding: "0" }}>
        <Box
          sx={{ "& .MuiTabs-indicator": { display: "none" }, padding: "0" }}
        ></Box>
        <TabPanel
          value={value}
          index={0}
          style={{ padding: "0 !important", backgroundColor: "white" }}
        >
          <ContentWrap isFetching={isFetching} isError={isError}>
            <FMTable
              columns={
                type === "homePageBannerString" ||
                type === "homePageCategoryString"
                  ? homePageTableConfig(
                      type,
                      ViewParticularUserHandler,
                      homepageCategories
                    )
                  : type === "brandProductString"
                  ? brandProductTableConfig()
                  : type === "brandPageString"
                  ? brandPageTableConfig()
                  : type === "corporateProductString"
                  ? corporateProductTableConfig()
                  : type === "corporateBannerString"
                  ? corporateBannerTableConfig()
                  : type === "exhibitionBannerString"
                  ? exhibitionBannerTableConfig()
                  : type === "newsPressBannerString"
                  ? newsPressBannerConfig()
                  : type === "newsPressProductString"
                  ? newsPressProductConfig()
                  : type === "virtualTourBannerString"
                  ? virtualTourBannerConfig()
                  : type === "careCleanString"
                  ? careCleanConfig()
                  : type === "blogsString"
                  ? blogsConfig()
                  : type === "blogsCategoryString"
                  ? blogsCategoryConfig()
                  : type === "categoryBannerString"
                  ? categoryBannerConfig()
                  : type === "catalogueString"
                  ? cataloguesConfig()
                  : type === "brandPageBannerString"
                  ? brandPageBannerConfig()
                  : type === "aboutUsString"
                  ? aboutUsConfig()
                  : type === "faqCategoryString"
                  ? faqCategoryConfig()
                  : type === "faqsString"
                  ? faqConfig()
                  : type === "warrantyRegistrationString"
                  ? warrantyRegistrationConfig()
                  : type === "quotationSectionString"
                  ? quotationSectionConfig()
                  : type === "careerSectionString"
                  ? careerSectionConfig()
                  : type === "contactUsSectionString"
                  ? contactUsSectionConfig()
                  : type === "orientationCenterString"
                  ? orientationCenterConfig()
                  : type === "exhibitionPageString"
                  ? exhibitionPageTableConfig()
                  : type === "careerDetailsPageString"
                  ? careerDetailsConfig()
                  : type === "whereToBuyString"
                  ? whereToBuyConfig()
                  : homepageExploreCatSectionConfig()
              }
              rows={
                type === "homePageCategoryString"
                  ? getRowData()
                  : type === "homePageBannerString"
                  ? getBannerRowData()
                  : type === "brandProductString"
                  ? getBrandProductsRowData()
                  : type === "brandPageString"
                  ? getBrandPageRowData()
                  : type === "corporateProductString"
                  ? getCorporateProductRowData()
                  : type === "corporateBannerString"
                  ? getCorporateBannerRowData()
                  : type === "exhibitionBannerString"
                  ? getExhibitionBannerRowData()
                  : type === "newsPressBannerString"
                  ? getNewsPressBannerRowData()
                  : type === "newsPressProductString"
                  ? getNewsPressProductRowData()
                  : type === "virtualTourBannerString"
                  ? getVirtualTourBannerRowData()
                  : type === "careCleanString"
                  ? getCareCleanRowData()
                  : type === "categoryBannerString"
                  ? getCategoryBannerRowData()
                  : type === "blogsString"
                  ? getBlogsRowData()
                  : type === "blogsCategoryString"
                  ? getBlogsCategoryRowData()
                  : type === "catalogueString"
                  ? getCataloguesRowData()
                  : type === "brandPageBannerString"
                  ? getBrandPageBannerRowData()
                  : type === "aboutUsString"
                  ? getAboutUsRowData()
                  : type === "faqCategoryString"
                  ? getFaqCategoryRowData()
                  : type === "faqsString"
                  ? getFaqRowData()
                  : type === "warrantyRegistrationString"
                  ? getWarrantyRegistrationRowData()
                  : type === "quotationSectionString"
                  ? getQuotationSectionRowData()
                  : type === "careerSectionString"
                  ? getCareerSectionRowData()
                  : type === "contactUsSectionString"
                  ? getContactUsSectionRowData()
                  : type === "orientationCenterString"
                  ? getOrientationCenterRowData()
                  : type === "exhibitionPageString"
                  ? getExhibitionPageRowData()
                  : type === "whereToBuyString"
                  ? getWhereToBuyRowData()
                  : type === "careerDetailsPageString"
                  ? getCareerDetailsRowData()
                  : getHomepageExploreCatRowData()
              }
              pagination
              page={usersListData?.page}
              setPage={handlePageChange}
              totalPagesCount={
                type === "homePageBannerString"
                  ? homepagePagination?.totalPages
                  : type === "homePageCategoryString"
                  ? homepageCategoriesPagination?.totalPages
                  : type === "brandProductString"
                  ? brandproductssPagination?.totalPages
                  : type === "corporateProductString"
                  ? corporateProductPagination?.totalPages
                  : type === "corporateBannerString"
                  ? corporateBannerPagination?.totalPages
                  : type === "exhibitionBannerString"
                  ? exhibitionBannerPagination?.totalPages
                  : type === "newsPressBannerString"
                  ? newsPressBannerPagination?.totalPages
                  : type === "newsPressProductString"
                  ? newsPressProductPagination?.totalPages
                  : type === "virtualTourBannerString"
                  ? virtualTourPagination?.totalPages
                  : type === "careCleanString"
                  ? careCleanPagination?.totalPages
                  : type === "blogsString"
                  ? blogPagination?.totalPages
                  : type === "blogsCategoryString"
                  ? blogCategoryPagination?.totalPages
                  : type === "categoryBannerString"
                  ? categoryBannerPagination?.totalPages
                  : type === "brandpagestring"
                  ? brandPagePagination?.totalPages
                  : type === "catalogueString"
                  ? cataloguesPagination?.totalPages
                  : type === "brandPageBannerString"
                  ? brandPageBannerPagination?.totalPages
                  : type === "aboutUsString"
                  ? aboutUsPagination?.totalPages
                  : type === "faqCategoryString"
                  ? faqCategoryPagination?.totalPages
                  : type === "faqsString"
                  ? faqPagination?.totalPages
                  : type === "warrantyRegistrationString"
                  ? warrantyRegistrationPagination?.totalPages
                  : type === "quotationSectionString"
                  ? quotationSectionPagination?.totalPages
                  : type === "careerSectionString"
                  ? careerSectionPagination?.totalPages
                  : type === "contactUsSectionString"
                  ? type === "exhibitionPageString"
                  : exhibitionPagePagination?.totalPages
                  ? contactUsSectionPagination?.totalPages
                  : type === "orientationCenterString"
                  ? orientationCenterPagination?.totalPages
                  : type === "careerDetailsPageString"
                  ? careerDetailsPagination?.totalPages
                  : type === "whereToBuyString"
                  ? whereToBuyPagination?.totalPages
                  : homepageExploreCategoryPagination?.totalPages
              }
              // onRowClick={ViewParticularUserHandler}
            />
          </ContentWrap>
        </TabPanel>
      </Box>
      {prodId && (
        <HomePageBannerDetailPage
          open={openDetailPage}
          setOpen={() => {
            setOpenDetailPage(false);
            setProdId(null);
          }}
          id={prodId}
          type={type}
        />
      )}

      {orientationCenterId && (
        <OrientationCenterDetailPage
          open={orientationDetailPage}
          setOpen={() => {
            setOrientationDetailPage(false);
            setOrientationCenterId(null);
          }}
          id={orientationCenterId}
          type={type}
        />
      )}

      {whereToBuyId && (
        <WhereToBuyDetailPage
          open={whereToBuyDetailPage}
          setOpen={() => {
            setWhereToBuyDetailPage(false);
            setWhereToBuyId(null);
          }}
          id={whereToBuyId}
          type={type}
        />
      )}

      {exploreCatId && (
        <ExploreCategoryDetailPage
          open={openExploreCatDetail}
          setOpen={() => {
            setOpenExploreCatDetail(false);
            setExploreCatId(null);
          }}
          id={exploreCatId}
          type={type}
        />
      )}
      {careerDetailsId && (
        <CareerDetailsPage
          open={openCareerDetDetail}
          setOpen={() => {
            setOpenCareerDetDetail(false);
            setCareerDetailsId(null);
          }}
          id={careerDetailsId}
          type={type}
        />
      )}
      {bannerPageId && (
        <BrandPageDetailPage
          open={openBrandPageDetailPage}
          setOpen={() => {
            setOpenBrandPageDetailPage(false);
            setBannerPageId(null);
          }}
          id={bannerPageId}
          type={type}
        />
      )}
      {bannerPageBannerId && (
        <BrandPageBannerDetailPage
          open={openBrandPageBannerDetailPage}
          setOpen={() => {
            setOpenBrandPageBannerDetailPage(false);
            setBannerPageBannerId(null);
          }}
          id={bannerPageBannerId}
          type={type}
        />
      )}
      {productPageId && (
        <ProductDetailPage
          open={openProductDetailPage}
          setOpen={() => {
            setOpenProductDetailPage(false);
            setProductPageId(null);
          }}
          id={productPageId}
          type={type}
        />
      )}
      {blogPageId && (
        <BlogDetailPage
          open={openBlogDetailPage}
          setOpen={() => {
            setOpenBlogDetailPage(false);
            setBlogPageId(null);
          }}
          id={blogPageId}
          type={type}
        />
      )}
      {blogCategoryPageId && (
        <BlogCategoryDetailPage
          open={openBlogCategoryDetailPage}
          setOpen={() => {
            setOpenBlogCategoryDetailPage(false);
            setBlogCategoryPageId(null);
          }}
          id={blogCategoryPageId}
          type={type}
        />
      )}
      {exhibitionPageId && (
        <ExhibitionDetailPage
          open={exhibitionDetailPage}
          setOpen={() => {
            setOpenExhibitionDetailPage(false);
            setExhibitionPageId(null);
          }}
          id={exhibitionPageId}
          type={type}
        />
      )}
      {exhibitionPageSectionId && (
        <ExhibitionSectionDetailPage
          open={exhibitionPageDetailPage}
          setOpen={() => {
            setExhibitionPageDetailPage(false);
            setExhibitionPageSectionId(null);
          }}
          id={exhibitionPageSectionId}
          type={type}
        />
      )}

      {cataloguePageId && (
        <CataloguesDetailPage
          open={openCatalogueDetailPage}
          setOpen={() => {
            setOpenCatalogueDetailPage(false);
            setCataloguePageId(null);
          }}
          id={cataloguePageId}
          type={type}
        />
      )}

      {careCleanPageId && (
        <CareAndCleanDetailPage
          open={openCareCleanDetailPage}
          setOpen={() => {
            setOpenCareCleanDetailPage(false);
            setCareCleanPageId(null);
          }}
          id={careCleanPageId}
          type={type}
        />
      )}
      {categoryBannerPageId && (
        <CategoryBannerDetailPage
          open={openCategoryBannerDetailPage}
          setOpen={() => {
            setOpenCategoryBannerDetailPage(false);
            setCategoryBannerPageId(null);
          }}
          id={categoryBannerPageId}
          type={type}
        />
      )}
      {homepageCategoryBannerPageId && (
        <HomepageCategoryBannerDetailPage
          open={openHomepageCategoryBannerDetailPage}
          setOpen={() => {
            setOpenHomepageCategoryBannerDetailPage(false);
            setHomepageCategoryBannerPageId(null);
          }}
          id={homepageCategoryBannerPageId}
          type={type}
        />
      )}

      {homepageExploreCategoryPageId && (
        <HomepageExploreCategoryDetailPage
          open={openHomepageExploreCategoryDetailPage}
          setOpen={() => {
            setOpenHomepageExploreCategoryDetailPage(false);
            setHomepageExploreCategoryPageId(null);
          }}
          id={homepageExploreCategoryPageId}
          type={type}
        />
      )}

      {corporateProductPageId && (
        <CorporateProductsDetailPage
          open={openCorporateProductDetailPage}
          setOpen={() => {
            setOpenCorporateProductDetailPage(false);
            setCorporateProductPageId(null);
          }}
          id={corporateProductPageId}
          type={type}
        />
      )}
      {corporateBannerPageId && (
        <CorporateBannerDetailPage
          open={openCorporateBannerDetailPage}
          setOpen={() => {
            setOpenCorporateBannerDetailPage(false);
            setCorporateBannerPageId(null);
          }}
          id={corporateBannerPageId}
          type={type}
        />
      )}
      {virtualTourPageId && (
        <VirtualTourDetailPage
          open={openVirtualTourDetailPage}
          setOpen={() => {
            setOpenVirtualTourDetailPage(false);
            setVirtualTourPageId(null);
          }}
          id={virtualTourPageId}
          type={type}
        />
      )}
      {newsPressBannerPageId && (
        <NewsPressBannerDetailPage
          open={openNewsPressBannerDetailPage}
          setOpen={() => {
            setOpenNewsPressBannerDetailPage(false);
            setNewsPressBannerPageId(null);
          }}
          id={newsPressBannerPageId}
          type={type}
        />
      )}
      {newsPressProductPageId && (
        <NewsPressProductDetailPage
          open={openNewsPressProductDetailPage}
          setOpen={() => {
            setOpenNewsPressProductDetailPage(false);
            setNewsPressProductPageId(null);
          }}
          id={newsPressProductPageId}
          type={type}
        />
      )}
      {aboutUsPageId && (
        <AboutUsDetailPage
          open={openAboutUsDetailPage}
          setOpen={() => {
            setOpenAboutUsDetailPage(false);
            setAboutUsPageId(null);
          }}
          id={aboutUsPageId}
          type={type}
        />
      )}

      {faqCategoryPageId && (
        <FaqCategoryDetailPage
          open={openFaqCategoryDetailPage}
          setOpen={() => {
            setOpenFaqCategoryDetailPage(false);
            setFaqCategoryPageId(null);
          }}
          id={faqCategoryPageId}
          type={type}
        />
      )}

      {faqPageId && (
        <FaqDetailPage
          open={openFaqDetailPage}
          setOpen={() => {
            setOpenFaDetailPage(false);
            setFaqPageId(null);
          }}
          id={faqPageId}
          type={type}
        />
      )}

      {warrrantyRegistrationId && (
        <WarrantyRegDetailPage
          open={openWarrantyDetailPage}
          setOpen={() => {
            setOpenWarrantyDetailPage(false);
            setWarrrantyRegistrationId(null);
          }}
          id={warrrantyRegistrationId}
          type={type}
        />
      )}

      {quotationSectionId && (
        <QuotationSectionDetailPage
          open={openQuotationSecDetailPage}
          setOpen={() => {
            setOpenQuotationSecDetailPage(false);
            setQuotationSectionId(null);
          }}
          id={quotationSectionId}
          type={type}
        />
      )}

      {careerSectionId && (
        <CareerSectionDetailPage
          open={openCareerSecDetailPage}
          setOpen={() => {
            setOpenCareerSecDetailPage(false);
            setCareerSectionId(null);
          }}
          id={careerSectionId}
          type={type}
        />
      )}

      {contactUsSectionId && (
        <ContactUsSectionDetailPage
          open={openContactUsSecDetailPage}
          setOpen={() => {
            setOpenContactUsSecDetailPage(false);
            setContactUsSectionId(null);
          }}
          id={contactUsSectionId}
          type={type}
        />
      )}

      {/*  */}
      {loader ? (
        <Box
          height={"100vh"}
          width={"100vw"}
          sx={{
            background: "rgba(0,0,0,0.5)",
            opacity: 1,
            transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            zIndex: "10000",
            position: "fixed",
            top: 0,
            left: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <InfinitySpin width="200" color="#4fa94d" />
        </Box>
      ) : (
        <Box>
          {editedProdId && (
            <EditHomePageBanner
              open={editHomeBanner}
              setOpen={() => {
                setEditHomeBanner(false);
                setEditedProdId(null);
              }}
              id={editedProdId}
              usersListData={usersListData}
            />
          )}

          {editedCareerDetailId && (
            <EditCareerDetails
              open={editedCareerDetail}
              setOpen={() => {
                setEditedCareerDetail(false);
                setEditedCareerDetailId(null);
              }}
              id={editedCareerDetailId}
              usersListData={usersListData}
            />
          )}

          {editedCategoryId && (
            <EditHomePageCategory
              open={editHomeCategory}
              setOpen={() => {
                setEditHomeCategory(false);
                setEditedCategoryId(null);
              }}
              id={editedCategoryId}
              usersListData={usersListData}
            />
          )}
          {editedBrandPageId && (
            <EditBrandPageCategory
              open={editBrandPage}
              setOpen={() => {
                setEditBrandPage(false);
                setEditedBrandPageId(null);
              }}
              id={editedBrandPageId}
              usersListData={usersListData}
            />
          )}

          {editedFaqCategoryId && (
            <EditFaqCategory
              open={editFaqCategory}
              setOpen={setEditFaqCategory}
              id={editedFaqCategoryId}
              usersListData={usersListData}
            />
          )}
          {editOrientationCenter && (
            <EditOrientationCenter
              open={editOrientationCenter}
              setOpen={setEditOrientationCenter}
              id={editOrientationCenter}
              usersListData={usersListData}
            />
          )}
          {editWhereToBuy && (
            <EditWhereToBuy
              open={editWhereToBuy}
              setOpen={setEditWhereToBuy}
              id={editWhereToBuy}
              usersListData={usersListData}
            />
          )}

          {editedCareCleanId && (
            <EditCareClean
              open={editCareClean}
              setOpen={() => {
                setEditCareClean(false);
                setEditedCareCleanId(null);
              }}
              id={editedCareCleanId}
              usersListData={usersListData}
            />
          )}

          {editedExhibitionBannerId && (
            <EditExhibitionBanner
              open={editExhibitionBanner}
              setOpen={() => {
                setEditExhibitionBanner(false);
                setEditedExhibitionBannerId(null);
              }}
              id={editedExhibitionBannerId}
              usersListData={usersListData}
            />
          )}

          {editedExhibitionPageId && (
            <EditExhibitionPage
              open={editExhibitionPage}
              setOpen={() => {
                setEditExhibitionPage(false);
                setEditedExhibitionPageId(null);
              }}
              id={editedExhibitionPageId}
              usersListData={usersListData}
            />
          )}

          {editedVirtualBannerId && (
            <EditVirtualTourBanner
              open={editVirtualTourBanner}
              setOpen={() => {
                setEditVirtualTourBanner(false);
                setEditedVirtualBannerId(null);
              }}
              id={editedVirtualBannerId}
              usersListData={usersListData}
            />
          )}

          {editedBrandPageBannerId && (
            <EditBrandPageBanner
              open={editedBrandPageBannerId}
              setOpen={setEditedBrandPageBannerId}
              id={editedBrandPageBannerId}
              usersListData={usersListData}
            />
          )}

          {editedNewsPressProductId && (
            <EditNewsPressProduct
              open={editNewsPressProduct}
              setOpen={() => {
                setEditNewsPressProduct(false);
                setEditedNewsPressProductId(null);
              }}
              id={editedNewsPressProductId}
              usersListData={usersListData}
            />
          )}

          {editCorporateProduct && (
            <EditCorporateProduct
              open={editCorporateProduct}
              setOpen={setEditCorporateProduct}
              id={editCorporateProduct}
              usersListData={usersListData}
            />
          )}
          {editCorporateBanner && (
            <EditCorporateBanner
              open={editCorporateBanner}
              setOpen={setEditCorporateBanner}
              id={editCorporateBanner}
              usersListData={usersListData}
            />
          )}
          {editExploreCategory && (
            <EditExploreCategoryComponent
              open={editExploreCategory}
              setOpen={setEditExploreCategory}
              id={editExploreCategory}
              usersListData={usersListData}
            />
          )}
          {editNewsPressBanner && (
            <EditNewsPressBanner
              open={editNewsPressBanner}
              setOpen={setEditNewsPressBanner}
              id={editNewsPressBanner}
              usersListData={usersListData}
            />
          )}
          {editCategoryBanner && (
            <EditCategoryBanner
              open={editCategoryBanner}
              setOpen={setEditCategoryBanner}
              id={editCategoryBanner}
              usersListData={usersListData}
            />
          )}
          {editCatalogue && (
            <EditCatalogue
              open={editCatalogue}
              setOpen={setEditCatalogue}
              id={editCatalogue}
              usersListData={usersListData}
            />
          )}
          {editAboutUs && (
            <EditAboutUs
              open={editAboutUs}
              setOpen={setEditAboutUs}
              id={editAboutUs}
              usersListData={usersListData}
            />
          )}

          {editBlogCategory && (
            <EditBlogsCategory
              open={editBlogCategory}
              setOpen={setEditBlogCategory}
              id={editBlogCategory}
              usersListData={usersListData}
            />
          )}
          {editBlogs && (
            <EditBlogs
              open={editBlogs}
              setOpen={setEditBlogs}
              id={editBlogs}
              usersListData={usersListData}
              setLoader={setLoader}
            />
          )}
          {editFAQs && (
            <EditFAQs
              open={editFAQs}
              setOpen={setEditFAQs}
              id={editFAQs}
              usersListData={usersListData}
              setLoader={setLoader}
            />
          )}
        </Box>
      )}
    </>
  );
}
