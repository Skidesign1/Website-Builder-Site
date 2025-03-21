import React, { useState, useContext } from 'react';
import { MagnifyingGlassIcon, XCircleIcon, HomeIcon, Squares2X2Icon, Cog6ToothIcon, QuestionMarkCircleIcon, WrenchScrewdriverIcon, ChartBarIcon, DocumentTextIcon } from '@heroicons/react/24/solid';
import Draggable from './Draggable';
import { BlockContext } from '../context/miniNavContext';
import final from './lib/db';


const Sidebar = () => {
  let { close, setClose } = useContext(BlockContext)
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCoreItems = final.filter(item => item?.text?.toLowerCase().includes(searchTerm.toLowerCase()));
  function handBlockNav() {
    setClose(!close)
  }
  return (
    <div> {!close && (
      <aside className="bg-gray-100 h-full w-full p-4 relative">
        {/* Sidebar Header */}
        <button onClick={handBlockNav} className=''>Blocks</button>
        <div className="flex flex-col gap-2 justify-start items-center mt-2">
          <h6><strong>dnd kit</strong></h6>
          <div className="flex items-center gap-2 px-1 w-full border rounded focus-within:ring-2 focus-within:ring-blue-400">
            <MagnifyingGlassIcon className="w-4 cursor-pointer text-gray-500 ml-2" />
            <input
              type="text"
              placeholder="Search component"
              className="w-full px-2 py-1 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <XCircleIcon
                className="w-4 cursor-pointer text-gray-500 hover:text-red-500 mr-2"
                onClick={() => setSearchTerm("")}
              />
            )}
          </div>
        </div>

        {/* Scrollable section for components */}
        <div>
          {/* Core Components */}
          <h2 className="mt-5"><strong>Components</strong></h2>
          <ul className="w-full relative">
            {filteredCoreItems.length > 0 ? (
              filteredCoreItems.map(item => (
                <li key={item.id} className="flex items-center gap-2 p-1 hover:bg-gray-200 rounded">
                  <Draggable id={item.id} icon={item.icon} name={item.text} component={item.component} />
                </li>
              ))
            ) : (
              <p className="text-gray-500">No components found</p>
            )}
          </ul>

          {/* Example Components */}
          {/* <h2 className="mt-3"><strong>Examples</strong></h2>
        <ul className="w-full">
          {filteredPresentsItems.length > 0 ? (
            filteredPresentsItems.map(item => (
              <li key={item.id} className="flex items-center gap-1 p-1 hover:bg-gray-200 rounded">
                <Draggable component={item.component} id={item.id} icon={item.icon} name={item.text} />
              </li>
            ))
          ) : (
            <p className="text-gray-500">No examples found</p>
          )}
        </ul> */}
        </div>
      </aside>)}
    </div>
  )
};

export default Sidebar;
