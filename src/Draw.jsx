import { useEffect, useRef } from "react";
import { drawTurtleInstrs } from "./ok";

const Draw = ({
  drawInstrs,
  drawInitCtx,
  str
}) => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvas_ctx = canvas.getContext("2d");
    canvas_ctx.lineWidth = "2";
    canvas_ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTurtleInstrs(canvas_ctx, str, drawInitCtx, drawInstrs);
  }, [drawInitCtx, drawInstrs, str]);

  return (
    <canvas
      width="2400"
      height="2400"
      style={{
        width: "800px",
        height: "800px",
        border: "1px solid black"
      }}
      ref={canvasRef}
    />
  )
};

export default Draw;