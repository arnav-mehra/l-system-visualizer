import { useState } from 'react';
import { getNext } from './ok';
import Draw from './Draw';
import './App.css';
import Form from './Form';

const App = () => {
  const [ strs, setStrs ] = useState({
    ptr: 0,
    cache: ["a"]
  });

  const [ rules, setRules ] = useState({
    "a": "ab",
    "b": "a"
  });

  const [ drawInstr, setDrawInstr ] = useState({
    base: {
      ctx: { len: 10, angle: 0 }
    },
    instr: {
      "a": {
        function: (ctx) => ([ "turn", ctx.angle ]),
        ctx: (ctx) => ({ ...ctx, len: ctx.len / 2 })
      },
      "b": {
        function: (ctx) => ([ "turn", ctx.angle ]),
        ctx: (ctx) => ({ ...ctx, len: ctx.len / 2 })
      }
    }
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100vw",
        gap: "20px",
        padding: "10px"
      }}
    >
      <Form
        strs={strs}
        setStrs={setStrs}
        rules={rules}
        setRules={setRules}
        drawInstr={drawInstr}
        setDrawInstr={setDrawInstr}
      />

      <div>
        {strs.cache[strs.ptr]}
      </div>

      <Draw
        drawInstr={drawInstr}
        str={strs.cache[strs.ptr]}
      />
    </div>
  );
};

export default App;