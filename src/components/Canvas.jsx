import React, { useState, useEffect, useRef } from "react";
import { DndContext, closestCenter, useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useCode } from "../context/CodeContext";
import { useComponents } from "../context/componentsContext";
import OverComponent from "./OverComponent";
import final from "./lib/db";
import { fetchComponents } from "./reduxState/getComponents";
import { useDispatch, useSelector } from "react-redux";

const Canvas = ({ canvasSize }) => {
  const { setNodeRef } = useDroppable({
    id: "canvas-drop-area",
  });
  const dispatch = useDispatch();
  const { components, setComponents } = useComponents();
  const { code, setCode } = useCode();
  const canvasRef = useRef(null);

  useEffect(() => {
    dispatch(fetchComponents());
  }, []);

  // 🏗️ Handles reordering when dragging over another component
  const onDragOver = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = components.findIndex((c) => c.id === active.id);
    const newIndex = components.findIndex((c) => c.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
      setComponents((prevComponents) =>
        arrayMove(prevComponents, oldIndex, newIndex)
      );
    }
  };

  // 🛠️ Revert to original position if not placed properly
  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over) {
      setComponents((prevComponents) => [...prevComponents]);
    }
  };

  // ✨ Handles dropping new components onto the canvas
  const handleDrop = (event) => {
    event.preventDefault();
    const componentId = event.dataTransfer.getData("component");
    const newCode = final[componentId] || "";

    if (newCode) {
      setComponents((prevComponents) => [
        ...prevComponents,
        { id: componentId, code: newCode },
      ]);
      setCode((prevCode) => prevCode + "\n" + newCode);
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.scrollTop = canvasRef.current.scrollHeight;
    }
  }, [components]);

  const deleteComponent = (componentId) => {
    setComponents((prevComponents) =>
      prevComponents.filter((component) => component.id !== componentId)
    );
  };


  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={components.map((c) => c.id)}>

        <div
          id='canvas-drop-area'
          ref={setNodeRef}
          className="canvas px-2 mx-auto bg-gray-100 flex-col"
          onDrop={handleDrop}
          onDragOver={(event) => event.preventDefault()}
          style={{
            width: canvasSize.width,
            height: canvasSize.height,
            overflowY: "auto",
            // display: "flex",
            flexDirection: "column",
            // gap: "6px", // Reduces space for a tighter look
          }}
        >
          {components.length > 0 ? (
            components.map((component) => (
              <SortableItem style={{
                position: "absolute",
                top: component.y,
                left: component.x,
              }} key={component.id} component={component} />
            ))
          ) : (
            <div className="w-full h-full bg-slate-200 flex flex-col">
              <div className="flex items-center justify-center text-2xl h-16 bg-gray-300">
                <h1>Header</h1>
              </div>
              <div className="flex items-center justify-center text-2xl flex-grow bg-white">
                <h1>Main-body</h1>
              </div>
              <div className="h-20 flex items-center justify-center text-2xl bg-gray-300">
                <h1>Footer</h1>
              </div>
            </div>
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
};

// 🏗️ Sortable Item Component (Draggable)
const SortableItem = ({ component }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    // transition,
    // width: "100%",
    // height: "auto",
    // background: isDragging ? "rgba(0, 0, 255, 0.2)" : "#FFF", // 🔵 Highlight when dragging
    // padding: "10px",
    // borderRadius: "6px",
    // boxShadow: isDragging ? "0px 4px 6px rgba(0, 0, 255, 0.2)" : "0px 2px 4px rgba(0, 0, 0, 0.1)",
    position: "relative", // Ensures overlapping visibility
    zIndex: isDragging ? 1000 : "auto",
    opacity: isDragging ? 0.8 : 1, // Makes dragging smoother
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab"
    >
      <OverComponent component={component.component} name={component.id} />
    </div>
  );
};

export default Canvas;
