import { Box, CircularProgress } from "@mui/material";
import React from "react";

const ContentWrap = ({ children, isFetching, isError = false }) => {
  if (isFetching || isError)
    return (
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        height={"30rem"}
      >
        <CircularProgress />
      </Box>
    );
  return children;
};

export default React.forwardRef((props, ref) => <ContentWrap {...props} />);
