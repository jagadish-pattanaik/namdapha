import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ProfileSection from '../components/ProfileSection';
import LinkButton from '../components/LinkButton';
import ContactModal from '../components/ContactModal';
import QRCodeSection from '../components/QRCodeSection';
import ThemeToggle from '../components/ThemeToggle';
import FloatingContactButton from '../components/FloatingContactButton';
import { profileConfig } from '../config/profile';

const ImpLinks = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const backgroundStyle = {
    backgroundImage: `url(https://res.cloudinary.com/dogq9gvo8/image/upload/v1754394299/20250728_1415_Indian_Subcontinent_Trees_remix_01k1835p9df9a9pvr4h1dtftz4_xdzp1e.png)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed', // This makes the background stay fixed while scrolling
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

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Main Content */}
        <div className="max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto px-6 py-12">
          <ProfileSection config={profileConfig} />

          {/* Links Section */}
          <div className="flex flex-wrap justify-center gap-4">
            {profileConfig.links.map((link, index) => (
              <div key={link.id} className="w-full sm:w-[48%] md:w-[30%]">
                <LinkButton link={link} index={index} />
              </div>
            ))}
          </div>

          {/* Contact Info Section */}
          <div className="max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto px-6 py-12">
            <div className="bg-black/20 backdrop-blur-md p-8 rounded-3xl shadow-2xl">
              <h2 className="text-2xl font-bold text-center text-white mb-8">Contact Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {profileConfig.contactInfo.map((contact, index) => (
                  <div
                    key={index}
                    className="bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex flex-col items-center text-center shadow-2xl hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] transition-all duration-300 hover:transform hover:scale-105"
                  >
                    <img
                      src={contact.photo}
                      alt={contact.name}
                      className="w-24 h-24 rounded-full object-cover mb-4 shadow-xl"
                    />
                    <h3 className="text-lg font-semibold text-white">{contact.name}</h3>
                    <p className="text-sm font-bold" style={{ color: '#ddc9a0' }}>{contact.role}</p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="mt-2 hover:underline text-sm"
                      style={{ color: '#ffffff' }}
                    >
                      {contact.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {profileConfig.enableQRCode && <QRCodeSection />}

          <div className="mt-12 text-center">
            <p className="text-white/60 text-sm">Made with ❤️ by Shivang</p>
            <p className="text-white/40 text-xs mt-2">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Floating Contact Button */}
        <FloatingContactButton onClick={() => setIsContactModalOpen(true)} />

        {/* Contact Modal */}
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
          contactEmail={profileConfig.contactEmail}
        />
      </div>
    </div>
  );
};

export default ImpLinks;