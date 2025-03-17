import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Canvas from './Canvas';
import { DndContext } from '@dnd-kit/core';
import { componentsCode } from './componentsCode';
import OverComponent from './OverComponent'; // Ensure this is correctly imported

const AppLayout = () => {
  // I run everything here
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
      <div className='maincont bg-black relative'>
        <Navbar onChangeView={handleChangeView} onToggleEditor={handleToggleEditor} />
        <div className="flex relative">
          <div className='myborder basis-[10%]'>
            <Sidebar />
          </div>
          <div className='border-2 border-dashed bg-black basis-[80%]'>
            <Canvas components={components} setComponents={setComponents} canvasSize={canvasSize} />
            {components.map((item, index) => (
              <OverComponent key={index} name={item.name} />
            ))}
          </div>
          <div className='basis-[10%]'> <Sidebar /></div>
        </div>

      </div>
    </DndContext>
  );
};

export default AppLayout;
