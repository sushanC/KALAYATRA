import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin, ArrowLeft, Clock, Tag, Sparkles,
  Music, Play, Palette, BookOpen, ChevronDown
} from 'lucide-react';
import { getArtFormBySlug } from '../api/artFormApi';
import { getMediaByArtForm } from '../api/mediaApi';
import MediaCard from '../components/media/MediaCard';
import { SkeletonText } from '../components/common/SkeletonCard';
import { ErrorState } from '../components/common/ErrorState';
import { formatOriginType, useScrollToTop } from '../utils/helpers';
import { FALLBACK_ART_IMAGE } from '../components/art/ArtFormCard';

const ORIGIN_BADGE = {
  local: { label: 'Local Origin', cls: 'bg-terracotta-100 text-terracotta-700' },
  regional: { label: 'Regional Art Form', cls: 'bg-gold-100 text-gold-700' },
  performed_here: { label: 'Performed Here', cls: 'bg-charcoal-100 text-charcoal-700' },
};

const TABS = ['Overview', 'History', 'Media'];

const CATEGORY_ICONS = {
  'Performing Arts': Play,
  'Music': Music,
  'Arts & Crafts': Palette,
  'Literature & Language': BookOpen,
};

export default function ArtFormDetailPage() {
  useScrollToTop();
  const { slug } = useParams();
  const [artForm, setArtForm] = useState(null);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const [heroImgSrc, setHeroImgSrc] = useState(FALLBACK_ART_IMAGE);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getArtFormBySlug(slug)
      .then((data) => {
        setArtForm(data);
        setHeroImgSrc(data?.image || FALLBACK_ART_IMAGE);
        // Fetch media for this art form
        if (data?._id) {
          getMediaByArtForm(data._id).then(setMedia).catch(() => setMedia([]));
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  const handleHeroImageError = () => {
    if (heroImgSrc !== FALLBACK_ART_IMAGE) {
      setHeroImgSrc(FALLBACK_ART_IMAGE);
    }
  };

  if (loading) {
    return (
      <div className="pt-[72px]">
        <div className="h-72 bg-ivory-200 animate-pulse" />
        <div className="section-container py-10">
          <SkeletonText lines={5} />
        </div>
      </div>
    );
  }

  if (error || !artForm) {
    return (
      <div className="pt-[72px] min-h-screen flex items-center justify-center">
        <ErrorState message={error || 'Art form not found'} />
      </div>
    );
  }

  const {
    name, category, description, history, culturalSignificance,
    characteristics, materials, examples, locations, image,
    originType, artists, journeyDuration
  } = artForm;

  const originBadge = ORIGIN_BADGE[originType] || ORIGIN_BADGE.regional;
  const CategoryIcon = CATEGORY_ICONS[category] || Palette;

  const populatedArtists = Array.isArray(artists)
    ? artists.filter((a) => a && typeof a === 'object' && a.slug)
    : [];

  return (
    <div className="page-enter pt-[72px]">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[340px] overflow-hidden" aria-label={`${name} hero`}>
        <div className="absolute inset-0 bg-charcoal-900">
          <img
            src={heroImgSrc}
            alt={name || 'Art Form'}
            onError={handleHeroImageError}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 image-overlay-dark" />
        </div>

        <div className="relative section-container h-full flex flex-col justify-end pb-10">
          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 text-charcoal-300 hover:text-white text-sm mb-6 transition-colors"
            aria-label="Back to Explore"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Explore
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`badge text-xs px-3 py-1 ${originBadge.cls}`}>{originBadge.label}</span>
            <span className="badge bg-white/10 text-white/80 text-xs">{category}</span>
            {journeyDuration && (
              <span className="badge bg-white/10 text-white/80 text-xs flex items-center gap-1">
                <Clock className="w-3 h-3" /> ~{journeyDuration} min experience
              </span>
            )}
          </div>

          <h1 className="font-display font-bold text-white mb-2" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}>
            {name}
          </h1>

          {locations?.length > 0 && (
            <p className="text-charcoal-300 text-sm flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {locations.join(', ')}
            </p>
          )}
        </div>
      </section>

      {/* Tab Bar */}
      <div className="bg-white border-b border-ivory-200 sticky top-[72px] z-30">
        <div className="section-container">
          <div className="flex items-center gap-0 overflow-x-auto" role="tablist" aria-label="Art form details tabs">
            {TABS.map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-5 py-4 text-sm font-medium border-b-2 transition-all
                  ${activeTab === tab
                    ? 'border-terracotta-500 text-terracotta-600'
                    : 'border-transparent text-charcoal-500 hover:text-charcoal-900'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="section-padding bg-ivory-50">
        <div className="section-container">
          <div className="max-w-4xl">

            {activeTab === 'Overview' && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h2 className="font-display text-xl font-semibold text-charcoal-900 mb-3">About</h2>
                  <p className="text-charcoal-600 leading-relaxed text-base">{description}</p>
                </div>

                {culturalSignificance && (
                  <div className="p-6 bg-terracotta-50 border-l-4 border-terracotta-400 rounded-r-card">
                    <h3 className="font-display font-semibold text-terracotta-800 mb-2">Cultural Significance</h3>
                    <p className="text-charcoal-600 leading-relaxed text-sm">{culturalSignificance}</p>
                  </div>
                )}

                {characteristics?.length > 0 && (
                  <div>
                    <h3 className="font-display font-semibold text-charcoal-900 mb-3">Characteristics</h3>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {characteristics.map((c, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-charcoal-600">
                          <span className="text-terracotta-400 mt-0.5 flex-shrink-0">◆</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {materials?.length > 0 && (
                  <div>
                    <h3 className="font-display font-semibold text-charcoal-900 mb-3">Materials & Instruments</h3>
                    <div className="flex flex-wrap gap-2">
                      {materials.map((m, i) => (
                        <span key={i} className="badge-sandalwood">{m}</span>
                      ))}
                    </div>
                  </div>
                )}

                {examples?.length > 0 && (
                  <div>
                    <h3 className="font-display font-semibold text-charcoal-900 mb-3">Notable Examples</h3>
                    <ul className="space-y-1.5">
                      {examples.map((ex, i) => (
                        <li key={i} className="text-sm text-charcoal-600 flex items-start gap-2">
                          <span className="text-gold-DEFAULT mt-0.5 flex-shrink-0">•</span>
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Gemini CTA */}
                <div className="p-6 bg-charcoal-950 rounded-card-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-gold-DEFAULT font-semibold uppercase tracking-wide mb-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Ask Gemini
                    </p>
                    <p className="text-white font-medium text-sm">
                      Have deeper questions about {name}?
                    </p>
                  </div>
                  <Link
                    to={`/guide?artForm=${artForm.slug}`}
                    className="btn-gold text-xs flex-shrink-0"
                  >
                    Ask the Cultural Guide
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'History' && (
              <div className="animate-fade-in">
                <h2 className="font-display text-xl font-semibold text-charcoal-900 mb-4">History & Origins</h2>
                {history ? (
                  <div className="prose-like space-y-4">
                    {history.split('\n').filter(Boolean).map((para, i) => (
                      <p key={i} className="text-charcoal-600 leading-relaxed">{para}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-charcoal-400 italic">Detailed history not available for this art form.</p>
                )}

                {locations?.length > 0 && (
                  <div className="mt-8">
                    <h3 className="font-display font-semibold text-charcoal-900 mb-3">Geographic Presence</h3>
                    <div className="flex flex-wrap gap-2">
                      {locations.map((loc, i) => (
                        <span key={i} className="badge-charcoal flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {loc}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}


            {activeTab === 'Media' && (
              <div className="animate-fade-in">
                <h2 className="font-display text-xl font-semibold text-charcoal-900 mb-6">Watch & Listen</h2>
                {media.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {media.map((m) => (
                      <MediaCard key={m._id} media={m} />
                    ))}
                  </div>
                ) : (
                  <p className="text-charcoal-400 italic">Media for {name} will appear here as we add more content.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
