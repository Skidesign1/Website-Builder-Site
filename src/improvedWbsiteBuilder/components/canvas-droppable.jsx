import { useSelector, useDispatch } from "react-redux"
import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { cn } from "../lib/utils"
import { SortableContainer } from "./sortable-container"
import { setCanvasSize } from "../reduxState/canvasSlice"

export function CanvasDroppable({
  containers,
  overIndex,
  isDraggingNew,
  activeDroppableId,
  onDeleteContainer,
  onDeleteComponent,
}) {
  const dispatch = useDispatch()
  const { canvasSize, activeDevice } = useSelector((state) => state.canvas)

  const { setNodeRef, isOver } = useDroppable({
    id: "canvas-droppable",
    data: {
      accepts: "container",
    },
  })

  const handleDrop = (event) => {
    event.preventDefault()
    const droppedData = event.dataTransfer.getData("text")
    console.log("Dropped data:", droppedData)

    // Example: Update canvas size based on dropped data (if applicable)
    if (droppedData === "resize") {
      dispatch(setCanvasSize([1280, 720])) // Example size
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  // Add a class based on the active device for responsive styling
  const deviceClasses = {
    mobile: "canvas-mobile",
    tablet: "canvas-tablet",
    laptop: "canvas-laptop",
    desktop: "canvas-desktop",
    grid: "canvas-grid",
  }

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex-1 pb-[200px] flex flex-col m-auto max-w-[78vw] no-scrollbar overflow-scroll",
        isOver && containers.length === 0 && "bg-muted/20",
        deviceClasses[activeDevice] || "",
      )}
      style={{
        width: `${canvasSize[0]}px`,
        height: `${canvasSize[1]}px`,
        // border: "1px solid #ccc",
        transition: "width 0.3s, height 0.3s", // Smooth resizing
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="flex-1 min-h-[50vh]">
        {/* Sortable containers */}
        <div className="flex flex-col w-full mx-auto">
          <SortableContext items={containers.map((container) => container.id)} strategy={verticalListSortingStrategy}>
            {containers.map((container, index) => (
              <div key={container.id} className="relative w-full">
                {/* Insert placeholder before this container */}
                {isDraggingNew && overIndex === index && (
                  <div className="w-full rounded-none border-2 border-dashed border-primary bg-primary/10" />
                )}
                <SortableContainer
                  id={container.id}
                  title={container.title}
                  component={container.component}
                  isOver={activeDroppableId === `droppable-${container.id}`}
                  onDeleteContainer={() => onDeleteContainer(container.id)}
                  onDeleteComponent={() => onDeleteComponent(container.id)}
                />
              </div>
            ))}

            {/* Placeholder at the end if needed */}
            {isDraggingNew && overIndex === containers.length && (
              <div className="h-16 w-full rounded-none border-2 border-dashed border-primary bg-primary/10" />
            )}
          </SortableContext>

          {containers.length === 0 && (
            <div
              className="flex h-[calc(100vh-150px)] w-full items-center justify-center bg-muted/30 p-8 text-muted-foreground"
              style={{
                width: `${canvasSize[0]}px`,
                height: `${canvasSize[1]}px`,
              }}
            >
              Drag container here
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
