import * as Yup from "yup";

export const addBrandPageBannerSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  bannerImageAltText: Yup.string().required("Banner Alt Text is required"),
  bannerImageTextAltText: Yup.string().required(
    "Banner Image Alt Text is required"
  ),
});
