import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { cn } from "../../components/lib/utils"
import { SortableContainer } from "./sortable-container"

export function CanvasDroppable({
  containers,
  overIndex,
  isDraggingNew,
  activeDroppableId,
  onDeleteContainer,
  onDeleteComponent,
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: "canvas-droppable",
    data: {
      accepts: "container",
    },
  })
  console.log(containers)
  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex-1 flex flex-col h-full no-scrollbar overflow-auto",
        isOver && containers.length === 0 && "bg-muted/20",
        "w-full",
      )}
    >
      <div className="flex-1 min-h-[50vh] w-full">
        {/* Sortable containers - now with no spacing between them */}
        {/* <div>hello</div> */}
        <div className="flex ma-h-[100vh] pb-[100%] flex-col w-full max-w-full mx-auto">
          <SortableContext items={containers.map((container) => container.id)} strategy={verticalListSortingStrategy}>
            {containers.map((container, index) => (
              <div key={container.id} className="relative w-full">
                {/* Insert placeholder before this container */}
                {isDraggingNew && overIndex === index && (
                  <div className=" w-full rounded-none border-2 border-dashed border-primary bg-primary/10" />
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
            <div className="flex h-[calc(100vh-150px)] w-full items-center justify-center  bg-muted/30 p-8 text-muted-foreground">
              Drag container here to add to canvas
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
