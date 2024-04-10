import {
  DrawingUtils,
  FilesetResolver,
  HandLandmarker,
} from "@mediapipe/tasks-vision";
import { useEffect, useRef, useState } from "react";

import Webcam from "react-webcam";

const videoConstraints = {
  width: 480,
  height: 270,
  facingMode: "user",
};
const App = () => {
  const landmarkerRef = useRef<HandLandmarker | null>(null);
  const canvasRef = useRef(null);
  const drawingUtilsRef = useRef(null);
  const [poseData, setPoseData] = useState([]);
  const [errorMesage, setErrorMessage] = useState("");

  const [labeledPose, setLabledPose] = useState({
    label: "untitled",
    vector: [1, 3, 4, 5],
  });

  const [label, setLabel] = useState("");
  const webcamRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    // write so it can only make 1 drawing util instance
    drawingUtilsRef.current = new DrawingUtils(ctx);
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
    // console.log("handled form");
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

    const labeledPose = {
      label: label, //
      vector: convertPoseToVector(poseData[0]),
    };

    setLabledPose(labeledPose);
    // saveCount();
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
        numHands: 2,
      });
      landmarkerRef.current = handLandmarker;
      console.log("handlandmarker is created!");
      // start capturing - zie hieronder
      capture();
    };
    createHandLandmarker();
  }, []);

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

  return (
    <div>
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

      <div className="div">My label : {label}</div>
      <input
        type="text"
        name="label"
        placeholder="say label here"
        onChange={(e) => {
          setLabel(e.currentTarget.value);
        }}
      />
      <button type="submit" id="captureHandPose" onClick={onCapturePose}>
        Capture Hand Pose
      </button>

      <textarea>{JSON.stringify(labeledPose)}</textarea>

      {/* {JSON.stringify(poseData[0])} */}

      {/* <button id="savePosesButton" onClick={onSavePoses}>
        Save Poses
      </button>
      <button id="showPoses" onClick={showData}>
        Show Poses
      </button>
*/}
      <div id="errors">{errorMesage}</div>
    </div>
  );
};

export default App;
