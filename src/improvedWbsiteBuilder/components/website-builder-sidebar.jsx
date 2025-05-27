'use client';
import { useState, useEffect } from 'react';
import {
  Search,
  Move,
  Layers,
  ChevronDown,
  Settings,
  Type,
  Image as ImageIcon,
  Film,
  PlayCircle,
  MousePointerClick,
  LayoutPanelLeft,
} from 'lucide-react'; // Added more icons for categories
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'; // Adjust path if needed: e.g., ../ui/tabs
import { DraggableSidebarItem } from './draggable-sidebar-item'; // Adjust path if needed
import { PageTabs } from './page-tabs'; // Adjust path if needed
import { LayoutView } from './layout-view'; // Adjust path if needed
import { cn } from '../lib/utils'; // Adjust path if needed
import { DraggableComponent } from './draggable-component'; // Adjust path if needed
import { Input } from './ui/input'; // Adjust path if needed

// Helper to map icon names to Lucide components (extend as needed)
const categoryIcons = {
  text: <Type className='w-4 h-4 mr-2 text-gray-400' />,
  media: <ImageIcon className='w-4 h-4 mr-2 text-gray-400' />,
  interactive: <MousePointerClick className='w-4 h-4 mr-2 text-gray-400' />,
  layout: <LayoutPanelLeft className='w-4 h-4 mr-2 text-gray-400' />,
  default: <Settings className='w-4 h-4 mr-2 text-gray-400' />, // Fallback icon
};

export function WebsiteBuilderSidebar({
  pages,
  activePage,
  containers,
  onPageChange,
  onCreatePage,
  onRenamePage,
  onDeletePage,
  onDeleteContainer,
  onDeleteComponent,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('components');
  const [expandedCategories, setExpandedCategories] = useState({});
  const [categories, setCategories] = useState([]);
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('https://website-builder-site-1.onrender.com/api/components');
        if (!res.ok) {
          const errorData = await res.text(); // Try to get more error info
          throw new Error(
            `HTTP error! status: ${res.status}, message: ${errorData || res.statusText}`
          );
        }
        const data = await res.json();
        const fetchedCategories = data.categories || [];
        setCategories(fetchedCategories);
        setComponents(data.components || []);

        const initialExpanded = {};
        fetchedCategories.forEach(cat => (initialExpanded[cat.id] = true)); // Default to expand all
        setExpandedCategories(initialExpanded);

        // Example: Find Navbar component config. Ensure 'Navbar' is the correct type.
        // const navbarComponent = (data.components || []).find(c => c.type === 'Navbar');
        // if (navbarComponent) window.NavbarConfig = navbarComponent.config;

        setLoading(false);
      } catch (err) {
        console.error('Fetch error in Sidebar:', err);
        setError(`Failed to load components. ${err.message}`);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleCategory = categoryId => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const filteredComponents = components.filter(component => {
    const searchTermLower = searchTerm.toLowerCase();
    const categoryData = categories.find(cat => cat.id === component.category);
    return (
      component.label?.toLowerCase().includes(searchTermLower) ||
      categoryData?.label?.toLowerCase().includes(searchTermLower) // Search by category label
    );
  });

  const groupedComponents = categories
    .map(category => {
      const comps = filteredComponents.filter(component => component.category === category.id);
      return {
        ...category,
        components: comps,
      };
    })
    .filter(category => category.components.length > 0 || searchTerm === ''); // Keep category if it has components or if there's an active search (to show "no results in category")

  if (loading) {
    return (
      <div className='bg-[#222222] text-gray-300 p-4 min-h-screen flex items-center justify-center'>
        Loading components...
      </div>
    );
  }
  if (error) {
    return (
      <div className='bg-[#222222] text-red-400 p-4 min-h-screen flex flex-col items-center justify-center text-center'>
        {error}
      </div>
    );
  }

  return (
    <div className='no-scrollbar bg-[#222222] text-white p-2.5 h-screen flex flex-col'>
      <Tabs
        defaultValue='components'
        value={activeTab}
        onValueChange={setActiveTab}
        className='h-full flex flex-col'>
        <TabsList className='grid w-full grid-cols-2 mb-3 bg-[#2d2d2d] border border-[#444] rounded-md p-0.5'>
          <TabsTrigger
            value='components'
            className='data-[state=active]:bg-[#4a4a4a] data-[state=active]:text-white text-gray-300 rounded-[5px] py-1.5 text-xs'>
            Components
          </TabsTrigger>
          <TabsTrigger
            value='layouts'
            className='data-[state=active]:bg-[#4a4a4a] data-[state=active]:text-white text-gray-300 rounded-[5px] py-1.5 text-xs'>
            Layers
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value='components'
          className='space-y-3 flex-grow overflow-y-auto no-scrollbar pr-0.5'>
          <div className='relative'>
            <Search className='absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400' />
            <Input
              placeholder='Search Components...'
              className='pl-8 h-9 bg-[#2d2d2d] border-[#444] text-white rounded-md focus:border-primary placeholder:text-gray-500 text-xs'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <div className='border border-[#444] rounded-md'>
            <DraggableSidebarItem id='sidebar-container' title='Container' isContainer={true}>
              <div className='flex items-center p-2.5 bg-[#2d2d2d] hover:bg-[#383838] rounded-md cursor-grab transition-colors'>
                <Move className='mr-2 h-4 w-4 text-gray-400' />
                <span className='text-xs text-gray-200'>Container</span>
              </div>
            </DraggableSidebarItem>
          </div>

          <div className='space-y-2'>
            {groupedComponents.map(category => (
              <div
                key={category.id}
                className='border border-[#444] rounded-md overflow-hidden bg-[#2d2d2d]'>
                <button
                  className='w-full flex items-center justify-between p-2.5 bg-[#333333] hover:bg-[#3a3a3a] transition-colors'
                  onClick={() => toggleCategory(category.id)}>
                  <div className='flex items-center'>
                    {categoryIcons[category.iconKey] || categoryIcons.default}
                    <span className='font-medium text-xs text-gray-200'>{category.label}</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 text-gray-400 transition-transform',
                      expandedCategories[category.id] ? 'rotate-180' : ''
                    )}
                  />
                </button>

                {expandedCategories[category.id] && (
                  <div className='p-2 grid grid-cols-2 gap-1.5 bg-[#2d2d2d]'>
                    {category.components.map(component => (
                      <DraggableComponent
                        key={component.id}
                        id={component.id}
                        type={component.type}
                        label={component.label}
                        icon={categoryIcons[component.iconKey] || categoryIcons.default} // Pass an icon to DraggableComponent if it supports it
                        thumbnail={component.thumbnail}
                        component={component}
                        // DraggableComponent should be styled internally like:
                        // className="bg-[#383838] p-2 rounded-md text-center cursor-grab hover:bg-[#444444] text-xs text-gray-300"
                      />
                    ))}
                    {category.components.length === 0 && (
                      <p className='col-span-2 text-[11px] text-gray-500 text-center py-3'>
                        {searchTerm
                          ? `No components match "${searchTerm}" in this category.`
                          : `No components in this category.`}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
            {groupedComponents.length === 0 && searchTerm !== '' && (
              <p className='text-xs text-gray-400 text-center py-4'>
                No components found for "{searchTerm}".
              </p>
            )}
          </div>

          {/* Spacer to push PageTabs to bottom if content is short, hidden if content is scrollable */}
          <div className='flex-grow'></div>

          <div className='mt-auto pt-3'>
            <h3 className='text-[10px] font-semibold text-gray-500 uppercase mb-1.5 px-1 tracking-wider'>
              Pages
            </h3>
            <PageTabs
              pages={pages}
              activePage={activePage}
              onPageChange={onPageChange}
              onCreatePage={onCreatePage}
              onRenamePage={onRenamePage}
              onDeletePage={onDeletePage}
              // PageTabs needs internal styling for dark theme
              // e.g. itemClass="bg-[#2d2d2d] hover:bg-[#383838] text-xs ..."
              //      activeItemClass="bg-[#4a4a4a] text-white ..."
            />
          </div>
        </TabsContent>

        <TabsContent
          value='layouts'
          className='flex-grow overflow-y-auto no-scrollbar pr-0.5 space-y-3'>
          <div className='flex items-center'>
            <Layers className='h-4 w-4 mr-1.5 text-gray-400' />
            <h3 className='text-xs font-medium text-gray-200'>Page Layers</h3>
          </div>
          <LayoutView
            containers={containers}
            activePage={activePage}
            onDeleteContainer={onDeleteContainer}
            onDeleteComponent={onDeleteComponent}
            // LayoutView needs internal styling for dark theme
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Assumptions for DraggableComponent (conceptual internal styling):
// If DraggableComponent were defined here, it might look like:
/*
function DraggableComponent({ id, type, label, icon, thumbnail, component }) {
  return (
    <div 
      // Dnd-kit attributes would go here
      className="bg-[#383838] p-3 rounded text-center cursor-grab hover:bg-[#444444] transition-colors flex flex-col items-center space-y-1.5"
    >
      {icon || <ImageIcon className="w-5 h-5 text-gray-400" />}
      <span className="text-[11px] text-gray-300 leading-tight">{label}</span>
    </div>
  );
}
*/
