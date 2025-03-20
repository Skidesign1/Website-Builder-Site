import React from 'react';
import { NavLink } from "react-router-dom";
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import final from './lib/db';

const OverComponent = ({ name }) => {
    const divRef = React.useRef(null);
    let current = final.find(map => map.id === name)

    const handleClick = () => {
        divRef.current.remove();
    };
    console.log(name)

    if (name === current.id) {
        return (
            <div ref={divRef} style={{ position: "absolute", width: '50%', top: "0px", height: "6rem", backgroundColor: "blue" }} className='overstyle'>
                <i className='fa fa-times' onClick={handleClick} style={{ position: "absolute", top: "0px", right: "40px" }}></i>
                <h1>{name}</h1>
                {/* <div className="hidden md:flex space-x-6">
                    <NavLink to="navbar-home">Home</NavLink>
                    <NavLink to="navbar-about">About</NavLink>
                    <NavLink to="navbar-services">Services</NavLink>
                    <NavLink to="navbar-contact">Contact</NavLink>
                </div> */}
                {current.component}
            </div>
        );
    } else {
        return (
            <div ref={divRef} style={{ position: "absolute", width: "50%", top: "83px", height: "435px", backgroundColor: "darkblue", color: "white" }} className='overstyle'>
                <i className='fa fa-times' onClick={handleClick} style={{ position: "absolute", top: "0px", right: "40px" }}></i>
                <h1>{name}</h1>
            </div>
        );
    }
};

export default OverComponent;
