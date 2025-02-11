import { NormalizedLandmark } from "@mediapipe/tasks-vision";

export default function convertPoseToVector(
  pose: NormalizedLandmark[]
): number[] {
  return pose
    .map((point) => {
      return [point.x, point.y]; //commented z because depth is not needed
    })
    .flat();
}
