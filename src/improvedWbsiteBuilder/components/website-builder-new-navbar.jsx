import React from 'react';

const WebsiteBuilderNewNavbar = () => {
  return (
    <nav className='bg-[#1a1a1a] text-white py-4'>
      <div className='container mx-auto flex items-center justify-between'>
        <div className='text-2xl font-bold'>Website Builder</div>
        <div className='hidden md:flex items-center space-x-6'>
          <a href='#' className='hover:text-gray-300'>
            Home
          </a>
          <a href='#' className='hover:text-gray-300'>
            Features
          </a>
          <a href='#' className='hover:text-gray-300'>
            Pricing
          </a>
          <a href='#' className='hover:text-gray-300'>
            Contact
          </a>
        </div>
        <button className='md:hidden'>Menu</button>
      </div>
    </nav>
  );
};

export default WebsiteBuilderNewNavbar;
