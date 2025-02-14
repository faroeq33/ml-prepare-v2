import ReactDOM from "react-dom/client";
import React from "react";
import { PoseProvider } from "./context/pose-context.tsx";
import "./index.css";
import App from "./app.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PoseProvider>
      <App />
    </PoseProvider>
  </React.StrictMode>
);
