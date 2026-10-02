import { useState, useMemo } from 'react';
import { Sparkles, Feather, RefreshCw, Copy, Check, Palette, Tag, MapPin } from 'lucide-react';
import { useCity } from '../context/CityContext';
import { useArtForms } from '../hooks/useArtForms';
import { becomePartOfArt } from '../api/geminiApi';

export default function BecomePartPage() {
  const { selectedCity, selectedCitySlug, selectCity, cities, currentCity } = useCity();
  const activeCitySlug = selectedCity?.slug || selectedCitySlug || 'udupi';
  const { artForms, loading: afLoading } = useArtForms(activeCitySlug);

  const [name, setName] = useState('');
  const [personality, setPersonality] = useState('');
  const [selectedArtFormSlug, setSelectedArtFormSlug] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  // Find currently selected art form details
  const selectedArtForm = useMemo(() => {
    if (!artForms || artForms.length === 0) return null;
    return artForms.find((af) => af.slug === selectedArtFormSlug) || artForms[0];
  }, [artForms, selectedArtFormSlug]);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!name.trim() || loading) return;

    setLoading(true);
    setResult(null);

    const artSlug = selectedArtForm?.slug || selectedArtFormSlug || artForms[0]?.slug || 'yakshagana-badagutittu';
    const citySlug = selectedCity?.slug || selectedCitySlug || (typeof selectedCity === 'string' ? selectedCity : 'udupi');

    try {
      const res = await becomePartOfArt({
        citySlug,
        artFormSlug: artSlug,
        name: name.trim(),
        personality: personality.trim() || 'Enthusiastic cultural seeker',
      });

      const data = res?.result || res?.data || res;
      setResult(data);
    } catch (err) {
      console.error('Failed to generate persona:', err);
      setResult({
        characterName: `${name} the Guardian of ${currentCity?.name || selectedCity?.name || 'Karnataka'} Rhythms`,
        roleTitle: `Master Narrator in ${selectedArtForm?.name || 'Traditional Art'} Guild`,
        verse: `With footsteps resonant like temple drums,\n${name} steps into the golden hall of ${selectedArtForm?.name || 'Karnataka legends'}.\nPreserving ancient whispers for generations to come.`,
        story: `${name} is immortalized as a key protagonist in the rich cultural tapestry of ${currentCity?.name || selectedCity?.name}. Bringing passion and devotion to the living heritage of ${selectedArtForm?.name || 'traditional performance'}.`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    const textToCopy = `${result.characterName || result.roleTitle}\n\n${result.verse || result.story}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-ivory-50 pb-24">
      {/* Header Banner */}
      <section className="bg-charcoal-900 text-ivory-50 py-12 lg:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-20 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-400/20 text-gold-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-gold-400/30">
            <Feather className="w-4 h-4" />
            <span>Interactive Signature Feature</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold">
            Become Part of the Art
          </h1>
          <p className="mt-3 text-sand-300 text-sm sm:text-base max-w-xl mx-auto font-sans">
            Step into the legend. Enter your name and traits to be woven directly into traditional stories, verse, and artistic roles by Gemini AI.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Input Form Column */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-sand-300 shadow-xl space-y-6">
            <h2 className="font-serif text-2xl font-bold text-charcoal-900 border-b border-sand-200 pb-3">
              Craft Your Persona
            </h2>

            <form onSubmit={handleGenerate} className="space-y-4">
              {/* City Selection */}
              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                  1. Cultural Location
                </label>
                <div className="flex gap-2">
                  {cities.map((city) => (
                    <button
                      type="button"
                      key={city.slug}
                      onClick={() => {
                        selectCity(city.slug);
                        setSelectedArtFormSlug('');
                      }}
                      className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                        activeCitySlug === city.slug
                          ? 'bg-terracotta-600 text-white border-terracotta-600 shadow-sm'
                          : 'bg-sand-50 text-charcoal-700 border-sand-300 hover:bg-sand-100'
                      }`}
                    >
                      {city.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Art Form Selection */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider">
                    2. Select Art Form ({artForms.length} available)
                  </label>
                </div>
                <select
                  value={selectedArtFormSlug}
                  onChange={(e) => setSelectedArtFormSlug(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-sand-300 bg-white text-charcoal-900 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                >
                  {artForms.map((af) => (
                    <option key={af.slug} value={af.slug}>
                      {af.name} ({af.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Name Input */}
              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                  3. Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Vikram Sharma"
                  className="w-full px-4 py-2.5 rounded-xl border border-sand-300 bg-white text-charcoal-900 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                />
              </div>

              {/* Personality Input */}
              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                  4. Your Passions / Key Personality
                </label>
                <textarea
                  rows={3}
                  value={personality}
                  onChange={(e) => setPersonality(e.target.value)}
                  placeholder="e.g. Courageous traveler with a deep passion for rhythmic beats and classical myth..."
                  className="w-full px-4 py-2.5 rounded-xl border border-sand-300 bg-white text-charcoal-900 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={!name.trim() || loading}
                className="w-full py-3.5 bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Weaving Persona...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Immortalize Me in Art</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Result / Dynamic Preview Column */}
          <div className="lg:col-span-6">
            {result ? (
              <div className="bg-charcoal-900 text-ivory-50 p-8 rounded-3xl border border-gold-500/30 shadow-2xl space-y-6 relative overflow-hidden animate-fade-in">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  <Feather className="w-32 h-32 text-gold-400" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-widest text-gold-400 font-bold block">
                    {result.roleTitle || 'Traditional Cultural Persona'}
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-ivory-50">
                    {result.characterName || name}
                  </h3>
                </div>

                {/* Stanza / Verse */}
                {result.verse && (
                  <div className="bg-charcoal-800/80 p-5 rounded-2xl border-l-4 border-gold-400 italic text-gold-200 font-serif text-base leading-relaxed whitespace-pre-line">
                    "{result.verse}"
                  </div>
                )}

                {/* Story / Description */}
                <p className="text-sand-300 text-sm leading-relaxed font-sans">
                  {result.story || result.description}
                </p>

                {/* Action Buttons */}
                <div className="pt-4 flex items-center justify-between border-t border-charcoal-800">
                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 bg-charcoal-800 hover:bg-charcoal-700 text-sand-200 text-xs font-semibold rounded-xl flex items-center space-x-2 transition-colors border border-charcoal-700"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied!' : 'Copy Lore'}</span>
                  </button>
                  <button
                    onClick={() => setResult(null)}
                    className="text-xs text-sand-400 hover:text-sand-100 transition-colors"
                  >
                    Generate Another
                  </button>
                </div>
              </div>
            ) : (
              /* Dynamic Preview Card */
              <div className="bg-white rounded-3xl border border-sand-300 shadow-xl overflow-hidden">
                {selectedArtForm?.image && (
                  <div className="h-48 relative overflow-hidden bg-charcoal-900">
                    <img
                      src={selectedArtForm.image}
                      alt={selectedArtForm.name}
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent" />
                    <div className="absolute bottom-4 left-6 right-6">
                      <span className="px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-300 text-[10px] font-bold uppercase tracking-wider border border-gold-500/30">
                        {selectedArtForm.category}
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-white mt-1">
                        {selectedArtForm.name}
                      </h3>
                    </div>
                  </div>
                )}

                <div className="p-6 space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-charcoal-400 uppercase tracking-wider mb-1">
                      Target Art Form Focus
                    </h4>
                    <p className="text-sm text-charcoal-700 line-clamp-3 leading-relaxed">
                      {selectedArtForm?.description || 'Select an art form on the left to preview how your identity will be integrated into traditional lore.'}
                    </p>
                  </div>

                  {selectedArtForm?.characteristics?.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-charcoal-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <Palette className="w-3.5 h-3.5 text-terracotta-500" /> Key Features & Attire
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedArtForm.characteristics.map((char, idx) => (
                          <span key={idx} className="px-2.5 py-1 bg-terracotta-50 text-terracotta-700 text-xs rounded-lg font-medium border border-terracotta-200">
                            {char}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedArtForm?.materials?.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-charcoal-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5 text-gold-600" /> Traditional Materials
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedArtForm.materials.map((mat, idx) => (
                          <span key={idx} className="px-2.5 py-1 bg-gold-50 text-gold-800 text-xs rounded-lg font-medium border border-gold-200">
                            {mat}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-3 border-t border-sand-200 text-center">
                    <p className="text-xs text-charcoal-500 italic">
                      Fill in your name and traits on the left to receive a bespoke verse and story.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
