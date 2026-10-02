import { useEffect } from 'react';

// Utility: get YouTube video ID from URL
export function getYouTubeId(url) {
  if (!url) return null;
  const patterns = [
    /youtu\.be\/([^?&]+)/,
    /youtube\.com\/watch\?v=([^?&]+)/,
    /youtube\.com\/embed\/([^?&]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

// Utility: get YouTube thumbnail
export function getYouTubeThumbnail(url) {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

// Utility: format origin type for display
export function formatOriginType(originType) {
  const map = {
    local: 'Local Origin',
    regional: 'Regional Art Form',
    performed_here: 'Performed Here',
  };
  return map[originType] || originType;
}

// Utility: truncate text
export function truncate(text, maxLen) {
  if (!text || text.length <= maxLen) return text;
  return text.slice(0, maxLen).trimEnd() + '…';
}

// Utility: capitalize first letter
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Utility: city display name
export function cityDisplayName(slug) {
  const map = { udupi: 'Udupi', mysuru: 'Mysuru' };
  return map[slug] || capitalize(slug);
}

// Hook: scroll to top on route change
export function useScrollToTop() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);
}
