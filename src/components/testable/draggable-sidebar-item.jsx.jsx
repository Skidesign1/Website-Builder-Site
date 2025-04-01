
import { CSS } from "@dnd-kit/utilities"
import { Move } from "lucide-react"
import { cn } from "../lib/utils"


export function DraggableSidebarItem({ id, title, isContainer = false }) {
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
            className={cn(
                "flex cursor-grab items-center rounded-md border bg-card p-3 shadow-sm",
                isContainer ? "mb-6" : "mb-2",
            )}
            {...listeners}
            {...attributes}
        >
            <Move className="mr-2 h-5 w-5 text-muted-foreground" />
            <span>{title}</span>
        </div>
    )
}

