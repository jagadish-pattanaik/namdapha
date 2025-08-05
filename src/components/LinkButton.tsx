import React from 'react';
import { FaBriefcase, FaBookOpen, FaFileAlt, FaPlay, FaEnvelope, FaShoppingBag, FaExternalLinkAlt } from 'react-icons/fa'; // Import real icons
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
  ExternalLink: FaExternalLinkAlt
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
        className={`w-full p-6 rounded-2xl transition-all duration-300 group hover:scale-105 hover:shadow-2xl active:scale-95 ${
          link.featured
            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
            : 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl transition-all duration-300 group-hover:scale-110 ${
              link.featured ? 'bg-white/20' : 'bg-white/10'
            }`}>
              <IconComponent className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-lg mb-1 group-hover:translate-x-1 transition-transform duration-300">
                {link.title}
              </h3>
              {link.description && (
                <p className={`text-sm opacity-80 ${
                  link.featured ? 'text-white/80' : 'text-white/70'
                }`}>
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