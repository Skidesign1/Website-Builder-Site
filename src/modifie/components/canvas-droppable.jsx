import { useEffect, useRef } from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { cn } from "../../components/lib/utils";
import { SortableContainer } from "./sortable-container";

export function CanvasDroppable({ containers, overIndex, isDraggingNew, activeDroppableId }) {
  const { setNodeRef, isOver } = useDroppable({
    id: "canvas-droppable",
  });

  const canvasRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when a new container is added
    if (canvasRef.current) {
      canvasRef.current.scrollTop = canvasRef.current.scrollHeight;
    }
  }, [containers.length]); // Dependency on the number of containers

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        canvasRef.current = node; // Attach to ref
      }}
      className={cn(
        "flex-1 flex flex-col max-h-[100vh] no-scrollbar overflow-y-scroll",
        isOver && containers.length === 0 && "bg-muted/20"
      )}
    >
      <div className="flex-1 border p-8">
        <div className="grid grid-cols-1">
          <SortableContext items={containers.map((container) => container.id)} strategy={rectSortingStrategy}>
            {containers.map((container, index) => (
              <div key={container.id} className="relative">
                {isDraggingNew && overIndex === index && (
                  <div className="h-20 border-2 border border-primary bg-primary/10" />
                )}

                <SortableContainer
                  id={container.id}
                  title={container.title}
                  component={container.component}
                  isOver={activeDroppableId === `droppable-${container.id}`}
                />
              </div>
            ))}

            {isDraggingNew && overIndex === containers.length && (
              <div className="h-16 my-2 rounded-md border-2 border-dashed border-primary bg-primary/10" />
            )}
          </SortableContext>

          {containers.length === 0 && (
            <div className="flex justify-center items-center">
              Drag container here to add to canvas
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
