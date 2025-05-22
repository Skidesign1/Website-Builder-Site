import ResponsiveNavbar from "../ResponsiveNavbar";
import Body from "../dragableComponnents.jsx/bodyComponent";
import HeroSection from "../dragableComponnents.jsx/herosection";
import { ShoppingCart } from "../dragableComponnents.jsx/shop";
import { PhotoImage } from "../dragableComponnents.jsx/photoimageComponent";
import { CommentSection } from "../dragableComponnents.jsx/commentSectionComponent";
import Footer from "../dragableComponnents.jsx/footer";
import { MagnifyingGlassIcon, XCircleIcon, HomeIcon, Squares2X2Icon, Cog6ToothIcon, QuestionMarkCircleIcon, WrenchScrewdriverIcon, ChartBarIcon, DocumentTextIcon } from '@heroicons/react/24/solid';
const final = [
    { type: 'navbar', id: 'navbar', text: 'Navbar-001', category: 'navbar', icon: <HomeIcon className="w-4 h-4" />, component: <ResponsiveNavbar />, label: 'navbar' },
    { type: 'herosection', id: 'herosection', text: 'hero-001', category: 'herosection', icon: <ChartBarIcon className="w-4 h-4" />, component: <HeroSection />, label: 'herosection' },
    { type: 'body', id: 'body', text: 'body-001', category: 'body', icon: <Cog6ToothIcon className="w-4 h-4" />, component: <Body />, label: 'body' },
    { type: 'shop', id: 'shop', text: 'shop-001', category: 'shop', icon: <ChartBarIcon className="w-4 h-4" />, component: <ShoppingCart />, label: 'shop' },
    { type: 'image', id: 'image', text: 'image-001', category: 'image', icon: <QuestionMarkCircleIcon className="w-4 h-4" />, component: <PhotoImage />, label: 'photoimage' },
    { type: 'comment', id: 'commentsection', text: 'comment-001', category: 'comment', icon: <DocumentTextIcon className="w-4 h-4" />, component: <CommentSection />, label: 'commentsection' },
    { type: 'footer', id: 'footer', text: 'footer-001', category: 'footer', icon: <DocumentTextIcon className="w-4 h-4" />, component: <Footer />, label: 'footer' },
];
export default final
