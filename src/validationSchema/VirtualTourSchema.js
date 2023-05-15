import * as Yup from "yup";
export const addVirtualTourSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  bannerImageAltText: Yup.string().required(
    "Banner Image Alt Text is required"
  ),
});

export const editVirtualTourSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  bannerImageAltText: Yup.string().required(
    "Banner Image Alt Text is required"
  ),
});

export const addExhibitionBannerSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  bannerImageAltText: Yup.string().required(
    "Banner Image Alt Text is required"
  ),
});

export const editExhibitionBannerSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  bannerImageAltText: Yup.string().required(
    "Banner Image Alt Text is required"
  ),
});
