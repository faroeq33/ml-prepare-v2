import {
  DrawingUtils,
  HandLandmarker,
  NormalizedLandmark,
} from "@mediapipe/tasks-vision";
import { useCallback, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import createHandLandmarker from "../../utils/createHandLandmarker";

type WebcamSectionProps = {
  setPoseData: React.Dispatch<React.SetStateAction<NormalizedLandmark[][]>>;
  poseData: NormalizedLandmark[][];
};

function WebcamSection({ poseData, setPoseData }: WebcamSectionProps) {
  // canvasref for drawing the landmarks on the canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const webcamRef = useRef<Webcam | null>(null);

  // drawingutils for drawing the landmarks on the canvas
  const drawingUtilsRef = useRef<DrawingUtils | null>(null);

  // Ref for landmarker in order to capture poses
  const landmarkerRef = useRef<HandLandmarker | null>(null);

  const videoConstraints = {
    width: 480,
    height: 270,
    facingMode: "user",
  };

  // for canceling the animation frame
  const requestIdRef = useRef<number | null>(null);

  useEffect(() => {
    // initialize DrawingUtils

    const ctx = canvasRef.current.getContext("2d");
    if (!drawingUtilsRef.current) {
      drawingUtilsRef.current = new DrawingUtils(ctx);
      console.log("DrawingUtils created");
      // console.log(drawingUtilsRef.current);
    }
  }, []);

  const draw = useCallback(() => {
    const canvasContext = canvasRef.current.getContext("2d");
    // if (poseData.length === 0) {
    //   return;
    // }
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

  useEffect(() => {
    draw();
  }, [poseData, draw]);

  useEffect(() => {
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
      requestIdRef.current = requestAnimationFrame(capture);
    };

    const initializeHandLandmarker = async () => {
      const handLandMarker = await createHandLandmarker({
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        numHands: 1,
      });
      if (!landmarkerRef.current) {
        console.log("something");
        landmarkerRef.current = handLandMarker;
        console.log("handlandmarker is created!");
      }
      // capture();
    };

    initializeHandLandmarker().then(capture).catch(console.error);

    // how do I know if my animationframe is running?
    return () => cancelAnimationFrame(requestIdRef.current);
  }, []);

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
    </>
  );
}

export default WebcamSection;
