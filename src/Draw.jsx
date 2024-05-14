import { useEffect, useRef } from "react";
import { drawTurtleInstrs } from "./script";
import Drawer from "./Drawer";

const Draw = ({
  drawInstrs,
  drawInitCtx,
  str
}) => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;

    canvas.width = canvas.clientWidth * 3;
    canvas.height = canvas.clientHeight * 3;
    drawTurtleInstrs(canvas, str, drawInitCtx, drawInstrs);
  }, [drawInitCtx, drawInstrs, str]);

  return (
    <>
      <Drawer
        label="Drawing"
        startOpen={true}
      >
        <canvas
          style={{
            width: "100%",
            height: "800px",
            border: "1px solid black"
          }}
          ref={canvasRef}
        />
      </Drawer>

      <div className="divider"/>
    </>
  )
};

export default Draw;