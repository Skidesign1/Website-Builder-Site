import { useDroppable } from "@dnd-kit/core"
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable"
import { cn } from "../lib/utils"
import { SortableContainer } from "./sortable-container"


export function CanvasDroppable({ containers, overIndex, isDraggingNew, activeDroppableId }) {
    const { setNodeRef, isOver } = useDroppable({
        id: "canvas-droppable",
    })

    return (
        <div
            ref={setNodeRef}
            className={cn("flex-1 flex flex-col h-full overflow-auto", isOver && containers.length === 0 && "bg-muted/20")}
        >
            <div className="flex-1 p-8 min-h-full">
                <h2 className="mb-6 text-xl font-semibold">Canvas</h2>

                {/* Sortable containers */}
                <div className="flex flex-col">
                    <SortableContext items={containers.map((container) => container.id)} strategy={rectSortingStrategy}>
                        {containers.map((container, index) => (
                            <div key={container.id} className="relative">
                                {/* Insert placeholder before this container */}
                                {isDraggingNew && overIndex === index && (
                                    <div className="h-16 my-2 rounded-md border-2 border-dashed border-primary bg-primary/10" />
                                )}

                                <SortableContainer
                                    id={container.id}
                                    title={container.title}
                                    component={container.component}
                                    isOver={activeDroppableId === `droppable-${container.id}`}
                                />
                            </div>
                        ))}

                        {/* Placeholder at the end if needed */}
                        {isDraggingNew && overIndex === containers.length && (
                            <div className="h-16 my-2 rounded-md border-2 border-dashed border-primary bg-primary/10" />
                        )}
                    </SortableContext>

                    {containers.length === 0 && (
                        <div className="col-span-full flex h-[calc(100vh-150px)] items-center justify-center rounded-lg border border-dashed border-muted-foreground/50 bg-muted/30 p-8 text-muted-foreground">
                            Drag container here to add to canvas
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

