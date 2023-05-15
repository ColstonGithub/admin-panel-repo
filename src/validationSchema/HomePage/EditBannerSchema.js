import * as Yup from "yup";

export const EditBrandBannerSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  bannerImageAltText: Yup.string().required("Alt Text is required"),
  bannerImageTextAltText: Yup.string().required("Alt Text is required"),
  bannerImage: Yup.mixed(),
  bannerImageText: Yup.mixed(),
});
