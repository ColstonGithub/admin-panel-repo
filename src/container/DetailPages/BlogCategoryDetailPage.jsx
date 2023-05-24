import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getBlogCategoryDetails } from "redux/Slices/Blogs/BlogsCategory";
import FMTypography from "components/FMTypography/FMTypography";
import ModalWrapper from "container/HomePage/Modal";

const BlogCategoryDetailPage = (props) => {
  const { setOpen, open, id } = props;
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const setCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getBlogCategoryDetails(id));
  }, [id, dispatch]);

  const blogsDetail = useSelector(
    (state) => state?.blogsCategory?.getBlogCategoryDetails?.blogCategory
  );

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Blog Category Details"}
    >
      <Row style={{ marginBottom: "1rem" }}>
        <Col>
          <FMTypography displayText={"Name"} />
          <FMTypography
            displayText={blogsDetail?.name}
            styleData={{ color: "#717171" }}
          />
        </Col>
        <Col>
          <FMTypography displayText={"Date"} />
          <FMTypography
            displayText={moment(blogsDetail?.createdAt).format("DD/MM/YYYY")}
            styleData={{ color: "#717171" }}
          />
        </Col>
      </Row>
    </ModalWrapper>
  );
};

export default BlogCategoryDetailPage;
