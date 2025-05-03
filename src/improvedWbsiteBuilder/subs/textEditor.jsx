import React from "react";
import Styles from "./stylesSection";
import HyperlinkOptions from "./hyperlinkSection";
import Toolbar from "./head";
import ResponsiveSection from "./responsiveSection";
const TextEditor = () => {
    return (
        <div className=" bg-white h-screen overflow-auto">

            {/* Section Tabs */}
            <Toolbar />

            <ResponsiveSection />
            {/* Style Section */}
            <Styles />
            {/* Link Input */}
            <HyperlinkOptions />

        </div >
    );
};

export default TextEditor;
