import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";

const createHandLandmarker = async () => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
  );
  const handLandmarker = await HandLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
      delegate: "GPU",
    },
    runningMode: "VIDEO",
    numHands: 1,
  });
  return handLandmarker;
  //   if (!landmarkerRef.current) {
  //     console.log("something");
  //     landmarkerRef.current = handLandmarker;
  //     console.log("handlandmarker is created!");
  //   }
  // start capturing - zie hieronder
};

export default createHandLandmarker;
// write so it can only make 1 drawing util instance
// drawingUtilsRef.current = new DrawingUtils(ctx);
