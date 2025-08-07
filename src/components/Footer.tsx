import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'House Council', path: '/house-council' },
    { name: 'Teams', path: '/teams' },
    { name: 'Events', path: '/events' },
    { name: 'Resource Hub', path: '/resource-hub' },
    { name: 'Important Links', path: '/imp-links' },
    { name: 'Join Us', path: '/join-us' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: '#', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, url: '#', color: 'hover:text-pink-400' },
    { name: 'Twitter', icon: Twitter, url: '#', color: 'hover:text-sky-400' },
    { name: 'LinkedIn', icon: Linkedin, url: '#', color: 'hover:text-blue-500' },
  ];

  const contactInfo = [
    { icon: Mail, text: 'namdapha@iitm.ac.in', href: 'mailto:namdapha@iitm.ac.in' },
    { icon: Phone, text: '+91 12345 67890', href: 'tel:+911234567890' },
    { icon: MapPin, text: 'IIT Madras, Chennai - 600036', href: 'https://maps.google.com/?q=IIT+Madras' },
  ];

  return (
    <footer className="relative bg-black border-t border-purple-900/30">
      {/* Background Gradients for Footer */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-purple-950/20 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/10 via-transparent to-purple-950/10"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-radial from-purple-900/15 via-transparent to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-gradient-radial from-indigo-900/15 via-transparent to-transparent blur-3xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
        {/* Top Section */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Namdapha House Info */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h3 className="text-2xl font-display font-bold text-white mb-3">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-300">
                    Namdapha House
                  </span>
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  A vibrant community fostering excellence, inclusivity, and innovation at IIT Madras. 
                  Named after the beautiful Namdapha National Park, we embody diversity and unity.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      className={`p-3 bg-purple-900/20 hover:bg-purple-900/40 rounded-full border border-purple-400/20 hover:border-purple-400/50 transition-all duration-300 text-white/70 ${social.color} transform hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20`}
                      aria-label={social.name}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6 font-display">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-white/70 hover:text-purple-300 transition-colors duration-200 text-sm hover:pl-2 transform transition-all"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6 font-display">
                Get In Touch
              </h4>
              <ul className="space-y-4">
                {contactInfo.map((contact, index) => {
                  const Icon = contact.icon;
                  return (
                    <li key={index}>
                      <a
                        href={contact.href}
                        className="flex items-center text-white/70 hover:text-purple-300 transition-colors duration-200 text-sm group"
                      >
                        <div className="p-2 bg-purple-900/20 rounded-full mr-3 group-hover:bg-purple-900/40 transition-colors duration-200">
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          {contact.text}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Newsletter/Join Us */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6 font-display">
                Join Our Community
              </h4>
              <p className="text-white/70 text-sm mb-4 leading-relaxed">
                Ready to be part of something amazing? Join Namdapha House and experience the magic of community living.
              </p>
              <Link
                to="/join-us"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold rounded-full hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-lg shadow-purple-600/30 hover:shadow-xl hover:shadow-purple-500/40 transform hover:scale-105 group"
              >
                <span>Join Us Now</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

          </div>
        </div>

        {/* Decorative Divider */}
        <div className="border-t border-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>

        {/* Bottom Section */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            
            {/* Copyright */}
            <div className="flex items-center text-white/60 text-sm mb-4 md:mb-0">
              <span>© {currentYear} Namdapha House, IIT Madras. Made with</span>
              <Heart className="h-4 w-4 mx-2 text-red-400 animate-pulse" fill="currentColor" />
              <span>by the House Team</span>
            </div>

            {/* Additional Links */}
            <div className="flex space-x-6 text-sm">
              <a
                href="/privacy"
                className="text-white/60 hover:text-purple-300 transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-white/60 hover:text-purple-300 transition-colors duration-200"
              >
                Terms of Service
              </a>
              <a
                href="/sitemap"
                className="text-white/60 hover:text-purple-300 transition-colors duration-200"
              >
                Sitemap
              </a>
            </div>
          </div>

          {/* IIT Madras Recognition */}
          <div className="mt-6 pt-6 border-t border-purple-900/20 text-center">
            <p className="text-white/50 text-xs">
              Part of the General Student Body (GSB) community at Indian Institute of Technology Madras
            </p>
          </div>
        </div>
      </div>

      {/* Floating Decoration Elements */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400/30 rounded-full animate-pulse"></div>
      <div className="absolute bottom-8 left-8 w-1 h-1 bg-indigo-400/40 rounded-full animate-ping"></div>
      <div className="absolute top-1/2 left-4 w-1 h-1 bg-purple-300/50 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
    </footer>
  );
};

export default Footer;
