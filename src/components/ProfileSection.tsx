import React from 'react';
import { MapPin, Eye } from 'lucide-react';
import { ProfileConfig } from '../types';
import { useAnalytics } from '../hooks/useAnalytics';
import SocialLinks from './SocialLinks';

interface ProfileSectionProps {
  config: ProfileConfig;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ config }) => {
  const { analytics } = useAnalytics();

  return (
    <div className="text-center mb-8">
      {/* Profile Image */}
      {/* <div className="relative inline-block mb-6">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl mx-auto backdrop-blur-sm">
          <img
            src={config.profileImage}
            alt={config.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
        </div>
      </div> */}

      {/* Name and Bio */}
      <h1 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">
        {config.name}
      </h1>
      <p className="text-white/90 text-lg mb-6 max-w-md mx-auto leading-relaxed drop-shadow-md">
        {config.bio}
      </p>

      {/* Analytics */}
      {config.enableAnalytics && (
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <Eye className="w-4 h-4 text-white/80" />
            <span className="text-white/90 text-sm font-medium">
              {analytics.totalViews.toLocaleString()} views
            </span>
          </div>
        </div>
      )}

      {/* Social Links */}
      <SocialLinks links={config.socialLinks} />
    </div>
  );
};

export default ProfileSection;