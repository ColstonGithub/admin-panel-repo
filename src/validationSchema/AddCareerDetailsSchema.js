import * as Yup from "yup";

export const addCareerDetailsSchema = Yup.object().shape({
  contentHeading: Yup.string().required("Content Heading is required"),
  imageAltText: Yup.string().required("Image Alt Text is required"),
  contentText: Yup.string().required("Content Text is required"),
});
