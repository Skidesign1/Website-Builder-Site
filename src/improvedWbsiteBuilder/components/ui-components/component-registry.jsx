import { HomeIcon, LayoutIcon, FootprintsIcon as FooterIcon } from "lucide-react"

// Import all component variations
import { Navbar001 } from "./navbars/navbar-001"
import { Navbar002 } from "./navbars/navbar-002"
import { Navbar003 } from "./navbars/navbar-003"
import { Navbar004 } from "./navbars/navbar-004"
import { Navbar005 } from "./navbars/navbar-005"
import { Navbar006 } from "./navbars/navbar-006"

import { Hero001 } from "./heroes/hero-001"
import { Hero002 } from "./heroes/hero-002"
import { Hero003 } from "./heroes/hero-003"
import { Hero004 } from "./heroes/hero-004"
import  Hero006 from "./heroes/hero-006/Hero006" 
import  Hero006Config  from "./heroes/hero-006/Hero006.config.json"

import { Body001 } from "./bodies/body-001"
import { Body002 } from "./bodies/body-002"

import { Footer001 } from "./footers/footer-001"
import { Footer002 } from "./footers/footer-002"
import { Footer003 } from "./footers/footer-003"
import { Navbar007 } from "./navbars/navbar007/navbar-007"
import { Footer004 } from "./footers/footer-004"
import Footer005 from "./footers/footer05/Footer-005"

import config from "./navbars/navbar007/Config.json"
import footerConfig from "./footers/footer05/FooterConfig.json"

import ResponsiveNavbar from "../../../components/ResponsiveNavbar"
import HeroSection from "../../../components/dragableComponnents.jsx/herosection"
import Body from "../../../components/dragableComponnents.jsx/bodyComponent"
import Footer from "../../../components/dragableComponnents.jsx/footer"
// Define categories
export const componentCategories = [
  {
    id: "navbar",
    label: "Navbar",
    icon: <HomeIcon className="w-4 h-4 text-purple-500" />,
  },
  {
    id: "hero",
    label: "Hero",
    icon: <LayoutIcon className="w-4 h-4 text-purple-500" />,
  },
  {
    id: "body",
    label: "Body",
    icon: <LayoutIcon className="w-4 h-4 text-purple-500" />,
  },
  {
    id: "footer",
    label: "Footer",
    icon: <FooterIcon className="w-4 h-4 text-purple-500" />,
  },
]

// Define component registry with all variations
const componentRegistry = [
  // Navbar components
  {
    type: "navbar",
    id: "navbar-001",
    text: "Navbar001",
    category: "navbar",
    icon: <HomeIcon className="w-4 h-4 text-purple-500" />,
    component: <Navbar001 />,
    label: "Navbar001",
    thumbnail: "/placeholder.svg?height=60&width=100",
  },
  {
    type: "navbar",
    id: "navbar-002",
    text: "Navbar002",
    category: "navbar",
    icon: <HomeIcon className="w-4 h-4 text-purple-500" />,
    component: <Navbar002 />,
    label: "Navbar002",
    thumbnail: "/placeholder.svg?height=60&width=100",
  },
  {
    type: "navbar",
    id: "navbar-003",
    text: "Navbar003",
    category: "navbar",
    icon: <HomeIcon className="w-4 h-4 text-purple-500" />,
    component: <Navbar003 />,
    label: "Navbar003",
    thumbnail: "/placeholder.svg?height=60&width=100",
  },
  {
    type: "navbar",
    id: "navbar-004",
    text: "Navbar004",
    category: "navbar",
    icon: <HomeIcon className="w-4 h-4 text-purple-500" />,
    component: <Navbar004 />,
    label: "Navbar004",
    thumbnail: "/placeholder.svg?height=60&width=100",
  },
  {
    type: "navbar",
    id: "navbar-005",
    text: "Navbar005",
    category: "navbar",
    icon: <HomeIcon className="w-4 h-4 text-purple-500" />,
    component: <Navbar005 />,
    label: "Navbar005",
    thumbnail: "/placeholder.svg?height=60&width=100",
  },
  {
    type: "navbar",
    id: "navbar-006",
    text: "Navbar006",
    category: "navbar",
    icon: <HomeIcon className="w-4 h-4 text-purple-500" />,
    component: <Navbar006 />,
    label: "Navbar006",
    thumbnail: "/placeholder.svg?height=60&width=100",
  },
  {
    type: "navbar",
    id: "navbar-007",
    text: "Navbar007",
    category: "navbar",
    icon: <HomeIcon className="w-4 h-4 text-purple-500" />,
    component: <Navbar007 />,
    config: {
      name: 'Config',
      file: config
    },
    label: "Navbar007",
    thumbnail: "/placeholder.svg?height=60&width=100",
  },
  {
    type: "navbar",
    id: "navbar-008",
    text: "Navbar008",
    category: "navbar",
    icon: <HomeIcon className="w-4 h-4 text-purple-500" />,
    component: <ResponsiveNavbar />,
    config: {
      name: 'Config',
      file: config
    },
    label: "Navbar008",
    thumbnail: "/placeholder.svg?height=60&width=100",
  },

  // Hero components
  {
    type: "hero",
    id: "hero-001",
    text: "Hero001",
    category: "hero",
    icon: <LayoutIcon className="w-4 h-4 text-purple-500" />,
    component: <Hero001 />,
    label: "Hero001",
    thumbnail: "/placeholder.svg?height=60&width=100",
  },
  {
    type: "hero",
    id: "hero-002",
    text: "Hero002",
    category: "hero",
    icon: <LayoutIcon className="w-4 h-4 text-purple-500" />,
    component: <Hero002 />,
    label: "Hero002",
    thumbnail: "/placeholder.svg?height=60&width=100",
  },
  {
    type: "hero",
    id: "hero-003",
    text: "Hero003",
    category: "hero",
    icon: <LayoutIcon className="w-4 h-4 text-purple-500" />,
    component: <Hero003 />,
    label: "Hero003",
    thumbnail: "/placeholder.svg?height=60&width=100",
  },
  {
    type: "hero",
    id: "hero-004",
    text: "Hero004",
    category: "hero",
    icon: <LayoutIcon className="w-4 h-4 text-purple-500" />,
    component: <Hero004 />,
    label: "Hero004",
    thumbnail: "/placeholder.svg?height=60&width=100",
  },
  {
    type: "hero",
    id: "hero-005",
    text: "Hero005",
    category: "hero",
    icon: <LayoutIcon className="w-4 h-4 text-purple-500" />,
    component: <HeroSection />,
    label: "Hero005",
    thumbnail: "/placeholder.svg?height=60&width=100",
  },

  

  {
    type: "hero",
    id: "hero-006",
    text: "Hero006",
    category: "hero",
    icon: <FooterIcon className="w-4 h-4 text-purple-500" />,
    component: <Hero006 />,
    config: {
      name: 'Config',
      file: Hero006Config
    },
    label: "Hero006",
    thumbnail: "/placeholder.svg?height=60&width=100",
  },









  // Body components
  {
    type: "body",
    id: "body-001",
    text: "Body001",
    category: "body",
    icon: <LayoutIcon className="w-4 h-4 text-purple-500" />,
    component: <Body001 />,
    label: "Body001",
    thumbnail: "/placeholder.svg?height=60&width=100",
  },
  {
    type: "body",
    id: "body-002",
    text: "Body002",
    category: "body",
    icon: <LayoutIcon className="w-4 h-4 text-purple-500" />,
    component: <Body002 />,
    label: "Body002",
    thumbnail: "/placeholder.svg?height=60&width=100",
  },
  {
    type: "body",
    id: "body-003",
    text: "Body003",
    category: "body",
    icon: <LayoutIcon className="w-4 h-4 text-purple-500" />,
    component: <Body />,
    label: "Body003",
    thumbnail: "/placeholder.svg?height=60&width=100",
  },

  // Footer components
  {
    type: "footer",
    id: "footer-001",
    text: "Footer001",
    category: "footer",
    icon: <FooterIcon className="w-4 h-4 text-purple-500" />,
    component: <Footer001 />,
    label: "Footer001",
    thumbnail: "/placeholder.svg?height=60&width=100",
  },
  {
    type: "footer",
    id: "footer-002",
    text: "Footer002",
    category: "footer",
    icon: <FooterIcon className="w-4 h-4 text-purple-500" />,
    component: <Footer002 />,
    label: "Footer002",
    thumbnail: "/placeholder.svg?height=60&width=100",
  },
  {
    type: "footer",
    id: "footer-003",
    text: "Footer003",
    category: "footer",
    icon: <FooterIcon className="w-4 h-4 text-purple-500" />,
    component: <Footer003 />,
    label: "Footer003",
    thumbnail: "/placeholder.svg?height=60&width=100",
  },
  {
    type: "footer",
    id: "footer-004",
    text: "Footer004",
    category: "footer",
    icon: <FooterIcon className="w-4 h-4 text-purple-500" />,
    component: <Footer004 />,
    label: "Footer004",
    thumbnail: "/placeholder.svg?height=60&width=100",
  },
  {
    type: "footer",
    id: "footer-005",
    text: "Footer005",
    category: "footer",
    icon: <FooterIcon className="w-4 h-4 text-purple-500" />,
    component: <Footer005 />,
    config: {
      name: 'Config',
      file: footerConfig
    },
    label: "Footer005",
    thumbnail: "/placeholder.svg?height=60&width=100",
  },
  {
    type: "footer",
    id: "footer-006",
    text: "Footer006",
    category: "footer",
    icon: <FooterIcon className="w-4 h-4 text-purple-500" />,
    component: <Footer />,
    label: "Footer006",
    thumbnail: "/placeholder.svg?height=60&width=100",
  },
]

export default componentRegistry
