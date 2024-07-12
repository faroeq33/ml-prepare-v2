import { HandLandmarker, HandLandmarkerOptions } from "@mediapipe/tasks-vision";
import { useEffect, useMemo, useRef } from "react";
import createHandLandmarker from "../utils/createHandLandmarker";
import { usePose } from "../context/usePose";
// import { useLocalStorage } from "usehooks-ts";

function useCaptureLandmarks() {
  const { webcamRef, setPoseData } = usePose();

  // TODO: Get hl settings from local storage otherwise use default settings
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handLandmarkerSettings: HandLandmarkerOptions = useMemo(
    () => ({
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
        delegate: "GPU",
      },
      minTrackingConfidence: 0.5,
      minHandDetectionConfidence: 0.5,
      minHandPresenceConfidence: 0.5,
      runningMode: "VIDEO",
      numHands: 1,
    }),
    []
  );

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
      const handLandMarker = await createHandLandmarker(handLandmarkerSettings);
      if (!landmarkerRef.current) {
        console.log("something");
        landmarkerRef.current = handLandMarker;
        console.log("handlandmarker is created!");
      }
    };

    initializeHandLandmarker().then(capture).catch(console.error);

    // how do I know if my animationframe is running?
    return () => cancelAnimationFrame(requestIdRef.current);
  }, [setPoseData, webcamRef, handLandmarkerSettings]);
}

export default useCaptureLandmarks;
