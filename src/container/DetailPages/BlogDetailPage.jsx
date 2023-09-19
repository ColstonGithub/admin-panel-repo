import FMTypography from "components/FMTypography/FMTypography";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getBlogsDetail } from "redux/Slices/Blogs/Blogs";
import ModalWrapper from "container/HomePage/Modal";
import "./detailPage.css";

// Styles for the editor and its container element
const previewContainer = {
  backgroundColor: "#f8f8f8",
  padding: "10px",
  border: "1px solid #ddd",
  marginTop: "5px",
};

const BlogDetailPage = (props) => {
  const { setOpen, open, id, type } = props;
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const setCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getBlogsDetail(id));
  }, [id, dispatch]);

  const blogsDetail = useSelector((state) => state?.blogs?.getBlogsData?.Blogs);

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Colston Concept Category Details"}
    >
      <Row style={{ marginTop: "1rem" }}>
        <Col>
          <FMTypography displayText={"Title"} />
          <FMTypography
            displayText={blogsDetail?.title}
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

      <Row style={{ marginTop: "1rem" }}>
        <Col>
          <FMTypography displayText={"Page Title"} />
          <FMTypography
            displayText={blogsDetail?.pageTitle}
            styleData={{ color: "#717171" }}
          />
        </Col>
        <Col>
          <FMTypography displayText={"Page Heading"} />
          <FMTypography
            displayText={blogsDetail?.pageHeading}
            styleData={{ color: "#717171" }}
          />
        </Col>
      </Row>

      <Row style={{ marginTop: "1rem" }}>
        <Col>
          <FMTypography displayText={"Colston Concept Category"} />
          <FMTypography
            displayText={blogsDetail?.blogCategory}
            styleData={{ color: "#717171" }}
          />
        </Col>
        <Col>
          {" "}
          <FMTypography displayText={"Image Alt Text"} />
          <FMTypography
            displayText={blogsDetail?.imageAltText}
            styleData={{ color: "#717171" }}
          />
        </Col>
      </Row>

      <Row style={{ marginTop: "1rem" }}>
        <Col>
          <FMTypography displayText={"Text"} />

          <div style={{ ...previewContainer,whiteSpace: "pre-wrap"  }} className="editor-image">
            <div dangerouslySetInnerHTML={{ __html: blogsDetail?.text }} />
          </div>
        </Col>
      </Row>

      <Row style={{ marginTop: "1rem" }}>
        <Col md={6}>
          <FMTypography
            displayText={"Images"}
            styleData={{ color: "#222", marginBottom: "5px" }}
          />
          <img src={blogsDetail?.image} alt="img" width="450px" height="auto" />
        </Col>
      </Row>
    </ModalWrapper>
  );
};

export default BlogDetailPage;
