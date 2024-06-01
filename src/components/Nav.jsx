import React, { useState } from "react";
import { Link } from "react-router-dom";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    console.log("Toggling menu:", !isMenuOpen);  // Debug log
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full bg-blue-900 p-4 text-white">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold">Betagro</div>

        {/* Mobile menu toggle button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="h-6 w-6"
            >
              <path d="M4 6h16M4 12h16m-16 6h16"></path>
            </svg>
          </button>
        </div>

        {/* Links for large screens */}
        <ul className={`md:flex hidden space-x-4`}>
          <li><Link to="/" className="font-bold">Home</Link></li>
          <li><Link to="/support" className="font-bold">Support</Link></li>
          <li><Link to='/users' className='text-white text-base font-bold'>Users</Link></li>
          <li><Link to="/sign-in" className="font-bold">Sign In</Link></li>
          <li>
            <details className="group">
              <summary className="cursor-pointer">More</summary>
              <ul className="absolute hidden group-hover:block bg-blue-800 p-2">
                <li><Link to="/register" className="block text-sm px-2 py-1">Register</Link></li>
                <li><Link to="/logout" className="block text-sm px-2 py-1">Log Out</Link></li>
              </ul>
            </details>
          </li>
        </ul>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <ul className="flex flex-col md:hidden absolute bg-blue-900 w-full left-0 top-[58px]">
            <li><Link to="/" onClick={() => setIsMenuOpen(false)} className="block p-2 text-base font-bold">Home</Link></li>
            <li><Link to="/support" onClick={() => setIsMenuOpen(false)} className="block p-2 text-base font-bold">Support</Link></li>
            <li><Link to='/users' onClick={() => setIsMenuOpen(false)} className="block p-2 text-base font-bold">Users</Link></li>
            <li><Link to="/sign-in" onClick={() => setIsMenuOpen(false)} className="block p-2 text-base font-bold">Sign In</Link></li>
            <li><Link to="/register" onClick={() => setIsMenuOpen(false)} className="block p-2 text-base font-bold">Register</Link></li>
            <li><Link to="/logout" onClick={() => setIsMenuOpen(false)} className="block p-2 text-base font-bold">Log Out</Link></li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Nav;
