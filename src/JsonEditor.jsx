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
        <div style={{ display: "flex", gap: "8px" }}>
            <div>
                {label}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {objEnts.map(([ key, val ], i) => (
                    <div style={{ display: "flex", gap: "8px" }}>
                        <input
                            value={key}
                            onChange={e => {
                                objEnts[i] = [e.target.value, objEnts[i][1]];
                                setObjEnts([ ...objEnts ]);
                            }}
                        />
                        <div>{"=>"}</div>
                        <input
                            value={val}
                            onChange={e => {
                                objEnts[i] = [objEnts[i][0], e.target.value ];
                                setObjEnts([ ...objEnts ]);
                            }}
                        />
                        <button
                            onClick={() => {
                                objEnts.splice(i, 1);
                                setObjEnts([ ...objEnts ]);
                            }}
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
                    >
                        Add
                    </button>
                    
                    <button onClick={handleSubmit}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JsonEditor;