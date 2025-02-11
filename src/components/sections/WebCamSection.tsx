import useCaptureLandmarks from "@/hooks/useCaptureLandmarks";
import useDrawingUtil from "@/hooks/useDrawingUtil";
import Webcam from "react-webcam";
import ThemeButton from "../ui/buttons/ThemeButton";
import usePose from "@/context/usePose";

const videoConstraints = {
  width: 480,
  height: 270,
  facingMode: "user",
};

function WebcamSection() {
  const { webcamRef, canvasRef } = usePose();

  useCaptureLandmarks();
  const { toggleDraw, drawing } = useDrawingUtil();

  return (
    <>
      <div className="container">
        <section className="videosection">
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
