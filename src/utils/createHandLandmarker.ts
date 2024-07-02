import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";

const createHandLandmarker = async () => {
  // Load the vision tasks fileset resolver
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
  );

  // Create a hand landmarker instance with specified options
  const handLandmarker = await HandLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
      delegate: "GPU",
    },
    runningMode: "VIDEO",
    numHands: 1,
  });

  // Return the created hand landmarker instance
  return handLandmarker;
};

export default createHandLandmarker;
