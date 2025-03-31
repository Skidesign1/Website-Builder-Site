import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { deleteContainer } from "./reduxState/containerSlice";
import { useDispatch } from "react-redux";

const DraggableSortable = ({ id, name, sty, type, getCols }) => {
  let dispatch = useDispatch()
  let [showDelete, setShowDelete] = useState(false)
  function show() {
    setShowDelete(!showDelete)
  }
  const { attributes: draggableAttributes, listeners: draggableListeners, setNodeRef: setDraggableRef, transform: draggableTransform } = useDraggable({
    id,

  });
  const { attributes: sortableAttributes, listeners: sortableListeners, setNodeRef: setSortableRef, transform: sortableTransform, transition, isDragging } = useSortable({
    id, data: {
      type: type || "draggable",
      name
    }
  });
  if (isDragging) {
    type = 'draggable'
  }
  // Merge both refs
  const setCombinedRef = (node) => {
    setDraggableRef(node);
    setSortableRef(node);
  };

  function del() {
    dispatch(deleteContainer(e))
  }
  const transform = sortableTransform || draggableTransform;

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
  };

  function del(id) {
    dispatch(deleteContainer(id))
  }

  return (
    <div
      ref={setCombinedRef}
      style={style}
      {...draggableListeners}
      {...draggableAttributes}
      {...sortableListeners}
      {...sortableAttributes}
      onMouseLeave={() => setShowDelete(false)} onMouseEnter={() => setShowDelete(true)}
      className={`cursor-move ${sty} relative z-20 flex items-center p-2 border rounded-md`}
    >
      {/* {!type === 'sidebarItem' && {showDelete && <button onClick={() => del(id)}>delete</button>}} */}
      <span className="ml-2">{name}-{id}</span>
    </div>
  );
};

export default DraggableSortable;
