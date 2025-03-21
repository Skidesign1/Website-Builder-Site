
import React, { useState, useContext } from "react";
import { BlockContext } from "../../../context/miniNavContext";

const BlockHeader = () => {
    let { handleBlockNav } = useContext(BlockContext)

    return (

        <div className="p-3 grid grid-cols-2">
            {/* <span className="font-semibold text-gray-700">Home</span>
            <span className="text-gray-400 text-2xl ml-2 justify-self-end">&laquo;</span> */}
            <span className="font-semibold text-black">Blocks</span>
            <span onClick={handleBlockNav} className="text-gray-400 justify-self-end">components</span>
        </div>
    );
};

export default BlockHeader;
