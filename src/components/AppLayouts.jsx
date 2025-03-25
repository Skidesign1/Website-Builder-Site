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
import { useSelector, useDispatch } from 'react-redux';
import { canvasMountComponent } from './reduxState/getComponents';
import { fetchComponents } from './reduxState/getComponents';
import Blocks from './sidebars/subBlocks/blocks';
const AppLayout = () => {
  let dispatch = useDispatch()
  let { close } = useContext(BlockContext)
  let { setCode } = useCode()
  let { components, setComponents } = useComponents()
  const [canvasSize, setCanvasSize] = useState({ width: '100%', height: '100%' });
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchComponents())
  }, [dispatch, fetchComponents])

  const handleDragEnd = (event) => {
    const { active, over } = event;

    // Ensure item is dropped inside the Canvas
    if (!over) return;  // Stop if dropped outside any valid drop area

    if (over.id === "canvas-drop-area") {
      const newComponent = componentsCode[active.id];

      setComponents((prev) => [...prev, { id: active.id, code: newComponent }]);
      dispatch(canvasMountComponent({ id: active.id, code: newComponent }));
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
            <Sidebar />
          </div>
          {/* middle commponent */}
          <div className='h-[100vh] relative mx-2 border-dashed bg-black'>
            <Canvas components={components} setComponents={setComponents} canvasSize={canvasSize} />
            {/* {components.map((item) => (
              <OverComponent key={item.id} name={item.id} />
            ))} */}
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
