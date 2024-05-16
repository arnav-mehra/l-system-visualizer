import { useEffect, useState } from 'react';
import { FRACTAL_PLANT, FRACTAL_TREE, KOCH_CURVE, SIERPINSKI_TRI } from './script/defaults';
import DrawInstrsForm from './forms/DrawInstrsForm';
import LSysForm from './forms/LSysForm';
import Drawing from './drawing/Drawing';
import './App.css';

const App = () => {
  const [ strs, setStrs ] = useState({ ptr: 0, cache: [""] });
  const [ rules, setRules ] = useState({});
  const [ drawInstrs, setDrawInstrs ] = useState({});
  const [ drawInitCtx, setDrawInitCtx ] = useState({});

  const setDefault = (def_obj) => {
    console.log({def_obj})
    setStrs({ ptr: 0, cache: [ def_obj.axiom ] });
    setRules({ ...def_obj.rules });
    setDrawInitCtx({ ...def_obj.draw_init_ctx });
    setDrawInstrs({ ...def_obj.draw_instrs });
  };

  useEffect(() => {
    setDefault(FRACTAL_TREE);
  }, []);

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

      <div className="flex-row" style={{ justifyContent: "center", alignItems: "center" }}>
        <div>
          Defaults:
        </div>
        <button onClick={_ => setDefault(FRACTAL_TREE)}>
          Fractal Tree
        </button>
        <button onClick={_ => setDefault(KOCH_CURVE)}>
          Koch Curve
        </button>
        <button onClick={_ => setDefault(SIERPINSKI_TRI)}>
          Sierpinski Triangle
        </button>
        <button onClick={_ => setDefault(FRACTAL_PLANT)}>
          Fractal Plant
        </button>
      </div>

      <LSysForm
        strs={strs}
        setStrs={setStrs}
        rules={rules}
        setRules={setRules}
      />

      <DrawInstrsForm
        drawInstrs={drawInstrs}
        setDrawInstrs={setDrawInstrs}
        drawInitCtx={drawInitCtx}
        setDrawInitCtx={setDrawInitCtx}
      />

      <Drawing
        drawInstrs={drawInstrs}
        drawInitCtx={drawInitCtx}
        str={strs.cache[strs.ptr]}
      />

      <div className="divider"/>
    </div>
  );
};

export default App;