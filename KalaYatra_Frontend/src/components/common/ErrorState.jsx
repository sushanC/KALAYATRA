import { AlertTriangle, RefreshCw } from 'lucide-react';

export function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-12 h-12 rounded-full bg-terracotta-100 flex items-center justify-center mb-4">
        <AlertTriangle className="w-5 h-5 text-terracotta-500" />
      </div>
      <h3 className="text-base font-semibold text-charcoal-900 mb-2">
        Unable to load content
      </h3>
      <p className="text-sm text-charcoal-500 max-w-sm mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn-secondary text-sm flex items-center gap-2"
          aria-label="Retry loading content"
        >
          <RefreshCw className="w-4 h-4" />
          Try again
        </button>
      )}
    </div>
  );
}
