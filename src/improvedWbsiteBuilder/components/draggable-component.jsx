import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { cn } from "../lib/utils"

export function DraggableComponent({ id, type, label, icon, thumbnail, component }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: {
      type,
      label,
      isComponent: true,
      component,
    },
  })
  // console.log("DraggableComponent", { id, type, label, icon, thumbnail, component })
  // Check if the component is a thumbnail

  const style = transform
    ? {
      transform: CSS.Transform.toString(transform),
      zIndex: isDragging ? 50 : undefined,
    }
    : undefined

  // If this is a thumbnail style component (from the new sidebar)
  if (thumbnail) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={cn("flex flex-col items-center cursor-grab transition-all", isDragging && "opacity-50 scale-105")}
        {...listeners}
        {...attributes}
      >
        <div className="border rounded-md p-1 bg-muted/20 w-full aspect-[5/3] flex items-center justify-center mb-1">
          <div className="w-8 h-8 bg-primary/30 rounded-md flex items-center justify-center text-primary">{icon}</div>
        </div>
        <span className="text-xs">{label}</span>
      </div>
    )
  }

  // Original style for other draggable components
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex cursor-grab items-center rounded-md border bg-card p-2 mb-2 shadow-sm"
      {...listeners}
      {...attributes}
    >
      <span className={cn("mr-2 flex items-center justify-center rounded bg-primary/10 text-primary")}>
        {icon}
      </span>
      <span className="text-sm">{label}</span>
    </div>
  )
}
