import ReactDOM from "react-dom/client";
import "./index.css";
import React from "react";
import { PoseProvider } from "./context/pose-context.tsx";
import App from "./app.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PoseProvider>
      {/* <TooltipProvider> */}
      <App />
      {/* </TooltipProvider> */}
    </PoseProvider>
  </React.StrictMode>
);
