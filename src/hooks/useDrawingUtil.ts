import usePose from "@/context/usePose";
import { DrawingUtils, HandLandmarker } from "@mediapipe/tasks-vision";
import { useCallback, useEffect, useRef, useState } from "react";

function useDrawingUtil() {
  const { poseData, canvasRef } = usePose();
  const [drawing, setDrawing] = useState(true);
  // drawingutils for drawing the landmarks on the canvas

  const drawingUtilsRef = useRef<DrawingUtils | null>(null);

  const initializeDrawingUtils = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx && !drawingUtilsRef.current) {
      drawingUtilsRef.current = new DrawingUtils(ctx);
      console.log("DrawingUtils created");
    }
  }, [canvasRef, drawingUtilsRef]);

  const clearScreen = useCallback(() => {
    canvasRef.current?.getContext("2d")?.clearRect(0, 0, 480, 270);
  }, [canvasRef]);

  const clearDrawingUtils = useCallback(() => {
    if (drawingUtilsRef.current) {
      drawingUtilsRef.current.close();
      drawingUtilsRef.current = null;
      clearScreen();

      // canvasRef.current?.getContext("2d")?.clearRect(0, 0, 480, 270);
    }
  }, [drawingUtilsRef, clearScreen]);

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
      clearScreen();

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
  }, [poseData, drawingUtilsRef, clearScreen]);

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
