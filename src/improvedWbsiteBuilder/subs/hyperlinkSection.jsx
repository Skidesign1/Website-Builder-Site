import { useState } from "react";
import { Link, List, Play } from "lucide-react";

const HyperlinkOptions = () => {
    const [textShadow, setTextShadow] = useState(false);
    const [animation, setAnimation] = useState(false);
    const [cssClassOpen, setCssClassOpen] = useState(false);
    const [hideOnDevicesOpen, setHideOnDevicesOpen] = useState(false);

    return (
        <div className="bg-white text-sm">
            <div className="p-3 px-5 flex items-center justify-between border-b">
                <span className="text-gray-600 overline">A</span>
                <span className="text-gray-600">1.1</span>
                <span className="text-gray-600">|A|</span>
                <span className="text-gray-600">0</span>
            </div>

            <div className="flex border-b px-5 p-3 items-center justify-between">
                <span className="text-gray-600 font-semibold">List</span>
                <div className="flex">
                    <button className="p-1 px-2 border hover:bg-gray-200"><List size={16} /></button>
                    <button className="p-1 px-2 border hover:bg-gray-200"><List size={16} /></button>
                </div>
            </div>
            <div className="px-4 p-3 border-b">
                <div className="flex items-center text-gray-600 hover:text-black space-x-2">
                    <Link size={16} />
                    <span>Hyperlink</span>
                </div>
                <p className="text-gray-400 text-xs">Click to enter address</p>
            </div>

            <div className="space-y-2">
                <label className="flex px-4 p-3 border-b items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={textShadow} onChange={() => setTextShadow(!textShadow)} />
                    <span>Text Shadow</span>
                </label>

                <label className="flex border-b px-4 p-3 items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={animation} onChange={() => setAnimation(!animation)} />
                    <span>Animation</span>
                </label>

                <button
                    onClick={() => setCssClassOpen(!cssClassOpen)}
                    className="flex border-b px-3 p-3 items-center w-full text-left text-gray-600 hover:text-black"
                >
                    <Play /> CSS Class
                </button>

                <button
                    onClick={() => setHideOnDevicesOpen(!hideOnDevicesOpen)}
                    className="flex px-3 p-3 items-center w-full text-left text-gray-600 hover:text-black"
                >
                    <Play /> Hide On Devices
                </button>
            </div>
        </div>
    );
};

export default HyperlinkOptions;
