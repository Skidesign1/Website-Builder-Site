import React, { useState } from "react";

const Styles = () => {
    const [headingType, setHeadingType] = useState(null); 
    const [elementType, setElementType] = useState(null); 
    const [iconType, setIconType] = useState(null);     
    const [uiElementType, setUiElementType] = useState(null); 

    return (
        <div className="bg-white text-sm max-w-[400px] mx-auto p-4">
       <div className="flex mb-4 text-xl">
        <p>List Of Objects</p>
       </div>
            {/* Heading Type */}
            <div className="flex justify-center gap-5 mb-3">
                <button
                    className={`p-2 w-10 text-sm rounded ${headingType === "h1" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-blue-300"}`}
                    onClick={() => setHeadingType("h1")}
                >
                    h1
                </button>
                <button
                    className={`p-2 w-10 text-sm rounded ${headingType === "h2" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-blue-300"}`}
                    onClick={() => setHeadingType("h2")}
                >
                    h2
                </button>
                <button
                    className={`p-2 w-10 text-sm rounded ${headingType === "p1" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-blue-300"}`}
                    onClick={() => setHeadingType("p1")}
                >
                    p1
                </button>
             
            </div>

            {/* Element Type */}
            <div className="flex justify-center gap-5 mb-3">
                <button
                    className={`p-2 w-10  text-sm rounded ${elementType === "button" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-blue-300"}`}
                    onClick={() => setElementType("button")}
                >
                    btn
                </button>
                <button
                    className={`p-2 w-10 text-sm rounded ${elementType === "img1" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-blue-300"}`}
                    onClick={() => setElementType("img1")}
                >
                    img1
                </button>
                <button
                    className={`p-2 w-10 text-sm rounded ${elementType === "video" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-blue-300"}`}
                    onClick={() => setElementType("video")}
                >
                    vid
                </button>
               
            </div>

            {/* Icon Type */}
            <div className="flex justify-center gap-4 mb-3">
                <button
                    className={`p-2 w-12 text-sm text-sm rounded ${iconType === "icon" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-blue-300"}`}
                    onClick={() => setIconType("icon")}
                >
                    icon
                </button>
                <button
                    className={`p-2 w-10 text-sm rounded ${iconType === "audio" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-blue-300"}`}
                    onClick={() => setIconType("audio")}
                >
                    aud
                </button>
                <button
                    className={`p-2 w-10 text-sm rounded ${iconType === "Canvas" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-blue-300"}`}
                    onClick={() => setIconType("Canvas")}
                >
                    BG
                </button>
             
            </div>

            {/* UI Element Type */}
            <div className="flex justify-center ml-10px gap-5">
                <button
                    className={`p-2 w-10 text-sm rounded ${uiElementType === "Button" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-blue-300"}`}
                    onClick={() => setUiElementType("Button")}
                >
                    Btn
                </button>
                <button
                    className={`p-2 w-10 text-sm  rounded ${uiElementType === "image" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-blue-300"}`}
                    onClick={() => setUiElementType("image")}
                >
                    img
                </button>
                <button
                    className={`p-2 w-10 text-sm rounded ${uiElementType === "Canvas" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-blue-300"}`}
                    onClick={() => setUiElementType("Canvas")}
                >
                    BG
                </button>
             
            </div>
        </div>
    );
};

export default Styles;