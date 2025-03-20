import React, { useState, useEffect, useRef } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useCode } from '../context/CodeContext';
// import { componentsCode } from './componentsCode';
import final from './lib/db';


const Canvas = ({ canvasSize, components = [], setComponents, isMobileView }) => {
  const { isOver, setNodeRef } = useDroppable({ id: 'canvas' });
  const { code, setCode } = useCode();
  const [renderedComponents, setRenderedComponents] = useState([]);
  const canvasRef = useRef(null);
  useEffect(() => {
    if (components.length > 0) {
      const newRenderedComponents = components.map((component, idx) => {
        let current = final.find(item => item.id == component.id)
        if (component.id === current.id) {
          setCode(current.component)
          return (
            <div key={idx} className="w-full">
              {current.component}
            </div>
          );
        } else {
          return (
            <div key={idx} className="p-2 m-2 bg-white shadow rounded">
              <div dangerouslySetInnerHTML={{ __html: component.code }} />
            </div>
          );
        }
      });
      setRenderedComponents(newRenderedComponents);
    }
  }, [components, isMobileView]);

  const handleDrop = (event) => {
    event.preventDefault();
    const componentId = event.dataTransfer.getData('component');

    let newCode = final[componentId] || '';

    if (newCode) {
      setComponents((prevComponents) => [
        ...prevComponents,
        { id: componentId, code: newCode },
      ]);
      setCode((prevCode) => prevCode + '\n' + newCode);

    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.scrollTop = canvasRef.current.scrollHeight;
    }
  }, [components]);

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        canvasRef.current = node; // ✅ Attach ref to enable scrolling
      }}
      className="canvas flex-1 bg-gray-100 p-2 max-h-full border-2 border-dashed border-gray-300 flex flex-col items-center justify-start"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{ width: canvasSize.width, height: canvasSize.height, overflow: 'auto' }}
    >
      {renderedComponents.length > 0 ? (
        renderedComponents
      ) : (
        <div className="w-full h-full bg-slate-200 flex flex-col">
          <div className="first-layout flex items-center justify-center text-2xl h-16 bg-gray-300">
            <h1>Header</h1>
          </div>
          <div className="second-layout flex items-center justify-center text-2xl flex-grow bg-white">
            <h1>Main-body</h1>
          </div>
          <div className="h-20 flex items-center justify-center text-2xl bg-gray-300">
            <h1>Footer</h1>
          </div>
        </div>
      )}
      {isOver && <div className="overlay">Drop Here</div>}
    </div>
  );
};

export default Canvas;
