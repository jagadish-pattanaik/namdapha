import React from 'react';
import Navbar from '../components/Navbar'; // Corrected import path

function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 bg-[length:400%_400%] animate-gradient relative">
      {/* Background Overlay */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
      </div>

      {/* Navbar */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center text-white mb-8">Welcome to the Landing Page</h1>
        <p className="text-lg text-center text-white/80">
          This is a simple landing page with the same navbar and background as your main page.
        </p>
      </div>
    </div>
  );
}

export default LandingPage;