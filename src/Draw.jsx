import { useEffect, useRef } from "react";

const Draw = ({
  drawInstr,
  str
}) => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    /** @type { CanvasRenderingContext2D } */
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log({ctx});

    // for (const ch of str) {
    //   drawInstr.
    // }
    // ctx.lineTo()
  }, [drawInstr, str])

  return (
    <canvas
      ref={canvasRef}
    />
  )
};

export default Draw;