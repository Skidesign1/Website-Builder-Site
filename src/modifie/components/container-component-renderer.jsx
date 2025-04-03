import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { cn } from "../../components/lib/utils"
import sidebarComponents from "./sidebar/sidebar-components"

export function ContainerComponentRenderer({ component, containerId, isHovered }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: component.id,
    data: {
      type: component.type,
      label: component.label,
      componentId: component.componentId,
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

  // Find the component to render
  const componentToRender = sidebarComponents.find((c) => c.id === component.componentId)

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative w-full cursor-grab",
        isDragging ? "opacity-0" : "", // Hide the original when dragging
        isHovered && !isDragging && "ring-2 ring-primary ring-inset",
      )}
      {...attributes}
      {...listeners}
    >
      <div className="w-full">{componentToRender?.component}</div>
    </div>
  )
}

