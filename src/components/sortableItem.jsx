import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteContainer } from "./reduxState/containerSlice";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDraggable } from "@dnd-kit/core";

const SortableItem = ({ id, sty, container }) => {
    const dispatch = useDispatch();

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id,
        type: 'container',
        data: {
            fromSidebar: true,
            field: 'jssos',

        }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,


    };
    console.log(container)

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`relative ${sty} z-100 items-center flex cursor-move overflow-hidden bg-gray-200 shadow-md min-h-[10px]`}
        // tabIndex={0}
        >
            <div className=" text-center  w-full border-2 border-dashed border-gray-400 rounded-md p-2">
                container {id}
            </div>

        </div>
    );
};

export default SortableItem;
