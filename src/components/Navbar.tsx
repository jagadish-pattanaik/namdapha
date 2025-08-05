import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Make sure lucide-react is installed
import { Link } from 'react-router-dom'; // Use react-router-dom for routing

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full flex justify-center mt-4 px-4">
      <div className="h-24 backdrop-blur-md bg-black/40 text-white rounded-3xl px-8 w-full max-w-6xl flex justify-between items-center border border-white/30 relative">

        {/* Desktop Nav - Left */}
        <div className="hidden md:flex space-x-10 font-fantasy text-lg">
          <Link to="/about" className="text-white hover:text-purple-400 transition">About Us</Link>
          <Link to="/house-council" className="text-white hover:text-purple-400 transition">House Council</Link>
          <Link to="/teams" className="text-white hover:text-purple-400 transition">Teams</Link>
        </div>

        {/* Center Logo - Clickable */}
        <div className="h-full flex items-center justify-center px-2">
          <Link to="/LandingPage"> {/* Make the logo clickable */}
            <div className="h-[85%] aspect-square p-1 rounded-full backdrop-blur-md bg-white/20 border border-white/30 shadow-lg flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/dogq9gvo8/image/upload/v1754390919/1000073005-modified_a0ou2c.png"
                alt="Logo"
                className="h-full w-full object-cover rounded-full"
              />
            </div>
          </Link>
        </div>

        {/* Desktop Nav - Right */}
        <div className="hidden md:flex space-x-10 font-fantasy text-lg">
          <Link to="/resource-hub" className="text-white hover:text-purple-400 transition">Resource Hub</Link>
          <Link to="/events" className="text-white hover:text-purple-400 transition">Events</Link>
          <Link to="/chat-bot" className="text-white hover:text-purple-400 transition">Chat Bot</Link>
        </div>

        {/* Hamburger Menu Icon - Mobile Only */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="absolute top-full mt-2 left-0 w-full bg-black/90 backdrop-blur-md rounded-2xl px-6 py-4 flex flex-col items-center space-y-4 z-50 font-fantasy text-lg md:hidden">
            <Link to="/about" className="hover:underline" onClick={() => setIsOpen(false)}>About Us</Link>
            <Link to="/house-council" className="hover:underline" onClick={() => setIsOpen(false)}>House Council</Link>
            <Link to="/teams" className="hover:underline" onClick={() => setIsOpen(false)}>Teams</Link>
            <Link to="/resource-hub" className="hover:underline" onClick={() => setIsOpen(false)}>Resource Hub</Link>
            <Link to="/events" className="hover:underline" onClick={() => setIsOpen(false)}>Events</Link>
            <Link to="/chat-bot" className="hover:underline" onClick={() => setIsOpen(false)}>Chat Bot</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
