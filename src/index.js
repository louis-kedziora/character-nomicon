import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = createRoot(document.getElementById("root"));
// When we get more pages will want to implement routes
// https://www.w3schools.com/react/react_router.asp
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
