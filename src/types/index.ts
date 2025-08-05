export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface LinkButton {
  id: string;
  title: string;
  url: string;
  description?: string;
  icon?: string;
  featured?: boolean;
}

export interface ProfileConfig {
  name: string;
  bio: string;
  profileImage: string;
  backgroundType: 'gradient' | 'image';
  backgroundValue: string;
  socialLinks: SocialLink[];
  links: LinkButton[];
  contactEmail: string;
  enableAnalytics: boolean;
  enableQRCode: boolean;
}

export interface AnalyticsData {
  totalViews: number;
  linkClicks: Record<string, number>;
  lastUpdated: string;
}