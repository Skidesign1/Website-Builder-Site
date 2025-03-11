import React, { useState } from 'react';  
import { 
  MinusIcon, PlusIcon, ArrowPathIcon, DocumentIcon, PhotoIcon, 
  ArchiveBoxIcon, AdjustmentsHorizontalIcon 
} from '@heroicons/react/24/solid';  
import { PencilSquareIcon } from '@heroicons/react/24/outline';  

const resolutions = {
  "Mobile Resolutions": [
    { label: '320 x 480 — iPhone 4', size: [320, 480] },
    { label: '320 x 568 — iPhone 5/SE', size: [320, 568] },
    { label: '360 x 640 — Small Android Phones', size: [360, 640] },
    { label: '375 x 667 — iPhone 6/7/8', size: [375, 667] },
    { label: '375 x 812 — iPhone X/11/12/13', size: [375, 812] },
    { label: '360 x 740 — Samsung Galaxy S8', size: [360, 740] },
    { label: '411 x 731 — Google Pixel 2', size: [411, 731] },
    { label: '412 x 869 — Google Pixel 4', size: [412, 869] },
    { label: '412 x 915 — Samsung Galaxy S20 Ultra', size: [412, 915] },
    { label: '414 x 736 — iPhone 8 Plus', size: [414, 736] },
    { label: '414 x 896 — iPhone XR', size: [414, 896] }
  ],
  "Tablet Resolutions": [
    { label: '600 x 960 — Small Tablets (Generic)', size: [600, 960] },
    { label: '768 x 1024 — iPad Mini / iPad (9.7")', size: [768, 1024] },
    { label: '800 x 1280 — Samsung Galaxy Tab', size: [800, 1280] },
    { label: '834 x 1194 — iPad Pro 11"', size: [834, 1194] },
    { label: '912 x 1368 — Microsoft Surface Pro 7', size: [912, 1368] },
    { label: '1024 x 1366 — iPad Pro 12.9"', size: [1024, 1366] }
  ],
  "Laptop Resolutions": [
    { label: '1280 x 720 — Standard HD Laptops', size: [1280, 720] },
    { label: '1280 x 800 — MacBook Air 11"', size: [1280, 800] },
    { label: '1366 x 768 — Chromebook / Standard Laptop', size: [1366, 768] },
    { label: '1440 x 900 — MacBook Air 13"', size: [1440, 900] },
    { label: '1920 x 1080 — Dell XPS 13 / Full HD Laptops', size: [1920, 1080] },
    { label: '2560 x 1600 — MacBook Pro 13"', size: [2560, 1600] },
    { label: '3024 x 1964 — MacBook Pro 14"', size: [3024, 1964] },
    { label: '3840 x 2160 — 4K High-end Laptops', size: [3840, 2160] }
  ],
  "Desktop Resolutions": [
    { label: '1366 x 768 — Small Desktop Monitors', size: [1366, 768] },
    { label: '1600 x 900 — Medium Desktop Monitors', size: [1600, 900] },
    { label: '1920 x 1080 — Full HD Monitors', size: [1920, 1080] },
    { label: '2560 x 1440 — Quad HD Monitors', size: [2560, 1440] },
    { label: '3440 x 1440 — Ultra-wide Monitors', size: [3440, 1440] },
    { label: '3840 x 2160 — 4K UHD Monitors', size: [3840, 2160] },
    { label: '5120 x 1440 — Super Ultra-wide Monitors', size: [5120, 1440] },
    { label: '5120 x 2880 — 5K Display Monitors', size: [5120, 2880] }
  ]
};

const Navbar = ({
  onReset,
  onDuplicate,
  onRemove,
  onChangeView,
  onDocsToggle,
  onAddPhoto,
  onSave,
  onOpenSettings,
  onToggleEditor
}) => {
  const [selectedResolution, setSelectedResolution] = useState("");

  const handleResolutionChange = (event) => {
    const selectedSize = event.target.value.split("x").map(Number);
    setSelectedResolution(event.target.value);
    onChangeView(selectedSize);
  };

  return (
    <nav className="top-0 left-0 w-full bg-gray-100 h-16 flex items-center justify-between px-5 border-b-2 border-gray-300 z-50">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-800 font-bold text-sm">Canvas</span>
        <span className="text-gray-800 font-bold text-sm">Docs</span>
        <span className="text-gray-800 font-bold text-sm">|</span>
        <button onClick={onRemove} className="text-gray-800 hover:text-red-500 transition" title="Remove Item">
          <MinusIcon className="w-5 h-5" />
        </button>
        <button onClick={onDuplicate} className="text-gray-800 hover:text-blue-500 transition" title="Duplicate Item">
          <PlusIcon className="w-5 h-5" />
        </button>
        <button onClick={onReset} className="text-gray-800 hover:text-green-500 transition" title="Reset View">
          <ArrowPathIcon className="w-5 h-5" />
        </button>
        <button onClick={onDocsToggle} className="text-gray-800 hover:text-yellow-500 transition" title="Toggle Docs">
          <DocumentIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Resolution Dropdown */}
        <select
          value={selectedResolution}
          onChange={handleResolutionChange}
          className="p-1 text-gray-800 border rounded-md"
        >
          <option value="" disabled>Select Resolution</option>
          {Object.entries(resolutions).map(([category, resList]) => (
            <optgroup key={category} label={category}>
              {resList.map((res) => (
                <option key={res.label} value={res.size.join("x")}>
                  {res.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>

        {/* Action Buttons */}
        <button onClick={onAddPhoto} className="text-gray-800 hover:text-indigo-500 transition" title="Add Photo">
          <PhotoIcon className="w-5 h-5" />
        </button>
        <button onClick={onSave} className="text-gray-800 hover:text-green-500 transition" title="Save">
          <ArchiveBoxIcon className="w-5 h-5" />
        </button>
        <button onClick={onOpenSettings} className="text-gray-800 hover:text-gray-500 transition" title="Settings">
          <AdjustmentsHorizontalIcon className="w-5 h-5" />
        </button>
        <button onClick={onToggleEditor} className="text-gray-800 hover:text-purple-500 transition" title="Edit Website">
          <PencilSquareIcon className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
