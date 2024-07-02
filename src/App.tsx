import { NormalizedLandmark } from "@mediapipe/tasks-vision";

import ThemeButton from "./components/vendor/ThemeButton";
import savePosesToFile from "./utils/savePosesToFile";
import ErrorTag from "./components/ErrorMessage";
import { LabeledPose } from "./types/types";
import WebcamSection from "./components/layouts/WebCamSection";
import { useRef, useState } from "react";

const App = () => {
  // for saving poses as json after capturing
  const myPoses = useRef<LabeledPose[]>([]);

  // for displaying poses in the textarea
  const [poseOutput, setPoseOutput] = useState<string | null>(null);

  // For incoming data
  const [poseData, setPoseData] = useState<NormalizedLandmark[][]>([]);

  const [errorMessage, setErrorMessage] = useState("");

  const [dataLabel, setLabel] = useState("");

  const onCapturePose = () => {
    clearErrors();
    console.log("handled form");

    if (!poseData) {
      setErrorMessage(
        "Turn on your webcam to detect your hand pose and click the button again."
      );
      return;
    }

    function convertPoseToVector(pose) {
      return pose
        .map((point) => {
          return [point.x, point.y]; //commented z because depth is not needed
        })
        .flat();
    }

    if (!poseData[0]) {
      const errorMessage = "Turn on cam and raise a hand!";
      setErrorMessage(errorMessage);
      console.error(errorMessage);
      return;
    }
    // console.log(poseData[0]);
    if (dataLabel === "") {
      const errorMessage = "Label is empty!";
      setErrorMessage(errorMessage);
      console.error(errorMessage);
      return;
    }
    const labeledPose = {
      label: dataLabel, //
      vector: convertPoseToVector(poseData[0]),
    };

    // for saving poses after capturing
    myPoses.current.push(labeledPose);

    setPoseOutput(JSON.stringify(myPoses.current, null, 2));

    saveCount();
  };

  const saveCount = () => {
    if (poseData.length === 0) {
      console.warn("'myPoses' is empty. Please capture a pose first.");
    }
    console.log("saveCount");
    // Update saveCount in the UI
  };

  function clearErrors() {
    setErrorMessage("");
  }

  return (
    <div className="container mx-auto ">
      <WebcamSection poseData={poseData} setPoseData={setPoseData} />
      {/* Your JSX content here */}
      {errorMessage.length > 0 && <ErrorTag message={errorMessage} />}

      {/* <div className="div"></div>
      <input type="text" name="label" required placeholder="say label here" /> */}
      <div>
        <label
          htmlFor="dataLabel"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          My label : {dataLabel}
        </label>
        <div className="mt-2 ">
          <input
            type="text"
            name="dataLabel"
            id="dataLabel"
            className="peer block w-full border-0 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder={"Enter label"}
            onChange={(e) => {
              setLabel(e.currentTarget.value);
            }}
          />
          <div
            className="border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
            aria-hidden="true"
          />
        </div>
      </div>

      <ThemeButton type="submit" onClick={onCapturePose}>
        Capture Hand Pose
      </ThemeButton>

      {myPoses.current.length > 0 && (
        <textarea
          className="w-full overflow-x-scroll"
          rows={10}
          value={poseOutput}
          readOnly
        />
      )}

      <ThemeButton
        onClick={() => {
          if (myPoses.current.length === 0) {
            const errorMsg = "'myPoses' is empty. Please capture a pose first.";
            setErrorMessage(errorMsg);
            console.warn(errorMsg);
            return;
          }

          savePosesToFile(myPoses.current);
        }}
      >
        Export poses in Json 💾
      </ThemeButton>
    </div>
  );
};

export default App;
