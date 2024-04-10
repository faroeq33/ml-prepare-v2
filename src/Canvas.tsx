import { useEffect, useRef } from "react";

export function Canvas(props: any) {
  // make ref to canvas

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvas = canvasRef!.current;
  const context = canvas.getContext("2d");

  useEffect(() => {
    if (!context || !canvas) return;
    context.fillRect(0, 0, props.width, props.height);

    const clickHandler = () => {
      context.fillStyle = "blue";
      context.fillRect(0, 0, props.width, props.height);
    };

    canvas.addEventListener("click", clickHandler);
    return () => {
      canvas?.removeEventListener("click", clickHandler);
    };
  }, [canvas, props.height, props.width, context]);
  return (
    <canvas
      ref={canvasRef}
      width={props.width}
      height={props.height}
      id="output_canvas"
    ></canvas>
  );
}
