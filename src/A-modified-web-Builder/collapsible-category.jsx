
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { DraggableComponent } from "./draggable-component";

export function CollapsibleCategory({
  category,
  components,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-md p-2 text-left font-medium hover:bg-muted/50"
      >
        <span className="capitalize">{category}</span>
        {isOpen ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>

      {isOpen && (
        <div className="ml-2 mt-1 space-y-1">
          {components.map((component) => (
            <DraggableComponent
              key={component.id}
              id={component.id}
              type={component.type}
              label={component.label}
              icon={component.icon}
              componentId={component.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
