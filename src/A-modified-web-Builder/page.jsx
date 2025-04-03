

import { cn } from "../components/lib/utils";
import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import { DraggableSidebarItem } from "./draggable-sidebar-item";
import { CanvasDroppable } from "./canvas-droppable";
import { ContainerItem } from "./container-item";
import { ComponentOverlay } from "./component-overlay";

import { CollapsibleCategory } from "./collapsible-category";
import CanvasNavigator from "./canvas-navigator";
import { LayoutGrid, List } from "lucide-react";

export default function DragAndDropPage() {
  // State for containers on the canvas
  const [containers, setContainers] = useState([]);
  // State for active drag item
  const [activeId, setActiveId] = useState(null);
  // State to track where a new container would be inserted
  const [overIndex, setOverIndex] = useState(null);
  // State to track active component data
  const [activeComponent, setActiveComponent] = useState(null);
  // State to track which container is being hovered for component drop
  const [activeDroppableId, setActiveDroppableId] = useState(null);
  // State to track sidebar view mode (components or navigator)
  const [sidebarMode, setSidebarMode] = useState("components");
  // State to track highlighted container
  const [highlightedContainerId, setHighlightedContainerId] = useState(null);

  // Group components by category
  const categoryGroups = groupComponentsByCategory();

  // Configure sensors for drag detection
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag start
  function handleDragStart(event) {
    const { active } = event;
    setActiveId(active.id);
    setOverIndex(null);

    // Check if dragging a component
    if (active.data.current?.isComponent) {
      setActiveComponent({
        type: active.data.current.type,
        label: active.data.current.label,
      });
    } else {
      setActiveComponent(null);
    }
  }

  // Handle drag over for showing preview position
  function handleDragOver(event) {
    const { active, over } = event;

    // If not dragging over anything
    if (!over) {
      setOverIndex(null);
      setActiveDroppableId(null);
      return;
    }

    // If dragging a component (from sidebar or from another container)
    if (active.data.current?.isComponent) {
      // Check if over a container's droppable area
      if (over.id.toString().startsWith("droppable-")) {
        setActiveDroppableId(over.id.toString());
      } else {
        setActiveDroppableId(null);
      }
      return;
    }

    // If dragging a container from sidebar
    if (active.id === "sidebar-container") {
      if (over.id === "canvas-droppable") {
        // If over the empty canvas, set index to end
        setOverIndex(containers.length);
      } else {
        // If over an existing container, find its index
        const overIndex = containers.findIndex((c) => c.id === over.id);
        if (overIndex !== -1) {
          setOverIndex(overIndex);
        }
      }
    }
    // If sorting existing containers
    else if (active.id !== over.id) {
      const activeIndex = containers.findIndex((c) => c.id === active.id);
      const overIndex = containers.findIndex((c) => c.id === over.id);

      if (activeIndex !== -1 && overIndex !== -1) {
        setContainers((items) => arrayMove(items, activeIndex, overIndex));
      }
    }
  }

  // Handle drag end
  function handleDragEnd(event) {
    const { active, over } = event;

    // Reset states
    setActiveId(null);
    setActiveComponent(null);

    // If not dropping over anything, do nothing
    if (!over) {
      setOverIndex(null);
      setActiveDroppableId(null);
      return;
    }

    // If dragging a component
    if (
      active.data.current?.isComponent &&
      over.id.toString().startsWith("droppable-")
    ) {
      const targetContainerId = over.data.current?.containerId;

      if (targetContainerId) {
        // If moving an existing component between containers
        if (active.data.current?.isExistingComponent) {
          const sourceContainerId = active.data.current.sourceContainerId;

          // If source and target containers are different
          if (sourceContainerId !== targetContainerId) {
            // Find the component to move
            const sourceContainer = containers.find(
              (c) => c.id === sourceContainerId
            );
            const componentToMove = sourceContainer?.component;

            if (componentToMove) {
              // Remove from source container and add to target container
              setContainers(
                containers.map((container) => {
                  if (container.id === sourceContainerId) {
                    return {
                      ...container,
                      component: null,
                    };
                  }
                  if (container.id === targetContainerId) {
                    return {
                      ...container,
                      component: componentToMove,
                    };
                  }
                  return container;
                })
              );
            }
          }
        }
        // If adding a new component from sidebar
        else {
          const componentId = active.data.current.componentId;
          const componentType = getComponentById(componentId);

          if (componentType) {
            // Add the component to the container (replacing any existing component)
            setContainers(
              containers.map((container) => {
                if (container.id === targetContainerId) {
                  return {
                    ...container,
                    component: {
                      id: `${componentType.type}-${Date.now()}`,
                      type: componentType.type,
                      label: componentType.label,
                      componentId: componentId,
                    },
                  };
                }
                return container;
              })
            );
          }
        }
      }
    }
    // If dragging a container from sidebar
    else if (active.id === "sidebar-container") {
      // Create a new container
      const newContainer = {
        id: `container-${Date.now()}`,
        title: `Container ${containers.length + 1}`,
        component: null,
      };

      // Insert at the specific position if overIndex is set
      if (overIndex !== null) {
        const newContainers = [...containers];
        newContainers.splice(overIndex, 0, newContainer);
        setContainers(newContainers);
      } else {
        // Otherwise append to the end
        setContainers((prev) => [...prev, newContainer]);
      }
    }

    // Reset states
    setOverIndex(null);
    setActiveDroppableId(null);
  }

  // Handle deleting a component from a container
  function handleDeleteComponent(containerId) {
    setContainers(
      containers.map((container) => {
        if (container.id === containerId) {
          return {
            ...container,
            component: null,
          };
        }
        return container;
      })
    );
  }

  // Handle navigating to a container
  function handleNavigateToContainer(containerId) {
    setHighlightedContainerId(containerId);

    // Clear the highlight after a delay
    setTimeout(() => {
      setHighlightedContainerId(null);
    }, 2000);
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 border-r bg-muted/40 p-4 overflow-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Sidebar</h2>

            {/* Toggle sidebar mode */}
            <div className="flex border rounded-md overflow-hidden">
              <button
                onClick={() => setSidebarMode("components")}
                className={cn(
                  "p-1.5",
                  sidebarMode === "components"
                    ? "bg-primary text-primary-foreground"
                    : "bg-background"
                )}
                title="Components"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setSidebarMode("navigator")}
                className={cn(
                  "p-1.5",
                  sidebarMode === "navigator"
                    ? "bg-primary text-primary-foreground"
                    : "bg-background"
                )}
                title="Canvas Navigator"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          {sidebarMode === "components" ? (
            <>
              {/* Container */}
              <DraggableSidebarItem
                id="sidebar-container"
                title="Container"
                isContainer={true}
              />

              {/* Components by category */}
              <h3 className="text-sm font-medium mb-2">Components</h3>
              <div>
                {categoryGroups.map((group) => (
                  <CollapsibleCategory
                    key={group.category}
                    category={group.category}
                    components={group.components}
                  />
                ))}
              </div>
            </>
          ) : (
            <CanvasNavigator
              containers={containers}
              onNavigateTo={handleNavigateToContainer}
            />
          )}
        </div>

        {/* Canvas - Full height */}
        <CanvasDroppable
          containers={containers}
          overIndex={overIndex}
          isDraggingNew={activeId === "sidebar-container"}
          activeDroppableId={activeDroppableId}
          onDeleteComponent={handleDeleteComponent}
          highlightedContainerId={highlightedContainerId}
        />

        {/* Drag Overlay */}
        <DragOverlay>
          {activeId ? (
            activeComponent ? (
              <ComponentOverlay
                type={activeComponent.type}
                label={activeComponent.label}
              />
            ) : activeId === "sidebar-container" ? (
              <ContainerItem title="New Container" isSidebar={false} />
            ) : (
              <ContainerItem
                title={
                  containers.find((c) => c.id === activeId)?.title ||
                  "Container"
                }
                isSidebar={false}
              />
            )
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}
