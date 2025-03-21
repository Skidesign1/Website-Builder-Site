import React, { useState, useContext, createContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Canvas from './Canvas';
import { useCode } from '../context/CodeContext';
import Sidebar from './Sidebar';
import TextEditor from './sidebars/textEditor';
import { DndContext } from '@dnd-kit/core';
import { componentsCode } from './componentsCode';
import MainBlock from './sidebars/blocks';
import OverComponent from './OverComponent'; // Ensure this is correctly imported
import { BlockContext } from '../context/miniNavContext';
import { useComponents } from '../context/componentsContext';
import { ComponentsContext } from '../context/componentsContext';
const AppLayout = () => {
  let { close } = useContext(BlockContext)
  let { setCode } = useCode()
  let { components, setComponents } = useComponents()
  const [canvasSize, setCanvasSize] = useState({ width: '100%', height: '100%' });
  const navigate = useNavigate();
  let sidetoggle = close ? <MainBlock /> : <Sidebar />

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
  console.log(components)
  useEffect(() => {
    let general = components.map(nam => nam.code).join(', ');
    setCode(general);
  }, [components]);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className='maincont relative'>
        <Navbar onChangeView={handleChangeView} onToggleEditor={handleToggleEditor} />
        <div className="grid grid-cols-[200px_1fr_200px] gap-1 relative">
          <div className='myborder  no-scrollbar'>
            {/* left sidebar componnets */}
            {sidetoggle}
          </div>
          {/* middle commponent */}
          <div className='h-[100vh] relative mx-2 border-dashed bg-black'>
            <Canvas components={components} setComponents={setComponents} canvasSize={canvasSize} />
            {components.map((item) => (
              <OverComponent key={item.id} name={item.id} />
            ))}
          </div>
          {/* right component */}
          <div className='scrollbar-hide no-scrollbar max-h-[100vh] relative overflow-y-scroll'>
            <TextEditor />
          </div>
        </div>
      </div>
    </DndContext>
  );
};

export default AppLayout;
