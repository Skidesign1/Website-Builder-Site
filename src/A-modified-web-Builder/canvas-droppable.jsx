import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { cn } from "../components/lib/utils";
import { SortableContainer } from "./sortable-container";
import { createRef, useEffect, useRef } from "react";

export function CanvasDroppable({
  containers,
  overIndex,
  isDraggingNew,
  activeDroppableId,
  onDeleteComponent,
  highlightedContainerId,
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: "canvas-droppable",
  });

  // Create refs for each container
  const containerRefs = useRef({});

  // Update refs when containers change
  useEffect(() => {
    containers.forEach((container) => {
      if (!containerRefs.current[container.id.toString()]) {
        containerRefs.current[container.id.toString()] = createRef();
      }
    });
  }, [containers]);

  // Scroll to highlighted container
  useEffect(() => {
    if (
      highlightedContainerId &&
      containerRefs.current[highlightedContainerId]
    ) {
      const ref = containerRefs.current[highlightedContainerId];
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [highlightedContainerId]);

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex-1 flex flex-col h-full overflow-auto",
        isOver && containers.length === 0 && "bg-muted/20"
      )}
    >
      <div className="flex-1 p-8 min-h-full">
        <h2 className="mb-6 text-xl font-semibold">Canvas</h2>

        {/* Sortable containers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SortableContext
            items={containers.map((container) => container.id)}
            strategy={rectSortingStrategy}
          >
            {containers.map((container, index) => (
              <div key={container.id} className="relative">
                {/* Insert placeholder before this container */}
                {isDraggingNew && overIndex === index && (
                  <div className="h-16 my-2 rounded-md border-2 border-dashed border-primary bg-primary/10" />
                )}

                <SortableContainer
                  ref={containerRefs.current[container.id.toString()]}
                  id={container.id}
                  title={container.title}
                  component={container.component}
                  isOver={activeDroppableId === `droppable-${container.id}`}
                  onDeleteComponent={onDeleteComponent}
                  highlight={highlightedContainerId === container.id.toString()}
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
  );
}
