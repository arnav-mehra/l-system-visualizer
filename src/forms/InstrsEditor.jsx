import { useState } from "react";
import { Instr, InstrTypes } from "../script/logic";
import InstrEditor from "./InstrEditor";

const InstrsEditor = ({
    obj,
    label,
    onSubmit
}) => {
    const [objEnts, setObjEnts] = useState(Object.entries(obj));

    const handleSubmit = () => {
        const new_obj = Object.fromEntries(objEnts);
        onSubmit(new_obj);
    };

    const handleAddEnt = () => {
        setObjEnts([ ...objEnts, [ "", [] ] ]);
    };

    return (
        <div className="flex-row">
            <div className="text form-label">
                {label}
            </div>

            <div className="flex-col">
                {objEnts.map(([key, instr_arr], ent_idx) => (
                    <div
                        className="flex-row"
                        style={{ alignItems: "start" }}
                        key={key}
                    >
                        <input
                            style={{ width: '16px', textAlign: "center" }}
                            value={key}
                            onChange={e => {
                                objEnts[ent_idx] = [e.target.value, objEnts[ent_idx][1]];
                                setObjEnts([...objEnts]);
                            }}
                        />

                        <div className="text">
                            &rarr;
                        </div>

                        <div className="flex-col">
                            {instr_arr.map((instr, instr_idx) => (
                                <InstrEditor
                                    key={instr.type + ":" + instr.fn_str + ":" + instr_idx}
                                    instr={instr}
                                    setInstr={(new_type, new_fn_str) => {
                                        const new_action = new Instr(new_type, new_fn_str);
                                        if (!new_action.fn) {
                                            return;
                                        }
                                        objEnts[ent_idx][1][instr_idx] = new_action;
                                        setObjEnts([ ...objEnts ]);
                                    }}
                                    delInstr={_ => {
                                        objEnts[ent_idx][1].splice(instr_idx, 1);
                                        setObjEnts([ ...objEnts ]);
                                    }}
                                />
                            ))}

                            <div className="flex-row">
                                <button
                                    onClick={_ => {
                                        objEnts[ent_idx][1] = [
                                            ...objEnts[ent_idx][1],
                                            new Instr(InstrTypes.PUSH_CTX, "null")
                                        ];
                                        setObjEnts([ ...objEnts ]);
                                    }}
                                    className="green"
                                >
                                    Add
                                </button>

                                <button
                                    onClick={_ => {
                                        objEnts.splice(ent_idx, 1);
                                        setObjEnts([ ...objEnts ]);
                                    }}
                                    className="red"
                                >
                                    Delete
                                </button>
                            </div>
                            
                            <div className="light-divider"/>
                        </div>
                    </div>
                ))}

                <div className="flex-row">
                    <button 
                        onClick={handleAddEnt}
                        className="green"
                    >
                        Add
                    </button>

                    <button 
                        onClick={handleSubmit}
                        className="blue"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InstrsEditor;