import React from "react";
import Pagination from "@mui/material/Pagination";

const CustomPagination = ({ setPage, numOfPages = 10, page }) => {
  const handlePageChange = (page) => {
    setPage(page);
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
        onChange={(e) => handlePageChange(e.target.textContent)}
        count={numOfPages}
        color="secondary"
        hideNextButton
        hidePrevButton
        defaultPage={page | 1}
      />
    </div>
  );
};

export default CustomPagination;
