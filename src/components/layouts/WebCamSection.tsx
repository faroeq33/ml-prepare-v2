import Webcam from "react-webcam";
// import createHandLandmarker from "../../utils/createHandLandmarker";
import useCaptureLandmarks from "../../hooks/useCaptureLandmarks";
import { usePose } from "../../context/usePose";
import ThemeButton from "../vendor/ThemeButton";
import useDrawingUtil from "../../hooks/useDrawingUtil";

const videoConstraints = {
  width: 480,
  height: 270,
  facingMode: "user",
};

function WebcamSection() {
  const { webcamRef, canvasRef } = usePose();

  // const videoElement = useRef(null);
  useCaptureLandmarks();
  const { toggleDraw, drawing } = useDrawingUtil();

  // useEffect(() => {
  //   // If the camera is turned off in the meantime, turn off drawing as well
  //   if (showVideo === false && drawing === true) {
  //     toggleDraw();
  //   }
  // }, [showVideo, toggleDraw, drawing]);

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
