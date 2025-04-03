import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { cn } from "../lib/utils";
import { SortableContainer } from "./sortable-container";
import { useEffect, useRef } from "react";

export function CanvasDroppable({ containers, overIndex, isDraggingNew, activeDroppableId, handleDeleteContainer }) {
    const { setNodeRef, isOver } = useDroppable({
        id: "canvas-droppable",
    });

    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [containers.length]); // Runs when containers change

    return (
        <div
            ref={(node) => {
                setNodeRef(node);
                containerRef.current = node; // Attach the ref
            }}
            className={cn("flex-1 min-w-[200px] pt-10 flex flex-col min-h-[100vh] pb-10", isOver && containers.length === 0 && "bg-muted/20")}
        >
            <div className="flex-1 pb-20">
                <div className="flex flex-col">
                    <SortableContext items={containers.map((container) => container.id)} strategy={rectSortingStrategy}>
                        {containers.map((container, index) => (
                            <div key={container.id} className="relative">
                                {isDraggingNew && overIndex === index && (
                                    <div className="h-16 my-2 rounded-md border-2 border-dashed border-primary bg-primary/10" />
                                )}

                                <SortableContainer
                                    id={container.id}
                                    title={container.title}
                                    component={container.component}
                                    isOver={activeDroppableId === `droppable-${container.id}`}
                                    handleDeleteContainer={handleDeleteContainer}
                                />
                            </div>
                        ))}

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
    );
}
