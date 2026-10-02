// Skeleton loader card — use for loading states
export function SkeletonCard({ className = '' }) {
  return (
    <div className={`rounded-card overflow-hidden bg-ivory-100 ${className}`}>
      <div className="skeleton h-48 w-full" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-3 w-16 rounded-full" />
        <div className="skeleton h-5 w-3/4 rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-5/6 rounded" />
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3 }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`skeleton h-4 rounded ${i === lines - 1 ? 'w-2/3' : 'w-full'}`}
        />
      ))}
    </div>
  );
}

export function SkeletonCircle({ size = 'w-12 h-12' }) {
  return <div className={`skeleton rounded-full ${size}`} />;
}
