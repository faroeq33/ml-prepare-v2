import { HandLandmarker } from "@mediapipe/tasks-vision";
import { useEffect, useRef } from "react";
import * as hlmSettings from "../utils/HandLandmarker";
import { usePose } from "../context/usePose";

function useCaptureLandmarks() {
  const { webcamRef, setPoseData } = usePose();

  // for canceling the animation frame
  const requestIdRef = useRef<number | null>(null);

  // Ref for landmarker in order to capture poses
  const landmarkerRef = useRef<HandLandmarker | null>(null);

  useEffect(() => {
    const capture = async () => {
      if (landmarkerRef.current) {
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
      // TODO: Get hl settings from local storage otherwise use default settings
      // eslint-disable-next-line react-hooks/exhaustive-deps

      const handLandMarker = await hlmSettings.initialize(
        hlmSettings.getDefaultSettings()
      );
      if (!landmarkerRef.current) {
        landmarkerRef.current = handLandMarker;
        console.log("handlandmarker is created!");
      }
    };

    initializeHandLandmarker().then(capture).catch(console.error);

    // how do I know if my animationframe is running?
    return () => cancelAnimationFrame(requestIdRef.current);
  }, [setPoseData, webcamRef]);
}

export default useCaptureLandmarks;
