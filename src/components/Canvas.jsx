import React, { useState } from "react";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

const Canvas = ({ canvasSize }) => {
  const [containers, setContainers] = useState([]);
  const [activeContainer, setActiveContainer] = useState(null);

  // Handles when dragging starts
  const onDragStart = (event) => {
    const draggedItem = containers.find((c) => c.id === event.active.id);
    setActiveContainer(draggedItem || null);
  };

  // Handles when dragging ends
  const onDragEnd = (event) => {
    const { active, over } = event;
    setActiveContainer(null);

    if (!over || active.id === over.id) return;

    setContainers((prev) => {
      const oldIndex = prev.findIndex((c) => c.id === active.id);
      const newIndex = prev.findIndex((c) => c.id === over.id);
      return oldIndex !== -1 && newIndex !== -1 ? arrayMove(prev, oldIndex, newIndex) : prev;
    });
  };

  // Handles dropping new containers onto the canvas
  const handleDrop = (event) => {
    event.preventDefault();
    setContainers((prev) => [
      ...prev,
      { id: `container-${Date.now()}`, isOnCanvas: true }, // Unique ID
    ]);
  };

  // Handles deleting a container
  const deleteContainer = (containerId) => {
    // setContainers((prev) => prev.filter((c) => c.id !== containerId));
    setContainers([])
    return containers
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <SortableContext items={containers.map((c) => c.id)}>
        <div
          className="canvas bg-gray-100 p-4 mx-auto border border-gray-300"
          onDrop={handleDrop}
          onDragOver={(event) => event.preventDefault()}
          style={{ width: canvasSize.width, height: canvasSize.height, overflowY: "auto" }}
        >
          {containers.length > 0 ? (
            containers.map((container) => (
              <SortableItem key={container.id} container={container} deleteContainer={deleteContainer} />
            ))
          ) : (
            <div className="w-full h-full flex flex-col bg-slate-200">
              <div className="h-16 bg-gray-300 flex items-center justify-center text-2xl">Header</div>
              <div className="flex-grow bg-white flex items-center justify-center text-2xl">Main-body</div>
              <div className="h-20 bg-gray-300 flex items-center justify-center text-2xl">Footer</div>
            </div>
          )}
        </div>
      </SortableContext>

      {/* DragOverlay Fix */}
      <DragOverlay>
        {activeContainer ? (
          <div className="cursor-move bg-gray-200 rounded-md shadow-md min-h-[100px]">
            <div className="min-h-[50px] text-center border-2 border-dashed border-gray-400 rounded-md p-2">
              {`Container ${activeContainer.id}`}
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Canvas;
