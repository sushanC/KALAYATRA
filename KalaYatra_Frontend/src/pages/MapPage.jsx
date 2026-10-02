import { useState } from 'react';
import { MapPin, Navigation, Sparkles, Info, Compass, Layers } from 'lucide-react';
import { useCity } from '../context/CityContext';
import { Link } from 'react-router-dom';

const MOCK_MAP_PINS = {
  udupi: [
    { id: 1, name: 'Yakshagana Kalarang', lat: '13.3409', lng: '74.7421', type: 'Performing Arts', desc: 'Historic rehearsal space for traditional Badagutittu Yakshagana troupes.' },
    { id: 2, name: 'Udupi Bronze Foundry', lat: '13.3512', lng: '74.7500', type: 'Arts & Crafts', desc: 'Master artisans casting traditional temple idols & lamps.' },
    { id: 3, name: 'Bhoota Kola Heritage Sanctuary', lat: '13.3300', lng: '74.7610', type: 'Ritualistic Art', desc: 'Sacred grove preserved for seasonal ritualistic performances.' },
  ],
  mysuru: [
    { id: 4, name: 'Mysuru Palace Cultural Stage', lat: '12.3052', lng: '76.6552', type: 'Performing Arts', desc: 'Iconic pavilion for classical music, Dasara dance, and royal heritage.' },
    { id: 5, name: 'Sandalwood Carving Guild', lat: '12.3120', lng: '76.6450', type: 'Arts & Crafts', desc: 'Traditional workshop maintaining royal woodcarving patronage.' },
    { id: 6, name: 'Ganjifa Art Studio', lat: '12.2980', lng: '76.6620', type: 'Arts & Crafts', desc: 'Hand-painted mythological playing cards craftsmanship.' },
  ],
};

export default function MapPage() {
  const { selectedCity, setSelectedCity, cities, currentCity } = useCity();
  const [selectedPin, setSelectedPin] = useState(null);

  const pins = MOCK_MAP_PINS[selectedCity] || MOCK_MAP_PINS.udupi;

  return (
    <div className="min-h-screen bg-ivory-50 pb-20">
      {/* Top Banner */}
      <section className="bg-charcoal-900 text-ivory-50 py-12 lg:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-bold">
            Location-Aware Cultural Explorer
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-2">
            Cultural Map of Karnataka
          </h1>
          <p className="mt-3 text-sand-300 text-sm sm:text-base max-w-xl mx-auto font-sans">
            Discover physical hubs, master artisan studios, and legendary rehearsal grounds pinned by geographic coordinates.
          </p>
        </div>
      </section>

      {/* Main Map Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Map View Canvas (Stylized representation) */}
          <div className="lg:col-span-8 bg-charcoal-900 rounded-3xl border border-charcoal-800 shadow-2xl p-6 relative overflow-hidden min-h-[480px] flex flex-col justify-between">
            {/* Overlay grid graphic */}
            <div className="absolute inset-0 bg-[radial-gradient(#38332d_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

            {/* Map Controls */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-2 bg-charcoal-800/90 backdrop-blur p-1.5 rounded-full border border-charcoal-700">
                {cities.map((city) => (
                  <button
                    key={city.slug}
                    onClick={() => {
                      setSelectedCity(city.slug);
                      setSelectedPin(null);
                    }}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      selectedCity === city.slug
                        ? 'bg-terracotta-600 text-white shadow-md'
                        : 'text-sand-300 hover:text-white'
                    }`}
                  >
                    {city.name}
                  </button>
                ))}
              </div>

              <div className="bg-charcoal-800/90 backdrop-blur px-3 py-1.5 rounded-full border border-charcoal-700 text-xs text-gold-400 flex items-center space-x-1.5">
                <Navigation className="w-3.5 h-3.5" />
                <span>Interactive Preview</span>
              </div>
            </div>

            {/* Simulated Interactive Pin Canvas */}
            <div className="relative z-10 my-12 flex flex-wrap items-center justify-around gap-8 py-12">
              {pins.map((pin) => {
                const isSelected = selectedPin?.id === pin.id;
                return (
                  <button
                    key={pin.id}
                    onClick={() => setSelectedPin(pin)}
                    className={`group relative flex flex-col items-center transition-all duration-300 transform hover:scale-110 ${
                      isSelected ? 'scale-110' : ''
                    }`}
                  >
                    {/* Glowing pulse ring */}
                    <div className="absolute w-12 h-12 bg-terracotta-500/20 rounded-full animate-ping pointer-events-none" />

                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center shadow-2xl border-2 transition-all ${
                        isSelected
                          ? 'bg-gold-400 text-charcoal-950 border-white ring-4 ring-gold-400/40'
                          : 'bg-terracotta-600 text-white border-terracotta-400 hover:bg-terracotta-500'
                      }`}
                    >
                      <MapPin className="w-6 h-6" />
                    </div>

                    <span className="mt-2 text-xs font-semibold text-sand-200 bg-charcoal-950/80 px-2.5 py-1 rounded-full border border-charcoal-700 shadow-md">
                      {pin.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Map footer status bar */}
            <div className="relative z-10 text-xs text-sand-400 flex items-center justify-between border-t border-charcoal-800 pt-4">
              <span>Showing {pins.length} active cultural pins in {currentCity?.name}</span>
              <span className="text-gold-400 font-medium">GPS Enabled Discovery</span>
            </div>
          </div>

          {/* Right Pin Detail Panel */}
          <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border border-sand-300 shadow-xl space-y-6 flex flex-col justify-between">
            {selectedPin ? (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center space-x-2 text-terracotta-600 text-xs font-bold uppercase tracking-wider">
                  <Layers className="w-4 h-4" />
                  <span>{selectedPin.type}</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-charcoal-900">
                  {selectedPin.name}
                </h3>
                <p className="text-charcoal-700 text-sm leading-relaxed">
                  {selectedPin.desc}
                </p>

                <div className="pt-2 text-xs text-charcoal-500 space-y-1 font-mono bg-sand-50 p-3 rounded-xl border border-sand-200">
                  <div>Latitude: {selectedPin.lat}</div>
                  <div>Longitude: {selectedPin.lng}</div>
                </div>

                <div className="pt-4">
                  <Link
                    to="/explore"
                    className="w-full py-3 bg-terracotta-600 hover:bg-terracotta-700 text-white font-medium text-sm rounded-xl transition-colors flex items-center justify-center space-x-2 shadow"
                  >
                    <span>Explore Associated Art Forms</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 bg-sand-100 text-terracotta-600 rounded-full flex items-center justify-center mx-auto">
                  <Compass className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-lg font-bold text-charcoal-900">
                  Select a Cultural Pin
                </h3>
                <p className="text-charcoal-600 text-xs leading-relaxed max-w-xs mx-auto">
                  Click any glowing map pin on the left to inspect artisan locations and performance grounds in {currentCity?.name}.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
