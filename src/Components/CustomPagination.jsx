import React from "react";
import Pagination from "@mui/material/Pagination";
import { FormControl, MenuItem, Select } from "@mui/material";
import { FixedSizeList as List } from "react-window";

const CustomPagination = ({ setPage, numOfPages = 10, page }) => {
  const handlePageChange = (event, value) => {
    console.log(event, value);
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
        alignItems: "center",
      }}
    >
      <Pagination
        onChange={handlePageChange}
        count={numOfPages}
        color="secondary"
        hideNextButton
        hidePrevButton
        page={page}
      />
      <PageSelector
        handlePageChange={handlePageChange}
        numOfPages={numOfPages}
        page={page}
      />
    </div>
  );
};

const PageSelector = ({ handlePageChange, numOfPages, page }) => {
  const handleChange = (event) => {
    handlePageChange(event, event.target.value);
  };

  return (
      <FormControl variant="standard">
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={page}
          onChange={handleChange}
          label="page"
        >
          {Array(numOfPages).fill(2).map((_, i) => (
            <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>
          ))}
        </Select>
      </FormControl>
  );
};

export default CustomPagination;
