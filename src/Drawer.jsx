import React, { useState } from 'react';

const Drawer = ({
    label,
    startOpen,
    children
}) => {
    const [ isOpen, setIsOpen ] = useState(startOpen);

    return (
        <div className="flex-col">
            <div className="divider"/>

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

            {isOpen && (
                <div
                    className="flex-col"
                    style={{ margin: "0 16px" }}
                >
                    <div className="light-divider"/>
                    {children}
                    <div className="light-divider"/>
                </div>
            )}

            {/* <div className="divider"/> */}
        </div>
    );
};

export default Drawer;