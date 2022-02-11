import React from "react";
import Pagination from "@mui/material/Pagination";

const CustomPagination = ({ setPage, numOfPages = 10, page }) => {
  const handlePageChange = (event, value) => {
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
    </div>
  );
};

export default CustomPagination;
