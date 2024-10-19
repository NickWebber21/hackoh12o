import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

function Navbar() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <nav className="bg-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-accent transition-colors duration-300">
          RidePare
        </Link>
        {!isHomePage && (
          <Link to="/" className="flex items-center hover:text-accent transition-colors duration-300">
            <FaHome className="mr-2" />
            Home
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
