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

function WebcamLayout() {
  const [poseData, setPoseData] = useState([]);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const drawingUtilsRef = useRef(null);
  const landmarkerRef = useRef<HandLandmarker | null>(null);
  // const enableCam = () => {
  //   if (!props.landmarker) {
  //     setErrorMessage("Wait! HandLandmarker not loaded yet.");
  //     return;
  //   }
  //   setWebcamRunning(!webcamRunning);
  // };

  // canvasCtx.save();
  // canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  // if (results && results.landmarks) {
  //   for (const landmarks of results.landmarks) {
  //     drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
  //       color: "#00FF00",
  //       lineWidth: 5,
  //     });
  //     drawLandmarks(canvasCtx, landmarks, {
  //       color: "#FF0o000",
  //       lineWidth: 1,
  //     });
  //   }
  // }
  // canvasCtx.restore();

  // if (webcamRunning) {
  //   requestAnimationFrame(predictWebcam);
  // }
  // };
  // Als posedatai is veranderd wordt de code aangeroepen

  const capture = async () => {
    const landmarker = landmarkerRef.current;
    const webcamCanvas = webcamRef.current.getCanvas("2d");
    if (landmarker && webcamCanvas) {
      const video = webcamRef.current.video;
      if (video.currentTime > 0) {
        const result = await landmarker.detectForVideo(
          video,
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
    const ctx = canvasRef.current.getContext("2d");
    // write so it can only make 1 drawing util instance
    drawingUtilsRef.current = new DrawingUtils(ctx);
  }, []);
  // laad het landmarker model in de landmarkerRef
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
      landmarkerRef.current = handLandmarker;
      console.log("handlandmarker is created!");
      // start capturing - zie hieronder
      capture();
    };
    createHandLandmarker();
    //...
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    if (drawingUtilsRef.current) {
      ctx.clearRect(0, 0, 480, 270);
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

  return (
    <>
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

      {/* <div className="controls">
        <button id="webcamButton" onClick={enableCam}>
          {webcamRunning ? "DISABLE PREDICTIONS" : "ENABLE PREDICTIONS"}
        </button>
      </div> */}
    </>
  );
}

export default WebcamLayout;
