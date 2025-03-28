import React from "react";
import ReactDOM from "react-dom/client";
import RouterCustom from "./router.js";
import { BrowserRouter } from "react-router-dom";
import "./style/style.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <RouterCustom />
  </BrowserRouter>
);
