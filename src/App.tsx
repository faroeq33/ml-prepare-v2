import {
  DrawingUtils,
  FilesetResolver,
  HandLandmarker,
} from "@mediapipe/tasks-vision";
import { useEffect, useRef, useState } from "react";

import Webcam from "react-webcam";
import MyButton from "./vendor/MyButton";
import savePosesToFile from "./utils/savePosesToFile";

const videoConstraints = {
  width: 480,
  height: 270,
  facingMode: "user",
};

const myPoses = [];

const App = () => {
  const landmarkerRef = useRef<HandLandmarker | null>(null);
  const canvasRef = useRef(null);
  const drawingUtilsRef = useRef(null);

  // For incoming data
  const [poseData, setPoseData] = useState([]);

  const [errorMesage, setErrorMessage] = useState("");

  const [label, setLabel] = useState("");
  const [poseOutput, setPoseOutput] = useState("");
  const webcamRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    // write so it can only make 1 drawing util instance
    // drawingUtilsRef.current = new DrawingUtils(ctx);
    if (!drawingUtilsRef.current) {
      drawingUtilsRef.current = new DrawingUtils(ctx);
      console.log("DrawingUtils created");
      console.log(drawingUtilsRef.current);
    }
  }, []);
  // laad het landmarker model in de landmarkerRef

  useEffect(() => {
    const canvasContext = canvasRef.current.getContext("2d");
    if (drawingUtilsRef.current) {
      canvasContext.clearRect(0, 0, 480, 270);
      for (const hand of poseData) {
        drawingUtilsRef.current.drawConnectors(
          hand,
          HandLandmarker.HAND_CONNECTIONS,
          { color: "#00FF00", lineWidth: 5 }
        );
        drawingUtilsRef.current.drawLandmarks(hand, {
          radius: 4,
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

    // console.log(poseData[0]);
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
    if (label === "") {
      const errorMessage = "Label is empty!";
      setErrorMessage(errorMessage);
      console.error(errorMessage);
      return;
    }
    const labeledPose = {
      label: label, //
      vector: convertPoseToVector(poseData[0]),
    };

    myPoses.push(labeledPose);

    setPoseOutput(JSON.stringify(myPoses));

    saveCount();

    // setLabledPose([...labeledPose, labeledPose]);
  };

  const capture = async () => {
    if (landmarkerRef.current && webcamRef.current.getCanvas("2d")) {
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

  useEffect(() => {
    const createHandLandmarker = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
      );
      const handLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        numHands: 1,
      });
      if (!landmarkerRef.current) {
        console.log("something");
        landmarkerRef.current = handLandmarker;
        console.log("handlandmarker is created!");
      }
      // start capturing - zie hieronder
    };
    createHandLandmarker().then(() => {
      capture();
    });
  }, []);

  const saveCount = () => {
    if (poseData.length === 0) {
      console.warn("'myPoses' is empty. Please capture a pose first.");
    }
    console.log("saveCount");
    // Update saveCount in the UI
  };

  const showData = () => {
    console.log("showData is called");
    // Update poseOutput in the UI
  };

  function clearErrors() {
    setErrorMessage("");
  }

  return (
    <div className="container mx-auto">
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
      <div id="errors" className="" style={{ color: "red" }}>
        {errorMesage}
      </div>
      {/* <div className="div"></div>
      <input type="text" name="label" required placeholder="say label here" /> */}
      <div>
        <label
          htmlFor="label"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          My label : {label}
        </label>
        <div className="relative mt-2">
          <input
            type="text"
            name="label"
            id="name"
            className="peer block w-full border-0 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder={"Enter label"}
            onChange={(e) => {
              setLabel(e.currentTarget.value);
              setErrorMessage("");
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
            aria-hidden="true"
          />
        </div>
      </div>

      <MyButton type="submit" onClick={onCapturePose}>
        Capture Hand Pose
      </MyButton>

      {myPoses.length > 0 && (
        <div className="wrapper max-w-lg">{poseOutput}</div>
      )}

      <MyButton
        onClick={() => {
          savePosesToFile(myPoses);
        }}
      >
        Export poses in Json 💾
      </MyButton>

      {/* <MyButton onClick={showData}>Show Poses </MyButton> */}
    </div>
  );
};

export default App;
