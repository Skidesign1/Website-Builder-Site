import React, { useState, useContext } from 'react';
import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/24/solid';
import Draggable from './Draggable';
import { BlockContext } from '../context/miniNavContext';
import final from './lib/db';
import Blocks from './sidebars/subBlocks/blocks';

const Sidebar = () => {
  const { close, setClose } = useContext(BlockContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [openCategories, setOpenCategories] = useState({});

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
    <div>
      <aside className="bg-gray-100 h-full w-full relative">
        <div className='flex container text-[13px] mx-auto p-3 justify-between border-b'>
          <button onClick={() => setClose(!close)} className="font-semibold cursor-pointer">components</button>
          <button onClick={() => setClose(!close)} className="font-semibold cursor-pointer">Layouts</button>
        </div>
        {/* the block component */}
        {!close && <Blocks />}
        {close && (<div className="flex border-b flex-col p-3 gap-2 mt-2">
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

        {close && (<div className="">
          {Object.entries(groupedComponents).map(([category, components]) => (
            <div key={category} className="mb-4 border-b">
              <div
                className="flex justify-between px-2 py-5 items-center cursor-pointer font-semibold text-gray-700"
                onClick={() => toggleCategory(category)}
              >
                {category}
                <span>{openCategories[category] ? "▲" : "▼"}</span>

              </div>
              {/* <hr className='w-full' /> */}
              {openCategories[category] && (
                <div className="grid w-full py-4 grid-cols-1 gap-2">
                  {components.map((item) => (

                    <Draggable key={item.id} id={item.id} icon={item.icon} name={item.text} component={item.component} />

                  ))}
                </div>
              )}
            </div>
          ))}
        </div>)}
      </aside>

    </div>
  );
};

export default Sidebar;
