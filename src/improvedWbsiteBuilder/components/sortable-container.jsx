
import { useState } from "react"
import { useDroppable } from "@dnd-kit/core"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, Trash2 } from "lucide-react"
import { cn } from "../lib/utils"
import { ContainerComponentItem } from "./container-component"

export function SortableContainer({
  id,
  title,
  component,
  isOver,
  onDeleteContainer,
  onDeleteComponent,
}) {
  const [isHovering, setIsHovering] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

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

  // Determine if we should show the container border and header
  const showContainerUI = isHovering || !component || isOver || isDragging

  // Handle double click to expand/collapse
  const handleDoubleClick = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        // "transition-all duration-200 w-full",
        showContainerUI ? "border border-dashed border-muted-foreground/30" : "border-transparent",
        // isExpanded && "h-[300px]",
        isDragging && "z-10",
        isOver && "ring-2 ring-primary ring-offset-2",
        "max-w-full mx-auto",
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onDoubleClick={handleDoubleClick}
      {...attributes}
    >
      {/* Container header - only visible when hovering, empty, or dragging */}
      {showContainerUI && (
        <div className="flex items-center gap-2 z-1000 absolute">
          <div className="mr-2 cursor-grab touch-none" {...listeners}>
            <GripVertical className="h-5 w-5 bg-white text-muted-foreground" />
          </div>

          {/* <span className="text-xs text-muted-foreground flex-1">{title}</span> */}

          <button
            variant="ghost"
            size="icon"
            className="cursor-pointer hover:bg-red-500/20 hover:text-red-400"
            onClick={(e) => {
              e.stopPropagation()
              onDeleteContainer()
            }}
          >
            <Trash2 className="h-4 text-[red] bg-white w-4" />
          </button>
        </div>
      )}

      {/* Droppable area for component */}
      <div
        ref={setDroppableRef}
        className={cn(
          "w-full",
          isOver && !component ? "bg-primary/5" : "",
          !showContainerUI && component ? "pt-0" : "pt-0",
          isExpanded ? "min-h-[600px]" : "",
          component ? "" : "min-h-[600px]",
        )}
      >
        {component ? (
          <ContainerComponentItem component={component} containerId={id} onDeleteComponent={onDeleteComponent} />
        ) : (
          <div className="flex h-[100px] items-center justify-center text-sm text-muted-foreground">
            Drag a component here
          </div>
        )}
      </div>
    </div>
  )
}
