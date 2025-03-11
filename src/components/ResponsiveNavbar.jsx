import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const ResponsiveNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand Logo */}
        <div className="text-2xl font-bold">
          <a href="#">MyWebsite</a>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-gray-400">Home</a>
          <a href="#" className="hover:text-gray-400">About</a>
          <a href="#" className="hover:text-gray-400">Services</a>
          <a href="#" className="hover:text-gray-400">Contact</a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-700">
          <ul className="space-y-2 py-4">
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-600">Home</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-600">About</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-600">Services</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-600">Contact</a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default ResponsiveNavbar;
