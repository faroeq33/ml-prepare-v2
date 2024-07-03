import { DrawingUtils, HandLandmarker } from "@mediapipe/tasks-vision";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePose } from "../context/PoseContext";

function useDrawingUtil() {
  const { poseData, canvasRef } = usePose();
  const [drawing, setDrawing] = useState(true);
  // drawingutils for drawing the landmarks on the canvas

  const drawingUtilsRef = useRef<DrawingUtils | null>(null);

  const initializeDrawingUtils = useCallback(() => {
    const ctx = canvasRef.current.getContext("2d");
    if (!drawingUtilsRef.current) {
      drawingUtilsRef.current = new DrawingUtils(ctx);
      console.log("DrawingUtils created");
    }
  }, [canvasRef, drawingUtilsRef]);

  const clearDrawingUtils = useCallback(() => {
    if (drawingUtilsRef.current) {
      drawingUtilsRef.current.close();
      drawingUtilsRef.current = null;
      const canvasContext = canvasRef.current.getContext("2d");
      canvasContext.clearRect(0, 0, 480, 270);
    }
  }, [canvasRef, drawingUtilsRef]);

  useEffect(() => {
    initializeDrawingUtils();
    return () => clearDrawingUtils();
  }, [drawing, clearDrawingUtils, initializeDrawingUtils]);

  const draw = useCallback(() => {
    // if (poseData.length === 0) {
    //   return;
    // }
    if (drawingUtilsRef.current) {
      // erase the previous frame
      const canvasContext = canvasRef.current.getContext("2d");
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
  }, [poseData, canvasRef, drawingUtilsRef]);

  function toggleDraw() {
    setDrawing((prevState) => !prevState);
  }

  useEffect(() => {
    if (drawing) {
      draw();
    } else {
      clearDrawingUtils();
    }
  }, [poseData, draw, drawing, clearDrawingUtils]);

  return { drawing, toggleDraw };
}

export default useDrawingUtil;
