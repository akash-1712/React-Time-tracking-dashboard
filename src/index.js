import React from "react";
import "./index.module.scss";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";

import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
