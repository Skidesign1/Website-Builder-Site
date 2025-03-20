export const componentsCode = {
  navbar: `
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <a href="#">MyWebsite</a>
        </div>
        <div className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-gray-400">Home</a>
          <a href="#" className="hover:text-gray-400">About</a>
          <a href="#" className="hover:text-gray-400">Services</a>
          <a href="#" className="hover:text-gray-400">Contact</a>
        </div>
        <button
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          <i className="fas fa-bars w-6 h-6"></i>
        </button>
      </div>
      <div className="md:hidden bg-gray-700">
        <ul className="space-y-2 py-4">
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-600">Home</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-600">About</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-600">Services</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-600">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  `,
  mainbody: '<section style="background-color: darkblue; color: white; height: 435px;">Main Body</section>',
  footer: `<footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
           <div>
            <h2 className="text-2xl font-bold">jjjuli Universe</h2>
            <p className="mt-3 text-gray-400">
              Bringing you the best web solutions with modern technology.
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="mt-3 space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>

         
          <div>
            <h3 className="text-xl font-semibold">Subscribe</h3>
            <p className="text-gray-400 mt-3">Get updates on our latest services.</p>
            <div className="mt-4 flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 rounded-l bg-gray-800 border border-gray-700 text-white outline-none"
              />
              <button className="bg-blue-500 px-4 py-2 rounded-r hover:bg-blue-600">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10 text-center text-gray-500 border-t border-gray-700 pt-5">
          &copy; {new Date().getFullYear()} Luli Universe. All rights reserved.
        </div>
      </div>
    </footer>`,

  comment: ` <div className="p-4 bg-white shadow-md rounded-lg mt-4">
            <h3 className="text-lg font-semibold">Comments</h3>
            <div className="mt-2">
                <p className="text-gray-700">John: Great product!</p>
                <p className="text-gray-700">Anna: Fast delivery!</p>
            </div>
            <input
                type="text"
                placeholder="Write a comment..."
                className="w-full mt-2 p-2 border rounded"
            />
        </div>`,
  sidebar: ` <div className="w-64 h-full bg-gray-900 text-white fixed top-0 left-0">
      <div className="p-4 text-lg font-bold border-b border-gray-700">
        My Sidebar
      </div>

      <nav class="mt-5 space-y-3">
        <a href="#" class="block px-4 py-2 hover:bg-gray-700">
          Home
        </a>
        <a href="#" className="block px-4 py-2 hover:bg-gray-700">
          Profile
        </a>
        <a href="#" className="block px-4 py-2 hover:bg-gray-700">
          Settings
        </a>
      </nav>
    </div>`,
  image: `<div className="w-64 h-full bg-gray-900 text-white fixed top-0 left-0">
      <div className="p-4 text-lg font-bold border-b border-gray-700">
        My Sidebar
      </div>

      <nav class="mt-5 space-y-3">
        <a href="#" class="block px-4 py-2 hover:bg-gray-700">
          Home
        </a>
        <a href="#" className="block px-4 py-2 hover:bg-gray-700">
          Profile
        </a>
        <a href="#" className="block px-4 py-2 hover:bg-gray-700">
          Settings
        </a>
      </nav>
    </div>`,
  shop: `<div className="w-64 h-full bg-gray-900 text-white fixed top-0 left-0">
      <div className="p-4 text-lg font-bold border-b border-gray-700">
        My Sidebar
      </div>

      <nav class="mt-5 space-y-3">
        <a href="#" class="block px-4 py-2 hover:bg-gray-700">
          Home
        </a>
        <a href="#" className="block px-4 py-2 hover:bg-gray-700">
          Profile
        </a>
        <a href="#" className="block px-4 py-2 hover:bg-gray-700">
          Settings
        </a>
      </nav>
    </div>`,
  hero: `<div className="w-64 h-full bg-gray-900 text-white fixed top-0 left-0">
      <div className="p-4 text-lg font-bold border-b border-gray-700">
        My Sidebar
      </div>

      <nav class="mt-5 space-y-3">
        <a href="#" class="block px-4 py-2 hover:bg-gray-700">
          Home
        </a>
        <a href="#" className="block px-4 py-2 hover:bg-gray-700">
          Profile
        </a>
        <a href="#" className="block px-4 py-2 hover:bg-gray-700">
          Settings
        </a>
      </nav>
    </div>`,
  body: `<div className="w-64 h-full bg-gray-900 text-white fixed top-0 left-0">
      <div className="p-4 text-lg font-bold border-b border-gray-700">
        My Sidebar
      </div>

      <nav class="mt-5 space-y-3">
        <a href="#" class="block px-4 py-2 hover:bg-gray-700">
          Home
        </a>
        <a href="#" className="block px-4 py-2 hover:bg-gray-700">
          Profile
        </a>
        <a href="#" className="block px-4 py-2 hover:bg-gray-700">
          Settings
        </a>
      </nav>
    </div>`,
  flower: `<div className="w-64 h-full bg-gray-900 text-white fixed top-0 left-0">
      <div className="p-4 text-lg font-bold border-b border-gray-700">
        My Sidebar
      </div>

      <nav class="mt-5 space-y-3">
        <a href="#" class="block px-4 py-2 hover:bg-gray-700">
          Home
        </a>
        <a href="#" className="block px-4 py-2 hover:bg-gray-700">
          Profile
        </a>
        <a href="#" className="block px-4 py-2 hover:bg-gray-700">
          Settings
        </a>
      </nav>
    </div>`
};
