import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/pp_full_logo_upscaled_alt.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    "About Us",
    "Events",
    "Gallery",
    "Press Room",
    "Sponsors",
    "Support",
    "Contact Us",
    "Donate"
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="w-full max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className='flex items-center' onClick={closeMenu}>
          <img src={logo} alt="Persian Parade" className='h-10 w-auto' />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/" className="transition" onClick={closeMenu}>
              Home
            </Link>
          </li>
          {links.map((link) => (
            <li key={link}>
              <Link
                to={`/${link.replace(/\s+/g, '-').toLowerCase()}`}
                className="transition"
                onClick={closeMenu}
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger Button - mobile only */}
        <button
          className="md:hidden flex flex-col justify-between w-6 h-6 focus:outline-none transition"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span className={`block h-0.5 bg-gray-800 rounded transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 bg-gray-800 rounded transition-opacity duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`} />
          <span className={`block h-0.5 bg-gray-800 rounded transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Popover Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-200">
          <ul className="flex flex-col space-y-4 py-4 px-6">
            <li>
              <Link to="/" className="block" onClick={closeMenu}>
                Home
              </Link>
            </li>
            {links.map((link) => (
              <li key={link}>
                <Link
                  to={`/${link.replace(/\s+/g, '-').toLowerCase()}`}
                  className="block"
                  onClick={closeMenu}
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
