import { DrawingUtils, HandLandmarker } from "@mediapipe/tasks-vision";
import { useEffect, useRef, useState } from "react";

import Webcam from "react-webcam";
import ThemeButton from "./vendor/ThemeButton";
import savePosesToFile from "./utils/savePosesToFile";
import createHandLandmarker from "./utils/createHandLandmarker";
import ErrorTag from "./components/ErrorMessage";
import { LabeledPose } from "./types/types";

const App = () => {
  const landmarkerRef = useRef<HandLandmarker | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingUtilsRef = useRef<DrawingUtils | null>(null);

  // for saving poses after capturing
  const myPoses = useRef<LabeledPose[]>([]);

  const videoConstraints = {
    width: 480,
    height: 270,
    facingMode: "user",
  };

  // For incoming data
  const [poseData, setPoseData] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  const [dataLabel, setLabel] = useState("");
  const [poseOutput, setPoseOutput] = useState(null); // find out what type this should be
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    // initialize DrawingUtils

    const ctx = canvasRef.current.getContext("2d");
    if (!drawingUtilsRef.current) {
      drawingUtilsRef.current = new DrawingUtils(ctx);
      console.log("DrawingUtils created");
      // console.log(drawingUtilsRef.current);
    }
  }, []);

  useEffect(() => {
    const initializeHandLandmarker = async () => {
      try {
        const handLandMarker = await createHandLandmarker();
        if (!landmarkerRef.current) {
          console.log("something");
          landmarkerRef.current = handLandMarker;
          console.log("handlandmarker is created!");
        }
        capture();
      } catch (error) {
        console.error("Error initializing HandLandmarker:", error);
      }
    };

    initializeHandLandmarker();
  }, []);

  useEffect(() => {
    const canvasContext = canvasRef.current.getContext("2d");
    if (drawingUtilsRef.current) {
      // erase the previous frame
      canvasContext.clearRect(0, 0, 480, 270);

      // Draw connectors between hand landmarks
      for (const hand of poseData) {
        drawingUtilsRef.current.drawConnectors(
          hand,
          HandLandmarker.HAND_CONNECTIONS,
          { color: "#00FF00", lineWidth: 3 }
        );
        // Draw landmarks of the hand
        drawingUtilsRef.current.drawLandmarks(hand, {
          radius: 2,
          color: "#FF0000",
          lineWidth: 2,
        });
      }
    }
  }, [poseData]);

  const onCapturePose = () => {
    clearErrors();
    console.log("handled form");

    if (!poseData) {
      setErrorMessage(
        "Turn on your webcam to detect your hand pose and click the button again."
      );
      return;
    }

    console.log(poseData[0]);
    function convertPoseToVector(pose) {
      return pose
        .map((point) => {
          return [point.x, point.y, point.z];
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

    myPoses.current.push(labeledPose);

    setPoseOutput(JSON.stringify(myPoses.current, null, 2));

    saveCount();

    // setLabledPose([...labeledPose, labeledPose]);
  };

  const capture = async () => {
    if (landmarkerRef.current && webcamRef.current.getCanvas()) {
      if (webcamRef.current.video.currentTime > 0) {
        const result = await landmarkerRef.current.detectForVideo(
          webcamRef.current.video,
          performance.now()
        );
        if (result.landmarks) {
          setPoseData(result.landmarks);
        }
      }
    }
    requestAnimationFrame(capture);
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
      <section className="videosection">
        {/* <Coordinates poseData={poseData} /> */}
        <Webcam
          width={videoConstraints.width}
          height={videoConstraints.height}
          mirrored={true}
          id="webcam"
          audio={false}
          videoConstraints={videoConstraints}
          ref={webcamRef}
        />
        <canvas
          ref={canvasRef}
          width={videoConstraints.width}
          height={videoConstraints.height}
        ></canvas>
      </section>
      {/* <WebcamLayout poseData={poseData} setPoseData={setPoseData} /> */}
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
