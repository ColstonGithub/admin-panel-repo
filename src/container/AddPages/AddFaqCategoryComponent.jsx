import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import FMButton from "components/FMButton/FMButton";
import FMInput from "components/FMInput/FMInput";
import { Col, Row } from "react-bootstrap";
import { addFaqCategorySchema } from "validationSchema/addFaqCategorySchema";
import {
  addNewFaqCategory,
  getFaqCategoryData,
} from "redux/Slices/FAQS/FaqCategorySlice";
import { notify } from "constants/utils";
import ModalWrapper from "container/HomePage/Modal";
const AddFaqCategoryComponent = (props) => {
  const { setOpen, open } = props;
  const dispatch = useDispatch();

  const handleClose = () => {
    setValue("name", "");
  };
  const setCloseDialog = () => {
    setOpen(false);
    setValue("name", "");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(addFaqCategorySchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    dispatch(addNewFaqCategory(data)).then(() => {
      const usersListData = { page: 1 };
      dispatch(getFaqCategoryData(usersListData));
      setOpen(false);
      setValue("name", "");
    });
    notify({ type: "success", messgae: "Data Added Successfully" });
  };

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Add FAQs Category"}
    >
      <Row>
        <Col>
          <FMInput
            required
            readOnly={false}
            displayText="Name"
            id="name"
            name="name"
            register={register("name")}
            error={errors.name}
            errorDisplayText={errors.name?.message}
          />
        </Col>
      </Row>

      <FMButton
        displayText="Submit"
        variant="contained"
        disabled={false}
        styleData={{
          textTransform: "capitalize",
          marginTop: "2rem",
          "&:hover": {
            border: "none",
            textDecoration: "none",
          },
        }}
        onClick={handleSubmit(onSubmit)}
      />
    </ModalWrapper>
  );
};

export default AddFaqCategoryComponent;
