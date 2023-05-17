import * as Yup from "yup";
export const addHomepageExploreCategorySchema = Yup.object().shape({
    imageTitle: Yup.string().required("Image Title is required"),
    imageAltText: Yup.string().required("Image alt text is required")
});
