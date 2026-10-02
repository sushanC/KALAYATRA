import { Wind } from 'lucide-react';

export function EmptyState({
  icon: Icon = Wind,
  title = 'Nothing here yet',
  description = 'Check back soon.',
  action,
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-14 h-14 rounded-full bg-sand-200 flex items-center justify-center mb-4 text-charcoal-500">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-charcoal-800 mb-2">{title}</h3>
      <p className="text-sm text-charcoal-500 max-w-xs mb-6">{description}</p>
      {action ? (
        action
      ) : actionLabel && onAction ? (
        <button
          onClick={onAction}
          className="px-5 py-2 text-xs font-semibold bg-terracotta-600 text-white rounded-full hover:bg-terracotta-700 transition-colors"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}

export default EmptyState;
