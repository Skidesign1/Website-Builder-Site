'use client';
import React, { useState } from 'react';

const Styles = () => {
  const [headingType, setHeadingType] = useState(null);
  const [elementType, setElementType] = useState(null);
  const [iconType, setIconType] = useState(null);
  const [uiElementType, setUiElementType] = useState(null);

  const commonButtonStyles =
    'p-2 text-xs rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#2d2d2d] focus:ring-blue-500';
  const inactiveButtonClass = 'bg-[#383838] hover:bg-[#4a4a4a] text-gray-300';
  const activeButtonClass =
    'bg-[#555555] text-white ring-1 ring-offset-1 ring-offset-[#2d2d2d] ring-slate-400';

  const buttonGroups = [
    {
      label: 'Text Types',
      state: headingType,
      setter: setHeadingType,
      items: [
        { label: 'H1', value: 'h1', width: 'w-12' },
        { label: 'H2', value: 'h2', width: 'w-12' },
        { label: 'P', value: 'p1', width: 'w-12' }, // Assuming p1 means paragraph
      ],
    },
    {
      label: 'Media Elements',
      state: elementType,
      setter: setElementType,
      items: [
        { label: 'Button', value: 'button', width: 'w-16' }, // "btn" could be "Button"
        { label: 'Image', value: 'img1', width: 'w-16' }, // "img1"
        { label: 'Video', value: 'video', width: 'w-16' }, // "vid"
      ],
    },
    {
      label: 'General Elements',
      state: iconType,
      setter: setIconType,
      items: [
        { label: 'Icon', value: 'icon', width: 'w-14' },
        { label: 'Audio', value: 'audio', width: 'w-14' }, // "aud"
        { label: 'Canvas', value: 'Canvas', width: 'w-14' }, // Assuming "Canvas" means Background or a canvas element
      ],
    },
    {
      label: 'UI Components',
      state: uiElementType,
      setter: setUiElementType,
      items: [
        { label: 'Button', value: 'Button', width: 'w-16' }, // "Btn"
        { label: 'Image', value: 'image', width: 'w-16' },
        { label: 'Section', value: 'Canvas', width: 'w-16' }, // "BG" could mean Section/Container
      ],
    },
  ];

  return (
    <div className='bg-[#2d2d2d] text-white text-sm max-w-[400px] mx-auto p-4 rounded-lg border border-[#222] space-y-5'>
      <div className='flex'>
        <p className='text-base font-medium text-gray-100'>Add Elements</p>
      </div>

      {buttonGroups.map(group => (
        <div key={group.label}>
          <h3 className='text-xs text-gray-400 mb-1.5 font-medium'>{group.label}</h3>
          <div className='flex flex-wrap justify-start gap-2'>
            {group.items.map(item => (
              <button
                key={item.value}
                className={`${commonButtonStyles} ${item.width} ${
                  group.state === item.value ? activeButtonClass : inactiveButtonClass
                }`}
                onClick={() => group.setter(item.value)}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Styles;
