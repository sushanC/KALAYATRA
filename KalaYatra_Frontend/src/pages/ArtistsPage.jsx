import { useState } from 'react';
import { useCity } from '../context/CityContext';
import { useArtists } from '../hooks/useArtists';
import ArtistCard from '../components/artist/ArtistCard';
import { SkeletonCard } from '../components/common/SkeletonCard';
import { ErrorState } from '../components/common/ErrorState';
import { EmptyState } from '../components/common/EmptyState';
import { User } from 'lucide-react';
import { useScrollToTop } from '../utils/helpers';

export default function ArtistsPage() {
  useScrollToTop();
  const { selectedCitySlug, selectedCity, cities, selectCity } = useCity();
  const cityName = selectedCity?.name || (selectedCitySlug === 'udupi' ? 'Udupi' : 'Mysuru');

  const { artists, loading, error } = useArtists(selectedCitySlug);

  const cityOptions = cities.length > 0 ? cities : [
    { slug: 'udupi', name: 'Udupi' },
    { slug: 'mysuru', name: 'Mysuru' },
  ];

  return (
    <div className="page-enter pt-[72px]">
      {/* Header */}
      <section className="bg-charcoal-950 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-cultural-texture opacity-5" aria-hidden="true" />
        <div className="section-container relative">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-terracotta-400 mb-3">Artists</p>
          <h1 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            Artists You Should Know
          </h1>
          <p className="text-charcoal-400 text-base max-w-xl">
            The keepers of {cityName}'s living cultural heritage. Meet the artists who practice, teach, and preserve these traditions.
          </p>
        </div>
      </section>

      {/* City Filter */}
      <div className="bg-white border-b border-ivory-200 sticky top-[72px] z-30">
        <div className="section-container flex items-center gap-2 py-3">
          <span className="text-xs text-charcoal-500 font-medium">City:</span>
          {cityOptions.map((city) => (
            <button
              key={city.slug}
              onClick={() => selectCity(city.slug)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all
                ${city.slug === selectedCitySlug
                  ? 'bg-charcoal-900 text-white'
                  : 'text-charcoal-600 hover:bg-ivory-100'
                }`}
              aria-pressed={city.slug === selectedCitySlug}
            >
              {city.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="section-padding bg-ivory-50" aria-label="Artists grid">
        <div className="section-container">
          {error ? (
            <ErrorState message={error} />
          ) : loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : artists.length === 0 ? (
            <EmptyState
              icon={User}
              title="No artists found"
              description={`We haven't listed artists for ${cityName} yet. Check back soon.`}
            />
          ) : (
            <>
              <p className="text-sm text-charcoal-500 mb-6">
                {artists.length} {artists.length === 1 ? 'artist' : 'artists'} from {cityName}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {artists.map((artist) => (
                  <ArtistCard key={artist._id} artist={artist} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
