
import { CSS } from "@dnd-kit/utilities"
import { GripVertical } from "lucide-react"
import { cn } from "../lib/utils"
import final from "../lib/db"

export function DraggableContainerItem({ item, containerId }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: item.id,
        data: {
            type: item.type,
            label: item.label,
            isComponent: true,
            isExistingComponent: true,
            sourceContainerId: containerId,
            component: final
        },
    })

    const style = transform
        ? {
            transform: CSS.Translate.toString(transform),
        }
        : undefined

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn("flex items-center rounded-md border bg-background p-2 text-sm", isDragging && "opacity-50")}
            {...listeners}
            {...attributes}
        >
            <GripVertical className="mr-1 h-4 w-4 text-muted-foreground" />
            <span className="mr-2 flex h-5 w-5 items-center justify-center rounded bg-primary/10 text-primary">
                {item.type.charAt(0)}
            </span>
            <span>{item.label}</span>
        </div>
    )
}

