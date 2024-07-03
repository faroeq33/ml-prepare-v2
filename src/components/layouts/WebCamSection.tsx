import Webcam from "react-webcam";
// import createHandLandmarker from "../../utils/createHandLandmarker";
import useCaptureLandmarks from "../../hooks/useCaptureLandmarks";
import { usePose } from "../../context/PoseContext";
import ThemeButton from "../vendor/ThemeButton";
import useDrawingUtil from "../../hooks/useDrawingUtil";

function WebcamSection() {
  const { webcamRef, canvasRef } = usePose();
  useCaptureLandmarks();
  const { toggleDraw, drawing } = useDrawingUtil();

  const videoConstraints = {
    width: 480,
    height: 270,
    facingMode: "user",
  };

  return (
    <>
      <div className="container">
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
        <div className="flex">
          <ThemeButton onClick={toggleDraw}>
            Draw Hands {drawing ? "🔴: on" : "⚫: off"}
          </ThemeButton>
        </div>
      </div>
    </>
  );
}

export default WebcamSection;
