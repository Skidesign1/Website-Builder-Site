import { Link } from "react-router-dom";

export function Navbar001() {
  return (
    <div className="min-w-[10vw] bg-primary/10 p-3">
      <div className="flex justify-between  items-center">
        <div className="font-bold">Logo</div>
        <div className="flex space-x-4">
          <span>Home</span>
          <span>About</span>
          <span>Contact</span>
          <Link to="www.google.com">hello world</Link>
          <Link>yes hello</Link>
        </div>
      </div>
    </div>
  );
}
