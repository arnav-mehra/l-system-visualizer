import React, { useEffect, useState } from 'react'
import { Button } from 'antd';
import TextArea from 'antd/es/input/TextArea';

import { FRACTAL_PLANT_CODE, FRACTAL_TREE_CODE, KOCH_CURVE_CODE, SIERPINSKI_TRI_CODE } from '../script/defaults';
import { evalCode } from '../script/dsl';
import DocModal, { drawInfo, systemInfo } from '../DocModal';

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
                    <Button onClick={_ => setDefault(FRACTAL_TREE_CODE)}>
                        Fractal Tree
                    </Button>
                    <Button onClick={_ => setDefault(KOCH_CURVE_CODE)}>
                        Koch Curve
                    </Button>
                    <Button onClick={_ => setDefault(SIERPINSKI_TRI_CODE)}>
                        Sierpinski Triangle
                    </Button>
                    <Button onClick={_ => setDefault(FRACTAL_PLANT_CODE)}>
                        Fractal Plant
                    </Button>
                </div>
            </div>

            <div className="light-divider" />

            <div className="flex-row">
                <div className="text form-label">
                    <span style={{ marginRight: 8 }}>
                        System
                    </span>
                    <DocModal info={systemInfo}/>
                </div>
                <div className="flex-col" style={{ width: "100%" }}>
                    <TextArea
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
                    <span style={{ marginRight: 8 }}>
                        Draw
                    </span>
                    <DocModal info={drawInfo}/>
                </div>
                <div className="flex-col" style={{ width: "100%" }}>
                    <TextArea
                        value={drawCode}
                        onChange={e => setDrawCode(e.target.value)}
                        rows={`${drawCode.split("\n").length}`}
                        style={{ fontFamily: "Lucida Console" }}
                        spellCheck="false"
                    />
                    <Button onClick={onSave}>
                        Save Code
                    </Button>
                </div>
            </div>
        </>
    )
}

export default CodeForm