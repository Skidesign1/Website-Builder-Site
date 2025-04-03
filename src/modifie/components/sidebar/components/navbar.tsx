export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md p-4">
      <div className="flex justify-between items-center">
        <div className="font-bold text-xl">Logo</div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-primary">
            Home
          </a>
          <a href="#" className="hover:text-primary">
            About
          </a>
          <a href="#" className="hover:text-primary">
            Services
          </a>
          <a href="#" className="hover:text-primary">
            Contact
          </a>
        </div>
      </div>
    </nav>
  )
}

