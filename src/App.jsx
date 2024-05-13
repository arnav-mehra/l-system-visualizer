import { useState } from 'react';
import { DEF_DRAW_INSTRS, DEF_STRS, DEF_RULES, DEF_DRAW_INIT_CTX } from './ok';
import Draw from './Draw';
import Form from './Form';
import './App.css';

const App = () => {
  const [ strs, setStrs ] = useState(DEF_STRS);
  const [ rules, setRules ] = useState(DEF_RULES);
  const [ drawInstrs, setDrawInstrs ] = useState(DEF_DRAW_INSTRS);
  const [ drawInitCtx, setDrawInitCtx ] = useState(DEF_DRAW_INIT_CTX);

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
        drawInstrs={drawInstrs}
        setDrawInstrs={setDrawInstrs}
        drawInitCtx={drawInitCtx}
        setDrawInitCtx={setDrawInitCtx}
      />

      <Draw
        drawInstrs={drawInstrs}
        drawInitCtx={drawInitCtx}
        str={strs.cache[strs.ptr]}
      />
    </div>
  );
};

export default App;