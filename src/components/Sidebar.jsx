import React, { useState, useContext, useEffect } from 'react';
import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/24/solid';
// import Draggable from './Draggable';
import { BlockContext } from '../context/miniNavContext';
import final from './lib/db';
import Blocks from './sidebars/subBlocks/blocks';
// import { DraggableItem } from './testable/draggable-sidebar-item.jsx.jsx';
// import { DraggableSidebarItem } from './testable/draggable-container-item.jsx';
// import { DraggableSidebarItem } from './testable/draggable-sidebar-item.jsx';
// import { DraggableComponent } from './testable/draggable-component';

const Sidebar = ({ id, title, isContainer }) => {
  const { close, setClose } = useContext(BlockContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [openCategories, setOpenCategories] = useState({});
  console.log(id)



  const filteredItems = final.filter(item => item?.text?.toLowerCase().includes(searchTerm.toLowerCase()));

  const groupedComponents = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const toggleCategory = (category) => {
    setOpenCategories(prev => ({ ...prev, [category]: !prev[category] }));
  };

  return (

    <aside className="bg-gray-100 p-1 w-full relative">
      <div className='flex container text-[13px] mx-auto p-3 justify-between border-b'>
        <button onClick={() => setClose(!close)} className="font-semibold cursor-pointer">components</button>
        <button onClick={() => setClose(!close)} className="font-semibold cursor-pointer">Layouts</button>
      </div>
      {/* the block component */}
      {close && <Blocks />}
      {!close && (<div className="flex border-b flex-col p-3 gap-2 mt-2">
        <div className="flex rounded-full items-center gap-2 px-2 w-full border rounded focus-within:ring-2 focus-within:ring-blue-400">
          <MagnifyingGlassIcon className="w-4 cursor-pointer text-gray-500" />
          <input
            type="text"
            placeholder="Search Component..."
            className="w-full rounded px-2 py-1 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <XCircleIcon
              className="w-4 cursor-pointer text-gray-500 hover:text-red-500"
              onClick={() => setSearchTerm("")}
            />
          )}
        </div>
      </div>)}
      {!close && (<div className="">
        {/* id="sidebar-container" title="Container" isContainer={true} */}

        {/* <div className="space-y-1">
          {final.map((component, index) => (
            <DraggableComponent
              key={index}
              id={`component-${component.type}`}
              type={component.type}
              label={component.label}
              icon={component.icon}
            />
          ))}
        </div> */}

      </div>)
      }
      {/* <DraggableItem /> */}
    </aside >
  );
};

export default Sidebar;
{/* <div className="space-y-1">
{final.map((component, index) => (
    <DraggableComponent
        key={index}
        id={`component-${component.type}`}
        type={component.type}
        label={component.label}
        icon={component.icon}
    />
))}
</div> */}

// {Object.entries(groupedComponents).map(([category, components]) => (
//   <div key={category} className="mb-4 border-b">
//     <div
//       className="flex justify-between px-2 py-5 items-center cursor-pointer font-semibold text-gray-700"
//       onClick={() => toggleCategory(category)}
//     >
//       {category}
//       <span>{openCategories[category] ? "▲" : "▼"}</span>

//     </div>
//     {/* <hr className='w-full' /> */}
//     {openCategories[category] && (
//       <div className="grid w-full py-4 grid-cols-1 gap-2">
//         {final.map((item, index) => (

//           <DraggableComponent key={index} id={`component-${item.type}`} icon={item.icon} label={item.text} />

//         ))}
//       </div>
//     )}
//   </div>
// ))}