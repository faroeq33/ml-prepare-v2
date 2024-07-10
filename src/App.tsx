import savePosesToFile from "./utils/savePosesToFile";
import { LabeledPose } from "./types/types";
import WebcamSection from "./components/layouts/WebCamSection";
import { useRef, useState } from "react";
import { usePose } from "./context/usePose";
import { NormalizedLandmark } from "@mediapipe/tasks-vision";
import ErrorTag from "./components/ErrorMessage";
import ThemeButton from "./components/ui/ThemeButton";

const App = () => {
  // for saving poses as json after capturing
  const { poseData } = usePose();

  const myPoses = useRef<LabeledPose[]>([]);

  // for displaying poses in the textarea
  const [poseOutput, setPoseOutput] = useState<string | null>(null);
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

    function convertPoseToVector(pose: NormalizedLandmark[]) {
      return pose
        .map((point) => {
          return [point.x, point.y]; //commented z because depth is not needed
        })
        .flat();
    }

    const labeledPose = {
      label: dataLabel,
      vector: convertPoseToVector(poseData[0]),
    };

    // for saving poses after capturing
    myPoses.current.push(labeledPose);

    setPoseOutput(JSON.stringify(myPoses.current, null, 2));
  };

  function clearErrors() {
    setErrorMessage("");
  }

  return (
    <div className="container mx-auto">
      <WebcamSection />
      {errorMessage.length > 0 && <ErrorTag message={errorMessage} />}

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

      <div>Saved poses: {myPoses.current.length || 0}</div>

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
