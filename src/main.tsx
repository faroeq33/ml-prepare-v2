import ReactDOM from "react-dom/client";
import "./index.css";
import React from "react";
import { PoseProvider } from "./context/PoseContext.tsx";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PoseProvider>
      <App />
    </PoseProvider>
  </React.StrictMode>
);
