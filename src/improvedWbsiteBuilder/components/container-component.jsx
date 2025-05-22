import { useState } from "react"
import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, Trash2 } from "lucide-react"
import { cn } from "../lib/utils"
import { ComponentPreview } from "./component-preview"
import { useSelector } from "react-redux"

export function ContainerComponentItem({ component, containerId, onDeleteComponent }) {
  const [showControls, setShowControls] = useState(false)
  const { canvasSize } = useSelector((state) => state.canvas)
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: component.id,
    data: {
      type: component.type,
      label: component.label,
      isComponent: true,
      isExistingComponent: true,
      sourceContainerId: containerId,
    },
  })

  const style = transform
    ? {
      transform: CSS.Transform.toString(transform),
    }
    : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn("relative group transition-all", isDragging && "opacity-0", "max-w-full mx-auto", 'h-full')}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      {...attributes}
    >
      {showControls && (
        <div className="absolute top-2 right-2 z-10 flex space-x-1 bg-background/80 backdrop-blur-sm p-1 rounded-md shadow-sm">
          <div className="cursor-grab" {...listeners}>
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>
          <button
            variant="ghost"
            size="icon"
            className="h-6 w-6 hover:bg-red-500/20 hover:text-red-400"
            onClick={(e) => {
              e.stopPropagation()
              onDeleteComponent()
            }}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )}
      <div className="w-full overflow-hidden">
        <ComponentPreview component={component.component.component} />
      </div>
    </div>
  )
}
