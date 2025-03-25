import React from 'react';
import { useDraggable } from '@dnd-kit/core';

const Draggable = ({ id, name, img, component, icon }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="cursor-move z-100 flex items-center"
    >
      {icon}
      <span className="ml-2">{name}</span>


      {component && <div className="hidden">{component}</div>}
    </div>
  );
};

export default Draggable;
