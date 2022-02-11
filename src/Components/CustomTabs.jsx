import { Tab, Tabs } from "@mui/material";
import React, { useContext } from "react";
import { TypeContext } from "../Context/Typestate";

const CustomTabs = ({ page, setPage }) => {
  const { type, setType } = useContext(TypeContext);

  const changeTab = (value) => {
    console.log(value);
    setType(value);
    setPage(1);
    console.log(page);
  };
  return (
    <>
      <Tabs
        value={type}
        indicatorColor="secondary"
        textColor="secondary"
        onChange={(event, newValue) => {
          changeTab(newValue);
        }}
        style={{ paddingBottom: 5 }}
        aria-label="disabled tabs example"
      >
        <Tab style={{ width: "50%" }} value="movie" label="Movies" />
        <Tab style={{ width: "50%" }} value="tv" label="TV Series" />
      </Tabs>
    </>
  );
};

export default CustomTabs;
