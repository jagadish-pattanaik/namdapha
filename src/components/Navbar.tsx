import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Effect to handle scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled more than 20px
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check in case page is loaded scrolled down
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Main Navbar */}
      <div 
        className={`w-full flex justify-center ${
          isScrolled 
            ? 'fixed top-0 left-0 z-50 px-4 py-2 transition-all duration-300' 
            : 'mt-4 px-4 transition-all duration-300'
        }`}
      >
        <div 
          className={`backdrop-blur-md text-white rounded-3xl px-4 sm:px-8 w-full max-w-6xl flex justify-between items-center border border-white/30 relative transition-all duration-300 ${
            isScrolled 
              ? 'h-16 bg-black/70 shadow-lg shadow-black/30' 
              : 'h-24 bg-black/40'
          }`}
        >
          {/* Desktop Nav - Left (hidden on mobile) */}
          <div className="hidden md:flex space-x-10 font-fantasy text-lg">
            <Link to="/about" className="text-white hover:text-purple-400 transition">About Us</Link>
            <Link to="/house-council" className="text-white hover:text-purple-400 transition">House Council</Link>
            <Link to="/teams" className="text-white hover:text-purple-400 transition">Teams</Link>
          </div>

          {/* Left side on mobile */}
          <div className="flex md:hidden">
            <Link to="/home">
              <div 
                className={`p-1 rounded-full backdrop-blur-md bg-white/20 border border-white/30 shadow-lg flex items-center justify-center transition-all duration-300 ${
                  isScrolled ? 'h-10 w-10' : 'h-12 w-12'
                }`}
              >
                <img
                  src="https://res.cloudinary.com/dogq9gvo8/image/upload/v1754390919/1000073005-modified_a0ou2c.png"
                  alt="Logo"
                  className={`object-cover rounded-full transition-all duration-300 ${
                    isScrolled ? 'h-8 w-8' : 'h-10 w-10'
                  }`}
                />
              </div>
            </Link>
          </div>

          {/* Center Logo - Clickable (only visible on desktop) */}
          <div className="hidden md:flex h-full items-center justify-center px-2">
            <Link to="/home">
              <div 
                className={`p-1 rounded-full backdrop-blur-md bg-white/20 border border-white/30 shadow-lg flex items-center justify-center transition-all duration-300 ${
                  isScrolled ? 'h-12 w-12' : 'h-20 w-20'
                }`}
              >
                <img
                  src="https://res.cloudinary.com/dogq9gvo8/image/upload/v1754390919/1000073005-modified_a0ou2c.png"
                  alt="Logo"
                  className={`object-cover rounded-full transition-all duration-300 ${
                    isScrolled ? 'h-10 w-10' : 'h-16 w-16'
                  }`}
                />
              </div>
            </Link>
          </div>

          {/* Namdapha House - Center on mobile */}
          <div className="flex md:hidden items-center justify-center">
            <h1 
              className={`font-bold text-white text-center transition-all duration-300 ${
                isScrolled ? 'text-lg' : 'text-xl'
              }`}
            >
              <span className="bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                Namdapha House
              </span>
            </h1>
          </div>

          {/* Desktop Nav - Right (hidden on mobile) */}
          <div className="hidden md:flex space-x-10 font-fantasy text-lg items-center">
            <Link to="/resource-hub" className="text-white hover:text-purple-400 transition">Resource Hub</Link>
            <Link to="/events" className="text-white hover:text-purple-400 transition">Events</Link>
            <Link to="/chat-bot" className="bg-purple-600/70 hover:bg-purple-600 px-4 py-1.5 rounded-full text-white transition-colors border border-purple-400/50 shadow-md shadow-purple-500/20 pulse-subtle">Chat Bot</Link>
          </div>

          {/* Hamburger Menu Icon - Mobile Only */}
          <div className="md:hidden flex items-center z-50">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-white relative z-50"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Rendered outside navbar flow in a separate overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]" onClick={() => setIsOpen(false)}>
          <div 
            className="absolute top-20 left-4 right-4 bg-black/90 backdrop-blur-lg rounded-2xl px-6 py-8 flex flex-col items-center space-y-6 shadow-xl shadow-black/50 border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Added Home button at the top */}
            <Link 
              to="/home" 
              className="text-white hover:text-purple-400 transition-all duration-200 hover:translate-x-1 text-lg flex items-center" 
              onClick={() => setIsOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Home
            </Link>
            
            {/* Divider line */}
            <div className="w-2/3 h-px bg-white/10"></div>
            
            <Link to="/about" className="text-white hover:text-purple-400 transition-all duration-200 hover:translate-x-1 text-lg" onClick={() => setIsOpen(false)}>About Us</Link>
            <Link to="/house-council" className="text-white hover:text-purple-400 transition-all duration-200 hover:translate-x-1 text-lg" onClick={() => setIsOpen(false)}>House Council</Link>
            <Link to="/teams" className="text-white hover:text-purple-400 transition-all duration-200 hover:translate-x-1 text-lg" onClick={() => setIsOpen(false)}>Teams</Link>
            <Link to="/resource-hub" className="text-white hover:text-purple-400 transition-all duration-200 hover:translate-x-1 text-lg" onClick={() => setIsOpen(false)}>Resource Hub</Link>
            <Link to="/events" className="text-white hover:text-purple-400 transition-all duration-200 hover:translate-x-1 text-lg" onClick={() => setIsOpen(false)}>Events</Link>
            
            <Link 
              to="/chat-bot" 
              className="bg-purple-600/70 hover:bg-purple-600 px-6 py-2 rounded-full text-white transition-colors border border-purple-400/50 shadow-md mt-4 text-lg" 
              onClick={() => setIsOpen(false)}
            >
              Chat Bot
            </Link>
            
            <button 
              className="absolute top-2 right-2 text-white/70 hover:text-white p-2"
              onClick={() => setIsOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;