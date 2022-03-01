import {
  Alert,
  Checkbox,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import React, { useState } from "react";
import { Languages } from "../Data/Language";

const LanguageSelect = ({ setPage, setSelectLanguage, SelectLanguage }) => {
  const [alertMsg, setalertMsg] = useState(false);
  const handleChange = (event) => {
    if (event.target.value.length < 1) setalertMsg(true);
    else{
    setSelectLanguage(event.target.value);
    setPage(1);}
  };
  return (
    <>
      <FormControl
        variant="standard"
        sx={{ m: 1, width: "30%", maxWidth: 200 }}
      >
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={SelectLanguage}
          onChange={handleChange}
          renderValue={(selected) => selected.map((a) => a.name).join(", ")}
          color="secondary"
        >
          {Languages.map((language) => (
            <MenuItem key={language.name} value={language}>
              <Checkbox
                color="secondary"
                checked={SelectLanguage.indexOf(language) > -1}
              />
              <ListItemText primary={language.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Snackbar open={alertMsg} autoHideDuration={3000} onClose={()=>setalertMsg(false)}>
        <Alert onClose={()=>setalertMsg(false)} severity="error" sx={{ width: "100%" }}>
          Please, Select at least one language
        </Alert>
      </Snackbar>
    </>
  );
};

export default LanguageSelect;
