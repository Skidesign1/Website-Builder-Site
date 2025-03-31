import { useDroppable } from "@dnd-kit/core"
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable"
import { cn } from "../lib/utils"
import { SortableContainer } from "./sortable-container"

export function CanvasDroppable({ containers, overIndex, isDraggingNew }) {
    const { setNodeRef, isOver } = useDroppable({
        id: "canvas-droppable",
    })

    return (
        <div
            ref={setNodeRef}
            className={cn("flex-1 border border-dashed flex flex-col h-full overflow-auto", isOver && containers.length === 0 && "bg-muted/20")}
        >
            <div className="flex-1 p-8 min-h-full">
                {/* <h2 className="mb-6 text-xl font-semibold">Canvas</h2> */}

                <div className="space-y-4 relative">
                    <SortableContext items={containers.map((container) => container.id)} strategy={rectSortingStrategy}>
                        {containers.map((container, index) => (
                            <div key={container.id} className="relative">
                                {isDraggingNew && overIndex === index && (
                                    <div className="h-16 my-2 rounded-md border-2 border-dashed border-primary bg-primary/10" />
                                )}

                                <SortableContainer id={container.id} title={container.title} />
                            </div>
                        ))}

                        {isDraggingNew && overIndex === containers.length && (
                            <div className="h-16 my-2 rounded-md border-2 border-dashed border-primary bg-primary/10" />
                        )}
                    </SortableContext>

                    {containers.length === 0 && (
                        <div className="flex h-[calc(100vh-150px)] items-center justify-center rounded-lg border border-dashed border-muted-foreground/50 bg-muted/30 p-8 text-muted-foreground">
                            Drag container here to add to canvas
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

