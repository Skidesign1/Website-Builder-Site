
import { CSS } from "@dnd-kit/utilities"
import { useDraggable } from "@dnd-kit/core"


export function DraggableComponent({ id, type, label, icon }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
        data: {
            type,
            label,
            isComponent: true,
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
            className="flex cursor-grab items-center rounded-md border bg-card p-2 mb-2 shadow-sm"
            {...listeners}
            {...attributes}
        >
            <span className="mr-2 flex h-6 w-6 items-center justify-center rounded bg-primary/10 text-primary">{icon}</span>
            <span className="text-sm">{label}</span>
        </div>
    )
}

