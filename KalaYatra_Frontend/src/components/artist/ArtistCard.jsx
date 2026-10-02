import { Link } from 'react-router-dom';
import { MapPin, User } from 'lucide-react';

export default function ArtistCard({ artist, variant = 'default' }) {
  if (!artist) return null;

  const { slug, name, shortBio, image, location, artForms } = artist;

  const artFormNames = Array.isArray(artForms)
    ? artForms.map((af) => (typeof af === 'object' ? af.name : af)).filter(Boolean)
    : [];

  if (variant === 'compact') {
    return (
      <Link
        to={`/artists/${slug}`}
        className="flex items-center gap-3 p-3 rounded-xl hover:bg-ivory-100 transition-colors group"
        aria-label={`View artist profile: ${name}`}
      >
        <div className="w-12 h-12 rounded-full overflow-hidden bg-sandalwood-200 flex-shrink-0">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover" loading="lazy" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-5 h-5 text-charcoal-500" />
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-charcoal-900 truncate group-hover:text-terracotta-600 transition-colors">{name}</p>
          <p className="text-xs text-charcoal-500 truncate">{location || artFormNames[0] || 'Artist'}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/artists/${slug}`}
      className="card group block"
      aria-label={`View artist profile: ${name}`}
    >
      {/* Portrait */}
      <div className="relative h-64 overflow-hidden bg-ivory-200">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-sandalwood-200 to-ivory-100 flex items-center justify-center">
            <User className="w-16 h-16 text-charcoal-300" />
          </div>
        )}
        <div className="absolute inset-0 image-overlay" />
        {/* Art forms overlay */}
        {artFormNames.length > 0 && (
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
            {artFormNames.slice(0, 2).map((af, i) => (
              <span key={i} className="badge-terracotta text-[10px]">{af}</span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display font-semibold text-charcoal-900 text-base leading-snug mb-1 group-hover:text-terracotta-600 transition-colors">
          {name}
        </h3>
        {location && (
          <p className="text-xs text-charcoal-500 flex items-center gap-1 mb-2">
            <MapPin className="w-3 h-3" /> {location}
          </p>
        )}
        {shortBio && (
          <p className="text-sm text-charcoal-500 line-clamp-2">{shortBio}</p>
        )}
      </div>
    </Link>
  );
}
