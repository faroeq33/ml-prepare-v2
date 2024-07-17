import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import { z } from "zod";

export const initialize = async (
  handLandmarkerOptions: HandLandmarkerSettings
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

export const getDefaultSettings = (): HandLandmarkerSettings => {
  const settings = localStorage.getItem("handLandMarkerOptions");

  // if settings exist in local storage, parse and return them otherwise return default settings
  if (settings) {
    return JSON.parse(settings);
  }
  return {
    baseOptions: {
      modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
      delegate: "GPU",
    },
    minTrackingConfidence: 0.5,
    minHandDetectionConfidence: 0.5,
    minHandPresenceConfidence: 0.5,
    runningMode: "VIDEO",
    numHands: 1,
  };
};

const confidenceRange = () => {
  return z.coerce.number().min(0.0).max(1).optional();
};

// The formschema is used to configure handLandmarker settings
export const HandLandmarkerSettingsSchema = z.object({
  baseOptions: z.object({
    modelAssetPath: z.string().url().optional(),
    delegate: z.enum(["GPU", "CPU"]).optional(),
  }),
  minTrackingConfidence: confidenceRange(),
  minHandDetectionConfidence: confidenceRange(),
  minHandPresenceConfidence: confidenceRange(),
  runningMode: z.enum(["VIDEO", "IMAGE"]).optional(),
  numHands: z.coerce.number().min(1).max(2).optional(),
});

export type HandLandmarkerSettings = z.infer<
  typeof HandLandmarkerSettingsSchema
>;
