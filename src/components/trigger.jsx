import React from 'react';
import { useDraggable } from '@dnd-kit/core';

const Trigger = () => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: 'draggable'
    });

    const style = {

        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : "none",
    };
    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            className="relative flex items-center text-center border border-dashed z-10 cursor-move p-4 bg-gray-200 shadow-md min-h-[100px] rounded-md"
        >
            <h1> "DraggingDrag container to the canvas"</h1>

        </div>
    );
};

export default Trigger;