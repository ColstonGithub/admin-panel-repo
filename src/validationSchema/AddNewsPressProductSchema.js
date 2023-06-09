import * as Yup from "yup";
export const addNewsPressProductSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  imageAltText: Yup.string().required("Alt Text is required"),
  text: Yup.string().required("Text is required"),
});

export const editNewsPressProductSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  imageAltText: Yup.string().required("Alt Text is required"),
  text: Yup.string().required("Text is required"),
});

export const addNewsPressBannerSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  bannerImageAltText: Yup.string().required("Banner Alt Text is required"),
});
