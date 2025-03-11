import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Canvas from './Canvas';
import { DndContext } from '@dnd-kit/core';
import { componentsCode } from './componentsCode';

const AppLayout = () => {
  const [components, setComponents] = useState([]);
  const [canvasSize, setCanvasSize] = useState({ width: '100%', height: '100%' });
  const navigate = useNavigate();

  const handleDragEnd = (event) => {
    const { active } = event;
    if (active.id) {
      const newComponent = componentsCode[active.id];
      setComponents((prev) => [...prev, { id: active.id, code: newComponent }]);
    }
  };

  const handleChangeView = (resolution) => {
    setCanvasSize({ width: `${resolution[0]}px`, height: `${resolution[1]}px` });
  };

  const handleToggleEditor = () => {
    navigate('/code-editor', { state: { components } });
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
<<<<<<< HEAD
      <div className='maincont bg-black'>
        <Navbar onChangeView={handleChangeView} onToggleEditor={handleToggleEditor} />
=======
      <div className='maincont bg-black relative' >
        <Navbar onToggleEditor={handleToggleEditor} />
>>>>>>> 55a560dc5b4dd7413372c20db7f77a73a47a88c4
        <div className="mygrid relative">
          <div className='myborder'>
            <Sidebar />
          </div>
          <div className='border-2 border-dashed bg-black'>
<<<<<<< HEAD
            <Canvas components={components} setComponents={setComponents} canvasSize={canvasSize} />
=======
              <Canvas />
            {components.map((item, index) => (
              <OverComponent key={index} name={item.name} />
            ))}
>>>>>>> 55a560dc5b4dd7413372c20db7f77a73a47a88c4
          </div>
        </div>
      </div>
    </DndContext>
  );
};


export default AppLayout;
