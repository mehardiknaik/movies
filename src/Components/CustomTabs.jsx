import { Tab, Tabs } from "@mui/material";
import React, { useContext } from "react";
import { TypeContext } from "../Context/Typestate";
import { motion } from "framer-motion";

const CustomTabs = ({ page, setPage }) => {
  const { type, setType } = useContext(TypeContext);

  const changeTab = (value) => {
    console.log(value);
    setType(value);
    setPage(1);
    console.log(page);
  };

  const tabContainer = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.5,
      },
    },
  };

  return (
    <motion.div variants={tabContainer} initial="hidden" animate="visible">
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
    </motion.div>
  );
};

export default CustomTabs;
