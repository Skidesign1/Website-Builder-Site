// componentsCode.js
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
  footer: '<footer style="background-color: darkblue; color: white;">Footer</footer>'
  // Add other components here
};
