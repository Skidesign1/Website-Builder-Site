import React from "react";
import { useDraggable } from "@dnd-kit/core";

const Container = ({ id, children, isOnCanvas }) => {
    const { attributes, listeners, setNodeRef, transform, i } = useDraggable({
        id,
    });

    return (
        <div
            ref={setNodeRef}
            style={{
                transform: transform ? `translate3d(${transform.x}px, ${transform.y}px,1)` : "none",
            }}
            {...listeners}
            {...attributes}
            className="cursor-move relative z-10 p-4 mb-2 bg-gray-200 rounded-md hover:bg-gray-300 min-h-[100px]"
        >
            <div className="min-h-[50px] text-center border-2 border-dashed border-gray-400 rounded-md p-2">
                {isOnCanvas ? "Drag component here" : "Drag container to the canvas"}
            </div>

        </div>
    );
};

export default Container;

