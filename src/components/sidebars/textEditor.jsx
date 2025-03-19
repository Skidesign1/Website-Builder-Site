import React, { useState } from "react";
import Styles from "./subs/stylesSection";
import HyperlinkOptions from "./subs/hyperlinkSection";
import Toolbar from "./subs/head";
import ResponsiveSection from "./subs/responsiveSection";
const TextEditor = () => {
    return (
        <div className=" bg-white h-full">

            {/* Section Tabs */}
            <Toolbar />
            {/* responsive section */}
            <ResponsiveSection />
            {/* Style Section */}
            <Styles />
            {/* Link Input */}
            <HyperlinkOptions />

        </div >
    );
};

export default TextEditor;
