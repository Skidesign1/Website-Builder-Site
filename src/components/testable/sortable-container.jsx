import { useSortable } from "@dnd-kit/sortable"
import { useDroppable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical } from "lucide-react"
import { cn } from "../lib/utils"
import { ContainerComponentItem } from "./container-Components"

export function SortableContainer({ id, title, component, isOver }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

    const { setNodeRef: setDroppableRef } = useDroppable({
        id: `droppable-${id}`,
        data: {
            accepts: "component",
            containerId: id,
        },
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                "rounded-md border bg-card shadow-sm",
                isDragging && "z-10",
                isOver && "ring-2 ring-primary ring-offset-2",
            )}
            {...attributes}
        >
            <div className="flex items-center p-3 border-b">
                <div className="mr-2 cursor-grab touch-none" {...listeners}>
                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                </div>
                <span className="font-medium">{title}</span>
            </div>

            <div ref={setDroppableRef} className={cn("min-h-[150px] w-full", isOver && !component ? "bg-primary/5" : "")}>
                {component ? (
                    <ContainerComponentItem component={component} containerId={id} />
                ) : (
                    <div className="flex h-[150px] items-center justify-center text-sm text-muted-foreground p-4">
                        Drag a component here
                    </div>
                )}
            </div>
        </div>
    )
}

