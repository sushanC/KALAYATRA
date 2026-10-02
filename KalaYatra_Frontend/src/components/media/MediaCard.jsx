import { useState } from 'react';
import { Play, Image as ImageIcon, Music, ExternalLink, MapPin, User } from 'lucide-react';
import { getYouTubeId, getYouTubeThumbnail } from '../../utils/helpers';

function YouTubeEmbed({ url, title }) {
  const [playing, setPlaying] = useState(false);
  const videoId = getYouTubeId(url);
  const thumbnail = getYouTubeThumbnail(url);

  if (!videoId) return null;

  if (playing) {
    return (
      <div className="aspect-video w-full">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-t-card"
        />
      </div>
    );
  }

  return (
    <button
      className="relative w-full aspect-video overflow-hidden rounded-t-card group"
      onClick={() => setPlaying(true)}
      aria-label={`Play: ${title}`}
    >
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-charcoal-950/40 flex items-center justify-center group-hover:bg-charcoal-950/30 transition-colors">
        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <Play className="w-6 h-6 text-charcoal-900 ml-0.5" />
        </div>
      </div>
    </button>
  );
}

export default function MediaCard({ media, item, onOpenLightbox }) {
  const mediaData = media || item;
  if (!mediaData) return null;

  const { title, type, url, thumbnail, description, city, artForm, sourceUrl, attribution } = mediaData;

  const artFormName = typeof artForm === 'object' ? artForm?.name : null;
  const cityName = typeof city === 'object' ? city?.name : city;

  const TypeIcon = type === 'youtube' ? Play : type === 'audio' ? Music : ImageIcon;
  const typeLabel = { youtube: 'Video', image: 'Image', audio: 'Audio' }[type] || type;

  const referenceUrl = sourceUrl || url;
  const displayImage = thumbnail || url;

  return (
    <article className="card group flex flex-col justify-between" aria-label={title}>
      <div>
        {/* Media Preview */}
        <div className="relative overflow-hidden rounded-t-card bg-charcoal-100">
          {type === 'youtube' && url ? (
            <YouTubeEmbed url={url} title={title} />
          ) : type === 'image' && displayImage ? (
            <div
              className="aspect-video overflow-hidden cursor-pointer relative"
              onClick={() => onOpenLightbox && onOpenLightbox(mediaData)}
              aria-label={`View photo: ${title}`}
            >
              <img
                src={displayImage}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-charcoal-950/0 group-hover:bg-charcoal-950/20 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1.5 rounded-full bg-white/90 text-charcoal-900 text-xs font-semibold shadow-md">
                  Expand View
                </span>
              </div>
            </div>
          ) : type === 'audio' ? (
            <div className="aspect-video bg-gradient-to-br from-charcoal-800 to-charcoal-900 flex flex-col items-center justify-center gap-3 p-4">
              <div className="w-14 h-14 rounded-full bg-gold-400/20 flex items-center justify-center">
                <Music className="w-7 h-7 text-gold-300" />
              </div>
              {url && (
                <audio controls className="w-full mt-2 max-w-xs" aria-label={title}>
                  <source src={url} />
                  Your browser does not support audio playback.
                </audio>
              )}
            </div>
          ) : (
            <div className="aspect-video bg-ivory-100 flex items-center justify-center">
              <TypeIcon className="w-10 h-10 text-charcoal-300" />
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="p-5 space-y-2.5">
          {/* Badges strip */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="badge-charcoal text-[10px]">{typeLabel}</span>
            {cityName && (
              <span className="badge-sandalwood text-[10px] inline-flex items-center gap-0.5">
                <MapPin className="w-2.5 h-2.5" />
                {cityName}
              </span>
            )}
            {artFormName && <span className="badge-terracotta text-[10px]">{artFormName}</span>}
          </div>

          {/* Title */}
          <h3 className="font-display font-semibold text-charcoal-900 text-base leading-snug line-clamp-2 group-hover:text-terracotta-600 transition-colors">
            {title}
          </h3>

          {/* Description */}
          {description && (
            <p className="text-xs text-charcoal-600 line-clamp-2 leading-relaxed font-sans">{description}</p>
          )}

          {/* Attribution */}
          {attribution && (
            <div className="flex items-center gap-1 text-[11px] text-charcoal-500 font-sans italic pt-1">
              <User className="w-3 h-3 text-terracotta-600 shrink-0" />
              <span className="truncate">{attribution}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer / Source Links */}
      <div className="px-5 pb-5 pt-1 border-t border-sand-200/60 flex items-center justify-between">
        {type === 'image' ? (
          <button
            onClick={() => onOpenLightbox && onOpenLightbox(mediaData)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-terracotta-600 hover:text-terracotta-700 transition-colors"
          >
            <span>Open Gallery View</span>
          </button>
        ) : referenceUrl ? (
          <a
            href={referenceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-terracotta-600 hover:text-terracotta-700 hover:underline transition-colors"
            aria-label={`View source for ${title}`}
          >
            <span>{type === 'youtube' ? 'Watch Original' : 'View Source'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ) : (
          <span className="text-xs text-charcoal-400">Cultural Record</span>
        )}

        {referenceUrl && type === 'image' && (
          <a
            href={referenceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-charcoal-500 hover:text-terracotta-600 hover:underline transition-colors"
            title="External Reference Link"
          >
            <span>Reference</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </article>
  );
}
