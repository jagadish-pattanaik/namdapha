import React from 'react';
import Navbar from './Navbar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const backgroundStyle = {
    backgroundImage: `url(https://res.cloudinary.com/dogq9gvo8/image/upload/v1754394299/20250728_1415_Indian_Subcontinent_Trees_remix_01k1835p9df9a9pvr4h1dtftz4_xdzp1e.png)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed', // This makes the background stay fixed while scrolling
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div className="w-full min-h-screen relative overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 -z-10" style={backgroundStyle}>
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
      </div>

      {/* Main Content Container - This will scroll */}
      <div className="relative z-10 w-full min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto px-6 py-12">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;