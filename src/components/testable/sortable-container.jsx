import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical } from "lucide-react"
import { cn } from "../lib/utils"

export function SortableContainer({ id, title }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn("rounded-md border bg-card p-4 shadow-sm", isDragging && "z-10")}
            {...attributes}
        >
            <div className="flex items-center">
                <div className="mr-2 cursor-grab touch-none" {...listeners}>
                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                </div>
                <span>{title}</span>
            </div>
        </div>
    )
}

