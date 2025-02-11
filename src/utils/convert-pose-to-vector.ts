import { NormalizedLandmark } from "@mediapipe/tasks-vision";

function convertPoseToVector(pose: NormalizedLandmark[]): number[] {
  return pose
    .map((point) => {
      return [point.x, point.y]; //commented z because depth is not needed
    })
    .flat();
}

export default convertPoseToVector;
