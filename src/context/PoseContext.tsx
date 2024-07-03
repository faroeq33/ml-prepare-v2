import { NormalizedLandmark } from "@mediapipe/tasks-vision";
import {
  Dispatch,
  ElementRef,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import Webcam from "react-webcam";

interface PoseContextType {
  poseData: NormalizedLandmark[][];
  setPoseData: Dispatch<SetStateAction<NormalizedLandmark[][]>>;
  webcamRef: React.MutableRefObject<Webcam | null>;
  canvasRef: React.MutableRefObject<ElementRef<"canvas">> | null;
}

const PoseContext = createContext<PoseContextType | undefined>(undefined);

export const PoseProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // For incoming data
  const [poseData, setPoseData] = useState<NormalizedLandmark[][]>([]);
  const webcamRef = useRef<Webcam | null>(null);

  // canvasref for drawing the landmarks on the canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  return (
    <PoseContext.Provider
      value={{
        poseData,
        setPoseData,
        webcamRef,
        canvasRef,
      }}
    >
      {children}
    </PoseContext.Provider>
  );
};

export const usePose = () => {
  const context = useContext(PoseContext);
  if (context === undefined) {
    throw new Error(`userPose must be used within an PoseProvider`);
  }
  return context;
};
