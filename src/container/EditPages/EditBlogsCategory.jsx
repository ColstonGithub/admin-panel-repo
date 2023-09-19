import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import FMButton from "components/FMButton/FMButton";
import FMInput from "components/FMInput/FMInput";
import { Col, Row } from "react-bootstrap";
import {
  editBlogCategory,
  getBlogCategory,
  getBlogCategoryDetails,
} from "redux/Slices/Blogs/BlogsCategory";
import { addBlogCategorySchema } from "validationSchema/AddBlogCategorySchema";
import { notify } from "constants/utils";
import ModalWrapper from "container/HomePage/Modal";
const EditBlogsCategory = (props) => {
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
    dispatch(getBlogCategoryDetails(id));
  }, [id, dispatch]);

  const blogCategoryDetail = useSelector(
    (state) => state?.blogsCategory?.getBlogCategoryDetails?.blogCategory
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(addBlogCategorySchema),
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      name: blogCategoryDetail?.name,
    });
  }, [blogCategoryDetail, reset]);

  const onSubmit = (data) => {
    dispatch(editBlogCategory({ _id: id, name: data?.name })).then(() => {
      const usersListData = { page: 1 };
      dispatch(getBlogCategory(usersListData));
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
      modalTitle={"Edit Colston Concept Category"}
    >
      <Row style={{ marginBottom: "1rem" }}>
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

export default EditBlogsCategory;
