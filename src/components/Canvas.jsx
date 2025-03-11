import React, { useState, useEffect, useRef } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useCode } from '../context/CodeContext';
import ResponsiveNavbar from './ResponsiveNavbar';
import { componentsCode } from './componentsCode';

const Canvas = ({ canvasSize, components = [], setComponents, isMobileView }) => {
  const { isOver, setNodeRef } = useDroppable({ id: 'canvas' });
  const { code, setCode } = useCode();
  const [renderedComponents, setRenderedComponents] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (components && components.length) {
      const newRenderedComponents = components.map((component, idx) => {
        if (component.id === 'navbar') {
          return (
            <div key={idx} className="w-full">
              <ResponsiveNavbar isMobileView={isMobileView} />
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
    const componentId = event.dataTransfer.getData("component");

    let newCode = "";
    if (componentId === 'navbar') {
      newCode = componentsCode['navbar'];
    } else if (componentId === 'mainbody') {
      newCode = componentsCode['mainbody'];
    } else if (componentId === 'footer') {
      newCode = componentsCode['footer'];
    }

    if (newCode) {
      setComponents((prevComponents) => [
        ...prevComponents,
        { id: componentId, code: newCode }
      ]);
      setCode((prevCode) => prevCode + "\n" + newCode);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
<<<<<<< HEAD
    <div
      ref={setNodeRef}
      className="canvas flex-1 bg-gray-100 p-2 h-full border-2 border-dashed border-gray-300 flex flex-col items-center justify-start"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{ width: canvasSize.width, height: canvasSize.height, overflow: 'auto' }}
    >
      {renderedComponents.length === 0 ? (
        <span className="text-gray-500 text-lg">Canvas Area</span>
      ) : (
        renderedComponents
      )}
      {isOver && <div className="overlay">Drop Here</div>}
=======
    <div   className='w-full h-full  bg-slate-200 '   onDrop={handleDrop} onDragOver={handleDragOver}>
      
         <div  className='first-layout flex items-center justify-center text-2xl '>
               <h1>Header</h1>  
         </div>


         <div className='second-layout flex items-center justify-center text-2xl'>
              <h1>Main-body</h1>
         </div>
   

         <div  className='h-20 flex items-center justify-center text-2xl' >
              
              <h1>Footer</h1>

         </div>
          
>>>>>>> 55a560dc5b4dd7413372c20db7f77a73a47a88c4
    </div>
  );
};

export default Canvas;
