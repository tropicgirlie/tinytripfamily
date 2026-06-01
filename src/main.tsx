import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./theme/material-radix.css";
import "./theme/dashboard.css";
import "./theme/guest-dashboard.css";
import "../styles.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Theme accentColor="teal" grayColor="sand" radius="large" scaling="100%">
      <App />
    </Theme>
  </StrictMode>,
);
