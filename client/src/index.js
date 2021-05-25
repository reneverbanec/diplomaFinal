import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "./assets/scss/mdb-free.scss";
import { EkipeContextProvider } from "./context/EkipeContext";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
  <EkipeContextProvider>
    <App />
  </EkipeContextProvider>,

  document.getElementById("root")
);
