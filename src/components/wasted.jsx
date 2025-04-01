import { useSortable } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import { cn } from "../lib/utils";
import { useState } from "react";
import { DndContext } from "@dnd-kit/core";

export function SortableContainer({ id, title, onDelete }) {
    const { attributes, listeners, setNodeRef: setSortableRef, transform, transition, isDragging } = useSortable({ id });
    const { setNodeRef: setDroppableRef, isOver } = useDroppable({ id });

    const [isHovered, setIsHovered] = useState(false);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isOver ? "rgba(0, 255, 0, 0.2)" : "white", // Highlight when droppable
    };

    return (
        <div
            ref={(node) => {
                setSortableRef(node);
                setDroppableRef(node);
            }}
            style={style}
            className={cn("relative rounded-md border p-4 shadow-sm", isDragging && "z-10")}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="mr-2 cursor-grab touch-none" {...listeners}>
                        <GripVertical className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <span>{title}</span>
                </div>
                {isHovered && (
                    <button
                        className="absolute cursor-pointer top-2 right-2 p-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                        onClick={() => onDelete(id)}
                    >
                        <Trash2 className="h-5 w-5" />
                    </button>
                )}
            </div>
        </div>
    );
}
