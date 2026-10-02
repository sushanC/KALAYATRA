import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { formatOriginType } from '../../utils/helpers';

export const FALLBACK_ART_IMAGE = 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80';

const CATEGORY_COLORS = {
  'Performing Arts': 'badge-terracotta',
  'Music': 'badge-gold',
  'Arts & Crafts': 'badge-sandalwood',
  'Literature & Language': 'badge-charcoal',
};

const ORIGIN_STYLES = {
  local: 'origin-local',
  regional: 'origin-regional',
  performed_here: 'origin-performed',
};

export default function ArtFormCard({ artForm, variant = 'default' }) {
  if (!artForm) return null;

  const { slug, name, category, description, image, originType } = artForm;
  const badgeClass = CATEGORY_COLORS[category] || 'badge-charcoal';
  const originClass = ORIGIN_STYLES[originType] || 'origin-regional';

  const [imgSrc, setImgSrc] = useState(image || FALLBACK_ART_IMAGE);

  useEffect(() => {
    setImgSrc(image || FALLBACK_ART_IMAGE);
  }, [image]);

  const handleImageError = () => {
    if (imgSrc !== FALLBACK_ART_IMAGE) {
      setImgSrc(FALLBACK_ART_IMAGE);
    }
  };

  if (variant === 'horizontal') {
    return (
      <Link
        to={`/art-forms/${slug}`}
        className="card flex-shrink-0 w-72 group"
        aria-label={`Explore ${name}`}
      >
        <div className="relative h-44 overflow-hidden bg-charcoal-900 rounded-t-card">
          <img
            src={imgSrc}
            alt={name || 'Art Form'}
            onError={handleImageError}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 image-overlay" />
          <div className="absolute bottom-3 left-3 z-10">
            <span className={`${badgeClass} text-[10px]`}>{category}</span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-display font-semibold text-charcoal-900 text-base leading-snug mb-1.5 group-hover:text-terracotta-600 transition-colors">
            {name}
          </h3>
          <p className="text-xs text-charcoal-500 line-clamp-2 mb-3">{description}</p>
          <div className="flex items-center justify-between">
            <span className={`${originClass} text-[10px]`}>{formatOriginType(originType)}</span>
            <ArrowRight className="w-3.5 h-3.5 text-charcoal-400 group-hover:text-terracotta-500 group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>
      </Link>
    );
  }

  // Default grid card
  return (
    <Link
      to={`/art-forms/${slug}`}
      className="card group block"
      aria-label={`Explore ${name}`}
    >
      <div className="relative h-52 overflow-hidden bg-charcoal-900 rounded-t-card">
        <img
          src={imgSrc}
          alt={name || 'Art Form'}
          onError={handleImageError}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 image-overlay" />
        <div className="absolute top-3 right-3 z-10">
          <span className={`${originClass} text-[10px]`}>{formatOriginType(originType)}</span>
        </div>
        <div className="absolute bottom-3 left-3 z-10">
          <span className={`${badgeClass} text-[10px]`}>{category}</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display font-semibold text-charcoal-900 text-lg leading-snug mb-2 group-hover:text-terracotta-600 transition-colors">
          {name}
        </h3>
        <p className="text-sm text-charcoal-500 line-clamp-3 mb-4">{description}</p>
        <div className="flex items-center text-terracotta-600 text-xs font-medium gap-1 group-hover:gap-2 transition-all">
          Explore <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}
