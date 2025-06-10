import { HomeIcon, LayoutIcon, FootprintsIcon as FooterIcon } from 'lucide-react';

// Import all component variations
import { Navbar001 } from './navbars/navbar-001';

// Define categories
export const componentCategories = [
  {
    id: 'navbar',
    label: 'Navbar',
    icon: <HomeIcon className='w-4 h-4 text-purple-500' />,
  },
  {
    id: 'hero',
    label: 'Hero',
    icon: <LayoutIcon className='w-4 h-4 text-purple-500' />,
  },
  {
    id: 'body',
    label: 'Body',
    icon: <LayoutIcon className='w-4 h-4 text-purple-500' />,
  },
  {
    id: 'footer',
    label: 'Footer',
    icon: <FooterIcon className='w-4 h-4 text-purple-500' />,
  },
];

// Define component registry with all variations
const componentRegistry = [
  // Navbar components
  {
    type: 'navbar',
    id: 'navbar-001',
    text: 'Navbar001',
    category: 'navbar',
    icon: <HomeIcon className='w-4 h-4 text-purple-500' />,
    component: <Navbar001 />,
    label: 'Navbar001',
    thumbnail: '/placeholder.svg?height=60&width=100',
    elements: [],
  },
  // ... (rest of the component registry objects)
];

export default componentRegistry;
