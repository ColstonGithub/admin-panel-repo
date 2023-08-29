import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { axiosMiddleware } from "../../axiosSettings";

// Reducers from slices
import authReducer from "../Slices/Login/auth.slice";
import exploreCategoriesSlice from "../Slices/HomePage/HomePageCategories";
import brandProductSlice from "../Slices/BannerProducts/BannerProducts";
import brandPageSlice from "../Slices/BrandPage/BrandPage";
import corporateProductSlice from "../Slices/CorporatePageSlices/CorporateProduct";
import corporateBannerSlice from "../Slices/CorporatePageSlices/CorporateBanner";
import categoryBannerSlice from "../Slices/HomePage/CategoryBanner";
import exhibitionBannerSlice from "../Slices/Exhibition/ExhibitionBanner";
import newsPressProductSlice from "../Slices/NewsPress/NewsPressProducts";
import newsPressBannerSlice from "../Slices/NewsPress/NewsPressBanner";
import virtualTourBannerSlice from "../Slices/VirtuaTour/VirtualTour";
import careCleanSlice from "../Slices/CareClean/CareClean";
import blogsSlice from "../Slices/Blogs/Blogs";
import cataloguesSlice from "../Slices/Catalogue/Catalogue";
import brandPageBannerSlice from "../Slices/BrandPage/brandPageBanner";
import blogsCategorySlice from "../Slices/Blogs/BlogsCategory";
import ExploreCategoryChildrenSlice from "../Slices/ExploreCategoryChildren/ExploreCategoryChildren";
import aboutUsSlice from "../Slices/AboutUs/AboutUs";
import faqCategorySlice from "../Slices/FAQS/FaqCategorySlice";
import faqSlice from "../Slices/FAQS/FaqSlice";
import warrantyRegistrationSlice from "../Slices/WarrantyRegistration/WarrantyRegistration";
import quotationSectionSlice from "../Slices/QuotationSection/QuotationSection";
import careerSectionSlice from "../Slices/CareerSection/CareerSection";
import contactUsSectionSlice from "../Slices/ContactUsSection/ContactUsSection";
import homepageExploreCategorySlice from "../Slices/HomePage/HomepageExploreCategory";

import orientationCenterSlice from "../Slices/OrientationCenter/orientation";
import whereToBuySlice from "../Slices/WhereToBuy/whereToBuy";
import exhibitionPageSlice from "../Slices/Exhibition/ExhibitionPage";
import careerDetailsSlice from "../Slices/CareerDetails/CareerDetails";
import InitialImagesAdminSlice from "redux/Slices/InitialImagesAdmin/InitialImagesAdminSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  exploreCategories: exploreCategoriesSlice,
  brandProduct: brandProductSlice,
  brandPage: brandPageSlice,
  corporateProduct: corporateProductSlice,
  corporateBanner: corporateBannerSlice,
  categoryBanner: categoryBannerSlice,
  exhibitionBanner: exhibitionBannerSlice,
  newsPressProduct: newsPressProductSlice,
  newsPressBanner: newsPressBannerSlice,
  virtualTourBanner: virtualTourBannerSlice,
  careClean: careCleanSlice,
  blogs: blogsSlice,
  blogsCategory: blogsCategorySlice,
  catalogues: cataloguesSlice,
  brandPageBanner: brandPageBannerSlice,
  aboutUs: aboutUsSlice,
  faqCategory: faqCategorySlice,
  warrantyRegistration: warrantyRegistrationSlice,
  faq: faqSlice,
  quotationSection: quotationSectionSlice,
  careerSection: careerSectionSlice,
  contactUsSection: contactUsSectionSlice,
  homepageExploreCategory: homepageExploreCategorySlice,
  // children
  ExploreCategoryChildren: ExploreCategoryChildrenSlice,
  exhibitionPage: exhibitionPageSlice,
  orientationCenter: orientationCenterSlice,
  whereToBuy: whereToBuySlice,
  careerDetails: careerDetailsSlice,
  InitialImagesAdmin: InitialImagesAdminSlice,
});

const initializeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        axiosMiddleware
      ),
    devTools: true,
  });

export default initializeStore;
