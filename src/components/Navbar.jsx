import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../assets/pp_full_logo_upscaled_alt.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);


  const links = [
    "About Us",
    "Events",
    "Gallery",
    "Press Room",
    "Sponsors",
    "Support",
    "Contact Us",
    // "Donate"
  ];

  const toggleMenu = () => {
    if (isOpen) {
      // Closing
      setIsOpen(false);
      setTimeout(() => setMenuVisible(false), 300); // match animation duration
    } else {
      // Opening
      setMenuVisible(true);
      setTimeout(() => setIsOpen(true), 10); // slight delay to trigger animation
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    setTimeout(() => setMenuVisible(false), 300);
  };


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
          <li>
            <a
              href="https://shop.persianparade.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition"
            >
              Shop
            </a>
          </li>
        </ul>

        <button
          className="md:hidden focus:outline-none transition-transform duration-300 ease-in-out"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <div className="relative w-8 h-8">
            <Bars3Icon
              className={`absolute inset-0 w-8 h-8 text-gray-800 transform transition duration-300 ease-in-out ${
                isOpen ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
              }`}
            />
            <XMarkIcon
              className={`absolute inset-0 w-8 h-8 text-gray-800 transform transition duration-300 ease-in-out ${
                isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
            />
          </div>
        </button>

      </div>

      {/* Mobile Popover Menu */}
      {menuVisible && (
        <div
          className={`md:hidden bg-white shadow-md border-t border-gray-200 transition-all duration-300 ease-in-out ${
            isOpen ? 'animate-slide-down' : 'animate-slide-up'
          }`}
        >
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
