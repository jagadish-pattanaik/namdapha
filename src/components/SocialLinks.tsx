import React from 'react';
import { FaLinkedin, FaTwitter, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa'; // Removed FaGithub
import { SocialLink } from '../types';

interface SocialLinksProps {
  links: SocialLink[];
}

const iconMap = {
  Whatsapp: FaWhatsapp, // Replaced Github with Whatsapp
  Linkedin: FaLinkedin,
  Twitter: FaTwitter,
  Instagram: FaInstagram,
  Youtube: FaYoutube,
};

const SocialLinks: React.FC<SocialLinksProps> = ({ links }) => {
  return (
    <div className="flex justify-center gap-4 mb-8">
      {links.map((link, index) => {
        const IconComponent = iconMap[link.icon as keyof typeof iconMap] || FaWhatsapp; // Default to FaWhatsapp if icon not found

        return (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:scale-110 transition-all duration-300"
            aria-label={link.platform}
          >
            <IconComponent className="w-5 h-5 text-white group-hover:text-white/90" />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;