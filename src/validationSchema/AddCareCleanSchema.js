import * as Yup from "yup";
export const addCareCleanSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  text: Yup.string().required("Text is required"),
  heading: Yup.string().required("Heading is required"),
  bannerImageAltText: Yup.string().required("Alt Text is required"),
});

export const editCareCleanSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  text: Yup.string().required("Text is required"),
  heading: Yup.string().required("Heading is required"),
  bannerImageAltText: Yup.string().required("Alt Text is required"),
});
