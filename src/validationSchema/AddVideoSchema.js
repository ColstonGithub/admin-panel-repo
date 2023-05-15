import * as Yup from "yup";
export const addVideoSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  metaData: Yup.string().required("Meta Data is required"),
  //   heading: Yup.string().required("Heading is required"),
  //   bannerImageAltText: Yup.string().required("Alt Text is required"),
});

export const editVideoSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  metaData: Yup.string().required("Meta Data is required"),
  //   heading: Yup.string().required("Heading is required"),
  //   bannerImageAltText: Yup.string().required("Alt Text is required"),
});
