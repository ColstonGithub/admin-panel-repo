import * as Yup from "yup";
export const addBlogCategorySchema = Yup.object().shape({
  name: Yup.string().required("name is required"),
});

export const addBlogsSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  imageAltText: Yup.string().required("Alt Text is required"),
  pageTitle: Yup.string().required("Page title is required"),
  pageHeading: Yup.string().required("Page heading is required"),
  blogCategory: Yup.string().required("Blog category is required"),
});
