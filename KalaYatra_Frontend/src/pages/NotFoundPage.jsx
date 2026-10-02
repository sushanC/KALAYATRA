import { Link } from 'react-router-dom';
import { Compass, Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-ivory-50 flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center bg-white p-8 sm:p-12 rounded-3xl border border-sand-300 shadow-xl space-y-6">
        <div className="w-20 h-20 bg-sand-100 text-terracotta-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <Compass className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase font-bold text-terracotta-600 tracking-widest">
            404 — Path Not Found
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
            Wandering Off the Trail?
          </h1>
          <p className="text-charcoal-600 text-sm leading-relaxed">
            The cultural destination or page you are seeking has slipped into history. Let's return you to familiar ground.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-terracotta-600 text-white rounded-full font-medium text-sm hover:bg-terracotta-700 transition-colors flex items-center justify-center space-x-2 shadow"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/explore"
            className="px-6 py-3 bg-sand-100 text-charcoal-800 rounded-full font-medium text-sm hover:bg-sand-200 transition-colors flex items-center justify-center space-x-2"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Art Forms</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
