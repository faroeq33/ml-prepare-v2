import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import React from "react";
import { PoseProvider } from "./context/PoseContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PoseProvider>
      <App />
    </PoseProvider>
  </React.StrictMode>
);
