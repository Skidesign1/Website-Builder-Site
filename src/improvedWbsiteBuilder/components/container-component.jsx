"use client"

import { useState } from "react"
import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, Trash2 } from "lucide-react"
import { cn } from "../../components/lib/utils"
import componentRegistry from "./ui-components/component-registry"

export function ContainerComponentItem({ component, containerId, onDeleteComponent }) {
  const [showControls, setShowControls] = useState(false)

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

  // Find the component in the registry
  const registryComponent = componentRegistry.find((item) => item.label === component.label)
  console.log(component)
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
        {registryComponent ? registryComponent.component : <div>{component.label}</div>}
      </div>
    </div>
  )
}
