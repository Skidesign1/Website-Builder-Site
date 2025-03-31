import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import { cn } from "../lib/utils";
import { useState } from "react";

export function SortableContainer({ id, title, onDelete }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
    const [isHovered, setIsHovered] = useState(false);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
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
