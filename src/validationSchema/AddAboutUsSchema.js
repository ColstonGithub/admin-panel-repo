import * as Yup from "yup";
export const addAboutUsSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  text: Yup.string().required("Text is required"),
  bannerImageAltText: Yup.string().required("Alt Text is required"),
});
