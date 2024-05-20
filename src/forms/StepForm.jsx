import { getNext } from "../script/logic";

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

    return (
        <>
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
        </>
    );
};

export default StepForm;