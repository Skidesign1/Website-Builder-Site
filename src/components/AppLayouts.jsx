import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useImmer } from 'use-immer';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DndContext, useSensors, useSensor, PointerSensor, closestCorners } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DragOverlay } from '@dnd-kit/core';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import TextEditor from './sidebars/textEditor';
import SortableItem from './sortableItem';
import WebsiteBuilderToolbar from '../improvedWbsiteBuilder/components/navbar';


const AppLayout = () => {
  const dispatch = useDispatch();
  const { containers } = useSelector(state => state.canvas);
  const navigate = useNavigate();

  const [canvasSize, setCanvasSize] = useState({ width: '100%', height: '100%' });
  const [activeSidebarField, setActiveSidebarField] = useState(null);
  const [activeField, setActiveField] = useState(null);
  const [idData, setIdData] = useState(null);
  const currentDragFieldRef = useRef(null);
  const spacerInsertedRef = useRef(false);

  const [data, updateData] = useImmer({ fields: [] });
  const { fields } = data;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const getData = (prop) => prop?.data?.current ?? {};

  const createSpacer = (id) => ({ id, type: 'spacer', title: 'Spacer' });

  const cleanUp = useCallback(() => {
    currentDragFieldRef.current = null;
    spacerInsertedRef.current = false;
  }, []);

  const handleDragBegin = useCallback((e) => {
    const { active } = e;
    const activeData = getData(active);

    if (activeData.fromSidebar) {
      setActiveSidebarField(activeData.field);
      currentDragFieldRef.current = {
        id: active.id,
        type: activeData.field.type,
        name: `${activeData.field.type}${fields.length + 1}`,
        parent: null
      };
      return;
    }

    setActiveField(activeData.field);
    currentDragFieldRef.current = activeData.field;
  }, [fields.length]);

  const handleDraggingOver = useCallback((e) => {
    const { active, over } = e;
    const activeData = getData(active);
    const overData = getData(over);

    if (activeData.fromSidebar) {
      if (!spacerInsertedRef.current) {
        updateData(draft => {
          draft.fields.push(createSpacer(active.id + '-spacer'));
        });
        spacerInsertedRef.current = true;
      } else if (!over) {
        updateData(draft => {
          draft.fields = draft.fields.filter(f => f.type !== 'spacer');
        });
        spacerInsertedRef.current = false;
      } else {
        updateData(draft => {
          const spacerIndex = draft.fields.findIndex(f => f.id === active.id + '-spacer');
          const nextIndex = overData.index > -1 ? overData.index : draft.fields.length - 1;
          if (spacerIndex !== -1 && nextIndex !== spacerIndex) {
            draft.fields = arrayMove(draft.fields, spacerIndex, nextIndex);
          }
        });
      }
    }
  }, [updateData]);

  const handleDraggingEnd = useCallback((e) => {
    const { active, over } = e;
    setIdData(active.id);

    if (!over) {
      cleanUp();
      updateData(draft => {
        draft.fields = draft.fields.filter(f => f.type !== 'spacer');
      });
      return;
    }

    let nextField = currentDragFieldRef.current;
    if (nextField) {
      updateData(draft => {
        let spacerIndex = draft.fields.findIndex(f => f.type === 'spacer');
        if (spacerIndex !== -1) {
          draft.fields.splice(spacerIndex, 1, nextField);
          draft.fields = draft.fields.filter(f => f.type !== 'spacer'); // Ensure spacers are removed after sorting
        }
      });
    }
    cleanUp();
  }, [cleanUp, updateData]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragBegin}
      onDragOver={handleDraggingOver}
      onDragEnd={handleDraggingEnd}
    >
      <div className='maincont relative'>
        <WebsiteBuilderToolbar />
        <div className='grid grid-cols-[200px_1fr_200px] gap-1 h-[100vh] relative'>
          <Sidebar className='myborder no-scrollbar' />
          <SortableContext strategy={verticalListSortingStrategy} items={fields.map(f => f.id)}>
            <div className='h-[10vh] relative mx-2 border-dashed bg-black'>
              <Canvas fields={fields} canvasSize={canvasSize} />
            </div>
          </SortableContext>
          <DragOverlay dropAnimation={false}>
            {activeSidebarField && <SortableItem id={idData} overlay />}
          </DragOverlay>
          <TextEditor className='scrollbar-hide no-scrollbar max-h-[100vh] relative overflow-y-scroll' />
        </div>
      </div>
    </DndContext>
  );
};

export default AppLayout;