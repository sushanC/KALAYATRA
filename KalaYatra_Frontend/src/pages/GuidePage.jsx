import { useState } from 'react';
import { Sparkles, Send, Bot, User, RefreshCw, RotateCcw } from 'lucide-react';
import { useCity } from '../context/CityContext';
import { askGuide } from '../api/geminiApi';

export default function GuidePage() {
  const { selectedCity, selectedCitySlug, cities, currentCity, selectCity } = useCity();
  const [question, setQuestion] = useState('');
  const [selectedArtForm, setSelectedArtForm] = useState(null);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Namaste! I am your KalaYatra Cultural AI Guide. Ask me anything about the heritage, living traditions, art forms, or historical lineage of **${currentCity?.name || selectedCity?.name || 'Karnataka'}**.`,
    },
  ]);
  const [loading, setLoading] = useState(false);

  const activeSlug = selectedCity?.slug || selectedCitySlug || 'udupi';

  const handleAsk = async (textToAsk) => {
    const promptText = textToAsk || question;
    if (!promptText.trim() || loading) return;

    const userMessage = { role: 'user', content: promptText };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion('');
    setLoading(true);

    try {
      const slug = selectedCity?.slug || selectedCitySlug || (typeof selectedCity === 'string' ? selectedCity : 'udupi');
      const response = await askGuide({
        citySlug: slug,
        question: promptText,
        artFormSlug: selectedArtForm?.slug || (typeof selectedArtForm === 'string' ? selectedArtForm : undefined),
      });

      const guideAnswer = response?.answer || response?.response || response?.data || 'Thank you for your question. Karnataka has a rich cultural heritage spanning over two millennia.';
      
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: guideAnswer },
      ]);
    } catch (err) {
      console.error('Gemini Guide Error Details:', err);

      const userFriendlyMsg = 'Gemini is temporarily busy. Please try again in a moment.';

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: userFriendlyMsg,
          isError: true,
          failedPrompt: promptText,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory-50 pb-16 flex flex-col pt-[72px]">
      {/* Top Banner */}
      <section className="bg-charcoal-900 text-ivory-50 py-10 lg:py-14 relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-hero-pattern opacity-20 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-400/20 text-gold-300 text-xs font-semibold uppercase tracking-wider mb-3 border border-gold-400/30">
            <Sparkles className="w-4 h-4" />
            <span>AI Cultural Concierge</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold">
            Ask the Cultural Guide
          </h1>
          <p className="mt-2.5 text-sand-300 text-sm sm:text-base max-w-xl mx-auto font-sans">
            Powered by Google Gemini — get instant, deep insights into traditional art forms, folklore, master lineages, and cultural nuances.
          </p>

          {/* City Switcher */}
          <div className="mt-5 inline-flex items-center bg-charcoal-800/80 p-1.5 rounded-full border border-charcoal-700">
            {cities.map((city) => (
              <button
                key={city.slug}
                onClick={() => selectCity(city.slug)}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeSlug === city.slug
                    ? 'bg-terracotta-600 text-white shadow-md'
                    : 'text-sand-300 hover:text-white'
                }`}
              >
                {city.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Chat Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 w-full py-6 flex-1 flex flex-col">
        {/* Message Log */}
        <div className="bg-white rounded-3xl border border-sand-300 shadow-lg p-6 sm:p-8 flex-1 space-y-6 overflow-y-auto max-h-[600px] min-h-[380px]">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start space-x-3.5 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="w-9 h-9 rounded-2xl bg-terracotta-600 text-white flex items-center justify-center shrink-0 shadow">
                  <Bot className="w-5 h-5" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-3xl p-4 sm:p-5 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-terracotta-600 text-white rounded-tr-xs'
                    : msg.isError
                    ? 'bg-amber-50 text-amber-900 border border-amber-200 rounded-tl-xs space-y-3'
                    : 'bg-sand-100 text-charcoal-900 rounded-tl-xs'
                }`}
              >
                <div className="whitespace-pre-line font-sans">{msg.content}</div>

                {msg.isError && msg.failedPrompt && (
                  <div>
                    <button
                      onClick={() => handleAsk(msg.failedPrompt)}
                      disabled={loading}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs disabled:opacity-50"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retry Question</span>
                    </button>
                  </div>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="w-9 h-9 rounded-2xl bg-charcoal-800 text-sand-100 flex items-center justify-center shrink-0 shadow">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-start space-x-3.5">
              <div className="w-9 h-9 rounded-2xl bg-terracotta-600 text-white flex items-center justify-center shrink-0 shadow animate-pulse">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-sand-100 rounded-3xl rounded-tl-xs p-4 text-sm text-charcoal-600 flex items-center space-x-3">
                <RefreshCw className="w-4 h-4 animate-spin text-terracotta-600" />
                <span className="italic font-serif">Consulting ancient archives...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk();
          }}
          className="mt-4 flex items-center space-x-2 bg-white p-2 sm:p-3 rounded-full border border-sand-300 shadow-md focus-within:ring-2 focus-within:ring-terracotta-500"
        >
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={`Ask about ${currentCity?.name || selectedCity?.name || 'cultural'} traditions, rituals, music...`}
            className="flex-1 px-4 py-2 bg-transparent text-charcoal-900 text-sm focus:outline-none placeholder:text-charcoal-400"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!question.trim() || loading}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-terracotta-600 text-white flex items-center justify-center hover:bg-terracotta-700 transition-colors disabled:opacity-40 disabled:hover:bg-terracotta-600 shrink-0 shadow"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </form>
      </main>
    </div>
  );
}
