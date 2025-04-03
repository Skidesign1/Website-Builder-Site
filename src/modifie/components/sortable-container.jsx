import { useState } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { useDroppable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, Trash2 } from "lucide-react"
import { cn } from "../../components/lib/utils"
import { ContainerComponentRenderer } from "./container-component-renderer"
import { useAppDispatch } from "../store/hooks"
import { useAppSelector } from "../store/hooks"


import { deleteContainer, deleteComponentFromContainer, setSelectedContainer } from "../store/containersSlice"

export function SortableContainer({ id, title, component, isOver }) {
  const dispatch = useAppDispatch()
  const selectedContainerId = useAppSelector((state) => state.containers.selectedContainerId)
  const isSelected = selectedContainerId === id

  // Add state for hover and double-click
  const [isHovered, setIsHovered] = useState(false)
  const [isContainerControlsVisible, setIsContainerControlsVisible] = useState(false)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging, } = useSortable({ id })

  const { setNodeRef: setDroppableRef } = useDroppable({
    id: `droppable-${id}`,
    data: {
      accepts: "component",
      containerId: id,
      component: component
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const handleContainerClick = () => {
    dispatch(setSelectedContainer(id))
  }

  const handleContainerDoubleClick = (e) => {
    e.stopPropagation()
    setIsContainerControlsVisible(true)
  }

  const handleDeleteContainer = (e) => {
    e.stopPropagation()
    dispatch(deleteContainer(id))
  }

  const handleDeleteComponent = (e) => {
    e.stopPropagation()
    dispatch(deleteComponentFromContainer(id))
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    // Only hide container controls when mouse leaves
    setIsContainerControlsVisible(false)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative ",
        isDragging && "z-10",
        isOver && "ring-2 ring-primary ring-offset-2",
        isSelected ? "border border-primary" : "border-transparent",
        component ? "p-0" : "border border-dashed min-h-[100px]",
      )}
      onClick={handleContainerClick}
      onDoubleClick={handleContainerDoubleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...attributes}
    >
      {/* Container controls - only visible when double-clicked */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 flex items-center justify-between p-1 z-20 backdrop-blur-sm ",
          isContainerControlsVisible ? "opacity-100" : "opacity-0",
          "transition-opacity duration-200",
        )}
      >
        {/* Move handle on the left */}
        <div className="cursor-grab touch-none flex items-center" {...listeners}>
          <GripVertical className="h-5 w-4 bg-white  text-muted-foreground" />
          <span className="text-2xl font-medium ml-1">{title}</span>
        </div>

        {/* Delete button on the right */}
        <button className="text-destructive bg-white p-1 rounded-sm" onClick={handleDeleteContainer}>
          <Trash2 className="h-4 w-4 text-red-800" />
        </button>
      </div>

      {/* Droppable area for component */}
      <div
        ref={setDroppableRef}
        className={cn(
          "w-full",
          !component && isSelected ? "min-h-[50vh] border border-dashed border-primary/50" : "",
          !component && !isSelected ? "min-h-[100px] border border-dashed border-muted-foreground/30" : "",
          isOver && !component ? "bg-primary/5" : "",
          // isOver ? 'h-[100vh]' : '',
          isOver && component ? "bg-primary/5" : "",
        )}
      >
        {component ? (
          <div className="relative">
            <ContainerComponentRenderer component={component} containerId={id} isHovered={isHovered} />

            {/* Component delete button - visible on container hover */}
            <button
              className={cn(
                "absolute bg-white bottom-0 right-[-2px] z-30 p-1 rounded-md bg-destructive text-destructive-foreground",
                isHovered ? "opacity-100" : "opacity-0",
                "transition-opacity duration-200",
              )}
              onClick={handleDeleteComponent}
            >
              <Trash2 className="h-4 w-[fit-content] bg-white rounded text-red-900 bg-white cursor-pointer" />
            </button>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground p-4">
            {isSelected ? "Drag a component here" : ""}
          </div>
        )}
      </div>
    </div>
  )
}

