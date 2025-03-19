import React, { useState } from "react";
import { FaBold, FaItalic, FaUnderline, FaAlignLeft, FaAlignCenter, FaAlignRight } from "react-icons/fa";

const Styles = () => {
    const [text, setText] = useState("Heading 1");
    const [font, setFont] = useState("Archivo Black");
    const [size, setSize] = useState(72);
    const [weight, setWeight] = useState("Regular");
    const [alignment, setAlignment] = useState("left");

    return (
        <div className="bg-white border-b p-3 text-sm">
            {/* Style Section */}
            <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-gray-600">Style</label>
                <button className="text-blue-500 underline text-xs">Edit</button>
            </div>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="max-w-full border p-1 text-3xl outline-blue-300 rounded font-bold"
            />

            {/* Font Section */}
            <div className="mt-3">
                <label className="block text-sm font-semibold text-gray-600">Font</label>
                <p className="text-gray-700 pt-2">{font}</p>
            </div>

            {/* Size & Weight */}
            <div className="flex justify-between items-center mt-3">
                <select className="p-1 text-xs" value={weight} onChange={(e) => setWeight(e.target.value)}>
                    <option>Regular</option>
                    <option>Bold</option>
                    <option>Light</option>
                </select>
                <input
                    type="number"
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="w-12 p-1 text-xs text-center border"
                />
            </div>

            {/* Formatting Buttons */}
            <div className="flex gap-1 mt-3">
                <button className="p-2 w-10 cursor-pointer bg-gray-200"><FaBold /></button>
                <button className="p-2 w-10 cursor-pointer bg-gray-200"><FaItalic /></button>
                <button className="p-2 w-10 cursor-pointer bg-gray-200"><FaUnderline /></button>
                <button className="p-2 w-10 cursor-pointer font-bold bg-gray-200">UP</button>
                <div className="p-2 w-10 bg-orange-600 text-white text-center">C</div>
            </div>

            {/* Text Alignment */}
            <div className="flex gap-1 mt-3">
                <button
                    className={`p-2 w-10 ${alignment === "left" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setAlignment("left")}
                >
                    <FaAlignLeft />
                </button>
                <button
                    className={`p-2 w-10 ${alignment === "center" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setAlignment("center")}
                >
                    <FaAlignCenter />
                </button>
                <button
                    className={`p-2 w-10 ${alignment === "right" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setAlignment("right")}
                >
                    <FaAlignRight />
                </button>
            </div>
        </div>
    );
};

export default Styles;
