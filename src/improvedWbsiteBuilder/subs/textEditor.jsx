import React from "react";
import StyleEditorPanel from "../components/stylesSection";
import HyperlinkOptions from "./hyperlinkSection";
import Toolbar from "./head";
import ResponsiveSection from "./responsiveSection";
const TextEditor = () => {
    return (
        <div className="bg-[#2d2d2d] text-white h-screen p-4">

            {/* Section Tabs */}
            <Toolbar />

            <ResponsiveSection />
            {/* Style Section */}
            <StyleEditorPanel />
            {/* Link Input */}
            <HyperlinkOptions />

        </div >
    );
};

export default TextEditor;
