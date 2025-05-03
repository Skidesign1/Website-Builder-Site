import React from 'react';
import { useState } from 'react';

const ResponsiveSection = () => {
    const [width, setWidth] = useState(495);
    const [top, setTop] = useState(-613);
    const [left, setLeft] = useState(0);
    const [bottom, setBottom] = useState(0);
    const [right, setRight] = useState(645);
    const [layout, setLayout] = useState("Fixed");



    return (
        <div className='container mx-auto border-b'>
            <div className="flex gap-10 border-b border-t p-5 items-center gap-2 text-sm">
                <div className='flex gap-2 cursor-pointer'><span className='font-bold'>W</span>
                    <input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} className="w-12 text-sm" /></div>

                <select value={layout} onChange={(e) => setLayout(e.target.value)} className="cursor-pointer w-16 font-bold text-sm">
                    <option>Fixed</option>
                    <option>Responsive</option>
                </select>
            </div>
            <div className="grid font-bold place-items-center  p-3 grid-cols-2 text-xs gap-2">
                <label>T <input type="number" value={top} onChange={(e) => setTop(Number(e.target.value))} className="w-14 cursor-pointer  p-1  text-sm" /></label>
                <label>B <input type="number" value={bottom} onChange={(e) => setBottom(Number(e.target.value))} className="w-14 cursor-pointer  p-1 rounded text-sm" /></label>
                <label>L <input type="number" value={left} onChange={(e) => setLeft(Number(e.target.value))} className="w-14 p-1 cursor-pointer rounded text-sm" /></label>
                <label>R <input type="number" value={right} onChange={(e) => setRight(Number(e.target.value))} className="w-14 cursor-pointer  p-1  text-sm" /></label>
            </div>
        </div>
    );
};

export default ResponsiveSection;