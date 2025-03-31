import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { Move } from "lucide-react"

export function DraggableSidebarItem({ id, title }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
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
            className="flex cursor-grab items-center rounded-md border bg-card p-3 shadow-sm"
            {...listeners}
            {...attributes}
        >
            <Move className="mr-2 h-5 w-5 text-muted-foreground" />
            <span>{title}</span>
        </div>
    )
}

