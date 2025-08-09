import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: '#', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, url: '#', color: 'hover:text-pink-400' },
    { name: 'Twitter', icon: Twitter, url: '#', color: 'hover:text-sky-400' },
    { name: 'LinkedIn', icon: Linkedin, url: '#', color: 'hover:text-blue-500' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black py-16 border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="max-w-4xl mx-auto px-6 text-center">
        
        {/* Namdapha House Logo/Title with Gradient */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-7xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 via-orange-500 via-yellow-500 via-green-400 via-blue-400 to-purple-500">
              Namdapha
            </span>
          </h1>
          
          {/* Tagline */}
          <p className="text-2xl md:text-3xl font-semibold text-white mb-8">
            Connect. Grow. Excel.
          </p>
        </div>

        {/* Contact Information */}
        <div className="mb-12">
          <p className="text-gray-300 text-lg mb-2">
            Have questions? Reach out to us at{' '}
            <a 
              href="mailto:namdapha@iitm.ac.in" 
              className="text-blue-400 hover:text-blue-300 transition-colors underline"
            >
              namdapha@iitm.ac.in
            </a>
          </p>
          
          {/* Social Links */}
          <div className="flex justify-center space-x-6 mt-8">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  className={`p-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-all duration-300 text-gray-400 ${social.color} transform hover:scale-110`}
                  aria-label={social.name}
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-6 text-gray-400">
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/events" className="hover:text-white transition-colors">Events</Link>
            <Link to="/teams" className="hover:text-white transition-colors">Teams</Link>
            <Link to="/resource-hub" className="hover:text-white transition-colors">Resources</Link>
            <Link to="/house-council" className="hover:text-white transition-colors">Council</Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-gray-500 text-sm">
            © {currentYear} Namdapha House, IIT Madras. All Rights Reserved.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Part of the General Student Body (GSB) community at Indian Institute of Technology Madras
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
