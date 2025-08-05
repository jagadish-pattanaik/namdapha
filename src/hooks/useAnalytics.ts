import { useState, useEffect } from 'react';
import { AnalyticsData } from '../types';

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>(() => {
    const saved = localStorage.getItem('analytics');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      totalViews: 0,
      linkClicks: {},
      lastUpdated: new Date().toISOString()
    };
  });

  useEffect(() => {
    // Increment view count on component mount
    const newAnalytics = {
      ...analytics,
      totalViews: analytics.totalViews + 1,
      lastUpdated: new Date().toISOString()
    };
    setAnalytics(newAnalytics);
    localStorage.setItem('analytics', JSON.stringify(newAnalytics));
  }, []);

  const trackLinkClick = (linkId: string) => {
    const newAnalytics = {
      ...analytics,
      linkClicks: {
        ...analytics.linkClicks,
        [linkId]: (analytics.linkClicks[linkId] || 0) + 1
      },
      lastUpdated: new Date().toISOString()
    };
    setAnalytics(newAnalytics);
    localStorage.setItem('analytics', JSON.stringify(newAnalytics));
  };

  return { analytics, trackLinkClick };
};