import ReactDOM from "react-dom/client";
import "./index.css";
import React from "react";
import { PoseProvider } from "./context/PoseContext.tsx";
import App from "./App.tsx";
import { TooltipProvider } from "@radix-ui/react-tooltip";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PoseProvider>
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </PoseProvider>
  </React.StrictMode>
);
