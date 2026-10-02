import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, ChevronDown, MapPin, Menu, X } from 'lucide-react';
import { useCity } from '../../context/CityContext';
import MobileMenu from './MobileMenu';
import SearchOverlay from './SearchOverlay';

const NAV_LINKS = [
  { to: '/explore', label: 'Explore' },
  { to: '/experiences', label: 'Experiences' },
  { to: '/guide', label: 'Guide' },
];

export default function Navbar() {
  const { selectedCitySlug, cities, selectCity } = useCity();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cityDropdown, setCityDropdown] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const close = (e) => {
      if (!e.target.closest('[data-city-dropdown]')) setCityDropdown(false);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navBg = isHomePage && !scrolled
    ? 'bg-transparent'
    : 'bg-ivory-50/95 backdrop-blur-md border-b border-ivory-200';

  const textColor = isHomePage && !scrolled
    ? 'text-white'
    : 'text-charcoal-900';

  const logoColor = isHomePage && !scrolled
    ? 'text-white'
    : 'text-charcoal-900';

  const currentCity = cities.find((c) => c.slug === selectedCitySlug);
  const cityName = currentCity?.name || (selectedCitySlug === 'udupi' ? 'Udupi' : 'Mysuru');

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
        role="banner"
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link
              to="/"
              className={`flex items-center gap-2 font-display font-bold text-xl tracking-tight transition-colors ${logoColor}`}
              aria-label="KalaYatra — Home"
            >
              <span className="text-2xl">🪔</span>
              <span>KalaYatra</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {NAV_LINKS.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150
                    ${isActive
                      ? isHomePage && !scrolled
                        ? 'text-white bg-white/15'
                        : 'text-charcoal-900 bg-ivory-200'
                      : isHomePage && !scrolled
                        ? 'text-white/80 hover:text-white hover:bg-white/10'
                        : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-ivory-100'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Open search"
                className={`p-2 rounded-lg transition-all duration-150
                  ${isHomePage && !scrolled
                    ? 'text-white/80 hover:text-white hover:bg-white/10'
                    : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-ivory-100'
                  }`}
              >
                <Search className="w-5 h-5" />
              </button>

              {/* City Selector */}
              <div className="relative" data-city-dropdown>
                <button
                  id="city-selector-btn"
                  aria-haspopup="listbox"
                  aria-expanded={cityDropdown}
                  aria-label={`Selected city: ${cityName}. Click to change.`}
                  onClick={(e) => { e.stopPropagation(); setCityDropdown((v) => !v); }}
                  className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150
                    ${isHomePage && !scrolled
                      ? 'text-white/90 hover:text-white hover:bg-white/10 border border-white/20'
                      : 'text-charcoal-700 hover:bg-ivory-100 border border-ivory-200'
                    }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{cityName}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${cityDropdown ? 'rotate-180' : ''}`} />
                </button>

                {cityDropdown && (
                  <div
                    role="listbox"
                    aria-label="Select city"
                    className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl shadow-card-hover border border-ivory-200 py-1 animate-scale-in"
                  >
                    {cities.length > 0
                      ? cities.map((city) => (
                          <button
                            key={city.slug}
                            role="option"
                            aria-selected={city.slug === selectedCitySlug}
                            onClick={() => { selectCity(city.slug); setCityDropdown(false); }}
                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors
                              ${city.slug === selectedCitySlug
                                ? 'text-terracotta-600 bg-terracotta-50 font-medium'
                                : 'text-charcoal-700 hover:bg-ivory-100'
                              }`}
                          >
                            {city.name}
                          </button>
                        ))
                      : ['Udupi', 'Mysuru'].map((name) => {
                          const slug = name.toLowerCase();
                          return (
                            <button
                              key={slug}
                              role="option"
                              aria-selected={slug === selectedCitySlug}
                              onClick={() => { selectCity(slug); setCityDropdown(false); }}
                              className={`w-full text-left px-4 py-2.5 text-sm transition-colors
                                ${slug === selectedCitySlug
                                  ? 'text-terracotta-600 bg-terracotta-50 font-medium'
                                  : 'text-charcoal-700 hover:bg-ivory-100'
                                }`}
                            >
                              {name}
                            </button>
                          );
                        })
                    }
                  </div>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Open mobile menu"
                className={`md:hidden p-2 rounded-lg transition-colors
                  ${isHomePage && !scrolled
                    ? 'text-white hover:bg-white/10'
                    : 'text-charcoal-700 hover:bg-ivory-100'
                  }`}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={NAV_LINKS}
        cities={cities}
        selectedCitySlug={selectedCitySlug}
        onCitySelect={selectCity}
      />

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
