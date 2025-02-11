import useCaptureLandmarks from "@/hooks/use-capture-landmarks";
import useDrawingUtil from "@/hooks/use-drawing-util";
import Webcam from "react-webcam";
import usePose from "@/context/use-pose";
import ThemeButton from "@/ui/buttons/ThemeButton";

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
