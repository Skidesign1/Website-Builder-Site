import React, { useState } from "react";
import { FaBold, FaItalic, FaUnderline, FaAlignLeft, FaAlignCenter, FaAlignRight } from "react-icons/fa";

const Styles = () => {
    const [alignment, setAlignment] = useState("left");

    return (
        <div className="bg-white text-sm max-w-[400px] mx-auto">
            {/* Text Alignment */}
            <div className="flex justify-center gap-2 mt-3">
                <button
                    className={`p-2 w-10 rounded ${alignment === "center" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setAlignment("center")}
                >
                    <FaAlignCenter />
                </button>
                <button
                    className={`p-2 w-10 rounded ${alignment === "center" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setAlignment("center")}
                >
                    <FaAlignCenter />
                </button>
                <button
                    className={`p-2 w-10 rounded ${alignment === "center" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setAlignment("center")}
                >
                    <FaAlignCenter />
                </button>
                <button
                    className={`p-2 w-10 rounded ${alignment === "right" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setAlignment("right")}
                >
                    <FaAlignRight />
                </button>

            </div>
        </div>
    );
};

export default Styles;
