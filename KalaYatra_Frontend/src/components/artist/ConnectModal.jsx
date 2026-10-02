import { useState } from 'react';
import { X, Send, Info, CheckCircle2 } from 'lucide-react';

export default function ConnectModal({ artist, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen || !artist) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate connection attempt
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleClose = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', message: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-ivory-50 border border-sand-300 dark:border-charcoal-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-sand-200 pb-4 mb-6">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-terracotta-600">
              Cultural Exchange
            </span>
            <h3 className="font-serif text-2xl text-charcoal-900 font-bold mt-0.5">
              Connect with {artist.name}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full text-charcoal-400 hover:text-charcoal-700 hover:bg-sand-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="font-serif text-2xl text-charcoal-900 font-bold">
              Message Sent!
            </h4>
            <p className="text-charcoal-600 text-sm max-w-xs mx-auto">
              Thank you for reaching out to {artist.name}. Your interest in preserving and promoting traditional culture makes a real difference.
            </p>
            <button
              onClick={handleClose}
              className="mt-4 px-6 py-2.5 bg-terracotta-600 text-ivory-50 rounded-full font-medium hover:bg-terracotta-700 transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Info notice about backend endpoint */}
            <div className="p-3 bg-gold-50 border border-gold-200 rounded-xl flex items-start space-x-3 text-xs text-gold-900">
              <Info className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Direct Artist Connect:</span> Messages are queued for artist review. KalaYatra facilitates authentic cultural inquiries.
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-charcoal-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Ananya Rao"
                className="w-full px-4 py-2.5 rounded-xl border border-sand-300 bg-white text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-charcoal-700 mb-1">
                Your Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. ananya@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-sand-300 bg-white text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-charcoal-700 mb-1">
                Message / Inquiry
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={`Ask about ${artist.name}'s performances, workshops, or traditional craft techniques...`}
                className="w-full px-4 py-2.5 rounded-xl border border-sand-300 bg-white text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-sm resize-none"
              />
            </div>

            <div className="pt-2 flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-5 py-2.5 text-sm font-medium text-charcoal-600 hover:text-charcoal-900 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 text-sm font-medium bg-terracotta-600 text-white rounded-full hover:bg-terracotta-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
