import { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { X, MapPin } from 'lucide-react';

export default function MobileMenu({ isOpen, onClose, navLinks, cities, selectedCitySlug, onCitySelect }) {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const cityOptions = cities.length > 0 ? cities : [
    { slug: 'udupi', name: 'Udupi' },
    { slug: 'mysuru', name: 'Mysuru' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] md:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal-950/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-ivory-50 shadow-2xl flex flex-col animate-slide-down">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-ivory-200">
          <Link to="/" onClick={onClose} className="font-display font-bold text-lg text-charcoal-900 flex items-center gap-2">
            <span className="text-xl">🪔</span>
            KalaYatra
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 rounded-lg text-charcoal-600 hover:bg-ivory-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1" aria-label="Mobile navigation links">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-xl text-base font-medium transition-colors
                ${isActive
                  ? 'bg-terracotta-100 text-terracotta-700'
                  : 'text-charcoal-700 hover:bg-ivory-200'
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          {/* Extra links */}
          <div className="pt-2 border-t border-ivory-200 mt-4">
            {[
              { to: '/journey', label: 'Build My Journey' },
              { to: '/become-part', label: 'Become Part of the Art' },
              { to: '/map', label: 'Cultural Map' },
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors
                  ${isActive
                    ? 'bg-terracotta-100 text-terracotta-700'
                    : 'text-charcoal-500 hover:bg-ivory-200 hover:text-charcoal-800'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* City Selector */}
        <div className="px-4 py-4 border-t border-ivory-200">
          <p className="text-xs font-semibold text-charcoal-400 uppercase tracking-wider px-2 mb-2 flex items-center gap-1">
            <MapPin className="w-3 h-3" /> Select City
          </p>
          <div className="flex gap-2">
            {cityOptions.map((city) => (
              <button
                key={city.slug}
                onClick={() => { onCitySelect(city.slug); onClose(); }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors
                  ${city.slug === selectedCitySlug
                    ? 'bg-terracotta-500 text-white'
                    : 'bg-ivory-200 text-charcoal-700 hover:bg-ivory-300'
                  }`}
              >
                {city.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
