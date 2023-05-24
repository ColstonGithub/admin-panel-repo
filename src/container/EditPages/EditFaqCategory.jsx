import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import FMButton from "components/FMButton/FMButton";
import FMInput from "components/FMInput/FMInput";
import { Col, Row } from "react-bootstrap";
import { editFaqCategorySchema } from "validationSchema/addFaqCategorySchema";
import {
  editFaqCategory,
  getFaqCategoryById,
  getFaqCategoryData,
} from "redux/Slices/FAQS/FaqCategorySlice";
import { notify } from "constants/utils";
import ModalWrapper from "container/HomePage/Modal";

const EditFaqCategory = (props) => {
  const { setOpen, open, id } = props;

  const handleClose = () => {
    setOpen(false);
    setValue("name", "");
  };
  const setCloseDialog = () => {
    setOpen(false);
    setValue("name", "");
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFaqCategoryById(id));
  }, [id, dispatch]);

  const faqCategoryDetail = useSelector(
    (state) => state?.faqCategory?.getFaqCategoryData?.faqCategory
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(editFaqCategorySchema),
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      name: faqCategoryDetail?.name,
    });
  }, [faqCategoryDetail, reset]);

  const onSubmit = (data) => {
    dispatch(editFaqCategory({ data, id })).then(() => {
      const usersListData = { page: 1 };
      dispatch(getFaqCategoryData(usersListData));
      setOpen(false);
      notify({ type: "success", messgae: "Data Edited Successfully" });
    });
  };

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Edit FAQs Category"}
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
        displayText="Update"
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

export default EditFaqCategory;
