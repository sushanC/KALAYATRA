import { useEffect } from 'react';
import { X, ExternalLink, MapPin, Sparkles, User, Tag } from 'lucide-react';

export default function MediaLightbox({ item, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!item) return null;

  const { title, url, thumbnail, description, city, artForm, sourceUrl, attribution } = item;
  const cityName = typeof city === 'object' ? city?.name : city || 'Karnataka';
  const artFormName = typeof artForm === 'object' ? artForm?.name : null;
  const imageSrc = url || thumbnail;
  const referenceUrl = sourceUrl || url;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-charcoal-950/90 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo Lightbox: ${title}`}
    >
      <div
        className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-charcoal-900/70 text-white flex items-center justify-center hover:bg-charcoal-900 transition-colors shadow-lg"
          aria-label="Close Lightbox"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Large Image View */}
        <div className="md:w-3/5 bg-charcoal-950 relative flex items-center justify-center min-h-[300px] md:min-h-[460px]">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-contain max-h-[70vh]"
          />
        </div>

        {/* Info & Attribution Sidebar */}
        <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-ivory-50">
          <div>
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-terracotta-100 text-terracotta-700">
                <MapPin className="w-3 h-3" />
                {cityName}
              </span>
              {artFormName && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gold-100 text-gold-800">
                  <Tag className="w-3 h-3" />
                  {artFormName}
                </span>
              )}
            </div>

            {/* Title */}
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-charcoal-900 mb-3 leading-snug">
              {title}
            </h2>

            {/* Description */}
            {description && (
              <p className="text-sm text-charcoal-600 leading-relaxed font-sans mb-6">
                {description}
              </p>
            )}

            {/* Attribution */}
            {attribution && (
              <div className="mb-6 p-3.5 rounded-2xl bg-sand-100 border border-sand-300 text-xs text-charcoal-700 space-y-1">
                <div className="font-semibold text-charcoal-900 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-terracotta-600" />
                  <span>Creator / Attribution</span>
                </div>
                <p className="italic text-charcoal-600">{attribution}</p>
              </div>
            )}
          </div>

          {/* Reference & Source Link */}
          {referenceUrl && (
            <div className="pt-4 border-t border-sand-300">
              <a
                href={referenceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-terracotta-600 text-white font-semibold text-xs uppercase tracking-wider hover:bg-terracotta-700 transition-colors shadow-md"
              >
                <span>View Original Reference</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
