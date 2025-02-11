import { useContext } from "react";
import { PoseContext } from "./PoseContext";

// A custom hook to use the PoseContext in child components
function usePose() {
  const context = useContext(PoseContext);
  if (context === undefined) {
    throw new Error(`usePose must be used within a PoseProvider`);
  }
  return context;
}

export default usePose;
