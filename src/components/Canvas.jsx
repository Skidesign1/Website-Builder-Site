import React, { useState } from "react";
import { DndContext, closestCenter, DragOverlay, useSensor, PointerSensor, closestCorners } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import Container from "./container";
import Draggable from "./Draggable";
import { addContainer } from "./reduxState/containerSlice";
import { useSelector, useDispatch } from "react-redux";
import { reorderContainers } from "./reduxState/containerSlice";
import { useSensors } from "@dnd-kit/core";
import { deleteContainer } from "./reduxState/containerSlice";
import SortableItem from "./sortableItem";

const Canvas = ({ canvasSize, fields }) => {
  let sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10
      }
    })
  )


  let dispatch = useDispatch()
  const { setNodeRef, isOver } = useDroppable({ id: "droppable" });
  const [createCont, setCont] = useState([]); // Sync state with components
  const [activeContainer, setActiveContainer] = useState(null);
  const { containers } = useSelector(state => state.canvas)
  console.log(createCont)

  const onDragStart = (event) => {
    const { active, over } = event
    console.log(event.active.data.current.type)
    const draggedItem = containers.find((c) => c.id === event.active.id);
    setActiveContainer(draggedItem || null);
  };

  // const getCols = (e) => {

  //   setCont(prev => [
  //     ...prev,
  //     { id: createCont.length + 1, content: 'dynamic' }
  //   ]);
  //   dispatch(addContainer({ id: createCont.length + 1, content: 'dynamic' }))
  // };
  const onDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return; // If there's no valid drop target, exit

    const oldIndex = containers.findIndex((c) => c.id === active.id);
    const newIndex = containers.findIndex((c) => c.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
      return dispatch(reorderContainers({ oldIndex, newIndex }));
    }
  };

  console.log(fields)
  console.log(containers)
  return (
    // <DndContext
    //   collisionDetection={closestCorners}
    //   onDragStart={onDragStart}
    //   onDragEnd={onDragEnd}
    //   sensors={sensors}
    // >
    //   <SortableContext items={containers.map((c) => c.id)}>
    <div>
      <div
        ref={setNodeRef}
        className="canvas h-[100vh] bg-gray-100 p-4 mx-auto border border-gray-300"
      // style={{ width: canvasSize.width, height: canvasSize.height, overflowY: "auto" }}
      >
        {fields.length > 0 ? (
          <ul>
            {fields.map((com, i) => (
              <li key={i}>
                <Container
                  id={com.id}
                  // name={com.content}
                  // label={com}
                  sty="border my-2 h-20 flex items-center justify-center border-dashed"
                />
              </li>

            ))}
          </ul>
        ) : (
          <div className="w-full h-full flex flex-col bg-slate-200">
            <div className="h-16 bg-gray-300 flex items-center justify-center text-2xl">Header</div>
            <div className="flex-grow bg-white flex items-center justify-center text-2xl">Main-body</div>
            <div className="h-20 bg-gray-300 flex items-center justify-center text-2xl">Footer</div>
          </div>
        )}
        {/* {isOver && <div className="w-full h-20 border border-dashed"></div>} */}
      </div>
      {/* </SortableContext> */}

      {/* <DragOverlay>
        {activeContainer ? <Container id={activeContainer.id} name={activeContainer.content} sty={'h-20 bg-blue-800 shadow-[10px] relative z-100 justify-center border-dashed border w-full'} /> : null}
      </DragOverlay>
    </DndContext> */}
    </div>
  );
};

export default Canvas;
