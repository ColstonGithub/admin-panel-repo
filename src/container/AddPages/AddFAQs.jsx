import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { FormControl, Select, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import FMButton from "components/FMButton/FMButton";
import FMTypography from "components/FMTypography/FMTypography";
import { Col, Row } from "react-bootstrap";
import { commonStyle } from "Styles/commonStyles";
import { getFaqCategoryData } from "redux/Slices/FAQS/FaqCategorySlice";
import { addFaqsSchema } from "validationSchema/addFaqCategorySchema";
import { addNewFaq, getFaqData } from "redux/Slices/FAQS/FaqSlice";
import ModalWrapper from "container/HomePage/Modal";

const AddFAQs = (props) => {
  const { setOpen, open, id } = props;
  const dispatch = useDispatch();
  const [productTypes, setProductTypes] = React.useState("");
  useEffect(() => {
    dispatch(getFaqCategoryData({ page: 1 }));
  }, [id, dispatch]);

  const faqCategory = useSelector(
    (state) => state?.faqCategory?.getFaqCategoryListData?.faqCategoryList
  );

  const handleClose = () => {
    setOpen(false);
    setValue("question", "");
    setValue("answer", "");
    setProductTypes("");
  };
  const setCloseDialog = () => {
    setOpen(false);
    setValue("question", "");
    setValue("answer", "");
    setProductTypes("");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(addFaqsSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    data.faqCategory = productTypes;
    dispatch(addNewFaq(data)).then(() => {
      const usersListData = { page: 1 };
      dispatch(getFaqData(usersListData));
      setOpen(false);
      setValue("question", "");
      setValue("answer", "");
      setProductTypes("");
    });
  };

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Add FAQs"}
    >
      <Row>
        <Col>
          <FMTypography displayText={"Select Category"} />
          <FormControl fullWidth sx={{ minWidth: "13rem" }}>
            <Select
              sx={{
                height: "2.5rem",
                marginTop: ".3rem",
                border: "0.0625rem solid #1a1a1a1f",
                "&:hover": { border: "0.0625rem solid #1a1a1a1f" },
                "& .MuiSelect-root": {
                  border: "0.0625rem solid #1a1a1a1f",
                },
              }}
              native
              defaultValue=""
              id="grouped-native-select"
              value={productTypes}
              onChange={(e) => setProductTypes(e.target.value)}
            >
              <option disabled></option>
              {faqCategory?.map((elem) => (
                <option value={elem?._id}>{elem?.name}</option>
              ))}
            </Select>
          </FormControl>
        </Col>
      </Row>

      <Row style={{ padding: " 0.75rem" }}>
        <FMTypography
          displayText={"Question"}
          styleData={{
            ...commonStyle.commonModalTitleStyle,
            marginLeft: "-11px",
            opacity: "0.9",
            marginBottom: "4px",
          }}
        />
        <TextField
          required
          multiline
          rows={3}
          id="question"
          name="question"
          {...register("question")}
        />
      </Row>

      <Row style={{ padding: " 0.75rem" }}>
        <FMTypography
          displayText={"Answer"}
          styleData={{
            ...commonStyle.commonModalTitleStyle,
            marginLeft: "-11px",
            opacity: "0.9",
            marginBottom: ".3rem",
          }}
        />
        <TextField
          required
          multiline
          rows={3}
          id="answer"
          name="answer"
          {...register("answer")}
        />
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

export default AddFAQs;
