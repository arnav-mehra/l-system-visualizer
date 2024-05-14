import React, { useState } from 'react';

const Drawer = ({
    label,
    startOpen,
    children
}) => {
    const [ isOpen, setIsOpen ] = useState(startOpen);

    return (
        <div className="flex-col">
            <div
                className="flex-row"
                style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%"
                }}
            >
                <h3>
                    {label}
                </h3>

                <button 
                    style={{ borderRadius: "50%", width: "34px", height: "34px" }}
                    onClick={_ => setIsOpen(!isOpen)}
                >
                    {isOpen ? "\\/" : "/\\"}
                </button>
            </div>

            {isOpen &&
                children
            }
        </div>
    );
};

export default Drawer;