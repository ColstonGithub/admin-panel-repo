import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import { SearchStyle } from "./searchBarStyles";
import "./searchBarMedia.css";

const SearchBar = ({
  placeholder,
  onChange,
  value,
  clearText,
  cancelIconRight,
}) => {
  return (
    <Box sx={SearchStyle.searchBoxWrapper} className="searchBoxWrapper">
      <Input
        // fullWidth
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        sx={{ ...SearchStyle.inputField, width: "432px" }}
        disableUnderline
      />
      <SearchIcon sx={SearchStyle.searchIcon} />
      {cancelIconRight &&
        value.length !== 0 &&
        {
          /* <CloseOutlinedIcon onClick={clearText} sx={SearchStyle.cancelIcon} /> */
        }}
    </Box>
  );
};

export default SearchBar;
