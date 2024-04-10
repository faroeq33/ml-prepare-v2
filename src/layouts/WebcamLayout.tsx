import { useEffect, useRef } from "react";
import Webcam from "react-webcam";

type Params = {
  poseData;
  setPoseData;
  webcamRef;
};

const videoConstraints = {
  width: 480,
  height: 270,
  facingMode: "user",
};

function WebcamLayout(props: Params) {
  const canvasRef = useRef(null);

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
          ref={props.webcamRef}
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
