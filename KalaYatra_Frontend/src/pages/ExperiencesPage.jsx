import { useState, useEffect } from 'react';
import { Play, Image as ImageIcon, Music, Sparkles, Filter } from 'lucide-react';
import { useCity } from '../context/CityContext';
import { getAllMedia, getMediaByCity } from '../api/mediaApi';
import MediaCard from '../components/media/MediaCard';
import MediaLightbox from '../components/media/MediaLightbox';
import { SkeletonCard } from '../components/common/SkeletonCard';
import EmptyState from '../components/common/EmptyState';
import { ErrorState } from '../components/common/ErrorState';

const MEDIA_TYPES = [
  { id: 'all', label: 'All Media', icon: Sparkles },
  { id: 'youtube', label: 'Watch Videos', icon: Play },
  { id: 'image', label: 'Visual Gallery', icon: ImageIcon },
  { id: 'audio', label: 'Audio & Music', icon: Music },
];

export default function ExperiencesPage() {
  const { cities } = useCity();
  const [activeCityFilter, setActiveCityFilter] = useState('all');
  const [activeTypeFilter, setActiveTypeFilter] = useState('all');
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLightboxItem, setSelectedLightboxItem] = useState(null);

  useEffect(() => {
    async function fetchMedia() {
      setLoading(true);
      setError(null);
      try {
        let items = [];
        if (activeCityFilter === 'all') {
          items = await getAllMedia();
        } else {
          items = await getMediaByCity(activeCityFilter);
        }
        setMediaItems(items || []);
      } catch (err) {
        console.error('Failed to load media:', err);
        setError('Unable to load cultural media experiences. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    fetchMedia();
  }, [activeCityFilter]);

  const filteredItems = mediaItems.filter((item) => {
    if (activeTypeFilter === 'all') return true;
    return item.type === activeTypeFilter;
  });

  return (
    <div className="min-h-screen bg-ivory-50 pb-20 pt-[72px]">
      {/* Lightbox Modal */}
      {selectedLightboxItem && (
        <MediaLightbox
          item={selectedLightboxItem}
          onClose={() => setSelectedLightboxItem(null)}
        />
      )}

      {/* Header Banner */}
      <section className="bg-charcoal-900 text-ivory-50 py-14 lg:py-18 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-bold">
            Immersive Cultural Showcase
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mt-2 text-ivory-50">
            Watch, Listen & Experience
          </h1>
          <p className="mt-3 text-base sm:text-lg text-sand-300 max-w-2xl mx-auto font-sans">
            Explore rich audio-visual documentations of traditional performances, ritualistic chants, and master craftsmanship across Karnataka.
          </p>
        </div>
      </section>

      {/* Filter Controls Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-7 relative z-20">
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-sand-300 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Media Type Tabs */}
          <div className="flex flex-wrap gap-2">
            {MEDIA_TYPES.map((type) => {
              const Icon = type.icon;
              const isActive = activeTypeFilter === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setActiveTypeFilter(type.id)}
                  className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all ${
                    isActive
                      ? 'bg-terracotta-600 text-white shadow-md'
                      : 'bg-sand-100 text-charcoal-700 hover:bg-sand-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{type.label}</span>
                </button>
              );
            })}
          </div>

          {/* City Filter Dropdown */}
          <div className="flex items-center space-x-2 shrink-0">
            <Filter className="w-4 h-4 text-charcoal-500" />
            <span className="text-xs font-semibold text-charcoal-600 uppercase tracking-wider">City:</span>
            <select
              value={activeCityFilter}
              onChange={(e) => setActiveCityFilter(e.target.value)}
              className="bg-sand-50 border border-sand-300 text-charcoal-900 text-xs sm:text-sm font-medium rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta-500"
            >
              <option value="all">All Cities</option>
              {cities.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <SkeletonCard key={n} />
            ))}
          </div>
        ) : error ? (
          <ErrorState
            message={error}
            onRetry={() => {
              setActiveCityFilter('all');
              setActiveTypeFilter('all');
            }}
          />
        ) : filteredItems.length === 0 ? (
          <EmptyState
            icon={Sparkles}
            title="No media items match your selection"
            description="Try switching filters or selecting a different city to explore cultural media."
            actionLabel="Reset Filters"
            onAction={() => {
              setActiveCityFilter('all');
              setActiveTypeFilter('all');
            }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <MediaCard
                key={item._id || item.id}
                item={item}
                onOpenLightbox={(mediaItem) => setSelectedLightboxItem(mediaItem)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
