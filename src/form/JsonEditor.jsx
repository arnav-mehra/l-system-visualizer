import { useState } from "react";

const JsonEditor = ({
    obj,
    label,
    onSubmit
}) => {
    const [ objEnts, setObjEnts ] = useState(Object.entries(obj));

    const handleSubmit = () => {
        const new_obj = Object.fromEntries(objEnts);
        onSubmit(new_obj);
    };

    return (
        <div className="flex-row">
            <div className="text form-label">
                {label}
            </div>

            <div className="flex-col">
                {objEnts.map(([ key, val ], i) => (
                    <div className="flex-row">
                        <input
                            // style={{ width: "16px", textAlign: "center" }}
                            value={key}
                            onChange={e => {
                                objEnts[i] = [ e.target.value, objEnts[i][1] ];
                                setObjEnts([ ...objEnts ]);
                            }}
                        />
                        
                        <div className="text">
                            {"=>"}
                        </div>

                        <input
                            value={
                                val instanceof Array ? "[" + val.toString() + "]"
                                : val instanceof String ? "\"" + val + "\""
                                : val.toString()
                            }
                            onChange={e => {
                                const val = eval(e.target.value);
                                objEnts[i] = [ objEnts[i][0], val ];
                                setObjEnts([ ...objEnts ]);
                            }}
                        />
                        <button
                            onClick={() => {
                                objEnts.splice(i, 1);
                                setObjEnts([ ...objEnts ]);
                            }}
                            className="red"
                        >
                            Delete
                        </button>
                    </div>
                ))}

                <div style={{ display: "flex", gap: "8px" }}>
                    <button
                        onClick={_ => {
                            setObjEnts([ ...objEnts, [ "", "" ] ]);
                        }}
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

export default JsonEditor;