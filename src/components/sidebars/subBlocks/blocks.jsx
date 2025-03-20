import React, { useState } from 'react';
import ImageComponent from '../../dragableComponnents.jsx/img';
import Draggable from '../../Draggable';
import { myImage } from '../../../assets/assets';

export const blocks = [
    {
        id: "flower",
        subtitle: "With Expert Solutions",
        image: myImage,
        component: <ImageComponent />
    },
    {
        id: "best",
        subtitle: "Teamwork at its best",
        image: myImage,
        component: <ImageComponent />
    },
    {
        id: "Online",
        subtitle: "Enhance",
        image: myImage,
        component: <ImageComponent />
    },
    {
        id: " Business",
        subtitle: "With Expert Solutions",

        buttonText: "Learn More",
        component: <ImageComponent />
    },
    {
        id: "Collaborate",
        subtitle: "Teamwork at its best",
        image: myImage,
        component: <ImageComponent />
    },
    {
        id: "skill",
        subtitle: "Enhance your skills anywhere",
        image: myImage,
        component: <ImageComponent />
    },
    {
        id: "Boost",
        subtitle: "With Expert Solutions",
        image: myImage,
        component: <ImageComponent />
    },
    {
        id: "team",
        subtitle: "Teamwork at its best",
        image: myImage,
        component: <ImageComponent />
    },
];

const Blocks = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    return (
        <div className="p-2 no-scrollbar relative">
            <div className="bg-gray-100 no-scrollbar p-2 rounded shadow">
                <h2 className="text-xl font-bold mb-4">Blocks</h2>
                <ul className="space-y-4 max-h-[80vh]">
                    {blocks.map((slide) => (
                        <li key={slide.id} className="flex items-center gap-2 p-1 hover:bg-gray-200 rounded">
                            <Draggable id={slide.id} img={slide.component} component={slide.component} />

                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
};

export default Blocks;