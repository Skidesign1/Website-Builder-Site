import ResponsiveNavbar from "../ResponsiveNavbar";
import Body from "../dragableComponnents.jsx/bodyComponent";
import HeroSection from "../dragableComponnents.jsx/herosection";
import { ShoppingCart } from "../dragableComponnents.jsx/shop";
import { PhotoImage } from "../dragableComponnents.jsx/photoimageComponent";
import { CommentSection } from "../dragableComponnents.jsx/commentSectionComponent";
import Footer from "../dragableComponnents.jsx/footer";
import { MagnifyingGlassIcon, XCircleIcon, HomeIcon, Squares2X2Icon, Cog6ToothIcon, QuestionMarkCircleIcon, WrenchScrewdriverIcon, ChartBarIcon, DocumentTextIcon } from '@heroicons/react/24/solid';
const final = [
    { id: 'navbar', text: 'Navbar-001', category: 'navbar', icon: <HomeIcon className="w-4 h-4" />, component: <ResponsiveNavbar /> },
    { id: 'hero', text: 'hero-001', category: 'hero', icon: <ChartBarIcon className="w-4 h-4" />, component: <HeroSection /> },
    { id: 'body', text: 'body-001', category: 'body', icon: <Cog6ToothIcon className="w-4 h-4" />, component: <Body /> },
    { id: 'shop', text: 'shop-001', category: 'shop', icon: <ChartBarIcon className="w-4 h-4" />, component: <ShoppingCart /> },
    { id: 'image', text: 'image-001', category: 'image', icon: <QuestionMarkCircleIcon className="w-4 h-4" />, component: <PhotoImage /> },
    { id: 'comment', text: 'comment-001', category: 'comment', icon: <DocumentTextIcon className="w-4 h-4" />, component: <CommentSection /> },
    { id: 'footer', text: 'footer-001', category: 'footer', icon: <DocumentTextIcon className="w-4 h-4" />, component: <Footer /> },
];
export default final
