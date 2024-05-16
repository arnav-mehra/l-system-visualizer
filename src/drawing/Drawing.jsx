import { useEffect, useRef } from "react";
import { drawTurtleInstrs } from "../script/logic";
import Drawer from "../Drawer";

const Drawing = ({
  drawInstrs,
  drawInitCtx,
  str
}) => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = canvas.clientWidth * 3;
    canvas.height = canvas.clientHeight * 3;
    drawTurtleInstrs(canvas, str, drawInitCtx, drawInstrs);
  }, [drawInitCtx, drawInstrs, str, canvasRef]);

  return (
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
  )
};

export default Drawing;