import * as THREE from 'three';
import { useEffect, useRef, useState } from "react";
import { getTurtleLines, initScene, startAnimation, startStationary, stopAnimation } from "../script/logic";

const Drawing = ({
  draw,
  str
}) => {
  const canvasWrapperRef = useRef(null);
  const rendererRef = useRef(null);

  const [ rotating, setRotating ] = useState(false);
  const [ mag, setMag ] = useState(10);

  const incMag = () => {
    setMag(mag + 2);
  };

  const decMag = () => {
    setMag(mag == 2 ? 2 : mag - 2);
  };

  useEffect(() => {
    if (rendererRef.current) return;

    const canvas_wrapper = canvasWrapperRef.current;
    if (!canvas_wrapper) return;
    
    const width = canvas_wrapper.offsetWidth;
    const height = canvas_wrapper.offsetHeight;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    rendererRef.current = renderer;

    const el = renderer.domElement;
    el.style.width = "100%";
    canvas_wrapper.appendChild(el);
  }, [canvasWrapperRef]);

  useEffect(() => {
    const renderer = rendererRef.current;
    if (!renderer) return;

    setRotating(false);
    stopAnimation();

    const lines = getTurtleLines(str, draw);
    initScene(lines, mag);

    startStationary(renderer);
  }, [draw, str, rendererRef, mag]);

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
    <>
      <div
        ref={canvasWrapperRef}
        style={{
          width: "100%",
          height: "800px",
          border: "1px solid black",
          position: "relative"
        }}
      >
        <div
          className="flex-col"
          style={{
            position: "absolute",
            background: "white",
            margin: "6px",
            padding: "6px",
            borderRadius: "4px"
          }}
        >
          <div
            className="flex-row"
            style={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <div className="text">
              Rotate
            </div>
            <input
              type="checkbox"
              checked={rotating}
              onChange={toggleRotating}
            />
          </div>

          <div
            className="flex-row"
            style={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <div className="text">
              Mag
            </div>
            <button
              onClick={incMag}
              style={{ borderRadius: "50%", height: "20px", width: "20px", padding: "0px" }}
            >
              +
            </button>
            <button
              onClick={decMag}
              style={{ borderRadius: "50%", height: "20px", width: "20px", padding: "0px" }}
            >
              -
            </button>
          </div>

        </div>
      </div>
    </>
  )
};

export default Drawing;