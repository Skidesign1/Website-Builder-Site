import { useMemo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { useDraggable } from "@dnd-kit/core";

const Container = ({ id, sty, container }) => {
    const { attributes: draggableAttributes, listeners: draggableListeners, setNodeRef: setDraggableRef, transform: draggableTransform } = useDraggable({
        id, data: {
            fromSidebar: false,
        }
    });
    const { attributes: sortableAttributes, listeners: sortableListeners, setNodeRef: setSortableRef, transform: sortableTransform, transition, isDragging } = useSortable({
        id, data: {
            fromSidebar: false,
        }
    });
    const transform = sortableTransform || draggableTransform;
    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : "none",
        transition,
        opacity: 1,
    };

    const setCombinedRef = (node) => {
        setDraggableRef(node);
        setSortableRef(node);
    };

    console.log(container)
    return (
        <div
            ref={setCombinedRef}
            style={style}
            {...draggableListeners}
            {...draggableAttributes}
            {...sortableListeners}
            {...sortableAttributes}
            className={`cursor-move ${sty} relative z-20 flex items-center p-2 border rounded-md`}
        >

            <span className="ml-2">container-{id}</span>
        </div>
    );
};


export default Container;
