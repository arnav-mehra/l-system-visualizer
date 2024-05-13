import { useState } from "react";
import { getNext } from "./ok";
import JsonEditor from "./JsonEditor";

const Form = ({
  strs,
  setStrs,
  rules,
  setRules,
  drawInstrs,
  setDrawInstrs,
  drawInitCtx,
  setDrawInitCtx
}) => {
  const handleIncDepth = () => {
    const new_cache = strs.ptr === strs.cache.length - 1
      ? [ ...strs.cache, getNext(strs.cache[strs.ptr], rules) ]
      : strs.cache;
    setStrs({
      ptr: strs.ptr + 1,
      cache: new_cache
    });
  };

  const handleDecDepth = () => {
    if (strs.ptr !== 0) {
      setStrs({
        ...strs,
        ptr: strs.ptr - 1
      });
    }
  };

  const handleAxiomUpdate = (new_base) => {
    setStrs({
      ptr: 0,
      cache: [new_base]
    })
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}> 
      <h3>L-System</h3>
      
      <div style={{ display: "flex", gap: "8px" }}> 
        <div>
          Axiom
        </div>
        <input
          value={strs.cache[0]}
          onChange={e => handleAxiomUpdate(e.target.value)}
        />
      </div>

      <JsonEditor
        obj={rules}
        label="Rules"
        onSubmit={(new_rules) => {
          setRules(new_rules);
          setStrs({
            ptr: 0,
            cache: [ strs.cache[0] ]
          });
        }}
      />

      <div style={{ display: "flex", gap: "8px" }}>
        <div>
          Depth
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={handleDecDepth}>
            -
          </button>
          <div>
            {strs.ptr}
          </div>
          <button onClick={handleIncDepth}>
            +
          </button>
        </div>
      </div>

      <div style={{ width: "800px", overflowWrap: "break-word" }}>
        L-String: {strs.cache[strs.ptr]}
      </div>

      <h3>Drawing</h3>

      <JsonEditor
        obj={drawInitCtx}
        label="Init Context"
        onSubmit={(new_init_ctx) => {
          setDrawInitCtx(new_init_ctx);
        }}
      />

      <JsonEditor
        obj={drawInstrs}
        label="Instructions"
        onSubmit={(new_instrs) => {
          setDrawInstrs(new_instrs);
        }}
      />
    </div>
  );
};

export default Form;