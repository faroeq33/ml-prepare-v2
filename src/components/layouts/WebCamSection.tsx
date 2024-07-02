import { HandLandmarker, NormalizedLandmark } from "@mediapipe/tasks-vision";
import { useEffect, useRef } from "react";
import Webcam from "react-webcam";
import createHandLandmarker from "../../utils/createHandLandmarker";

type WebcamSectionProps = {
  setPoseData: React.Dispatch<React.SetStateAction<NormalizedLandmark[][]>>;
  poseData: NormalizedLandmark[][];
  canvasRef: React.RefObject<HTMLCanvasElement>;
  // drawing: boolean;
};

function WebcamSection({ setPoseData, canvasRef }: WebcamSectionProps) {
  // canvasref for drawing the landmarks on the canvas
  const webcamRef = useRef<Webcam | null>(null);

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
  }, [setPoseData]);

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
