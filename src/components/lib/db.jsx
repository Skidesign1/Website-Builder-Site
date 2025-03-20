import ResponsiveNavbar from "../ResponsiveNavbar";
import { blocks } from "../sidebars/subBlocks/blocks";
import Body from "../dragableComponnents.jsx/bodyComponent";
import HeroSection from "../dragableComponnents.jsx/herosection";
import { ShoppingCart } from "../dragableComponnents.jsx/shop";
import { PhotoImage } from "../dragableComponnents.jsx/photoimageComponent";
import { CommentSection } from "../dragableComponnents.jsx/commentSectionComponent";
import Footer from "../dragableComponnents.jsx/footer";
import { MagnifyingGlassIcon, XCircleIcon, HomeIcon, Squares2X2Icon, Cog6ToothIcon, QuestionMarkCircleIcon, WrenchScrewdriverIcon, ChartBarIcon, DocumentTextIcon } from '@heroicons/react/24/solid';
export const database = [
    { id: 'navbar', text: 'Navbar', icon: <HomeIcon className="w-4 h-4" />, component: <ResponsiveNavbar /> },
    { id: 'body', text: 'body', icon: <Cog6ToothIcon className="w-4 h-4" />, component: <Body /> },
    { id: 'hero', text: 'hero', icon: <ChartBarIcon className="w-4 h-4" />, component: <HeroSection /> },
    { id: 'shop', text: 'shop', icon: <ChartBarIcon className="w-4 h-4" />, component: <ShoppingCart /> },
    { id: 'image', text: 'image', icon: <QuestionMarkCircleIcon className="w-4 h-4" />, component: <PhotoImage /> },
    { id: 'comment', text: 'comment', icon: <DocumentTextIcon className="w-4 h-4" />, component: <CommentSection /> },
    { id: 'footer', text: 'footer', icon: <DocumentTextIcon className="w-4 h-4" />, component: <Footer /> },
];
let final = [...blocks, ...database]
export default final
