import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, ArrowLeft, Mail, Award, BookOpen, Music } from 'lucide-react';
import { getArtistBySlug } from '../api/artistApi';
import { getMediaByCity } from '../api/mediaApi';
import ConnectModal from '../components/artist/ConnectModal';
import MediaCard from '../components/media/MediaCard';

export default function ArtistDetailPage() {
  const { slug } = useParams();
  const [artist, setArtist] = useState(null);
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isConnectOpen, setIsConnectOpen] = useState(false);

  useEffect(() => {
    async function loadArtistData() {
      setLoading(true);
      setError(null);
      try {
        const data = await getArtistBySlug(slug);
        setArtist(data);
        if (data?.city?.slug) {
          const m = await getMediaByCity(data.city.slug);
          setMediaList(m || []);
        }
      } catch (err) {
        console.error('Failed to load artist:', err);
        setError('Artist profile not found.');
      } finally {
        setLoading(false);
      }
    }
    loadArtistData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory-50 flex items-center justify-center py-24">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-terracotta-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-charcoal-500 font-serif italic">Unveiling artist story...</p>
        </div>
      </div>
    );
  }

  if (error || !artist) {
    return (
      <div className="min-h-screen bg-ivory-50 flex items-center justify-center py-24 px-4">
        <div className="max-w-md text-center bg-white p-8 rounded-3xl border border-sand-300 shadow-sm">
          <h2 className="font-serif text-2xl text-charcoal-900 font-bold mb-2">Artist Not Found</h2>
          <p className="text-charcoal-600 text-sm mb-6">{error || 'We could not find this artist.'}</p>
          <Link
            to="/artists"
            className="inline-flex items-center space-x-2 px-6 py-2.5 bg-terracotta-600 text-white rounded-full text-sm font-medium hover:bg-terracotta-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Artists</span>
          </Link>
        </div>
      </div>
    );
  }

  const cityName = typeof artist.city === 'object' ? artist.city?.name : artist.city;
  const artForms = Array.isArray(artist.artForms) ? artist.artForms : [];

  return (
    <div className="min-h-screen bg-ivory-50 pb-20">
      {/* Top Banner / Hero */}
      <section className="relative bg-charcoal-900 text-ivory-100 py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            to="/artists"
            className="inline-flex items-center space-x-2 text-sand-300 hover:text-white mb-8 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Artists</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
            {/* Profile Image */}
            <div className="lg:col-span-1">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-gold-500/20 aspect-[4/5] bg-charcoal-800">
                <img
                  src={artist.image || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80'}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent" />
                {cityName && (
                  <div className="absolute bottom-4 left-4 bg-charcoal-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs text-gold-300 font-medium border border-gold-500/30 flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Based in {cityName}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Info Header */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-gold-400 font-bold">
                  Master Practitioner & Cultural Custodian
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory-50 font-bold mt-2 tracking-tight">
                  {artist.name}
                </h1>
              </div>

              {/* Bio summary */}
              <p className="text-sand-200 text-lg leading-relaxed max-w-2xl font-sans">
                {artist.shortBio || artist.bio}
              </p>

              {/* Art Forms Badges */}
              {artForms.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-wider text-sand-400 font-semibold block">
                    Associated Art Forms
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {artForms.map((af, idx) => {
                      const afName = typeof af === 'object' ? af.name : af;
                      const afSlug = typeof af === 'object' ? af.slug : null;
                      return afSlug ? (
                        <Link
                          key={idx}
                          to={`/art-forms/${afSlug}`}
                          className="px-4 py-1.5 rounded-full text-xs font-semibold bg-terracotta-600/30 border border-terracotta-500/40 text-terracotta-200 hover:bg-terracotta-600/50 transition-colors"
                        >
                          {afName}
                        </Link>
                      ) : (
                        <span
                          key={idx}
                          className="px-4 py-1.5 rounded-full text-xs font-semibold bg-charcoal-800 text-sand-300"
                        >
                          {afName}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Connect CTA */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setIsConnectOpen(true)}
                  className="px-8 py-3.5 bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2 text-base"
                >
                  <Mail className="w-5 h-5" />
                  <span>Connect With Artist</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left / Main Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Detailed Biography */}
            {artist.bio && (
              <section className="bg-white p-8 sm:p-10 rounded-3xl border border-sand-300 shadow-sm space-y-4">
                <div className="flex items-center space-x-3 text-terracotta-600">
                  <BookOpen className="w-6 h-6" />
                  <h2 className="font-serif text-2xl text-charcoal-900 font-bold">
                    Life & Legacy
                  </h2>
                </div>
                <div className="prose prose-sand max-w-none text-charcoal-700 leading-relaxed text-base">
                  {artist.bio.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </section>
            )}

            {/* Media Gallery featuring this artist/city */}
            {mediaList.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-terracotta-600">
                    <Music className="w-6 h-6" />
                    <h2 className="font-serif text-2xl text-charcoal-900 font-bold">
                      Performances & Media
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {mediaList.slice(0, 4).map((item) => (
                    <MediaCard key={item._id || item.id} item={item} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Quick Facts Card */}
            <div className="bg-white p-6 rounded-3xl border border-sand-300 shadow-sm space-y-4">
              <h3 className="font-serif text-lg text-charcoal-900 font-bold border-b border-sand-200 pb-3 flex items-center space-x-2">
                <Award className="w-5 h-5 text-gold-600" />
                <span>Artist Highlights</span>
              </h3>

              <ul className="space-y-3 text-sm text-charcoal-700">
                <li className="flex justify-between py-1 border-b border-sand-100">
                  <span className="text-charcoal-500">Location</span>
                  <span className="font-medium text-charcoal-900">{cityName || 'Karnataka'}</span>
                </li>
                <li className="flex justify-between py-1 border-b border-sand-100">
                  <span className="text-charcoal-500">Practices</span>
                  <span className="font-medium text-charcoal-900">
                    {artForms.map(af => typeof af === 'object' ? af.name : af).join(', ') || 'Traditional Arts'}
                  </span>
                </li>
                <li className="flex justify-between py-1">
                  <span className="text-charcoal-500">Status</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                    Active Master
                  </span>
                </li>
              </ul>
            </div>

            {/* Cultural Preservation Card CTA */}
            <div className="bg-gradient-to-br from-terracotta-600 to-terracotta-800 text-white p-6 rounded-3xl shadow-lg space-y-4">
              <h3 className="font-serif text-xl font-bold">
                Support Living Traditions
              </h3>
              <p className="text-terracotta-100 text-sm leading-relaxed">
                By connecting with traditional artists, you directly support the preservation of ancient art forms passed down through generations.
              </p>
              <button
                onClick={() => setIsConnectOpen(true)}
                className="w-full py-3 bg-gold-400 hover:bg-gold-500 text-charcoal-950 font-semibold text-sm rounded-xl transition-colors shadow"
              >
                Send Inquiry
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Connect Modal */}
      <ConnectModal
        artist={artist}
        isOpen={isConnectOpen}
        onClose={() => setIsConnectOpen(false)}
      />
    </div>
  );
}
