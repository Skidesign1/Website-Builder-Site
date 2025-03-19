import React from "react";
import TextToolbar from "./subTools";

const Toolbar = () => {
    return (
        <div className="flex flex-col items-center pb-3 bg-white px-1">
            {/* Ensure this div takes full width to allow justify-between to work */}
            <div className="flex items-center justify-between w-full mb-2">
                <span className="text-2xl cursor-pointer text-gray-600">»</span>
                <button className="px-3 py-1 cursor-pointer font-semibold">Text</button>
                <button className="px-3 py-1 cursor-pointer font-semibold">Block</button>
                <button className="px-3 py-1 cursor-pointer font-semibold">Page</button>
            </div>
            <TextToolbar />
        </div>
    );
};

export default Toolbar;
