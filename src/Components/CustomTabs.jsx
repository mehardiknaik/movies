import { Tab, Tabs } from "@mui/material";
import React, { useContext } from "react";
import { PageContext } from "../Context/Pagestate";
import { TypeContext } from "../Context/Typestate";

const CustomTabs = () => {
  const { type, setType } = useContext(TypeContext);
  const { setPage } = useContext(PageContext);

  const changeTab = (value) => {
    console.log(value);
    setType(value);
    setPage(1);
  };
  return (
    <>
      <Tabs
        value={type}
        indicatorColor="primary"
        textColor="primary"
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
