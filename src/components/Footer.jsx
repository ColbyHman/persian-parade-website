import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/pp_full_logo_upscaled.png';

const Footer = () => {
  return (
    <footer className="footer text-white py-10 mt-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        <div className="flex flex-col items-start">
          <img src={logo} alt="Logo" className="w-42 mb-4" />
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Persian Parade Foundation - a 501(c)(3) non-profit organization</p>
        </div>

        <div className="flex flex-col space-y-2">
          <Link to="/" className="!text-white hover:underline">Home</Link>
          <Link to="/about" className="!text-white hover:underline">About</Link>
          <Link to="/events" className="!text-white hover:underline">Events</Link>
          <Link to="/gallery" className="!text-white hover:underline">Gallery</Link>
          <Link to="/contact" className="!text-white hover:underline">Contact</Link>
        </div>

        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p>📞 (844) 727-2331</p>
          <p>✉️ info@persianparade.com</p>
          <p>📍 25 Central Park West</p>
          <p>   New York, NY 10023</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
