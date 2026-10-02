import { Link } from 'react-router-dom';
import { Instagram, Youtube, Twitter, MapPin } from 'lucide-react';

const FOOTER_LINKS = {
  Discover: [
    { label: 'Explore Art Forms', to: '/explore' },
    { label: 'Watch & Listen', to: '/experiences' },
    { label: 'Cultural Map', to: '/map' },
  ],
  Experience: [
    { label: 'Build My Journey', to: '/journey' },
    { label: 'Become Part of the Art', to: '/become-part' },
    { label: 'Ask the Guide', to: '/guide' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-charcoal-950 text-white" role="contentinfo">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 font-display font-bold text-xl mb-4">
              <span className="text-2xl">🪔</span>
              <span>KalaYatra</span>
            </Link>
            <p className="text-charcoal-400 text-sm leading-relaxed max-w-xs mb-6">
              Discover the culture behind every destination. Art forms, music and traditions — all in one place.
            </p>
            <div className="flex items-center gap-1 text-xs text-charcoal-500">
              <MapPin className="w-3 h-3" />
              Udupi & Mysuru, Karnataka, India
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-xs font-semibold text-charcoal-400 uppercase tracking-widest mb-4">
                {section}
              </h3>
              <ul className="space-y-2.5">
                {links.map(({ label, to }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="text-sm text-charcoal-400 hover:text-white transition-colors duration-150"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-charcoal-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-charcoal-600">
            © {new Date().getFullYear()} KalaYatra. Built for the hackathon.
          </p>
          <p className="text-xs text-charcoal-600 italic">
            "Discover the culture behind every destination."
          </p>
        </div>
      </div>
    </footer>
  );
}
