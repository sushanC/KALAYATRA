import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Compass, Music, BookOpen, Palette, Play } from 'lucide-react';
import { useCity } from '../context/CityContext';
import { useArtForms } from '../hooks/useArtForms';
import { useMedia } from '../hooks/useMedia';
import ArtFormCard from '../components/art/ArtFormCard';
import MediaCard from '../components/media/MediaCard';
import { SkeletonCard } from '../components/common/SkeletonCard';
import { ErrorState } from '../components/common/ErrorState';
import { useScrollToTop } from '../utils/helpers';

// ── Category data ──────────────────────────────────────────────
const CATEGORIES = [
  {
    id: 'performing-arts',
    label: 'Performing Arts',
    icon: Play,
    description: 'Theatre, dance drama, folk performances rooted in centuries of tradition.',
    filter: 'Performing Arts',
    emoji: '🎭',
    color: 'from-terracotta-500 to-terracotta-600',
    bg: 'bg-terracotta-50',
    border: 'border-terracotta-200',
    text: 'text-terracotta-700',
  },
  {
    id: 'music',
    label: 'Music',
    icon: Music,
    description: 'Classical, devotional and folk music traditions passed through generations.',
    filter: 'Music',
    emoji: '🎵',
    color: 'from-gold-500 to-gold-600',
    bg: 'bg-gold-100',
    border: 'border-gold-300',
    text: 'text-gold-700',
  },
  {
    id: 'arts-crafts',
    label: 'Arts & Crafts',
    icon: Palette,
    description: 'Visual arts, handcrafts, and material culture unique to the region.',
    filter: 'Arts & Crafts',
    emoji: '🎨',
    color: 'from-sandalwood-400 to-sandalwood-DEFAULT',
    bg: 'bg-sandalwood-100',
    border: 'border-sandalwood-200',
    text: 'text-charcoal-700',
  },
  {
    id: 'literature',
    label: 'Literature & Language',
    icon: BookOpen,
    description: 'Poetry, prose, oral traditions and the languages that carry them.',
    filter: 'Literature & Language',
    emoji: '📜',
    color: 'from-charcoal-700 to-charcoal-900',
    bg: 'bg-charcoal-50',
    border: 'border-charcoal-200',
    text: 'text-charcoal-700',
  },
];

// ── Suggested prompts ──────────────────────────────────────────
const SUGGESTED_PROMPTS = [
  'What makes Yakshagana unique?',
  'Tell me about Mysuru painting traditions.',
  'Which art forms originated in Udupi?',
  'What is the cultural significance of Dollu Kunitha?',
  'How has Karnataka folk music evolved?',
];

// ── Section wrapper ────────────────────────────────────────────
function SectionHeader({ eyebrow, title, subtitle, light = false }) {
  return (
    <div className="mb-10">
      {eyebrow && (
        <p className={`text-xs font-semibold uppercase tracking-[0.15em] mb-3 ${light ? 'text-gold-DEFAULT' : 'text-terracotta-500'}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`font-display text-display-sm mb-3 ${light ? 'text-white' : 'text-charcoal-900'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base max-w-xl ${light ? 'text-charcoal-300' : 'text-charcoal-500'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ── Homepage ───────────────────────────────────────────────────
export default function HomePage() {
  useScrollToTop();
  const { selectedCitySlug, selectedCity } = useCity();
  const cityName = selectedCity?.name || (selectedCitySlug === 'udupi' ? 'Udupi' : 'Mysuru');
  const navigate = useNavigate();

  const { artForms, loading: afLoading, error: afError } = useArtForms(selectedCitySlug);
  const { media, loading: mediaLoading, error: mediaError } = useMedia(selectedCitySlug);

  return (
    <div className="page-enter">
      {/* ──────────────────────── HERO ──────────────────────── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        aria-label="Hero section"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-charcoal-950">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{
              backgroundImage: selectedCitySlug === 'mysuru'
                ? "url('https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=1600&q=80')"
                : "url('https://images.unsplash.com/photo-1600020748778-e7ade4e12d7a?w=1600&q=80')",
            }}
            role="img"
            aria-label={`${cityName} cultural landscape`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/60 via-charcoal-950/30 to-charcoal-950/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative section-container pt-32 pb-24">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-DEFAULT mb-6 flex items-center gap-2">
              <span className="w-6 h-px bg-gold-DEFAULT inline-block" />
              Culture, Craft & Stories
            </p>

            <h1 className="font-display font-bold text-white leading-[1.06] mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
              Discover the culture<br />
              behind every{' '}
              <span className="text-gradient-gold">destination.</span>
            </h1>

            <p className="text-charcoal-300 text-lg md:text-xl mb-3 max-w-xl leading-relaxed">
              Explore the art, artists, music and traditions of{' '}
              <span className="text-white font-medium">{cityName}</span>.
            </p>
            <p className="text-charcoal-400 text-sm mb-10 max-w-lg">
              {selectedCity?.description || 'A culturally rich destination waiting to be discovered.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/explore"
                id="hero-cta-explore"
                className="btn-primary text-base px-8 py-4"
              >
                Explore {cityName} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/journey"
                id="hero-cta-journey"
                className="btn-secondary border-white/30 text-white hover:bg-white/10 text-base px-8 py-4"
              >
                <Sparkles className="w-4 h-4" />
                Build My Cultural Journey
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-charcoal-400">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-charcoal-600 animate-pulse" />
        </div>
      </section>

      {/* ──────────── WHAT ARE YOU LOOKING FOR ──────────── */}
      <section className="section-padding bg-ivory-50" aria-label="Explore categories">
        <div className="section-container">
          <SectionHeader
            eyebrow="Browse by Interest"
            title="What are you looking for?"
            subtitle="Explore the many dimensions of cultural expression — from live performance to ancient craft."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.id}
                  to={`/explore?category=${encodeURIComponent(cat.filter)}`}
                  id={`category-card-${cat.id}`}
                  className={`group p-6 rounded-card-lg border ${cat.bg} ${cat.border} hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1`}
                  aria-label={`Explore ${cat.label}`}
                >
                  <div className="text-3xl mb-4">{cat.emoji}</div>
                  <h3 className={`font-display font-semibold text-lg mb-2 ${cat.text} group-hover:translate-x-0.5 transition-transform`}>
                    {cat.label}
                  </h3>
                  <p className="text-sm text-charcoal-500 leading-relaxed">{cat.description}</p>
                  <div className={`mt-4 flex items-center gap-1 text-xs font-medium ${cat.text} group-hover:gap-2 transition-all`}>
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────── DISCOVER [CITY] ────────────────── */}
      <section className="section-padding bg-white" aria-label={`Discover ${cityName} art forms`}>
        <div className="section-container">
          <div className="flex items-end justify-between mb-8">
            <SectionHeader
              eyebrow="Art Forms"
              title={`Discover ${cityName}`}
              subtitle="Art forms connected to this destination — local origins, regional heritage, and performed traditions."
            />
            <Link to="/explore" className="hidden md:flex items-center gap-1 text-sm text-terracotta-600 hover:text-terracotta-700 font-medium mb-6 flex-shrink-0">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {afError ? (
            <ErrorState message={afError} />
          ) : (
            <div className="scroll-rail">
              {afLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonCard key={i} className="flex-shrink-0 w-72" />
                  ))
                : artForms.slice(0, 8).map((af) => (
                    <ArtFormCard key={af._id} artForm={af} variant="horizontal" />
                  ))
              }
            </div>
          )}
        </div>
      </section>


      {/* ──────────────── WATCH & LISTEN ──────────────────── */}
      <section className="section-padding bg-white" aria-label="Watch and listen">
        <div className="section-container">
          <div className="flex items-end justify-between mb-8">
            <SectionHeader
              eyebrow="Media"
              title="Watch & Listen"
              subtitle={`Performances, demonstrations and cultural media from ${cityName}.`}
            />
            <Link to="/experiences" className="hidden md:flex items-center gap-1 text-sm text-terracotta-600 hover:text-terracotta-700 font-medium mb-6 flex-shrink-0">
              All media <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {mediaError ? (
            <ErrorState message={mediaError} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {mediaLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))
                : media.slice(0, 6).map((m) => (
                    <MediaCard key={m._id} media={m} />
                  ))
              }
            </div>
          )}
        </div>
      </section>

      {/* ─────────────── BUILD MY CULTURAL JOURNEY ─────────── */}
      <section
        className="section-padding bg-charcoal-950 relative overflow-hidden"
        aria-label="Build My Cultural Journey feature"
      >
        <div className="absolute inset-0 bg-cultural-texture opacity-5" aria-hidden="true" />
        <div className="section-container relative">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-DEFAULT/20 text-gold-DEFAULT text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" /> Powered by Gemini
            </div>
            <h2 className="font-display font-bold text-white text-display-sm mb-5">
              Build My Cultural Journey
            </h2>
            <p className="text-charcoal-300 text-lg mb-4 leading-relaxed">
              Tell us what you're curious about. Gemini will build a personalized cultural journey around your interests — art forms, artists, experiences, and more.
            </p>
            <p className="text-charcoal-500 text-sm mb-10">
              Choose a city, your available time, and what draws you. Get a curated itinerary in seconds.
            </p>
            <Link
              to="/journey"
              id="home-journey-cta"
              className="btn-gold text-base px-10 py-4 mx-auto"
            >
              <Sparkles className="w-4 h-4" />
              Build My Journey
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────── BECOME PART OF THE ART ───────────── */}
      <section
        className="section-padding relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #FDF2EE 0%, #F5EDD8 50%, #FAE2D9 100%)' }}
        aria-label="Become Part of the Art feature"
      >
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-terracotta-500 mb-4">
                Signature Feature
              </p>
              <h2 className="font-display font-bold text-charcoal-900 text-display-sm mb-5 leading-tight">
                Become Part<br />of the Art
              </h2>
              <p className="text-charcoal-600 text-lg mb-4 leading-relaxed">
                Choose an art form, tell us who you are, and let Gemini create a cultural experience inspired by it.
              </p>
              <p className="text-charcoal-500 text-sm mb-8 max-w-md">
                Discover your character in a Yakshagana story, find your role in a Mysuru painting — your personality woven into an ancient tradition.
              </p>
              <Link
                to="/become-part"
                id="home-become-part-cta"
                className="btn-primary text-base px-8 py-4"
              >
                Create My Experience <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-3">
              {['🎭', '🎨', '🎵', '📜'].map((emoji, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-card-lg flex items-center justify-center text-5xl
                    ${i % 2 === 0 ? 'bg-terracotta-100' : 'bg-sandalwood-100'}
                    ${i === 1 ? 'mt-6' : ''}
                    ${i === 3 ? '-mt-6' : ''}
                  `}
                  aria-hidden="true"
                >
                  {emoji}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── ASK THE CULTURAL GUIDE ──────────── */}
      <section className="section-padding bg-white" aria-label="Ask the Cultural Guide">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              eyebrow="AI Cultural Guide"
              title="Ask the Cultural Guide"
              subtitle="Have a question about a tradition, art form, or artist? Our Gemini-powered guide knows the culture deeply."
            />
            <div className="bg-ivory-50 rounded-card-lg p-6 border border-ivory-200">
              <p className="text-xs font-semibold text-charcoal-400 uppercase tracking-wider mb-3">Suggested questions</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {SUGGESTED_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => navigate(`/guide?q=${encodeURIComponent(prompt)}`)}
                    className="text-sm px-3 py-1.5 bg-white border border-ivory-200 text-charcoal-700 rounded-full hover:border-terracotta-300 hover:text-terracotta-700 transition-colors"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
              <Link
                to="/guide"
                id="home-guide-cta"
                className="btn-primary"
              >
                <Compass className="w-4 h-4" />
                Ask the Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── MAP TEASER ──────────────────────── */}
      <section className="section-padding bg-charcoal-900" aria-label="Cultural map coming soon">
        <div className="section-container">
          <div className="text-center max-w-xl mx-auto">
            <div className="text-5xl mb-6" aria-hidden="true">🗺️</div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-charcoal-400 mb-3">Coming Soon</p>
            <h2 className="font-display font-bold text-white text-display-sm mb-4">
              The Cultural Map
            </h2>
            <p className="text-charcoal-400 text-base mb-8">
              Explore cultural hotspots, artist workshops, performance venues, and heritage sites — pinned on an interactive map of Karnataka.
            </p>
            <Link
              to="/map"
              className="btn-secondary border-charcoal-600 text-charcoal-300 hover:bg-charcoal-800"
            >
              Preview the Map <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
