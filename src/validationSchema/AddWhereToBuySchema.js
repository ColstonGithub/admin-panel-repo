import * as Yup from "yup";
export const addWhereToBuySchema = Yup.object().shape({
  city: Yup.string().required("City is required"),
  centerName: Yup.string().required("Center Name is required"),
  centerAddress: Yup.string().required("Center Address is required"),
  location: Yup.string().required("Location is required"),
});