import JsonEditor from "./JsonEditor";
import InstrEditor from "./InstrsEditor";
import Drawer from "../Drawer";

const DrawInstrsForm = ({
  drawInstrs,
  setDrawInstrs,
  drawInitCtx,
  setDrawInitCtx
}) => {
  return (
    <Drawer
      label="Drawing Procedure"
      startOpen={false}
    >
      <JsonEditor
        obj={drawInitCtx}
        label="Init Context"
        onSubmit={(new_init_ctx) => {
          setDrawInitCtx(new_init_ctx);
        }}
      />

      <div className="light-divider"/>

      <InstrEditor
        obj={drawInstrs}
        label="Instructions"
        onSubmit={(new_instrs) => {
          setDrawInstrs(new_instrs);
        }}
      />
    </Drawer>
  );
};

export default DrawInstrsForm;