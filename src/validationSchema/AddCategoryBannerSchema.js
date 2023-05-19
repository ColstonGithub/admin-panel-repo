import * as Yup from "yup";

export const addCategoryBannerSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  bannerImageAltText: Yup.string().required("Banner Alt Text is required"),
});
