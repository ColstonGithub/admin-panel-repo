import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import FMButton from "components/FMButton/FMButton";
import FMTypography from "components/FMTypography/FMTypography";
import FMInput from "components/FMInput/FMInput";
import { Col, Row } from "react-bootstrap";
import { addWhereToBuySchema } from "validationSchema/AddWhereToBuySchema";
import {
  editWhereToBuy,
  getWhereToBuyData,
  whereToBuyDetail,
} from "redux/Slices/WhereToBuy/whereToBuy";
import { notify } from "constants/utils";
import ModalWrapper from "container/HomePage/Modal";

const EditWhereToBuy = (props) => {
  const { setOpen, open, id } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const setCloseDialog = () => {
    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(addWhereToBuySchema),
    mode: "onChange",
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(editWhereToBuy({ data, id })).then((response) => {
      const usersListData = { page: 1 };
      dispatch(getWhereToBuyData(usersListData));
      setOpen(false);
      notify({ type: "success", message: "Data Edited Successfully" });
    });
  };

  useEffect(() => {
    dispatch(whereToBuyDetail(id));
  }, [id, dispatch]);

  const getWhereToBuyDetails = useSelector(
    (state) =>
      state?.whereToBuy?.getWhereToBuyData?.whereToBuyProd
  );

  useEffect(() => {
    reset({
      city: getWhereToBuyDetails?.city,
      centerName: getWhereToBuyDetails?.centerName,
      centerAddress: getWhereToBuyDetails?.centerAddress,
      location: getWhereToBuyDetails?.location,
      email: getWhereToBuyDetails?.email,
      ocAppointment: getWhereToBuyDetails?.ocAppointment,
      service: getWhereToBuyDetails?.service,
      purchaseAssistance: getWhereToBuyDetails?.purchaseAssistance,
    });
  }, [getWhereToBuyDetails, reset]);

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      handleClose={handleClose}
      setCloseDialog={setCloseDialog}
      modalTitle={"Edit Where To Buy"}
    >
      <Row style={{ marginBottom: "1rem" }}>
        <Col md={6}>
          <FMInput
            required
            readOnly={false}
            displayText="City"
            id="city"
            name="city"
            register={register("city")}
            error={errors?.city}
            errorDisplayText={errors.city?.message}
          />
        </Col>

        <Col md={6}>
          <FMInput
            required
            readOnly={false}
            displayText="Email"
            id="email"
            name="email"
            register={register("email")}
            error={errors?.email}
            errorDisplayText={errors.email?.message}
          />
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <FMInput
            required
            readOnly={false}
            displayText="Center Name"
            id="centerName"
            name="centerName"
            register={register("centerName")}
            error={errors?.centerName}
            errorDisplayText={errors?.centerName?.message}
          />
          {errors?.centerName && (
            <FMTypography
              displayText={errors?.centerName?.message}
              styleData={{ color: "red" }}
            />
          )}
        </Col>

        <Col md={6}>
          <FMInput
            required
            readOnly={false}
            displayText="Center Address"
            id="centerAddress"
            name="centerAddress"
            register={register("centerAddress")}
            error={errors?.centerAddress}
            errorDisplayText={errors?.centerAddress?.message}
          />
        </Col>
      </Row>

      <Row style={{ marginTop: "1rem" }}>
        <Col md={6}>
          <FMInput
            required
            readOnly={false}
            displayText="Location"
            id="location"
            name="location"
            register={register("location")}
            error={errors?.location}
            errorDisplayText={errors?.location?.message}
          />
        </Col>

        <Col md={6}>
          <FMInput
            required
            readOnly={false}
            displayText="Purchase Assistance"
            id="purchaseAssistance"
            name="purchaseAssistance"
            register={register("purchaseAssistance")}
            error={errors?.purchaseAssistance}
            errorDisplayText={errors?.purchaseAssistance?.message}
          />
        </Col>
      </Row>

      <Row style={{ marginTop: "1rem" }}>
        <Col md={6}>
          <FMInput
            required
            readOnly={false}
            displayText="Service"
            id="service"
            name="service"
            register={register("service")}
            error={errors?.service}
            errorDisplayText={errors?.service?.message}
          />
        </Col>

        <Col md={6}>
          <FMInput
            required
            readOnly={false}
            displayText="Oc Appointment"
            id="ocAppointment"
            name="ocAppointment"
            register={register("ocAppointment")}
            error={errors?.ocAppointment}
            errorDisplayText={errors?.ocAppointment?.message}
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

export default EditWhereToBuy;
