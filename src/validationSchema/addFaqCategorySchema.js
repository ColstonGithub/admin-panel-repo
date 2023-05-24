import * as Yup from "yup";
export const addFaqCategorySchema = Yup.object().shape({
  name: Yup.string().required("name is required"),
});

export const editFaqCategorySchema = Yup.object().shape({
  name: Yup.string().required("name is required"),
});

export const addFaqsSchema = Yup.object().shape({
  question: Yup.string().required("Question is required"),
  answer: Yup.string().required("Answer is required"),
});
