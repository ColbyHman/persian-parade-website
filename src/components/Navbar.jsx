// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/pp_full_logo_upscaled_alt.png'

const Navbar = () => {
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

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="w-full max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <a href="/" className='flex items-center'>
            <img src={logo} alt="Persian Parade" className='h-10 w-auto'/>
        </a>
        <ul className="hidden md:flex space-x-6">
          <Link to="/" className="text-red-700 hover:text-indigo-600 transition">
            Home
          </Link>
          {links.map((link) => (
            <li key={link}>
              <Link
                to={`/${link.replace(/\s+/g, '-').toLowerCase()}`}
                className="text-red-700 hover:text-indigo-600 transition"
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
