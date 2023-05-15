import * as Yup from "yup";
export const addCatalogueSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  imageAltText: Yup.string().required("Alt Text is required"),
  //   heading: Yup.string().required("Heading is required"),
  //   bannerImageAltText: Yup.string().required("Alt Text is required"),
});
