import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingChatbot from './ui/FloatingChatbot'; // <-- Import here

const Layout: React.FC<{ children: React.ReactNode; bgImage?: string | null }> = ({ 
  children, 
  bgImage = null // Change to null for light theme
}) => {
  const backgroundStyle = bgImage ? {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
  } : {};

  return (
    <div className="w-full min-h-screen relative overflow-hidden">
      {/* Light Background with Theme Color Gradients */}
      {!bgImage && (
        <div className="absolute inset-0 -z-10">
          {/* Base white background */}
          <div className="absolute inset-0 bg-white"></div>
          
          {/* Gradient overlays for beauty */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-200/40 via-transparent to-transparent blur-3xl opacity-60"></div>
          <div className="absolute top-20 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-200/30 via-transparent to-transparent blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-20 w-72 h-72 bg-gradient-to-tr from-violet-200/35 via-transparent to-transparent blur-3xl opacity-70"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-tl from-purple-300/25 via-transparent to-transparent blur-3xl opacity-40"></div>
          
          {/* Additional scattered oval gradients */}
          <div className="absolute top-1/3 left-1/4 w-48 h-32 bg-gradient-to-r from-indigo-200/30 to-purple-200/30 blur-2xl opacity-60 rotate-45"></div>
          <div className="absolute bottom-1/3 right-1/3 w-56 h-40 bg-gradient-to-l from-violet-200/25 to-indigo-200/25 blur-2xl opacity-50 -rotate-12"></div>
        </div>
      )}

      {/* Background with Shadow Effects (for dark image backgrounds) */}
      {bgImage && (
        <div className="absolute inset-0 -z-10" style={backgroundStyle}>
          {/* Multiple shadow layers for depth */}
          <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
          
          {/* Inner shadow for depth */}
          <div className="absolute inset-0 shadow-inner shadow-black/30"></div>
          
          {/* Subtle vignette effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-black/15"></div>
          
          {/* Subtle top shadow */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/10 to-transparent"></div>
          
          {/* Subtle bottom shadow */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/15 to-transparent"></div>
        </div>
      )}

      {/* Main Content Container */}
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="flex-1">
          <div className="max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto px-6 py-12">
            {children}
          </div>
        </div>

        {/* Footer */}
        <Footer />

        {/* Floating Chatbot - appears on every page */}
        <FloatingChatbot />
      </div>
    </div>
  );
};

export default Layout;