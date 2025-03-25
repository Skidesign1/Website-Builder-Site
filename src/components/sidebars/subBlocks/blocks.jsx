import React, { useState } from 'react';
import ImageComponent from '../../dragableComponnents.jsx/img';
import Draggable from '../../Draggable';
import { myImage } from '../../../assets/assets';
import final from '../../lib/db';
// import { useBlockContext } from '../../../context/viewBlockContext';
import { useComponents } from '../../../context/componentsContext';

const Blocks = () => {
    let { components } = useComponents();
    // const { blocksContent, setBlocksContent } = useBlockContext();
    const [currentSlide, setCurrentSlide] = useState(0);  // Unused, can be removed if not necessary

    // Map over components and match them with the final array
    let real = components.map(n => {
        // Find the corresponding entry in the 'final' array based on the component id
        let unreal = final.find(m => m.id === n.id);

        // Handle case when the component is not found in 'final'
        if (!unreal) {
            return <li key={n.id}>Component with ID {n.id} not found</li>;
        }

        // If found, render the component (assuming `unreal.component` is a React element)
        return (
            <li className="h-[] w-10" key={n.id}>
                {unreal.id}
            </li>
        );
    });

    return (
        <div className="p-2 no-scrollbar relative">
            <div className="bg-gray-100 no-scrollbar p-2 rounded shadow">
                <h2 className="text-xl font-bold mb-4">Layouts</h2>
                <ul className="space-y-4 max-h-[80vh]">
                    {real}
                </ul>
            </div>
        </div>
    );
};

export default Blocks;
