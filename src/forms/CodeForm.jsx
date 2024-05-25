import React, { useEffect, useState } from 'react'
import { Button } from 'antd';
import TextArea from 'antd/es/input/TextArea';

import { DEFAULT_LIST } from '../script/defaults';
import { evalCode } from '../script/dsl';
import DocModal, { drawInfo, systemInfo } from '../DocModal';

const CodeForm = ({
    onSubmit
}) => {
    const [systemCode, setSystemCode] = useState("");
    const [drawCode, setDrawCode] = useState("");

    useEffect(() => {
        setDefault(DEFAULT_LIST[0].code);
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

                <div className="flex-row" style={{ width: "100%", flexWrap:"wrap" }}>
                    {DEFAULT_LIST.map(x => (
                        <Button
                            onClick={_ => setDefault(x.code)}
                            key={x.label}
                        >
                            {x.label}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="light-divider" />

            <div className="flex-row">
                <div className="text form-label">
                    <span style={{ marginRight: 6 }}>
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
                    <span style={{ marginRight: 6 }}>
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