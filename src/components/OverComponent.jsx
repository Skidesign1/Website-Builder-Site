import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import final from './lib/db';

const OverComponent = ({ name }) => {
    const divRef = React.useRef(null);

    // Find the current component based on the name
    let current = final.find(map => map.id === name);

    // State to manage the visibility of the delete icon
    const [isSelected, setIsSelected] = useState(false);

    // Handle click to toggle selection
    const handleClick = () => {
        setIsSelected((prev) => !prev); // Toggle the selected state
    };

    console.log(current);

    if (name === current.id) {
        return (
            <div
                ref={divRef}
                style={{ top: "0px", position: "relative", width: "100%" }}
                className="overstyle"
                onClick={handleClick} // Set component as selected when clicked
            >
                <div className="relative min-w-full">
                    {current.component}
                </div>
            </div>
        );
    } else {
        return (
            <div
                ref={divRef}
                style={{
                    position: "absolute",
                    width: "50%",
                    top: "83px",
                    zIndex: '10',
                    height: "435px",
                    backgroundColor: "darkblue",
                    color: "white",
                }}
                className="overstyle"
                onClick={handleClick} // Set component as selected when clicked
            >
                <h1>{name}</h1>
            </div>
        );
    }
};

export default OverComponent;
