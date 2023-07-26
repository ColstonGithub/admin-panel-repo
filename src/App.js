import { Routes, Route, BrowserRouter } from "react-router-dom";
// import LandingPage from "container/LandingPage";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import "bootstrap/dist/css/bootstrap.min.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "./LandingPage.css";
import theme from "./theme";
import {
  ADD_PRODUCT,
  EDIT_PRODUCT,
  BLOGS,
  BRAND_PAGE,
  BRAND_PAGE_BANNER,
  BRAND_PRODUCTS,
  CARE_CLEAN,
  CATALOGUE,
  CATEGORY_BANNER,
  CORPORATE_BANNER,
  CORPORATE_PRODUCT,
  EMAIL_VERIFY,
  EMAIL_VERIFY_OTP,
  EXHIBITION_BANNER,
  EXPLORE_CATEGORY_HOME,
  FORGOTPASSWORD,
  HOME,
  LOGIN,
  NEWS_PRESS_BANNER,
  NEWS_PRESS_PRODUCTS,
  SETUP_NEW_PASSWORD,
  SIGNUP,
  VIDEO,
  VIRTUAL_TOUR_BANNER,
  EXPLORE_CATEGORY_CHILDREN,
  BLOGS_CATEGORY,
  ABOUT_US,
  ADD_BLOG,
  EDIT_BLOG,
  FAQS,
  FAQ_CATEGORY,
  WARRANTY_REGISTRATION,
  QUOTATION_SECTION,
  CAREER_SECTION,
  CONTACT_US_SECTION,
  HOME_PAGE_EXPLORE_CATEGORY,
  orientationCenter,
  WHERE_TO_BUY,
  CATEGORY_TABLE,
  EXHIBITION_PRODUCT,
} from "Routes/Routes";
import Login from "./views/Signin/Login";
import SignUp from "./views/SignUp/SignUp";
import ForgotPassword from "./views/Signin/ForgotPassword";
import SetupNewPassword from "./views/Signin/SetupNewPassword";
import EmailVerify from "./views/SignUp/EmailVerify";
import EmailVerifyOtp from "./views/SignUp/emailOtpVerification";
import HomePageBanners from "container/HomePage/HomePageBanners";
import PrivateRoutes from "Routes/PrivateRoutes";

import AddProductComponent from "container/AddPages/AddProductComponent";
import AddOrientationCenter from "container/AddPages/AddOrientationCenter";
import EditProductComponent from "container/EditPages/EditProductComponent";
import AddBlogComponent from "container/AddPages/AddBlogComponent";
import EditBlogs from "container/EditPages/EditBlogs";
// children
import ExploreCategoryChildren from "container/Children/ExploreCategoryChildren/ExploreCategoryChildren";

import CategoryTable from "container/DisplayTable/CategoryTable";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          {/* <Route index element={<Homescreen />} /> */}
          <Route index element={<Login />} />
          <Route path={LOGIN} element={<Login />} />
          <Route path={SIGNUP} element={<SignUp />} />
          <Route path={FORGOTPASSWORD} element={<ForgotPassword />} />
          <Route path={SETUP_NEW_PASSWORD} element={<SetupNewPassword />} />
          <Route path={EMAIL_VERIFY} element={<EmailVerify />} />
          <Route path={EMAIL_VERIFY_OTP} element={<EmailVerifyOtp />} />
          <Route path={ADD_PRODUCT} element={<AddProductComponent />} />
          <Route path={EDIT_PRODUCT} element={<EditProductComponent />} />
          <Route path={ADD_BLOG} element={<AddBlogComponent />} />
          <Route path={EDIT_BLOG} element={<EditBlogs />} />
          <Route path={CATEGORY_TABLE} element={<CategoryTable />} />
          {/* private routes below */}
          <Route
            path={HOME}
            element={
              <PrivateRoutes
                Component={HomePageBanners}
                type="homePageBannerString"
                key={HOME}
              />
            }
          />
          <Route
            path={CATEGORY_BANNER}
            element={
              <PrivateRoutes
                Component={HomePageBanners}
                key={CATEGORY_BANNER}
                type="categoryBannerString"
              />
            }
          />
          <Route
            path={EXPLORE_CATEGORY_HOME}
            element={
              <PrivateRoutes
                Component={HomePageBanners}
                key={EXPLORE_CATEGORY_HOME}
                type="homePageCategoryString"
              />
            }
          />
          <Route
            path={BRAND_PRODUCTS}
            element={
              <PrivateRoutes
                Component={HomePageBanners}
                key={BRAND_PRODUCTS}
                type="brandProductString"
              />
            }
          />
          <Route
            path={BRAND_PAGE}
            element={
              <PrivateRoutes
                Component={HomePageBanners}
                key={BRAND_PAGE}
                type="brandPageString"
              />
            }
          />
          <Route
            path={orientationCenter}
            element={
              <PrivateRoutes
                Component={HomePageBanners}
                key={orientationCenter}
                type="orientationCenterString"
              />
            }
          />{" "}
          <Route
            path={WHERE_TO_BUY}
            element={
              <PrivateRoutes
                Component={HomePageBanners}
                key={WHERE_TO_BUY}
                type="whereToBuyString"
              />
            }
          />
          <Route
            path={BRAND_PAGE_BANNER}
            element={
              <PrivateRoutes
                Component={HomePageBanners}
                key={BRAND_PAGE_BANNER}
                type="brandPageBannerString"
              />
            }
          />
          <Route
            path={CORPORATE_PRODUCT}
            element={
              <PrivateRoutes
                Component={HomePageBanners}
                key={CORPORATE_PRODUCT}
                type="corporateProductString"
              />
            }
          />
          <Route
            path={CORPORATE_BANNER}
            element={
              <PrivateRoutes
                Component={HomePageBanners}
                key={CORPORATE_BANNER}
                type="corporateBannerString"
              />
            }
          />
          <Route
            path={EXHIBITION_BANNER}
            element={
              <PrivateRoutes
                Component={HomePageBanners}
                key={EXHIBITION_BANNER}
                type="exhibitionBannerString"
              />
            }
          />
          <Route
            path={EXHIBITION_PRODUCT}
            element={
              <PrivateRoutes
                Component={HomePageBanners}
                key={EXHIBITION_PRODUCT}
                type="exhibitionPageString"
              />
            }
          />
          <Route
            path={NEWS_PRESS_PRODUCTS}
            element={
              <PrivateRoutes
                Component={HomePageBanners}
                key={NEWS_PRESS_PRODUCTS}
                type="newsPressProductString"
              />
            }
          />
          <Route
            path={NEWS_PRESS_BANNER}
            element={
              <PrivateRoutes
                Component={HomePageBanners}
                key={NEWS_PRESS_BANNER}
                type="newsPressBannerString"
              />
            }
          />
          <Route
            path={VIRTUAL_TOUR_BANNER}
            element={
              <PrivateRoutes
                Component={HomePageBanners}
                key={VIRTUAL_TOUR_BANNER}
                type="virtualTourBannerString"
              />
            }
          />
          <Route
            path={VIDEO}
            element={
              <PrivateRoutes
                Component={HomePageBanners}
                key={VIDEO}
                type="video"
              />
            }
          />
          <Route
            path={CARE_CLEAN}
            element={
              <PrivateRoutes
                Component={HomePageBanners}
                key={CARE_CLEAN}
                type="careCleanString"
              />
            }
          />
          <Route
            path={BLOGS}
            element={
              <PrivateRoutes
                Component={HomePageBanners}
                key={BLOGS}
                type="blogsString"
              />
            }
          />
          <Route
            path={BLOGS_CATEGORY}
            element={
              <PrivateRoutes
                Component={HomePageBanners}
                key={BLOGS_CATEGORY}
                type="blogsCategoryString"
              />
            }
          />
          <Route
            path={CATALOGUE}
            element={
              <PrivateRoutes
                Component={HomePageBanners}
                key={CATALOGUE}
                type="catalogueString"
              />
            }
          />
          <Route
            path={ABOUT_US}
            element={
              <PrivateRoutes
                Component={HomePageBanners}
                key={ABOUT_US}
                type="aboutUsString"
              />
            }
          />
          <Route
            path={FAQS}
            element={
              <PrivateRoutes
                Component={HomePageBanners}
                key={FAQS}
                type="faqsString"
              />
            }
          />
          <Route
            path={FAQ_CATEGORY}
            element={
              <PrivateRoutes
                Component={HomePageBanners}
                key={FAQ_CATEGORY}
                type="faqCategoryString"
              />
            }
          />
          <Route
            path={WARRANTY_REGISTRATION}
            element={
              <PrivateRoutes
                Component={HomePageBanners}
                key={WARRANTY_REGISTRATION}
                type="warrantyRegistrationString"
              />
            }
          />
          <Route
            path={QUOTATION_SECTION}
            element={
              <PrivateRoutes
                Component={HomePageBanners}
                key={QUOTATION_SECTION}
                type="quotationSectionString"
              />
            }
          />
          <Route
            path={CAREER_SECTION}
            element={
              <PrivateRoutes
                Component={HomePageBanners}
                key={CAREER_SECTION}
                type="careerSectionString"
              />
            }
          />
          <Route
            path={CONTACT_US_SECTION}
            element={
              <PrivateRoutes
                Component={HomePageBanners}
                key={CONTACT_US_SECTION}
                type="contactUsSectionString"
              />
            }
          />
          <Route
            path={HOME_PAGE_EXPLORE_CATEGORY}
            element={
              <PrivateRoutes
                Component={HomePageBanners}
                key={HOME_PAGE_EXPLORE_CATEGORY}
                type="homepageExploreCategory"
              />
            }
          />
          {/* children */}
          <Route
            path={EXPLORE_CATEGORY_CHILDREN}
            element={
              <PrivateRoutes
                Component={ExploreCategoryChildren}
                // key={CATALOGUE}
                // type="catalogueString"
              />
            }
          />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
