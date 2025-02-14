/* eslint-disable react-refresh/only-export-components */
import { PoseData } from "@/types/types";
import {
  ComponentRef,
  ReactNode,
  createContext,
  useRef,
  useState,
} from "react";
import Webcam from "react-webcam";

// A container where state, refs and functions are defined, has the advantage of type inference
const PoseContainer = () => {
  const [poseData, setPoseData] = useState<PoseData>([]);
  const webcamRef = useRef<Webcam | null>(null);

  // canvasref for drawing landmarks on canvas
  const canvasRef = useRef<ComponentRef<"canvas">>(null);

  return {
    poseData,
    setPoseData,
    webcamRef,
    canvasRef,
  };
};

// Because I don't want to specify the type of the context, I use the ReturnType utility type to infer the type of the PoseContainer function
type PoseContextType = ReturnType<typeof PoseContainer>;

export const PoseContext = createContext<PoseContextType | undefined>(
  undefined
);

export const PoseProvider = ({ children }: { children?: ReactNode }) => {
  return (
    <PoseContext.Provider value={PoseContainer()}>
      {children}
    </PoseContext.Provider>
  );
};
