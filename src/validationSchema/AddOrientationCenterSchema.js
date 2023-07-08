import * as Yup from "yup";
export const addOrientationCenterSchema = Yup.object().shape({
  city: Yup.string().required("City is required"),
  centerName: Yup.string().required("Center Name is required"),
  centerAddress: Yup.string().required("Center Address is required"),
  location: Yup.string().required("Location is required"),
  email: Yup.string().required("Email is required"),
  ocAppointment: Yup.string().required("Email is required"),
  service: Yup.string().required("Email is required"),
  purchaseAssistance: Yup.string().required("Email is required"),
});