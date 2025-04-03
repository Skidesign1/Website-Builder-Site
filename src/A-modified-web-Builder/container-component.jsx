
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X } from "lucide-react";
import { cn } from "../components/lib/utils";

// import { getComponentById } from "@/utils/component-utils";



export function ContainerComponentItem({
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: component.id,
      data: {
        type: component.type,
        label: component.label,
        componentId: component.componentId,
        isComponent: true,
        isExistingComponent: true,
        sourceContainerId: containerId,
      },
    });

  const style = transform
    ? {
      transform: CSS.Translate.toString(transform),
    }
    : undefined;

  // Get the component to render based on componentId
  const componentToRender = component.componentId
    ? getComponentById(component.componentId)?.component
    : null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn("relative w-full h-full", isDragging && "opacity-50")}
      {...attributes}
    >
      <div
        className="absolute  top-0 right-0 p-1 cursor-grab z-10 bg-white rounded-bl-md border-l border-b"
        {...listeners}
      >
        <GripVertical className="h-4 bg-white w-4" />
      </div>

      <button
        onClick={onDelete}
        className="absolute top-0 left-0 p-1 z-10 bg-background rounded-br-md border-r border-b hover:bg-red-50"
      >
        <X className="h-4 w-4 text-red-500" />
      </button>

      <div className="w-full h-full p-2 pt-6">
        {componentToRender || (
          <div className="w-full h-full min-h-[100px] flex items-center justify-center border border-dashed rounded-md">
            {component.label}
          </div>
        )}
      </div>
    </div>
  );
}
