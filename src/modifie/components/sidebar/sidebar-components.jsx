import {
  HomeIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline"
import ResponsiveNavbar from "../../../components/ResponsiveNavbar"
import { CommentSection } from "../../../components/dragableComponnents.jsx/commentSectionComponent"
import HeroSection from "../../../components/dragableComponnents.jsx/herosection"
import ShoppingCart from "./components/shopping-cart"
import PhotoImage from "./components/photo-image"
// import Footer from "./components/footer"
import Footer from "../../../components/dragableComponnents.jsx/footer"
import Body from "../../../components/dragableComponnents.jsx/bodyComponent"
// import HeroSection from "./components/hero-section"


const sidebarComponents = [
  {
    type: "navbar",
    id: "navbar",
    text: "Navbar-001",
    category: "navbar",
    icon: <HomeIcon className="w-4 h-4" />,
    component: <ResponsiveNavbar />,
    label: "navbar",
  },
  {
    type: "herosection",
    id: "herosection",
    text: "hero-001",
    category: "herosection",
    icon: <ChartBarIcon className="w-4 h-4" />,
    component: <HeroSection />,
    label: "herosection",
  },
  {
    type: "body",
    id: "body",
    text: "body-001",
    category: "body",
    icon: <Cog6ToothIcon className="w-4 h-4" />,
    component: <Body />,
    label: "body",
  },
  {
    type: "shop",
    id: "shop",
    text: "shop-001",
    category: "shop",
    icon: <ChartBarIcon className="w-4 h-4" />,
    component: <ShoppingCart />,
    label: "shop",
  },
  {
    type: "image",
    id: "image",
    text: "image-001",
    category: "image",
    icon: <QuestionMarkCircleIcon className="w-4 h-4" />,
    component: <PhotoImage />,
    label: "photoimage",
  },
  {
    type: "comment",
    id: "commentsection",
    text: "comment-001",
    category: "comment",
    icon: <DocumentTextIcon className="w-4 h-4" />,
    component: <CommentSection />,
    label: "commentsection",
  },
  {
    type: "footer",
    id: "footer",
    text: "footer-001",
    category: "footer",
    icon: <DocumentTextIcon className="w-4 h-4" />,
    component: <Footer />,
    label: "footer",
  },
]

export default sidebarComponents

