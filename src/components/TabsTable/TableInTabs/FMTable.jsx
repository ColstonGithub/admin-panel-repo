import React, { useRef } from "react";
import detailIcon from "assets/detailIcon.svg";
import editIcon from "assets/editIcon.svg";
import deleteIcon from "assets/deleteIcon.svg";
import { styles } from "./FMTable.styles";
import { InfinitySpin } from 'react-loader-spinner'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import FMCustomPagination from "components/FMCustomPagination/FMCustomPagination";
import FMTypography from "components/FMTypography/FMTypography";

const FMTable = ({
  columns,
  rows,
  onRowClick,
  tableHeadRowStyle,
  tableHeadCellStyle,
  tableBodyRowStyle,
  page,
  setPage,
  pagination,
  totalPagesCount,
  tableStyle,
  tableContainerStyles,
  hover = true,
  onScroll,
  hasNext,
  customNoPagination,
  customPaginationContainerStyle,
}) => {
  const containerRef = useRef(null);
  const handleScroll = () => {
    if (
      hasNext &&
      containerRef.current.scrollHeight -
        (containerRef.current.scrollTop + containerRef.current.clientHeight) <
        1
    ) {
      // onScroll();
    }
  };

  return rows.length > 0 ? (
    <TableContainer
      component={Paper}
      sx={{ ...styles.tableContainerStyles, ...tableContainerStyles }}
    >
      {rows && (
        <>
          <Box
            sx={
              pagination
                ? {
                    ...styles.paginationStyle,
                    ...styles.customSrollBar,
                    ...customPaginationContainerStyle,
                  }
                : {
                    ...styles.customSrollBar,
                    ...styles.noPaginationTable,
                    ...customNoPagination,
                  }
            }
            ref={containerRef}
            onScroll={handleScroll}
          >
            <Table
              sx={{
                ...styles.tableBorderStyle,
                ...tableStyle,
              }}
              stickyHeader
            >
              <TableHead>
                <TableRow sx={{ ...styles.tableHeadRow, ...tableHeadRowStyle }}>
                  {columns?.map(({ headername, key, ...restProps }) => (
                    <TableCell
                      key={key}
                      sx={{
                        backgroundColor: "#FAFBFB",
                        color: "#717171",
                        ...styles.tableHeadCell,
                        ...tableHeadCellStyle,
                      }}
                      {...restProps}
                    >
                      {headername}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {rows?.map((row, index) => (
                  <TableRow
                    key={index.toString()}
                    sx={{
                      height: "50px",
                      //   ...styles.tableHeadRow,
                      //   ...tableBodyRowStyle,
                    }}
                    onClick={() => onRowClick?.(row)}
                    // hover={hover}
                  >
                    {columns?.map(({ field, renderColumn, ...restProps }) => (
                      <TableCell
                        key={field.toString()}
                        size="small"
                        padding="normal"
                        align="left"
                        {...restProps}
                        sx={{
                          ...(row["ellipisis"] === true && styles.maxWidth),
                        }}
                      >
                        {renderColumn ? renderColumn(row) : row[field]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>

          {pagination && (
            <Box sx={{ ...styles.paginationContainer }}>
              <FMCustomPagination
                page={page}
                setPage={setPage}
                totalPagesCount={totalPagesCount}
              />
            </Box>
          )}
        </>
      )}
    </TableContainer>
  ) : (
    <Box
      sx={{
        ...styles.paginationStyle,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <InfinitySpin width="200" color="#4fa94d" />
      {/* <FMTypography displayText={"Loading..."} /> */}
    </Box>
  );
};

export default FMTable;
