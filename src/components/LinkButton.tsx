import React from 'react';
import { FaBriefcase, FaBookOpen, FaFileAlt, FaPlay, FaEnvelope, FaShoppingBag, FaExternalLinkAlt, FaWhatsapp } from 'react-icons/fa'; // Added FaWhatsapp
import { LinkButton as LinkButtonType } from '../types';
import { useAnalytics } from '../hooks/useAnalytics';

interface LinkButtonProps {
  link: LinkButtonType;
  index: number;
}

const iconMap = {
  Briefcase: FaBriefcase,
  BookOpen: FaBookOpen,
  FileText: FaFileAlt,
  Play: FaPlay,
  Mail: FaEnvelope,
  ShoppingBag: FaShoppingBag,
  ExternalLink: FaExternalLinkAlt,
  Whatsapp: FaWhatsapp // Added WhatsApp icon
};

const LinkButton: React.FC<LinkButtonProps> = ({ link, index }) => {
  const { trackLinkClick } = useAnalytics();
  const IconComponent = iconMap[link.icon as keyof typeof iconMap] || FaExternalLinkAlt;

  const handleClick = () => {
    trackLinkClick(link.id);
    window.open(link.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="animate-in slide-in-from-bottom-4 duration-700"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <button
        onClick={handleClick}
        className="w-full p-6 rounded-2xl transition-all duration-300 group hover:scale-105 hover:shadow-2xl active:scale-95 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl transition-all duration-300 group-hover:scale-110 bg-white/10">
              {link.icon === "Whatsapp" ? (
                <FaWhatsapp className="w-6 h-6" style={{ color: "#25D366" }} />
              ) : (
                <IconComponent className="w-6 h-6" />
              )}
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-lg mb-1 group-hover:translate-x-1 transition-transform duration-300 whitespace-nowrap overflow-hidden text-ellipsis">
                {link.title}
              </h3>
              {link.description && (
                <p className="text-sm opacity-80 text-white/80">
                  {link.description}
                </p>
              )}
            </div>
          </div>
          <FaExternalLinkAlt className="w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
        </div>
      </button>
    </div>
  );
};

export default LinkButton;