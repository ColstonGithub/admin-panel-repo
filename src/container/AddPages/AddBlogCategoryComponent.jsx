import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import FMButton from "components/FMButton/FMButton";
import FMInput from "components/FMInput/FMInput";
import { Col, Row } from "react-bootstrap";
import {
  addBlogCategory,
  getBlogCategory,
} from "redux/Slices/Blogs/BlogsCategory";
import { addBlogCategorySchema } from "validationSchema/AddBlogCategorySchema";
import ModalWrapper from "container/HomePage/Modal";

const AddBlogCategoryComponent = (props) => {
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
    resolver: yupResolver(addBlogCategorySchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    dispatch(addBlogCategory(data)).then(() => {
      const usersListData = { page: 1 };
      dispatch(getBlogCategory(usersListData));
      setOpen(false);
      setValue("name", "");
    });
  };

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Add Blog Category"}
    >
      <Row style={{ marginTop: "1rem" }}>
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

export default AddBlogCategoryComponent;
