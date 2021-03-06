import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "styled-components";
import { HashRouter } from "react-router-dom";

const theme = {
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 769,
    lg: 992,
    xl: 1200,
  },
};

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
