import * as Yup from "yup";
export const addBannerSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  type: Yup.string().required("Type is required"),
  imageAltText: Yup.string().required("Alt Text is required"),
});

export const addBannerUploadSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  imageAltText: Yup.string().required("Alt Text is required"),
});

export const addProductSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  specification: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
});

export const addBrandPageSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  text: Yup.string().required("Text is required"),
  imageAltText: Yup.string().required("Alt Text is required"),
});
