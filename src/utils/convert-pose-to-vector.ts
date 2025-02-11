import { SinglePose } from "@/types/types";

function convertPoseToVector(pose: SinglePose): number[] {
  return pose
    .map((point) => {
      return [point.x, point.y]; //commented z because depth is not needed
    })
    .flat();
}

export default convertPoseToVector;
