import { useEffect } from "react";

export function usePoseDebug(poseData) {
  // Posedata: array van handen. Hand: array van landmarks. Landmark: object met x,y,z
  useEffect(() => {
    if (poseData.length > 0) {
      const hand = poseData[0];
      // console.log(hand);
    }
  }, [poseData]);
}
