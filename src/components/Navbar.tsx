import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [showSides, setShowSides] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  const location = useLocation();

  // Effect to handle scroll position and visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Check if page is scrolled more than 20px
      setIsScrolled(currentScrollY > 20);

      // Always keep navbar visible - don't hide it
      setIsVisible(true);
      
      setLastScrollY(currentScrollY);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    // Initial check
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [lastScrollY, isOpen]);

  // Detect if this is a fresh page load vs SPA navigation
  useEffect(() => {
    // Use navigationStart time difference to detect fresh loads
    const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    const isPageLoad = navigationEntries.length > 0 && navigationEntries[0].type === 'navigate';
    const isReload = navigationEntries.length > 0 && navigationEntries[0].type === 'reload';
    
    // Check if we've already marked this session as having SPA navigation
    const hasSpaNavigated = sessionStorage.getItem('spa-navigated');
    
    // Only animate on fresh loads/reloads, not on SPA navigation
    const shouldAnimate = (isPageLoad || isReload) && !hasSpaNavigated;
    
    if (shouldAnimate) {
      setIsInitialLoad(true);
      
      // Stage 1: Show logo first (drop animation)
      const logoTimer = setTimeout(() => {
        setShowLogo(true);
      }, 200);
      
      // Stage 2: Show side elements (expand from center)
      const sidesTimer = setTimeout(() => {
        setShowSides(true);
      }, 800);
      
      // Mark animation as completed
      const completeTimer = setTimeout(() => {
        setHasAnimated(true);
      }, 1500);
      
      return () => {
        clearTimeout(logoTimer);
        clearTimeout(sidesTimer);
        clearTimeout(completeTimer);
      };
    } else {
      // If this is SPA navigation, show everything immediately
      setShowLogo(true);
      setShowSides(true);
      setHasAnimated(true);
      setIsInitialLoad(false);
    }
  }, []);

  // Track location changes to mark as SPA navigation
  useEffect(() => {
    // Mark that we've navigated via SPA after the initial load
    if (hasAnimated) {
      sessionStorage.setItem('spa-navigated', 'true');
    }
  }, [location, hasAnimated]);

  // Handle navigation clicks to prevent animation
  const handleNavClick = () => {
    sessionStorage.setItem('spa-navigated', 'true');
  };

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
        className={`w-full flex justify-center transition-all duration-500 ease-out ${
          isScrolled 
            ? `fixed top-0 left-0 z-[100] px-4 py-2 ${
                isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
              }` 
            : 'mt-4 px-4 relative'
        }`}
      >
        <div 
          className={`backdrop-blur-md text-white rounded-3xl px-4 sm:px-8 w-full max-w-6xl flex justify-between items-center border border-white/30 relative transition-all duration-500 ${
            isScrolled 
              ? 'h-16 bg-black/60 shadow-xl shadow-black/30' // More transparent when scrolled
              : 'h-24 bg-black/40'
          }`}
        >
          {/* Desktop Nav - Left (hidden on mobile) */}
          <div className={`hidden md:flex space-x-10 font-fantasy text-lg font-bold transition-all duration-700 ease-out ${
            !showSides 
              ? 'opacity-0 transform translate-x-[200px] scale-75' 
              : 'opacity-100 transform translate-x-0 scale-100'
          }`}>
            <Link to="/home" className="text-white hover:text-purple-400 transition" onClick={handleNavClick}>Home</Link>
            <Link to="/about" className="text-white hover:text-purple-400 transition" onClick={handleNavClick}>About Us</Link>
            <Link to="/house-council" className="text-white hover:text-purple-400 transition" onClick={handleNavClick}>House Council</Link>
            <Link to="/teams" className="text-white hover:text-purple-400 transition" onClick={handleNavClick}>Teams</Link>
          </div>

          {/* Left side on mobile */}
          <div className={`flex md:hidden transition-all duration-700 ease-out ${
            !showSides 
              ? 'opacity-0 transform translate-x-[100px] scale-50' 
              : 'opacity-100 transform translate-x-0 scale-100'
          }`}>
            <Link to="/home" onClick={handleNavClick}>
              <div 
                className={`p-1 rounded-full backdrop-blur-md bg-white/20 border border-white/30 shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105 ${
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
          <div className={`hidden md:flex h-full items-center justify-center px-2 transition-all duration-600 ease-out ${
            !showLogo 
              ? 'opacity-0 transform -translate-y-[100px] scale-50' 
              : 'opacity-100 transform translate-y-0 scale-100'
          }`}>
            <Link to="/home" onClick={handleNavClick}>
              <div 
                className={`p-1 rounded-full backdrop-blur-md bg-white/20 border border-white/30 shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105 ${
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
          <div className={`flex md:hidden items-center justify-center transition-all duration-600 ease-out ${
            !showLogo 
              ? 'opacity-0 transform -translate-y-[50px] scale-75' 
              : 'opacity-100 transform translate-y-0 scale-100'
          }`}>
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
          <div className={`hidden md:flex space-x-10 font-fantasy text-lg font-bold items-center transition-all duration-700 ease-out ${
            !showSides 
              ? 'opacity-0 transform -translate-x-[200px] scale-75' 
              : 'opacity-100 transform translate-x-0 scale-100'
          }`}>
            <Link to="/resource-hub" className="text-white hover:text-purple-400 transition" onClick={handleNavClick}>Resource Hub</Link>
            <Link to="/events" className="text-white hover:text-purple-400 transition" onClick={handleNavClick}>Events</Link>
            <Link to="/join-us" className="bg-purple-600/70 hover:bg-purple-600 px-4 py-1.5 rounded-full text-white transition-colors border border-purple-400/50 shadow-md shadow-purple-500/20 pulse-subtle font-semibold" onClick={handleNavClick}>Join Us</Link>
          </div>

          {/* Hamburger Menu Icon - Mobile Only */}
          <div className={`md:hidden flex items-center z-50 transition-all duration-700 ease-out ${
            !showSides 
              ? 'opacity-0 transform -translate-x-[100px] scale-50' 
              : 'opacity-100 transform translate-x-0 scale-100'
          }`}>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-white relative z-50 hover:scale-110 transition-transform duration-200"
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
            <Link 
              to="/home" 
              className="text-white hover:text-purple-400 transition-all duration-200 hover:translate-x-1 text-lg font-bold flex items-center" 
              onClick={() => {
                setIsOpen(false);
                handleNavClick();
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Home
            </Link>
            
            <div className="w-2/3 h-px bg-white/10"></div>
            
            <Link to="/about" className="text-white hover:text-purple-400 transition-all duration-200 hover:translate-x-1 text-lg font-bold" onClick={() => { setIsOpen(false); handleNavClick(); }}>About Us</Link>
            <Link to="/house-council" className="text-white hover:text-purple-400 transition-all duration-200 hover:translate-x-1 text-lg font-bold" onClick={() => { setIsOpen(false); handleNavClick(); }}>House Council</Link>
            <Link to="/teams" className="text-white hover:text-purple-400 transition-all duration-200 hover:translate-x-1 text-lg font-bold" onClick={() => { setIsOpen(false); handleNavClick(); }}>Teams</Link>
            <Link to="/resource-hub" className="text-white hover:text-purple-400 transition-all duration-200 hover:translate-x-1 text-lg font-bold" onClick={() => { setIsOpen(false); handleNavClick(); }}>Resource Hub</Link>
            <Link to="/events" className="text-white hover:text-purple-400 transition-all duration-200 hover:translate-x-1 text-lg font-bold" onClick={() => { setIsOpen(false); handleNavClick(); }}>Events</Link>
            
            <Link 
              to="/join-us" 
              className="bg-purple-600/70 hover:bg-purple-600 px-6 py-2 rounded-full text-white transition-colors border border-purple-400/50 shadow-md mt-4 text-lg font-semibold" 
              onClick={() => {
                setIsOpen(false);
                handleNavClick();
              }}
            >
              Join Us
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