// Placeholder components for demonstration
const ResponsiveNavbar = () => (
  <div className="w-full bg-primary text-white p-4 rounded-md">
    <div className="flex justify-between items-center">
      <div className="font-bold">Logo</div>
      <div className="hidden md:flex space-x-4">
        <span>Home</span>
        <span>About</span>
        <span>Services</span>
        <span>Contact</span>
      </div>
      <div className="md:hidden">Menu</div>
    </div>
  </div>
);

const HeroSection = () => (
  <div className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-8 rounded-md">
    <h1 className="text-3xl font-bold mb-4">Welcome to Our Website</h1>
    <p className="mb-6">The best services for your needs</p>
    <button className="bg-white text-purple-600 px-4 py-2 rounded-md">
      Get Started
    </button>
  </div>
);

const Body = () => (
  <div className="w-full bg-background p-6 rounded-md border">
    <h2 className="text-xl font-semibold mb-4">Our Services</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 border rounded-md">Service 1</div>
      <div className="p-4 border rounded-md">Service 2</div>
      <div className="p-4 border rounded-md">Service 3</div>
      <div className="p-4 border rounded-md">Service 4</div>
    </div>
  </div>
);

const ShoppingCart = () => (
  <div className="w-full bg-background p-6 rounded-md border">
    <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
    <div className="space-y-2">
      <div className="flex justify-between p-2 border-b">
        <span>Product 1</span>
        <span>$19.99</span>
      </div>
      <div className="flex justify-between p-2 border-b">
        <span>Product 2</span>
        <span>$29.99</span>
      </div>
      <div className="flex justify-between p-2 font-bold">
        <span>Total</span>
        <span>$49.98</span>
      </div>
    </div>
    <button className="mt-4 bg-primary text-white px-4 py-2 rounded-md w-full">
      Checkout
    </button>
  </div>
);

const PhotoImage = () => (
  <div className="w-full rounded-md overflow-hidden">
    <div className="aspect-video bg-muted flex items-center justify-center">
      <span className="text-4xl">🖼️</span>
    </div>
    <div className="p-2 bg-background">
      <p className="font-medium">Image Title</p>
      <p className="text-sm text-muted-foreground">
        Image description goes here
      </p>
    </div>
  </div>
);

const CommentSection = () => (
  <div className="w-full bg-background p-6 rounded-md border">
    <h2 className="text-xl font-semibold mb-4">Comments</h2>
    <div className="space-y-4">
      <div className="p-3 bg-muted rounded-md">
        <div className="font-medium">User 1</div>
        <p>This is a great product! I love it.</p>
      </div>
      <div className="p-3 bg-muted rounded-md">
        <div className="font-medium">User 2</div>
        <p>I've been using this for a month and it works perfectly.</p>
      </div>
    </div>
    <div className="mt-4">
      <textarea
        className="w-full p-2 border rounded-md"
        placeholder="Add a comment..."
      ></textarea>
      <button className="mt-2 bg-primary text-white px-4 py-2 rounded-md">
        Submit
      </button>
    </div>
  </div>
);

const Footer = () => (
  <div className="w-full bg-gray-800 text-white p-6 rounded-md">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <h3 className="font-bold mb-2">About Us</h3>
        <p className="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <div>
        <h3 className="font-bold mb-2">Links</h3>
        <ul className="text-sm space-y-1">
          <li>Home</li>
          <li>Services</li>
          <li>Contact</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
      <div>
        <h3 className="font-bold mb-2">Contact</h3>
        <p className="text-sm">Email: info@example.com</p>
        <p className="text-sm">Phone: (123) 456-7890</p>
      </div>
    </div>
    <div className="mt-4 pt-4 border-t border-gray-700 text-center text-sm">
      © 2023 Your Company. All rights reserved.
    </div>
  </div>
);

// Mock icons
const HomeIcon = () => <div className="w-4 h-4">🏠</div>;
const ChartBarIcon = () => <div className="w-4 h-4">📊</div>;
const Cog6ToothIcon = () => <div className="w-4 h-4">⚙️</div>;
const QuestionMarkCircleIcon = () => <div className="w-4 h-4">❓</div>;
const DocumentTextIcon = () => <div className="w-4 h-4">📄</div>;

const final = [
  {
    type: "navbar",
    id: "navbar",
    text: "Navbar-001",
    category: "navbar",
    icon: <HomeIcon />,
    component: <ResponsiveNavbar />,
    label: "Navbar",
  },
  {
    type: "herosection",
    id: "herosection",
    text: "hero-001",
    category: "herosection",
    icon: <ChartBarIcon />,
    component: <HeroSection />,
    label: "Hero Section",
  },
  {
    type: "body",
    id: "body",
    text: "body-001",
    category: "body",
    icon: <Cog6ToothIcon />,
    component: <Body />,
    label: "Body",
  },
  {
    type: "shop",
    id: "shop",
    text: "shop-001",
    category: "shop",
    icon: <ChartBarIcon />,
    component: <ShoppingCart />,
    label: "Shop",
  },
  {
    type: "image",
    id: "image",
    text: "image-001",
    category: "image",
    icon: <QuestionMarkCircleIcon />,
    component: <PhotoImage />,
    label: "Image",
  },
  {
    type: "comment",
    id: "commentsection",
    text: "comment-001",
    category: "comment",
    icon: <DocumentTextIcon />,
    component: <CommentSection />,
    label: "Comments",
  },
  {
    type: "footer",
    id: "footer",
    text: "footer-001",
    category: "footer",
    icon: <DocumentTextIcon />,
    component: <Footer />,
    label: "Footer",
  },
];

export default final;
