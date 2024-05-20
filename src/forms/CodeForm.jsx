import React, { useEffect, useState } from 'react'
import { FRACTAL_PLANT_CODE, FRACTAL_TREE_CODE, KOCH_CURVE_CODE, SIERPINSKI_TRI_CODE } from '../script/defaults';
import { evalCode } from '../script/dsl';

const CodeForm = ({
    onSubmit
}) => {
    const [systemCode, setSystemCode] = useState("");
    const [drawCode, setDrawCode] = useState("");

    useEffect(() => {
        setDefault(FRACTAL_TREE_CODE);
    }, []);

    const setCode = (system_code, draw_code) => {
        const res = evalCode(system_code, draw_code);
        if (!res) return;

        const [system, draw] = res;
        onSubmit(system, draw);
    };

    const setDefault = (def) => {
        setDrawCode(def.draw);
        setSystemCode(def.system);
        setCode(def.system, def.draw);
    };

    const onSave = () => {
        setCode(systemCode, drawCode);
    };

    return (
        <>
            <div className="flex-row">
                <div className="text form-label">
                    Defaults
                </div>
                <div className="flex-row">
                    <button onClick={_ => setDefault(FRACTAL_TREE_CODE)}>
                        Fractal Tree
                    </button>
                    <button onClick={_ => setDefault(KOCH_CURVE_CODE)}>
                        Koch Curve
                    </button>
                    <button onClick={_ => setDefault(SIERPINSKI_TRI_CODE)}>
                        Sierpinski Triangle
                    </button>
                    <button onClick={_ => setDefault(FRACTAL_PLANT_CODE)}>
                        Fractal Plant
                    </button>
                </div>
            </div>

            <div className="light-divider" />

            <div className="flex-row">
                <div className="text form-label">
                    System
                </div>
                <div className="flex-col" style={{ width: "100%" }}>
                    <textarea
                        value={systemCode}
                        onChange={e => setSystemCode(e.target.value)}
                        rows={`${systemCode.split("\n").length}`}
                        style={{ fontFamily: "Lucida Console" }}
                        spellCheck="false"
                    />
                </div>
            </div>

            {/* <div className="light-divider" /> */}

            <div className="flex-row">
                <div className="text form-label">
                    Draw
                </div>
                <div className="flex-col" style={{ width: "100%" }}>
                    <textarea
                        value={drawCode}
                        onChange={e => setDrawCode(e.target.value)}
                        rows={`${drawCode.split("\n").length}`}
                        style={{ fontFamily: "Lucida Console" }}
                        spellCheck="false"
                    />
                    <button onClick={onSave}>
                        Save Code
                    </button>
                </div>
            </div>
        </>
    )
}

export default CodeForm