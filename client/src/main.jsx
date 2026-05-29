import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
// import "./styles/system/tokens.css";

import "./styles/globals.css";
import "./components/shared/layout.css";
import "./components/shared/section.css";
import "./styles/tokens.css";
import "./styles/responsive.css";
import "./styles/reveal.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
