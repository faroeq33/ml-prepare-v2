import { HandLandmarker } from "@mediapipe/tasks-vision";
import { useEffect, useRef } from "react";
import createHandLandmarker from "../utils/createHandLandmarker";
import { usePose } from "../context/usePose";

function useCaptureLandmarks() {
  const { webcamRef, setPoseData } = usePose();

  // for canceling the animation frame
  const requestIdRef = useRef<number | null>(null);

  // Ref for landmarker in order to capture poses
  const landmarkerRef = useRef<HandLandmarker | null>(null);

  useEffect(() => {
    const capture = async () => {
      if (landmarkerRef.current && webcamRef.current.getCanvas()) {
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
      const handLandMarker = await createHandLandmarker({
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        numHands: 1,
      });
      if (!landmarkerRef.current) {
        console.log("something");
        landmarkerRef.current = handLandMarker;
        console.log("handlandmarker is created!");
      }
      // capture();
    };

    initializeHandLandmarker().then(capture).catch(console.error);

    // how do I know if my animationframe is running?
    return () => cancelAnimationFrame(requestIdRef.current);
  }, [setPoseData, webcamRef]);
}

export default useCaptureLandmarks;
