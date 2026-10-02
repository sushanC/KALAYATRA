import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Loader2, Palette } from 'lucide-react';
import { getArtForms } from '../../api/artFormApi';

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [artForms, setArtForms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Pre-fetch data when overlay opens
  useEffect(() => {
    if (isOpen && !loaded) {
      setLoading(true);
      getArtForms()
        .then((af) => {
          setArtForms(Array.isArray(af) ? af : []);
          setLoaded(true);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [isOpen, loaded]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard close
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const q = query.trim().toLowerCase();

  const filteredArtForms = q
    ? artForms.filter(
        (a) =>
          a.name?.toLowerCase().includes(q) ||
          a.category?.toLowerCase().includes(q) ||
          a.description?.toLowerCase().includes(q)
      )
    : [];

  const totalResults = filteredArtForms.length;

  const goTo = (path) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-20 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div
        className="absolute inset-0 bg-charcoal-950/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-2xl animate-scale-in">
        {/* Search Input */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-ivory-200">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-ivory-100">
            {loading
              ? <Loader2 className="w-5 h-5 text-charcoal-400 animate-spin flex-shrink-0" />
              : <Search className="w-5 h-5 text-charcoal-400 flex-shrink-0" />
            }
            <input
              ref={inputRef}
              type="search"
              placeholder="Search art forms, categories…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 text-charcoal-900 text-base placeholder-charcoal-400 outline-none bg-transparent"
              aria-label="Search KalaYatra"
            />
            <button
              onClick={onClose}
              aria-label="Close search"
              className="p-1 rounded-lg text-charcoal-400 hover:text-charcoal-700 hover:bg-ivory-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results */}
          {q && (
            <div className="max-h-[60vh] overflow-y-auto">
              {totalResults === 0 && !loading && (
                <div className="py-10 text-center">
                  <p className="text-sm text-charcoal-500">No results for <strong>"{query}"</strong></p>
                  <p className="text-xs text-charcoal-400 mt-1">Try a different term or browse by category.</p>
                </div>
              )}

              {filteredArtForms.length > 0 && (
                <div className="p-3">
                  <p className="text-xs font-semibold text-charcoal-400 uppercase tracking-wider px-2 mb-2">Art Forms</p>
                  {filteredArtForms.slice(0, 5).map((af) => (
                    <button
                      key={af._id}
                      onClick={() => goTo(`/art-forms/${af.slug}`)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-ivory-100 transition-colors text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-terracotta-100 flex items-center justify-center flex-shrink-0">
                        <Palette className="w-4 h-4 text-terracotta-500" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-charcoal-900 truncate">{af.name}</p>
                        <p className="text-xs text-charcoal-500">{af.category}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {!q && (
            <div className="px-5 py-4">
              <p className="text-xs text-charcoal-400">Try searching for "Yakshagana", "Mysuru painting", or "Ganjifa".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
