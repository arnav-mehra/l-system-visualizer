import * as THREE from 'three';
import { useEffect, useRef, useState } from "react";
import { getTurtleLines, initScene, startAnimation, startStationary, stopAnimation } from "../script/logic";
import Drawer from "../Drawer";

const Drawing = ({
  drawInstrs,
  drawInitCtx,
  str
}) => {
  const canvasWrapperRef = useRef(null);
  const rendererRef = useRef(null);
  const [ rotating, setRotating ] = useState(false);

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
  }, [canvasWrapperRef]);

  useEffect(() => {
    const renderer = rendererRef.current;
    if (!renderer) return;

    setRotating(false);
    stopAnimation();

    const lines = getTurtleLines(str, drawInitCtx, drawInstrs);
    initScene(lines);

    startStationary(renderer);
  }, [drawInitCtx, drawInstrs, str, rendererRef]);

  const toggleRotating = () => {
    const renderer = rendererRef.current;
    if (!renderer) return;

    if (rotating) {
      stopAnimation();
      startStationary(renderer);
    } else {
      startAnimation(renderer);
    }
    setRotating(!rotating);
  }

  return (
    <Drawer
      label="Drawing"
      startOpen={true}
    >
      <div
        style={{
          background: "white",
          margin: "4px",
          padding: "4px",
          borderRadius: "4px",
          display: "flex",
        }}
      >
        <div>
          Rotate
        </div>
        <input
          type="checkbox"
          checked={rotating}
          onChange={toggleRotating}
        />
      </div>

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