import { useState } from "react";
import { getNext } from "./ok";

const Form = ({
  strs,
  setStrs,
  rules,
  setRules,
  drawInstr,
  setDrawInstr
}) => {
  const [ rulesStr, setRulesStr ] = useState(JSON.stringify(rules));

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

  const handleBaseUpdate = (new_base) => {
    setStrs({
      ptr: 0,
      cache: [new_base]
    })
  };

  const handleRulesSubmit = () => {
    try {
      const new_rules = JSON.parse(rulesStr);
      console.log({new_rules})
      setRules(new_rules);
      setStrs({
        ptr: 0,
        cache: [ strs.cache[0] ]
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}> 
      <div style={{ display: "flex", gap: "8px" }}> 
        <div>
          Base
        </div>
        <input
          value={strs.cache[0]}
          onChange={e => handleBaseUpdate(e.target.value)}
        />
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <div>
          Depth
        </div>
        <button onClick={handleDecDepth}>
          -
        </button>
        <button onClick={handleIncDepth}>
          +
        </button>
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <div>
          Rules
        </div>
        <input
          value={rulesStr}
          onChange={e => setRulesStr(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleRulesSubmit();
            }
          }}
        />
      </div>
    </div>
  );
};

export default Form;