import * as THREE from 'three';
import { useEffect, useRef } from "react";
import { drawLinesThreeJs, getTurtleLines } from "../script/logic";
import Drawer from "../Drawer";

const Drawing = ({
  drawInstrs,
  drawInitCtx,
  str
}) => {
  const canvasWrapperRef = useRef();
  const rendererRef = useRef();

  useEffect(() => {
    if (rendererRef.current) return;
    
    const canvas_wrapper = canvasWrapperRef.current;
    if (!canvas_wrapper) return;
    
    const width = canvas_wrapper.offsetWidth;
    const height = canvas_wrapper.offsetHeight;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    canvas_wrapper.appendChild(renderer.domElement);

    rendererRef.current = renderer;
  }, []);

  useEffect(() => {
    const renderer = rendererRef.current;
    if (!renderer) return;

    const lines = getTurtleLines(str, drawInitCtx, drawInstrs);
    drawLinesThreeJs(renderer, lines);
  }, [drawInitCtx, drawInstrs, str, canvasWrapperRef]);

  return (
    <Drawer
      label="Drawing"
      startOpen={true}
    >
      <div
        ref={canvasWrapperRef}
        style={{
          width: "100%",
          height: "800px",
          border: "1px solid black"
        }}
      >
      </div>
    </Drawer>
  )
};

export default Drawing;