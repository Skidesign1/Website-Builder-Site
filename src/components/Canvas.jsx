import React, { useState, useEffect, useRef } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Container from "./container";
import SortableItem from "./sortableItem";

const Canvas = ({ canvasSize }) => {
  const [containers, setContainers] = useState([]);
  // const [container,setContainer]=useState(false)
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.scrollTop = canvasRef.current.scrollHeight;
    }
  }, [containers]);

  const onDragOver = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setContainers((prev) => {
      const oldIndex = prev.findIndex((c) => c.id === active.id);
      const newIndex = prev.findIndex((c) => c.id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setContainers((prev) => [...prev, { id: `container-${prev.length + 1}`, isOnCanvas: true }]);
  };

  const deleteContainer = (containerId) => {
    setContainers((prev) => prev.filter((c) => c.id !== containerId));
  };
  console.log(containers)

  return (
    <DndContext collisionDetection={closestCenter} onDragOver={onDragOver}>
      <SortableContext items={containers.map((c) => c.id)}>
        <div
          ref={canvasRef}
          className="canvas z-10 bg-gray-100 flex-col px-2 mx-auto"
          onDrop={handleDrop}
          onDragOver={(event) => event.preventDefault()}
          style={{ width: canvasSize.width, height: canvasSize.height, overflowY: "auto" }}
        >
          {containers.length > 0 ? (
            containers.map((container) => (
              <div>
                <SortableItem key={container.id} container={container} isOnCanvas={container.isOnCanvas} deleteContainer={deleteContainer} />
              </div>
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
    </DndContext>
  );
};
// const SortableItem = ({ container }) => {
//   const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({ id: container.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     zIndex: isDragging ? 10 : "auto",
//     opacity: isDragging ? 1 : 1,
//     transition: isDragging ? "none" : "transform",
//     pointerEvents: isDragging ? "none" : "auto",
//   };

//   return (
//     <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
//       <div className="relative z-100000 cursor-grabbing" style={{ pointerEvents: "auto" }}>
//         <Container id={container.id} />
//       </div>
//     </div>
//   );
// };

export default Canvas;