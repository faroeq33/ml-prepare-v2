import { HandLandmarker } from "@mediapipe/tasks-vision";
import { useEffect, useRef } from "react";
import usePose from "@/context/use-pose";
import {
  createHandlandmarker,
  getDefaultSettings,
} from "@/utils/hand-landmarker";

function useCaptureLandmarks() {
  const { webcamRef, setPoseData } = usePose();

  // for canceling the animation frame
  const requestIdRef = useRef<number>(0);

  // Ref for landmarker in order to capture poses
  const landmarkerRef = useRef<HandLandmarker | null | undefined>(null);

  useEffect(() => {
    const capture = async () => {
      if (
        landmarkerRef.current &&
        webcamRef.current &&
        webcamRef.current.video
      ) {
        if (webcamRef.current.video.currentTime > 0) {
          const result = await landmarkerRef.current.detectForVideo(
            webcamRef.current.video,
            performance.now()
          );
          if (result.landmarks) {
            setPoseData(result.landmarks);
          }
        }
      }
      requestIdRef.current = requestAnimationFrame(capture);
    };

    const initializeHandLandmarker = async () => {
      try {
        // Get hl settings from local storage otherwise use default settings
        const handLandMarker = await createHandlandmarker(getDefaultSettings());
        if (!landmarkerRef.current) {
          landmarkerRef.current = handLandMarker;
          console.log("handlandmarker is created!");
        }
      } catch (error) {
        console.log(error);
      }
    };

    initializeHandLandmarker().then(capture).catch(console.error);

    // how do I know if my animationframe is running?
    return () => cancelAnimationFrame(requestIdRef.current);
  }, [setPoseData, webcamRef]);
}

export default useCaptureLandmarks;
