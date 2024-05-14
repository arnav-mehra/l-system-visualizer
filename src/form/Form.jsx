import { getNext } from "../script";
import JsonEditor from "./JsonEditor";
import InstrEditor from "./InstrsEditor";
import Drawer from "../Drawer";

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
  const handleIncStep = () => {
    const new_cache = strs.ptr === strs.cache.length - 1
      ? [ ...strs.cache, getNext(strs.cache[strs.ptr], rules) ]
      : strs.cache;
    setStrs({
      ptr: strs.ptr + 1,
      cache: new_cache
    });
  };

  const handleDecStep = () => {
    if (strs.ptr !== 0) {
      setStrs({
        ...strs,
        ptr: strs.ptr - 1
      });
    }
  };

  const handleAxiomUpdate = (new_axiom) => {
    setStrs({
      ptr: 0,
      cache: [ new_axiom ]
    })
  };

  return (
    <>
      <div className="divider"/>

      <Drawer
        label="L-System"
        startOpen={true}
      >
        <div className="divider"/>
        
        <div className="flex-row"> 
          <div className="text form-label">
            Axiom
          </div>
          <input
            style={{ width: "16px", textAlign: "center" }}
            value={strs.cache[0]}
            onChange={e => handleAxiomUpdate(e.target.value)}
          />
        </div>

        <div className="divider"/>

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

        <div className="divider"/>

        <div className="flex-row">
          <div className="text form-label">
            Step
          </div>
          <div className="flex-row">
            <button
              onClick={handleDecStep}
              className="blue"
            >
              -
            </button>
            <div className="text">
              {strs.ptr}
            </div>
            <button
              onClick={handleIncStep}
              className="blue"
            >
              +
            </button>
          </div>
        </div>

        <div className="divider"/>

        <div className="flex-row">
          <div className="text form-label">
            L-String
          </div>
          <div
            className="text"
            style={{ overflowWrap: "break-word", maxWidth: "calc(100% - 120px)" }}
          >
            {strs.cache[strs.ptr]}
          </div>
        </div>
      </Drawer>

      <div className="divider"/>

      <Drawer
        label="Drawing Procedure"
        startOpen={false}
      >
        <div className="divider"/>

        <JsonEditor
          obj={drawInitCtx}
          label="Init Context"
          onSubmit={(new_init_ctx) => {
            setDrawInitCtx(new_init_ctx);
          }}
        />

        <div className="divider"/>

        <InstrEditor
          obj={drawInstrs}
          label="Instructions"
          onSubmit={(new_instrs) => {
            setDrawInstrs(new_instrs);
          }}
        />
      </Drawer>

      <div className="divider"/>
    </>
  );
};

export default Form;