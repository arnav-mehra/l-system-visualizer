import { Button, Checkbox, Switch } from "antd";
import { getNext } from "../script/logic";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import Paragraph from "antd/es/typography/Paragraph";
import { useState } from "react";

const StepForm = ({
    strs,
    setStrs,
    system
}) => {
    const handleIncStep = () => {
        const new_cache = strs.ptr === strs.cache.length - 1
            ? [...strs.cache, getNext(strs.cache[strs.ptr], system.rules)]
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

    const [ellipsis, setEllipsis] = useState(true);

    return (
        <>
            <div className="flex-row">
                <div className="text form-label">
                    Step
                </div>
                <div className="flex-row" style={{ alignItems: "center" }}>
                    <Button
                        onClick={handleDecStep}
                        type="primary"
                        ghost
                        icon={<MinusOutlined />}
                        shape="circle"
                    />

                    <div className="text">
                        {strs.ptr}
                    </div>

                    <Button
                        onClick={handleIncStep}
                        type="primary"
                        danger
                        ghost
                        icon={<PlusOutlined />}
                        shape="circle"
                    />

                    <Paragraph type="danger" style={{ margin: 0 }}>
                        Do not spam +, your computer will SUFFER.  
                    </Paragraph>
                </div>
            </div>

            <div className="light-divider" />

            <div className="flex-row">
                <div className="text form-label">
                    String
                    <div>
                        <span style={{ marginRight: 8, fontSize: 14 }}>
                            Hide Full
                        </span>
                        <Checkbox
                            checked={ellipsis}
                            onChange={_ => setEllipsis(!ellipsis)}
                        />
                    </div>
                </div>
                <div
                    className="text"
                    style={{
                        maxWidth: "calc(100% - 120px)"
                    }}
                >
                    <Paragraph
                        ellipsis={{
                            rows: 3,
                            expanded: !ellipsis
                        }}
                        style={{ margin: 0 }}
                    >
                        {strs.cache[strs.ptr]}
                    </Paragraph>
                </div>

            </div>
        </>
    );
};

export default StepForm;