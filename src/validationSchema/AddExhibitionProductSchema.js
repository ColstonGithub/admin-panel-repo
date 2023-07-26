import * as Yup from "yup";
export const addExhibitionProductSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  imageAltText: Yup.string().required("Alt Text is required"),
  text: Yup.string().required("Text is required"),
  //   heading: Yup.string().required("Heading is required"),
  //   bannerImageAltText: Yup.string().required("Alt Text is required"),
});
