import { getNext } from "../script/logic";
import JsonEditor from "./JsonEditor";
import Drawer from "../Drawer";

const LSysForm = ({
    strs,
    setStrs,
    rules,
    setRules
}) => {
    const handleIncStep = () => {
        const new_cache = strs.ptr === strs.cache.length - 1
            ? [...strs.cache, getNext(strs.cache[strs.ptr], rules)]
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

    const handleAxiomUpdate = (new_axiom) => {
        setStrs({
            ptr: 0,
            cache: [new_axiom]
        })
    };

    return (
        <Drawer
            label="L-System"
            startOpen={true}
        >
            <div className="flex-row">
                <div className="text form-label">
                    Axiom
                </div>
                <input
                    style={{ width: "16px", textAlign: "center" }}
                    value={strs.cache[0]}
                    onChange={e => handleAxiomUpdate(e.target.value)}
                />
            </div>

            <div className="light-divider" />

            <JsonEditor
                obj={rules}
                label="Rules"
                onSubmit={(new_rules) => {
                    setRules(new_rules);
                    setStrs({
                        ptr: 0,
                        cache: [strs.cache[0]]
                    });
                }}
            />

            <div className="light-divider" />

            <div className="flex-row">
                <div className="text form-label">
                    Step
                </div>
                <div className="flex-row">
                    <button
                        onClick={handleDecStep}
                        className="blue"
                    >
                        -
                    </button>

                    <div className="text">
                        {strs.ptr}
                    </div>

                    <button
                        onClick={handleIncStep}
                        className="blue"
                    >
                        +
                    </button>
                </div>
            </div>

            <div className="light-divider" />

            <div className="flex-row">
                <div className="text form-label">
                    L-String
                </div>
                <div
                    className="text"
                    style={{
                        maxWidth: "calc(100% - 120px)",
                        maxHeight: "90px",
                        overflow: "hidden"
                    }}
                >
                    {strs.cache[strs.ptr]}
                </div>
            </div>
        </Drawer>
    );
};

export default LSysForm;