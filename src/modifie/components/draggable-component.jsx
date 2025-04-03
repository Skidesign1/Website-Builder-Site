import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"



export function DraggableComponent({ id, type, label, icon, componentId }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: {
      type,
      label,
      componentId,
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
      className="flex cursor-grab items-center bg-card p-2 shadow-sm"
      {...listeners}
      {...attributes}
    >
      <span className="mr-2 flex h-6 w-6 items-center justify-center bg-primary/10 text-primary">{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
  )
}

