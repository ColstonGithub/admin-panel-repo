import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid } from "@mui/material";
import Dropzone from "react-dropzone";

import FMButton from "components/FMButton/FMButton";
import FMTypography from "components/FMTypography/FMTypography";

import { commonStyle } from "Styles/commonStyles";
import { FormUploadstyles } from "./FormUpload.style";
import { addBannerUploadSchema } from "validationSchema/HomePage/AddBannerSchema";
// import { UserAccountDetailStyle } from "Container/AccessControl/Users/UserAccountDetail/UserAccountDetail.styles";
// import { addTemplateSchema } from "validationSchema/AddTemplateSchema";

export default function FormUpload({
  changeType,
  fileUpload,
  setFileUpload,
  getData,
  errorMessage,
  setFilePath,
  documentType,
  customDropzoneStyle,
  imageType = false,
  setOpenImage,
  isPdfAndDocSupport = false,
  onlyPdf,
}) {
  const { reset, setValue } = useForm({
    resolver: yupResolver(addBannerUploadSchema),
    mode: "onChange",
  });
  const [error, setError] = useState("");
  const [categoryImage, setCategoryImage] = useState("");

  const extractFileName = (file) => {
    if (file == null) return file;
    if (typeof file === "string") {
      const chunks = file.split("/");
      return chunks[chunks.length - 1];
    }

    if (file?.name) return file;
    if (file?.originalname) return file;

    return file;
    // ?
    // extractFileName(file);
    // : extractFileName(file);
  };

  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles[0].size > 5242880) {
      return setError("File should be less than 5 MB");
    }
    getData(acceptedFiles);
    setFileUpload([...acceptedFiles.map((file) => extractFileName(file))]);
  };
  const changeTemplateFun = (path) => {
    setFileUpload([]);
    setFilePath("");
    setValue("categoryImage", null, { shouldValidate: true });
    reset();
  };

  const handleProductPictures = (e) => {
    setCategoryImage([e.target.files[0]]);
  };

  return (
    <Grid>
      <Grid>
        {fileUpload[0] !== "" &&
        fileUpload?.length > 0 &&
        fileUpload[0]?.originalname !== "" ? (
          <Grid>
            {fileUpload.map((fileName) => (
              <Box sx={FormUploadstyles.boxStyle}>
                {imageType ? (
                  <Box onClick={setOpenImage}>
                    <FMTypography
                      displayText={fileName}
                      sx={FormUploadstyles.contactAddressId}
                    />
                  </Box>
                ) : (
                  <FMTypography key={fileName} displayText={fileName} />
                )}
                <FMButton
                  displayText={changeType}
                  variant="outlined"
                  styleData={{
                    ...(fileUpload[0] && FormUploadstyles.btnLeftMargin),
                  }}
                  onClick={changeTemplateFun}
                />
              </Box>
            ))}
          </Grid>
        ) : (
          <input
            type="file"
            name="categoryImage"
            onChange={handleProductPictures}
          />
        )}
      </Grid>
    </Grid>
  );
}
