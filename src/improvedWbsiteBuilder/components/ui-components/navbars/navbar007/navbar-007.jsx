import React, { useState } from "react";
import config from "./Config.json";
export function Navbar007() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(
    config.navigation.links.find((link) => link.active)?.name || ""
  );

  return (
    <header
      className={`bg-${config.styles.header.background} backdrop-blur-sm border-b border-${config.styles.header.border} sticky top-0 z-50 shadow-${config.styles.shadow.default}`}
    >
      <div className={`max-w-7xl mx-auto px-${config.styles.header.padding.x}`}>
        <div
          className={`flex justify-between h-${config.styles.header.height} items-center`}
        >
          {/* Logo */}
          <div className="flex items-center">
            <a href="#" className="flex items-center space-x-4">
              <img
                src={config.brand.logo.src}
                alt={config.brand.logo.alt}
                className={`h-${config.brand.logo.size.height} w-${config.brand.logo.size.width} object-contain`}
              />
              <span
                className={`text-${config.brand.textSize} font-bold text-${config.brand.textColor} tracking-tight`}
              >
                {config.brand.name}
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav
            className={`hidden md:flex items-center space-x-${config.navigation.desktop.spacing}`}
          >
            {config.navigation.links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setActiveLink(link.name)}
                className={`relative px-${
                  config.navigation.desktop.padding.x
                } py-${config.navigation.desktop.padding.y} text-${
                  config.navigation.desktop.textSize
                } font-medium transition-colors ${
                  config.styles.hoverTransition
                } ${
                  activeLink === link.name
                    ? `text-${config.navigation.desktop.activeIndicator.color}`
                    : `text-gray-700 hover:text-gray-900`
                }`}
              >
                {link.name}
                {activeLink === link.name && (
                  <span
                    className={`absolute ${config.navigation.desktop.activeIndicator.position} left-1/2 transform -translate-x-1/2 h-${config.navigation.desktop.activeIndicator.height} w-${config.navigation.desktop.activeIndicator.width} bg-${config.navigation.desktop.activeIndicator.color} rounded-${config.navigation.desktop.activeIndicator.rounded}`}
                  ></span>
                )}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div
            className={`hidden md:flex items-center space-x-${config.cta.spacing}`}
          >
            <a
              href={config.cta.primary.href}
              className={`px-${config.cta.primary.size.x} py-${config.cta.primary.size.y} rounded-${config.cta.primary.rounded} bg-gradient-to-r from-${config.cta.primary.color.from} to-${config.cta.primary.color.to} text-${config.cta.primary.textColor} text-${config.navigation.desktop.textSize} font-medium hover:from-${config.cta.primary.color.hoverFrom} hover:to-${config.cta.primary.color.hoverTo} transition-all shadow-${config.styles.shadow.default} hover:shadow-${config.styles.shadow.hover}`}
            >
              {config.cta.primary.text}
              <svg
                className={`ml-2 -mr-1 w-${config.cta.primary.icon.size.width} h-${config.cta.primary.icon.size.height} inline`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d={config.cta.primary.icon.path}
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-${config.mobileMenu.button.padding} rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            >
              {mobileMenuOpen ? (
                <svg
                  className={`h-${config.mobileMenu.button.size.height} w-${config.mobileMenu.button.size.width}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={config.mobileMenu.button.icon.close}
                  />
                </svg>
              ) : (
                <svg
                  className={`h-${config.mobileMenu.button.size.height} w-${config.mobileMenu.button.size.width}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={config.mobileMenu.button.icon.open}
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"} bg-${
          config.mobileMenu.background
        } backdrop-blur-sm`}
      >
        <div
          className={`pt-4 pb-8 px-8 space-y-${config.navigation.mobile.spacing} border-t border-${config.mobileMenu.border}`}
        >
          {config.navigation.links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setActiveLink(link.name)}
              className={`block px-${config.navigation.mobile.padding.x} py-${
                config.navigation.mobile.padding.y
              } rounded-xl text-${
                config.navigation.mobile.textSize
              } font-medium ${
                activeLink === link.name
                  ? `bg-${config.navigation.mobile.activeBackground} text-${config.navigation.mobile.activeTextColor}`
                  : `text-gray-700 hover:bg-gray-50 hover:text-gray-900`
              }`}
            >
              {link.name}
            </a>
          ))}
          <div
            className={`mt-${config.mobileMenu.sectionSpacing} pt-${config.mobileMenu.sectionSpacing} border-t border-${config.mobileMenu.border} space-y-${config.navigation.mobile.spacing}`}
          >
            <a
              href={config.cta.secondary.href}
              className={`block w-full px-${config.navigation.mobile.padding.x} py-${config.navigation.mobile.padding.y} rounded-xl text-${config.navigation.mobile.textSize} font-medium text-center text-gray-700 hover:bg-gray-50`}
            >
              {config.cta.secondary.text}
            </a>
            <a
              href={config.cta.primary.href}
              className={`block w-full px-${config.navigation.mobile.padding.x} py-${config.navigation.mobile.padding.y} rounded-xl text-${config.navigation.mobile.textSize} font-medium text-center text-white bg-${config.cta.primary.color.from} hover:bg-${config.cta.primary.color.hoverFrom}`}
            >
              {config.cta.primary.text}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

// export default Navbar007;
