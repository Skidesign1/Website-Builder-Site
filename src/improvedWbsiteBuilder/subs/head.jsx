'use client'; // Assuming this is a client component
import React, { useState } from 'react';
import TextToolbar from './subTools'; // This component would also need dark theme styling

const Toolbar = () => {
  const [tabBar, setTabBar] = useState('Style');

  const handleTabClick = tabName => {
    console.log(`Tab clicked: ${tabName}`);
    setTabBar(tabName);
  };

  const tabBaseClass =
    'cursor-pointer py-2 px-3 text-xs transition-colors duration-200 ease-in-out';
  const activeTabClass = 'text-blue-400 border-b-2 border-blue-400 font-semibold';
  const inactiveTabClass =
    'text-gray-400 hover:text-gray-200 border-b-2 border-transparent hover:border-gray-500';

  return (
    <div className='flex flex-col items-center bg-[#222222] text-white'>
      {' '}
      {/* Darker background for toolbar area */}
      <div className='flex justify-around border-b border-[#444] w-full'>
        <p
          onClick={() => handleTabClick('Style')}
          className={`${tabBaseClass} ${tabBar === 'Style' ? activeTabClass : inactiveTabClass}`}>
          Style
        </p>
        <p
          onClick={() => handleTabClick('Setting')}
          className={`${tabBaseClass} ${tabBar === 'Setting' ? activeTabClass : inactiveTabClass}`}>
          Setting
        </p>
        <p
          onClick={() => handleTabClick('Routes')}
          className={`${tabBaseClass} ${tabBar === 'Routes' ? activeTabClass : inactiveTabClass}`}>
          Routes
        </p>
      </div>
      {/* TextToolbar will be rendered here. Ensure it's also styled for dark theme */}
      <div className='w-full p-3 bg-[#2d2d2d]'>
        {' '}
        {/* Content area background */}
        {tabBar === 'Style' && <TextToolbar />} {/* Example: Conditionally render based on tab */}
        {tabBar === 'Setting' && (
          <div className='text-gray-300 text-sm p-4'>Settings content here...</div>
        )}
        {tabBar === 'Routes' && (
          <div className='text-gray-300 text-sm p-4'>Routes content here...</div>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
