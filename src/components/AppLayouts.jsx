import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
;
import Navbar from './Navbar';
import Canvas from './Canvas';
import TextEditor from './sidebars/textEditor';
import { DndContext } from '@dnd-kit/core';
import { componentsCode } from './componentsCode';
import MainBlock from './sidebars/blocks';
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
      <div className='maincont max-h-[100vh]bg-black relative'>
        <Navbar onChangeView={handleChangeView} onToggleEditor={handleToggleEditor} />
        <div className="grid grid-cols-[200px_1fr_200px] gap-1 relative">
          <div className='myborder max-h-[100vh] overflow-y-scroll no-scrollbar'>
            <MainBlock />
          </div>
          <div className=' max-h-[100vh] mx-2 border-dashed bg-black'>
            <Canvas components={components} setComponents={setComponents} canvasSize={canvasSize} />
            {components.map((item, index) => (
              <OverComponent key={index} name={item.name} />
            ))}
          </div>
          <div className='scrollbar-hide no-scrollbar max-h-[100vh] overflow-y-scroll'>
            <TextEditor />
          </div>
        </div>

      </div>
    </DndContext>
  );
};

export default AppLayout;
