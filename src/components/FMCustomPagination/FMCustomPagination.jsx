import React from "react";
import { Pagination, PaginationItem } from "@mui/material";
import { useStyles } from "./FMCustomPagination.style";
import FMTypography from "components/FMTypography/FMTypography";
import { PER_PAGE_LIMIT } from "constants/AppConstant";

function FMCustomPagination({ totalPagesCount, page, setPage, totalData }) {
  const classes = useStyles();
  const limit = page?.limit || PER_PAGE_LIMIT;

  const onPageChangeHandler = (e, page) => {
    setPage(page);
  };
  const nextIcon = (isNext) => (
    <FMTypography displayText={isNext ? "Next" : "Previous"} />
  );
  return (
    <Pagination
      className={classes.pagination}
      count={totalPagesCount || parseInt(Math.ceil(totalData / limit))}
      page={page}
      onChange={onPageChangeHandler}
      siblingCount={totalPagesCount <= 8 ? 1 : 2}
      variant="outlined"
      shape="rounded"
      renderItem={(item) => {
        return (
          <PaginationItem
            components={{
              previous: () => nextIcon(false),
              next: () => nextIcon(true),
            }}
            {...item}
          />
        );
      }}
    />
  );
}

export default FMCustomPagination;
