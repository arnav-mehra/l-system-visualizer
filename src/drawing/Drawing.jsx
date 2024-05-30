import * as THREE from 'three';
import { useEffect, useRef, useState } from "react";
import { createCamera, getTurtleLines, initScene, setCameraAngle } from "../script/logic";
import { Button, Checkbox, Slider, Switch } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import useMag from './useMag';

let scene;
let camera;
let animRef;

const Drawing = ({
  draw,
  str
}) => {
  const canvasWrapperRef = useRef(null);
  const rendererRef = useRef(null);

  const [rotating, setRotating] = useState(false);
  const [angle, setAngle] = useState(0);

  const { MagCtrls, mag } = useMag();

  useEffect(() => {
    if (!camera) return;
    setCameraAngle(camera, angle);
    rendererRef.current.render(scene, camera);
  }, [angle]);

  const startRotating = () => {
    const animate = () => {
      animRef = requestAnimationFrame(animate);
      setAngle(a => (a + 1) % 360);
    };
    animate();

    setRotating(true);
  };

  const stopRotating = () => {
    if (animRef) {
      cancelAnimationFrame(animRef);
      animRef = null;
    }
    setRotating(false);
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
    if (!rendererRef.current) return;

    stopRotating();

    const lines = getTurtleLines(str, draw);
    scene = initScene(lines, mag);

    camera = createCamera(rendererRef.current, angle);
    setCameraAngle(camera, angle);

    rendererRef.current.render(scene, camera);
  }, [draw, str, rendererRef, mag]);

  const toggleRotating = () => {
    if (rotating) {
      stopRotating();
    } else {
      startRotating();
    }
  };

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
          className="flex-row"
          style={{
            position: "absolute",
            justifyContent: "space-between",
            width: "100%",
            gap: 0
          }}
        >
          <div
            className="flex-col"
            style={{
              background: "white",
              margin: "6px",
              padding: 6,
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

              <Switch
                checked={rotating}
                onChange={toggleRotating}
              />
            </div>

            <MagCtrls />
          </div>

          <div
            style={{
              height: 34,
              width: "100%",
              background: "white",
              borderRadius: 4,
              padding: "0px 10px",
              margin: 6
            }}
          >
            <Slider
              value={angle}
              onChange={setAngle}
              min={0}
              max={360}
              step={1}
            />
          </div>
        </div>
      </div>
    </>
  )
};

export default Drawing;