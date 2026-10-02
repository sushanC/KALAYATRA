import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCity } from '../context/CityContext';
import { useArtForms } from '../hooks/useArtForms';
import ArtFormCard from '../components/art/ArtFormCard';
import { SkeletonCard } from '../components/common/SkeletonCard';
import { ErrorState } from '../components/common/ErrorState';
import { EmptyState } from '../components/common/EmptyState';
import { Palette } from 'lucide-react';
import { useScrollToTop } from '../utils/helpers';

const CATEGORIES = ['All', 'Performing Arts', 'Music', 'Arts & Crafts', 'Literature & Language'];

export default function ExplorePage() {
  useScrollToTop();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const { selectedCitySlug, selectedCity } = useCity();
  const cityName = selectedCity?.name || (selectedCitySlug === 'udupi' ? 'Udupi' : 'Mysuru');

  const { artForms, loading, error } = useArtForms(selectedCitySlug);

  const filtered = activeCategory === 'All'
    ? artForms
    : artForms.filter((af) => af.category === activeCategory);

  const handleCategory = (cat) => {
    setActiveCategory(cat);
    if (cat === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  // Sync URL param
  useEffect(() => {
    const param = searchParams.get('category') || 'All';
    setActiveCategory(param);
  }, [searchParams]);

  return (
    <div className="page-enter pt-[72px]">
      {/* Header */}
      <section className="bg-charcoal-950 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-cultural-texture opacity-5" aria-hidden="true" />
        <div className="section-container relative">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-terracotta-400 mb-3">Explore</p>
          <h1 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            The Culture of {cityName}
          </h1>
          <p className="text-charcoal-400 text-base max-w-xl">
            Discover art forms, traditions, and cultural expressions from {cityName}.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <div className="bg-white border-b border-ivory-200 sticky top-[72px] z-30">
        <div className="section-container">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide" role="tablist" aria-label="Filter by category">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => handleCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-150
                  ${activeCategory === cat
                    ? 'bg-charcoal-900 text-white'
                    : 'text-charcoal-600 hover:bg-ivory-100 hover:text-charcoal-900'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="section-padding bg-ivory-50" aria-label="Art forms grid">
        <div className="section-container">
          {error ? (
            <ErrorState message={error} />
          ) : loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={Palette}
              title={`No ${activeCategory === 'All' ? 'art forms' : activeCategory} found`}
              description={`We don't have ${activeCategory === 'All' ? 'any art forms' : `any ${activeCategory} art forms`} listed for ${cityName} yet.`}
            />
          ) : (
            <>
              <p className="text-sm text-charcoal-500 mb-6">
                {filtered.length} {filtered.length === 1 ? 'art form' : 'art forms'} found
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filtered.map((af) => (
                  <ArtFormCard key={af._id} artForm={af} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
