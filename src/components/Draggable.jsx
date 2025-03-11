import React from 'react';
import { useDraggable } from '@dnd-kit/core';

const Draggable = ({ id, name, icon, component }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
  };

  return (
<<<<<<< HEAD
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="cursor-move flex items-center" draggable>
=======
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="cursor-move flex items-center absolute " onDragStart={handleDragStart}>
>>>>>>> 55a560dc5b4dd7413372c20db7f77a73a47a88c4
      {icon}
      <span className="ml-2">{name}</span>
      {component && <div className="hidden">{component}</div>}
    </div>
  );
};

export default Draggable;
