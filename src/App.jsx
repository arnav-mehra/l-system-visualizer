import { useState } from 'react';
import { Draw, System } from './script/dsl';
import CodeForm from './forms/CodeForm';
import StepForm from './forms/StepForm';
import Drawing from './drawing/Drawing';
import './App.css';

const App = () => {
  const [strs, setStrs] = useState({ ptr: 0, cache: [""] });
  const [system, setSystem] = useState(new System());
  const [draw, setDraw] = useState(new Draw());

  return (
    <div
      className="flex-col"
      style={{ margin: "10px" }}
    >
      <div style={{ textAlign: "center", width: "100%" }}>
        <h2>
          L-System Visualizer
        </h2>
        <h4>
          Arnav Mehra
        </h4>
      </div>

      <div className="light-divider" />

      <CodeForm
        onSubmit={(system, draw) => {
          setStrs({ ptr: 0, cache: [system.axiom] });
          setSystem(system);
          setDraw(draw);
        }}
      />

      <div className="light-divider" />

      <StepForm
        strs={strs}
        setStrs={setStrs}
        system={system}
      />

      <div className="light-divider" />

      <Drawing
        draw={draw}
        str={strs.cache[strs.ptr]}
      />

      <div className="divider" />
    </div>
  );
};

export default App;