'use client';
import { useState } from 'react';
import {
  Link as LinkIcon,
  List,
  ChevronDown,
  Type,
  TrendingUp,
  EyeOff,
  Columns,
} from 'lucide-react'; // Added more specific icons
import { cn } from '../lib/utils'; // Assuming cn is available, adjust path if needed

const HyperlinkOptions = () => {
  const [textShadow, setTextShadow] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [cssClassOpen, setCssClassOpen] = useState(false);
  const [hideOnDevicesOpen, setHideOnDevicesOpen] = useState(false);

  const sectionBaseClass = 'border-b border-[#444]';
  const itemBaseClass = 'flex items-center justify-between p-2.5 text-xs';
  const interactiveItemClass = `${itemBaseClass} hover:bg-[#383838] transition-colors cursor-pointer`;
  const labelTextClass = 'text-gray-300';
  const iconClass = 'w-4 h-4 text-gray-400';

  // Simple toggle component to avoid Shadcn UI Checkbox dependency if not available
  const SimpleToggle = ({ checked, onChange, label }) => (
    <label className={`${interactiveItemClass} w-full`}>
      <span className={labelTextClass}>{label}</span>
      <div
        onClick={() => onChange(!checked)}
        className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out ${
          checked ? 'bg-blue-500' : 'bg-[#555]'
        }`}>
        <div
          className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
            checked ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </div>
    </label>
  );

  return (
    <div className='bg-[#2d2d2d] text-white text-sm'>
      <div className={`${sectionBaseClass} ${itemBaseClass} justify-around`}>
        <span className='text-gray-400 overline flex items-center'>
          <Type size={14} className='mr-1' /> Style
        </span>
        <span className='text-gray-400 flex items-center'>
          <Columns size={14} className='mr-1' /> 1.1
        </span>
        <span className='text-gray-400'>|A|</span>
        <span className='text-gray-400'>0</span>
      </div>

      <div className={`${sectionBaseClass}`}>
        <div className={`${itemBaseClass}`}>
          <span className={`${labelTextClass} font-medium`}>List Type</span>
          <div className='flex items-center space-x-1'>
            <button className='p-1.5 bg-[#383838] border border-[#555] rounded hover:bg-[#4a4a4a] focus:outline-none focus:ring-1 focus:ring-blue-500'>
              <List size={14} className='text-gray-300' />
            </button>
            <button className='p-1.5 bg-[#383838] border border-[#555] rounded hover:bg-[#4a4a4a] focus:outline-none focus:ring-1 focus:ring-blue-500'>
              <List size={14} className='text-gray-300' />{' '}
              {/* Consider different list icons if needed */}
            </button>
          </div>
        </div>
      </div>

      <div className={`${sectionBaseClass} ${interactiveItemClass} flex-col items-start`}>
        <div className='flex items-center space-x-1.5 w-full'>
          <LinkIcon size={14} className={iconClass} />
          <span className={labelTextClass}>Hyperlink</span>
        </div>
        <p className='text-gray-500 text-[11px] mt-0.5 ml-[22px]'>
          Click to enter address or select page
        </p>
      </div>

      <div className='space-y-0'>
        {' '}
        {/* Removed space-y-2, handled by sectionBaseClass */}
        <div className={sectionBaseClass}>
          <SimpleToggle checked={textShadow} onChange={setTextShadow} label='Text Shadow' />
        </div>
        <div className={sectionBaseClass}>
          <SimpleToggle checked={animation} onChange={setAnimation} label='Animation' />
        </div>
        <div className={sectionBaseClass}>
          <button
            onClick={() => setCssClassOpen(!cssClassOpen)}
            className={`${interactiveItemClass} w-full`}>
            <div className='flex items-center space-x-1.5'>
              <Type size={14} className={iconClass} />
              <span className={labelTextClass}>CSS Class</span>
            </div>
            <ChevronDown
              className={cn(iconClass, 'transition-transform', cssClassOpen ? 'rotate-180' : '')}
            />
          </button>
          {cssClassOpen && (
            <div className='p-2.5 pt-1 text-xs text-gray-400 bg-[#222222]'>
              {/* Content for CSS Class, e.g., an input field */}
              <input
                type='text'
                placeholder='Enter CSS class names'
                className='w-full bg-[#333] border border-[#555] text-white rounded p-1.5 text-xs placeholder:text-gray-500'
              />
            </div>
          )}
        </div>
        <div className={sectionBaseClass}>
          {' '}
          {/* Last item might not need border-b if it's the end of the component */}
          <button
            onClick={() => setHideOnDevicesOpen(!hideOnDevicesOpen)}
            className={`${interactiveItemClass} w-full`}>
            <div className='flex items-center space-x-1.5'>
              <EyeOff size={14} className={iconClass} />
              <span className={labelTextClass}>Hide On Devices</span>
            </div>
            <ChevronDown
              className={cn(
                iconClass,
                'transition-transform',
                hideOnDevicesOpen ? 'rotate-180' : ''
              )}
            />
          </button>
          {hideOnDevicesOpen && (
            <div className='p-2.5 pt-1 text-xs text-gray-400 bg-[#222222]'>
              {/* Content for Hide On Devices, e.g., checkboxes for devices */}
              <p>Device visibility options here...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HyperlinkOptions;
