import {
  FilesetResolver,
  HandLandmarker,
  HandLandmarkerOptions,
} from "@mediapipe/tasks-vision";

const createHandLandmarker = async (
  handLandmarkerOptions: HandLandmarkerOptions
) => {
  try {
    // Load the vision tasks fileset resolver
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    );

    // Create a hand landmarker instance with specified options
    const handLandmarker = await HandLandmarker.createFromOptions(
      vision,
      handLandmarkerOptions
    );

    // Return the created hand landmarker instance
    return handLandmarker;
  } catch (error) {
    console.error("Error initializing HandLandmarker:", error);
  }
};

export default createHandLandmarker;
