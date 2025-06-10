'use client';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedElement } from '../reduxState/selectedElementSlice';
import StylesSection from './stylesSection';

// Utility to generate element identifiers with indices
const generateElementIdentifiers = elements => {
  const counts = {};
  return elements.map(element => {
    const type = element.type.toLowerCase();
    counts[type] = (counts[type] || 0) + 1;
    return {
      ...element,
      identifier: `${type}(${counts[type]})`,
    };
  });
};

const SubTools = () => {
  const dispatch = useDispatch();
  const [elementIdentifiers, setElementIdentifiers] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState({});
  const currentComponent = useSelector(state => state.canvas.currentComponent);
  const selectedElement = useSelector(state => state.selectedElement);

  // Generate element identifiers when currentComponent changes
  useEffect(() => {
    if (currentComponent && currentComponent.elements) {
      const elementsWithIds = generateElementIdentifiers(currentComponent.elements);
      setElementIdentifiers(elementsWithIds);
    } else {
      setElementIdentifiers([]);
    }
  }, [currentComponent]);

  // Handle element selection
  const handleSelectElement = element => {
    dispatch(setSelectedElement(element));
    setSelectedStyles(element.styles || {});
  };

  // Handle image source change
  const handleImageChange = src => {
    if (selectedElement && selectedElement.type === 'img') {
      const updatedElement = {
        ...selectedElement,
        src: src,
      };
      dispatch(setSelectedElement(updatedElement));
    }
  };

  // Apply new styles to selected element
  const applyStyles = newStyles => {
    if (selectedElement) {
      const updatedElement = {
        ...selectedElement,
        styles: {
          ...selectedElement.styles,
          ...newStyles,
        },
      };
      dispatch(setSelectedElement(updatedElement));
      setSelectedStyles(updatedElement.styles);
    }
  };

  return (
    <div className='bg-[#2d2d2d] text-white text-sm max-w-[400px] mx-auto p-4 rounded-lg border border-[#222] space-y-5'>
      <div className='flex justify-between items-center'>
        <p className='text-base font-medium text-gray-100'>Element Tools</p>
      </div>

      {/* Element List Section */}
      <div>
        <h3 className='text-xs text-gray-400 mb-1.5 font-medium'>Component Elements</h3>
        <div className='flex flex-wrap gap-2'>
          {elementIdentifiers.map(element => (
            <button
              key={element.id}
              className={`px-3 py-2 text-xs rounded-md ${
                selectedElement?.id === element.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-[#383838] hover:bg-[#4a4a4a] text-gray-300'
              }`}
              onClick={() => handleSelectElement(element)}>
              {element.identifier}
            </button>
          ))}
          {elementIdentifiers.length === 0 && (
            <p className='text-gray-400 text-xs'>No elements in component</p>
          )}
        </div>
      </div>

      {/* Element Details Section */}
      {selectedElement && (
        <div className='mt-4'>
          <h3 className='text-xs text-gray-400 mb-1.5 font-medium'>
            Editing: {selectedElement.identifier}
          </h3>

          {/* Image Source Editor */}
          {selectedElement.type === 'img' && (
            <div className='mb-4'>
              <label className='block text-xs text-gray-300 mb-1'>Image Source</label>
              <input
                type='text'
                value={selectedElement.src || ''}
                onChange={e => handleImageChange(e.target.value)}
                className='w-full p-2 text-xs bg-[#383838] text-white rounded border border-[#555]'
                placeholder='Enter image URL'
              />
            </div>
          )}

          {/* Content Display */}
          {selectedElement.content && (
            <div className='mb-4'>
              <label className='block text-xs text-gray-300 mb-1'>Content</label>
              <div className='p-2 bg-[#383838] text-white rounded border border-[#555] text-xs'>
                {selectedElement.content}
              </div>
            </div>
          )}

          {/* Styles Editor */}
          <StylesSection styles={selectedStyles} onStylesChange={applyStyles} />
        </div>
      )}
    </div>
  );
};

export default SubTools;
