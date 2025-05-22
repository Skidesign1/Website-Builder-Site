import React, { useState } from "react";
import TextToolbar from "./subTools";

const Toolbar = () => {
    const [tabBar, setTabBar] = useState("Style");

    const handleTabClick = (tabName) => {
        console.log(`Tab clicked: ${tabName}`);
        setTabBar(tabName);
    };

    return (
        <div className="flex flex-col items-center pb-3 bg-white px-1">
            {/* Ensure this div takes full width to allow justify-between to work */}
            <div className="flex justify-around border-b  text-base  border-gray-200 w-full">
                <p
                    onClick={() => handleTabClick("Style")}
                    className={`cursor-pointer ${tabBar === "Style" ? "text-blue-600 border-b-2 border-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600 hover:border-b-2 border-blue-600/0 transition-colors duration-200"}`}
                >
                    Style
                </p>
                <p
                    onClick={() => handleTabClick("Setting")}
                    className={`cursor-pointer  ${tabBar === "Setting" ? "text-blue-600 border-b-2 border-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600 hover:border-b-2 border-blue-600/0 transition-colors duration-200"}`}
                >
                    Setting
                </p>
                <p
                    onClick={() => handleTabClick("Routes")}
                    className={`cursor-pointer ${tabBar === "Routes" ? "text-blue-600 border-b-2 border-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600 hover:border-b-2 border-blue-600/0 transition-colors duration-200"}`}
                >
                    Routes
                </p>
            </div>


            <TextToolbar />
        </div>
    );
};

export default Toolbar;