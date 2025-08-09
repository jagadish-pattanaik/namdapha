import React from 'react';
import Navbar from './Navbar';
import FloatingChatbot from './ui/FloatingChatbot';
import Footer from './ui/Footer'; // <-- Import Footer

const Layout: React.FC<{ children: React.ReactNode; bgImage?: string | null }> = ({ 
  children, 
  bgImage = 'https://res.cloudinary.com/dogq9gvo8/image/upload/v1754394299/20250728_1415_Indian_Subcontinent_Trees_remix_01k1835p9df9a9pvr4h1dtftz4_xdzp1e.png' 
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
      {/* Background with Shadow Effects */}
      {bgImage && (
        <div className="absolute inset-0 -z-10" style={backgroundStyle}>
          {/* Multiple shadow layers for depth */}
          <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
          <div className="absolute inset-0 shadow-inner shadow-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-black/15"></div>
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/10 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/15 to-transparent"></div>
        </div>
      )}

      {/* Main Content Container */}
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="flex-1 max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto px-6 py-12">
          {children}
        </div>

        {/* Floating Chatbot - appears on every page */}
        <FloatingChatbot />
      </div>

      {/* Footer - appears on every page, outside main content */}
      <Footer />
    </div>
  );
};

export default Layout;