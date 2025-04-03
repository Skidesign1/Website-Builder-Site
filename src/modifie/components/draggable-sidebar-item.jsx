import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { Move } from "lucide-react"
import { cn } from "../../components/lib/utils"

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
        "flex cursor-grab overflow-hidden items-center border  p-3 shadow-sm",
        isContainer ? "mb-6" : "mb-2",
      )}
      {...listeners}
      {...attributes}
    >
      <Move className="mr-2 h-full w-10 text-muted-foreground" />
      <span>{title}</span>
    </div>
  )
}

