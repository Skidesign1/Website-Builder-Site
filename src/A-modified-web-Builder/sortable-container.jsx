import { useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { cn } from "../components/lib/utils";
import { ContainerComponentItem } from "./container-component";
import { forwardRef } from "react";

export const SortableContainer = forwardRef(function SortableContainer(
  { id, title, component, isOver, onDeleteComponent, highlight = false },
  ref
) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const { setNodeRef: setDroppableRef } = useDroppable({
    id: `droppable-${id}`,
    data: {
      accepts: "component",
      containerId: id,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }}
      style={style}
      className={cn(
        "rounded-md border bg-card shadow-sm transition-all",
        isDragging && "z-10",
        isOver && "ring-2 ring-primary ring-offset-2",
        highlight && "ring-2 ring-yellow-400 ring-offset-2"
      )}
      {...attributes}
    >
      <div className="flex items-center p-3 border-b">
        <div className="mr-2 cursor-grab touch-none" {...listeners}>
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </div>
        <span className="font-medium">{title}</span>
      </div>

      {/* Droppable area for component */}
      <div
        ref={setDroppableRef}
        className={cn(
          "min-h-[150px] w-full",
          isOver && !component ? "bg-primary/5" : ""
        )}
      >
        {component ? (
          <ContainerComponentItem
            component={component}
            containerId={id}
            onDelete={() => onDeleteComponent(id)}
          />
        ) : (
          <div className="flex h-[150px] items-center justify-center text-sm text-muted-foreground p-4">
            Drag a component here
          </div>
        )}
      </div>
    </div>
  );
});
