import {
  FilesetResolver,
  HandLandmarker,
  HandLandmarkerOptions,
} from "@mediapipe/tasks-vision";
import React, { useState, useEffect } from "react";
import WebcamLayout from "./layouts/WebcamLayout";

const App = () => {
  const [handLandmarker, setHandLandmarker] = useState<
    HandLandmarker | undefined
  >();
  const [results, setResults] = useState(undefined);
  const [myPoses, setMyPoses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // const onCapturePose = () => {
  //   if (!results) {
  //     setErrorMessage(
  //       "The 'results' global variable is not set yet. Turn on your webcam to detect your hand pose and click the button again."
  //     );
  //     return;
  //   }

  //   const labeledPose = {
  //     label: getLabelValue(), //
  //     vector: convertPoseToVector(results.landmarks[0]),
  //   };

  //   setMyPoses([...myPoses, labeledPose]);
  //   saveCount();
  // };

  // const onSavePoses = () => {
  //   savePosesToFile();
  // };

  // const saveCount = () => {
  //   if (myPoses.length === 0) {
  //     console.warn("'myPoses' is empty. Please capture a pose first.");
  //   }
  //   console.log("saveCount");
  //   // Update saveCount in the UI
  // };

  // const showData = () => {
  //   console.log("showData is called");
  //   // Update poseOutput in the UI
  // };

  // const savePosesToFile = () => {
  //   const currentdate = new Date();
  //   const datetime =
  //     currentdate.getDate() +
  //     "-" +
  //     (currentdate.getMonth() + 1) +
  //     "-" +
  //     currentdate.getFullYear() +
  //     "@" +
  //     currentdate.getHours() +
  //     "h" +
  //     currentdate.getMinutes() +
  //     "m" +
  //     currentdate.getSeconds() +
  //     "s";

  //   const finalPoses = JSON.stringify({ data: myPoses }, null, 2);
  //   const blob = new Blob([finalPoses], { type: "application/json" });
  //   const url = URL.createObjectURL(blob);
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = `poses-${datetime}.json`;
  //   link.click();
  //   URL.revokeObjectURL(url);
  // };

  // const getLabelValue = () => {
  //   const labelValue = document.getElementById("poseLabel").value;
  //   if (!labelValue) {
  //     setErrorMessage("Please enter a label for the pose");
  //     return;
  //   }
  //   return labelValue;
  // };

  return (
    <div>
      <WebcamLayout />
      {/* Your JSX content here */}

      {/* <button id="captureHandPose" onClick={onCapturePose}>
        Capture Hand Pose
      </button>
      <button id="savePosesButton" onClick={onSavePoses}>
        Save Poses
      </button>
      <button id="showPoses" onClick={showData}>
        Show Poses
      </button>
      <div id="errors">{errorMessage}</div> */}
    </div>
  );
};

export default App;
