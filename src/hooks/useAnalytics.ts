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

  // Track views only once per session
  useEffect(() => {
    const sessionKey = 'analytics_view_tracked';
    if (!sessionStorage.getItem(sessionKey)) {
      sessionStorage.setItem(sessionKey, 'true');
      setAnalytics(prev => {
        const updated = {
          ...prev,
          totalViews: prev.totalViews + 1,
          lastUpdated: new Date().toISOString()
        };
        localStorage.setItem('analytics', JSON.stringify(updated));
        return updated;
      });
    }
  }, []);

  const trackLinkClick = (linkId: string) => {
    setAnalytics(prev => {
      const updated = {
        ...prev,
        linkClicks: {
          ...prev.linkClicks,
          [linkId]: (prev.linkClicks[linkId] || 0) + 1
        },
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem('analytics', JSON.stringify(updated));
      return updated;
    });
  };

  return { analytics, trackLinkClick };
};