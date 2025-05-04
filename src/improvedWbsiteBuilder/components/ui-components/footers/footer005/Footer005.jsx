import React from 'react';
import footerConfig from './footerConfig.js'; // Import your footer configuration

const Footer005 = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              {footerConfig.logo && (
                <img
                  src={footerConfig.logo}
                  alt="Logo"
                  className="h-8 mr-2"
                />
              )}
              <span className="text-2xl font-bold text-indigo-400">
                {footerConfig.companyName}
              </span>
            </div>
            <p className="text-gray-400">{footerConfig.description}</p>
            <div className="flex space-x-4">
              {footerConfig.socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
                >
                  <span className="sr-only">{social.name}</span>
                  <i className={`fab fa-${social.icon} text-xl`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerConfig.links.map((section, index) => (
            <div key={index} className="flex flex-col space-y-4">
              <h3 className="text-lg font-semibold text-indigo-400">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <a
                      href={item.url}
                      className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-6"></div>

        {/* Copyright and Bottom Links */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} {footerConfig.companyName}. All rights reserved.
          </p>
          <div className="flex space-x-6">
            {footerConfig.bottomLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="text-gray-500 hover:text-indigo-400 text-sm transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer005;