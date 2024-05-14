import React, { useState } from 'react';
import { InstrTypes } from '../script';

const InstrEditor = ({
    instr,
    setInstr,
    delInstr
}) => {
    const [ fnStrForm, setFnStrForm ] = useState(instr.fn_str);
    const [ typeForm, setTypeForm ] = useState(instr.type);

    return (    
        <div className="flex-row">
            <select
                value={typeForm}
                onChange={e => setTypeForm(e.target.value)}
            >
                {Object.entries(InstrTypes).map(([type_enum, type]) => (
                    <option value={type}>{type_enum}</option>
                ))}
            </select>

            <textarea
                style={{ width: "300px" }}
                value={fnStrForm}
                onChange={e => setFnStrForm(e.target.value)}
            />

            <button
                onClick={_ => setInstr(typeForm, fnStrForm)}
                className="blue"
            >
                Save
            </button>

            <button
                onClick={delInstr}
                className="red"
            >
                Delete
            </button>
        </div>
    );
};

export default InstrEditor;