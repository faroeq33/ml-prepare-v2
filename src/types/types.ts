import { NormalizedLandmark } from "@mediapipe/tasks-vision";

export type LabeledPose = {
  label: string;
  vector: number[];
};
export type PoseData = NormalizedLandmark[][];

export type SinglePose = NormalizedLandmark[];
