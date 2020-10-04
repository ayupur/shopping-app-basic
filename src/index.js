import React from "react";
import ReactDOM from "react-dom";
import AppRoute from "./AppRoute";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <AppRoute />
  </React.StrictMode>,
  rootElement
);
