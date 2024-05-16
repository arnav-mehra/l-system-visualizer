import { useEffect, useState } from "react";

const JsonEditor = ({
    obj,
    label,
    onSubmit
}) => {
    const [ objEnts, setObjEnts ] = useState([]);

    useEffect(() => {
        setObjEnts(
            Object
                .entries(obj)
                .map(([key, val]) => ([
                    key,
                    val instanceof Array ? "[" + val.toString() + "]"
                        : typeof val === "string" ? "\"" + val + "\""
                        : val
                ]))
        );
    }, [obj]);

    const handleSubmit = () => {
        const new_obj_ents = objEnts.map(([ key, val ]) => {
            try {
                return [ key, eval(val) ];
            }
            catch (err) {
                alert("Invalid entry value: " + val);
                return [ key, obj[key] || 0 ];
            }
        });
        const new_obj = Object.fromEntries(new_obj_ents);
        onSubmit(new_obj);
    };

    return (
        <div className="flex-row">
            <div className="text form-label">
                {label}
            </div>

            <div className="flex-col">
                {objEnts.map(([ key, val ], i) => (
                    <div className="flex-row" key={key}>
                        <input
                            // style={{ width: "16px", textAlign: "center" }}
                            value={key}
                            onChange={e => {
                                objEnts[i] = [ e.target.value, objEnts[i][1] ];
                                setObjEnts([ ...objEnts ]);
                            }}
                        />
                        
                        <div className="text">
                            &rarr;
                        </div>

                        <input
                            value={val}
                            onChange={e => {
                                objEnts[i] = [ objEnts[i][0], e.target.value ];
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