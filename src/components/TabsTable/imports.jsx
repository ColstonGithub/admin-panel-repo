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
import detailIcon from "assets/detailIcon.svg";
import editIcon from "assets/editIcon.svg";
import deleteIcon from "assets/deleteIcon.svg";
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
