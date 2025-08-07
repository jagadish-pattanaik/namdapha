import React from 'react';
import Navbar from './Navbar';
import FloatingChatbot from './FloatingChatbot';

const Layout: React.FC<{ children: React.ReactNode; bgImage?: string | null }> = ({ 
  children
}) => {
  return (
    <div className="w-full min-h-screen relative overflow-hidden">
      {/* Beautiful Dark Background with House Colors */}
      <div className="absolute inset-0 -z-10">
        {/* Base dark background */}
        <div className="absolute inset-0 bg-black"></div>
        
        {/* Multi-layer gradient background for depth with house colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/30 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/20 via-transparent to-purple-900/20"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-slate-900/20 to-black"></div>
        
        {/* Subtle animated gradients for movement */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-950/10 via-transparent to-indigo-950/10 animate-pulse"></div>
        
        {/* Radial gradients for depth with house colors */}
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-purple-900/15 via-transparent to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-indigo-900/15 via-transparent to-transparent blur-3xl"></div>
        
        {/* Additional depth with house theme colors */}
        <div className="absolute top-1/4 right-1/4 w-1/3 h-1/3 bg-gradient-radial from-purple-800/10 via-transparent to-transparent blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1/3 h-1/3 bg-gradient-radial from-indigo-800/10 via-transparent to-transparent blur-3xl"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto px-6 py-12">
          {children}
        </div>

        {/* Floating Chatbot */}
        <FloatingChatbot />
      </div>
    </div>
  );
};

export default Layout;