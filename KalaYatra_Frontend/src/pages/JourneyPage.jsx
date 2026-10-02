import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass, Clock, Sparkles, MapPin, Check, ArrowRight, ArrowLeft,
  RefreshCw, RotateCcw, BookOpen, Lightbulb, MessageCircle,
  Play, ChevronRight, ChevronLeft, AlertCircle, Tag
} from 'lucide-react';
import { useCity } from '../context/CityContext';
import { buildJourney } from '../api/geminiApi';
import { useScrollToTop } from '../utils/helpers';

/* ── helpers ──────────────────────────────────────────────────── */

const getYouTubeId = (url) => {
  if (!url) return null;
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : null;
};

/* ── Wizard config ────────────────────────────────────────────── */

const TIME_PRESETS = [
  { value: 60,  label: '1 Hour',          desc: 'Core cultural highlights' },
  { value: 120, label: '2 Hours',         desc: 'Workshop visit + showcase' },
  { value: 180, label: '3 Hours',         desc: 'Immersive half-day trail' },
  { value: 360, label: 'Full Day',        desc: 'Complete heritage journey' },
  { value: 720, label: 'Multi-Day',       desc: 'In-depth regional exploration' },
];

const PRESET_INTERESTS = [
  { id: 'Performing Arts',     label: 'Performing Arts',       desc: 'Yakshagana, Dollu Kunitha, Folk Dance' },
  { id: 'Music',               label: 'Traditional Music',     desc: 'Carnatic, Temple Chants, Folk Drums' },
  { id: 'Arts & Crafts',       label: 'Handicrafts & Weaving', desc: 'Sandalwood, Mysuru Silk, Pottery' },
  { id: 'Temple Traditions',   label: 'Temple Traditions',     desc: 'Sacred Rituals, Carvings, Sanctuaries' },
  { id: 'Folk Rituals',        label: 'Folk Rituals & Masking', desc: 'Bhoota Kola, Nagamandala, Somana Kunitha' },
  { id: 'Royal Heritage',      label: 'Royal Heritage & Murals', desc: 'Palace Craftsmanship, Ganjifa, Inlay' },
  { id: 'Literature & Epics',  label: 'Literature & Epics',    desc: 'Oral Traditions, Palm Leaf Manuscripts' },
];

/* ── Sub-components ───────────────────────────────────────────── */

/** Step pill navigator */
function StepNav({ steps, currentIdx, onSelect }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {steps.map((step, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        return (
          <button
            key={i}
            onClick={() => onSelect(i)}
            title={step.title}
            className={`flex-shrink-0 w-8 h-8 rounded-full text-xs font-bold border-2 transition-all duration-200
              ${active  ? 'bg-terracotta-600 border-terracotta-600 text-white scale-110 shadow-md' : ''}
              ${done    ? 'bg-emerald-600   border-emerald-600   text-white' : ''}
              ${!active && !done ? 'bg-white border-sand-300 text-charcoal-500 hover:border-terracotta-400' : ''}
            `}
          >
            {done ? <Check className="w-3.5 h-3.5 mx-auto" /> : i + 1}
          </button>
        );
      })}
    </div>
  );
}

/** Renders multi-paragraph explanation text */
function ExplanationText({ text }) {
  if (!text) return null;
  const paragraphs = text.split(/\n+/).filter(Boolean);
  return (
    <div className="space-y-4">
      {paragraphs.map((para, i) => (
        <p key={i} className="text-charcoal-700 leading-[1.85] text-[1.05rem]">
          {para}
        </p>
      ))}
    </div>
  );
}

/** YouTube embed with explanatory caption */
function VideoEmbed({ video, artFormName }) {
  const [playing, setPlaying] = useState(false);
  const videoId = getYouTubeId(video?.url);
  if (!videoId) return null;

  return (
    <div className="rounded-2xl overflow-hidden border border-sand-300 shadow-md">
      {playing ? (
        <div className="aspect-video w-full">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={video.title || artFormName}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      ) : (
        <button
          className="relative w-full aspect-video group overflow-hidden bg-charcoal-900"
          onClick={() => setPlaying(true)}
          aria-label={`Play: ${video.title || artFormName}`}
        >
          {video.thumbnail ? (
            <img
              src={video.thumbnail}
              alt={video.title || artFormName}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-charcoal-800 to-charcoal-900" />
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
              <Play className="w-7 h-7 text-charcoal-900 ml-1" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal-950/80 to-transparent p-4">
            <p className="text-white text-sm font-medium truncate">{video.title || `Watch: ${artFormName}`}</p>
          </div>
        </button>
      )}
      {video.description && (
        <div className="bg-charcoal-50 px-4 py-3 border-t border-sand-200">
          <p className="text-xs text-charcoal-600 italic">{video.description}</p>
        </div>
      )}
    </div>
  );
}

/* ── Teaching Step Card ───────────────────────────────────────── */

function TeachingStep({ step, stepIdx, totalSteps, onPrev, onNext, citySlug }) {
  const durationText = step.durationMinutes
    ? `${step.durationMinutes} min`
    : '';
  const progressPct = Math.round(((stepIdx + 1) / totalSteps) * 100);

  return (
    <div className="animate-fade-in">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-charcoal-500 mb-2">
          <span className="font-medium">Step {stepIdx + 1} of {totalSteps}</span>
          <span>{progressPct}% complete</span>
        </div>
        <div className="h-1.5 bg-sand-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-terracotta-500 to-gold-DEFAULT rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Main lesson card */}
      <div className="bg-white rounded-3xl border border-sand-300 shadow-xl overflow-hidden">

        {/* Hero image */}
        {step.image && (
          <div className="relative h-56 sm:h-72 overflow-hidden">
            <img
              src={step.image}
              alt={step.artFormName || step.title}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.closest('.relative')?.classList.add('hidden'); }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/30 to-transparent" />
            <div className="absolute bottom-5 left-6 right-6">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {step.category && (
                  <span className="px-2.5 py-0.5 bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider rounded-full border border-white/30">
                    {step.category}
                  </span>
                )}
                {durationText && (
                  <span className="px-2.5 py-0.5 bg-gold-DEFAULT/25 backdrop-blur-sm text-gold-200 text-[10px] font-bold uppercase tracking-wider rounded-full border border-gold-DEFAULT/30 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {durationText}
                  </span>
                )}
              </div>
              <h2 className="font-serif text-white text-2xl sm:text-3xl font-bold leading-tight">
                {step.title}
              </h2>
            </div>
          </div>
        )}

        {/* If no image, show header section */}
        {!step.image && (
          <div className="px-6 sm:px-8 pt-8 pb-2">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {step.category && (
                <span className="px-2.5 py-0.5 bg-terracotta-50 text-terracotta-700 text-[10px] font-bold uppercase tracking-wider rounded-full border border-terracotta-200">
                  {step.category}
                </span>
              )}
              {durationText && (
                <span className="px-2.5 py-0.5 bg-gold-50 text-gold-800 text-[10px] font-bold uppercase tracking-wider rounded-full border border-gold-200 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {durationText}
                </span>
              )}
            </div>
            <h2 className="font-serif text-charcoal-900 text-2xl sm:text-3xl font-bold leading-tight">
              {step.title}
            </h2>
          </div>
        )}

        <div className="px-6 sm:px-8 pb-8 space-y-8 pt-6">

          {/* Main explanation */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-terracotta-500 flex-shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider text-terracotta-600">What You'll Learn</span>
            </div>
            <ExplanationText text={step.explanation} />
          </div>

          {/* Cultural context block */}
          {step.culturalContext && (
            <div className="bg-terracotta-50 border-l-4 border-terracotta-400 rounded-r-2xl px-5 py-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-3.5 h-3.5 text-terracotta-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-terracotta-700">Cultural Context</span>
              </div>
              <p className="text-charcoal-700 text-sm leading-relaxed">{step.culturalContext}</p>
            </div>
          )}

          {/* Video embed */}
          {step.video && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Play className="w-4 h-4 text-charcoal-500 flex-shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal-500">See It Live</span>
              </div>
              <VideoEmbed video={step.video} artFormName={step.artFormName} />
            </div>
          )}

          {/* Key facts strip */}
          {step.keyFacts?.length > 0 && (
            <div className="bg-charcoal-950 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-4 h-4 text-gold-DEFAULT" />
                <span className="text-xs font-bold uppercase tracking-wider text-gold-DEFAULT">Key Insights</span>
              </div>
              <ul className="space-y-3">
                {step.keyFacts.map((fact, i) => (
                  <li key={i} className="flex items-start gap-3 text-sand-200 text-sm leading-relaxed">
                    <span className="text-gold-DEFAULT mt-0.5 flex-shrink-0 font-bold">{i + 1}.</span>
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Takeaway */}
          {step.takeaway && (
            <div className="border border-gold-300 bg-gold-50 rounded-2xl px-5 py-4">
              <div className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gold-700 mb-1">Takeaway</p>
                  <p className="text-charcoal-800 text-sm leading-relaxed font-medium">{step.takeaway}</p>
                </div>
              </div>
            </div>
          )}

          {/* Ask Gemini CTA */}
          {step.artFormSlug && citySlug && (
            <div className="bg-charcoal-900 rounded-2xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gold-DEFAULT mb-0.5 flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5" /> Got a question?
                </p>
                <p className="text-charcoal-300 text-sm">
                  Ask the Cultural Guide anything about {step.artFormName || 'this topic'}.
                </p>
              </div>
              <Link
                to={`/guide?artForm=${step.artFormSlug}`}
                className="flex-shrink-0 px-4 py-2.5 bg-gold-500 hover:bg-gold-400 text-charcoal-950 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Ask the Guide
              </Link>
            </div>
          )}

          {/* Prev / Next navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-sand-200">
            <button
              onClick={onPrev}
              disabled={stepIdx === 0}
              className="flex items-center gap-2 px-5 py-3 rounded-xl border border-sand-300 text-sm font-semibold text-charcoal-700
                hover:border-charcoal-400 hover:bg-sand-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            {stepIdx < totalSteps - 1 ? (
              <button
                onClick={onNext}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white text-sm font-bold transition-all shadow-md hover:shadow-lg"
              >
                Next Lesson
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white text-sm font-bold">
                <Check className="w-4 h-4" />
                Journey Complete!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main page component ──────────────────────────────────────── */

export default function JourneyPage() {
  useScrollToTop();
  const { selectedCity, selectedCitySlug, selectCity, cities, currentCity } = useCity();
  const [wizardStep, setWizardStep] = useState(1);
  const [timeAvailable, setTimeAvailable] = useState(120);
  const [selectedInterests, setSelectedInterests] = useState(['Performing Arts', 'Arts & Crafts']);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [journey, setJourney] = useState(null);
  const [lessonIdx, setLessonIdx] = useState(0);

  const activeSlug = selectedCity?.slug || selectedCitySlug || 'udupi';
  const cityName = currentCity?.name || selectedCity?.name || 'Karnataka';

  const toggleInterest = (id) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleGenerate = async () => {
    setLoading(true);
    setErrorMsg(null);
    setJourney(null);
    setLessonIdx(0);
    try {
      const slug = selectedCity?.slug || selectedCitySlug || 'udupi';
      const res = await buildJourney({
        citySlug: slug,
        timeAvailable,
        interests: selectedInterests,
      });
      if (res && Array.isArray(res.steps) && res.steps.length > 0) {
        setJourney(res);
        setWizardStep(4);
      } else if (typeof res === 'string') {
        // Plain text fallback (Gemini returned unstructured text)
        setJourney({ title: `Cultural Journey in ${cityName}`, summary: res, steps: [] });
        setWizardStep(4);
      } else {
        throw new Error('Journey response was empty.');
      }
    } catch (err) {
      const is503 = err?.message?.includes('503') || err?.response?.status === 503;
      setErrorMsg(
        is503
          ? 'Gemini AI is currently experiencing high demand. Please try again in a moment.'
          : (err.message || 'Unable to reach Gemini AI. Please try again.')
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = useCallback(() => {
    setWizardStep(1);
    setJourney(null);
    setLessonIdx(0);
    setErrorMsg(null);
  }, []);

  /* ─── WIZARD: steps 1–3 ────────────────────────────────────── */

  if (wizardStep < 4) {
    return (
      <div className="min-h-screen bg-ivory-50 pb-24">
        {/* Header */}
        <section className="bg-charcoal-900 text-ivory-50 py-12 lg:py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-hero-pattern opacity-20 pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-terracotta-600/30 text-terracotta-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-terracotta-500/40">
              <Compass className="w-4 h-4" />
              <span>AI Cultural Teaching Journey</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold">
              Build My Cultural Journey
            </h1>
            <p className="mt-3 text-sand-300 text-sm sm:text-base max-w-xl mx-auto">
              Your personal AI cultural teacher will walk you through the living traditions of {cityName}, step by step.
            </p>
          </div>
        </section>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 mt-8">
          <div className="bg-white rounded-3xl border border-sand-300 shadow-xl p-6 sm:p-10 space-y-8">
            {/* Step indicator */}
            <div className="flex items-center justify-between border-b border-sand-200 pb-6">
              {[
                { num: 1, label: 'Destination' },
                { num: 2, label: 'Time' },
                { num: 3, label: 'Interests' },
              ].map((s) => (
                <div key={s.num} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs
                      ${wizardStep === s.num ? 'bg-terracotta-600 text-white ring-4 ring-terracotta-100' :
                        wizardStep > s.num ? 'bg-emerald-600 text-white' :
                        'bg-sand-200 text-charcoal-500'}`}
                  >
                    {wizardStep > s.num ? <Check className="w-4 h-4" /> : s.num}
                  </div>
                  <span className={`text-xs font-semibold hidden sm:inline ${wizardStep === s.num ? 'text-charcoal-900' : 'text-charcoal-500'}`}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* STEP 1: city */}
            {wizardStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl text-charcoal-900 font-bold">Choose Your Destination</h2>
                  <p className="text-charcoal-600 text-sm mt-1">Select the city whose cultural traditions you want to explore.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {cities.map((city) => (
                    <button
                      key={city.slug}
                      onClick={() => selectCity(city.slug)}
                      className={`p-5 rounded-2xl border-2 text-left transition-all relative
                        ${activeSlug === city.slug ? 'border-terracotta-600 bg-terracotta-50/50 shadow-md' : 'border-sand-300 hover:border-sand-400 bg-white'}`}
                    >
                      <div className="flex items-center gap-2 text-terracotta-600 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-xs uppercase font-bold tracking-wider">Karnataka</span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-charcoal-900">{city.name}</h3>
                      <p className="text-xs text-charcoal-600 mt-1 line-clamp-2">{city.shortDescription || city.description}</p>
                      {activeSlug === city.slug && (
                        <div className="absolute top-4 right-4 w-6 h-6 bg-terracotta-600 text-white rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <div className="flex justify-end pt-4">
                  <button onClick={() => setWizardStep(2)} className="px-8 py-3 bg-terracotta-600 text-white rounded-full font-medium hover:bg-terracotta-700 transition-colors flex items-center gap-2">
                    Next <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: time */}
            {wizardStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl text-charcoal-900 font-bold">How much time do you have?</h2>
                  <p className="text-charcoal-600 text-sm mt-1">Your AI teacher will structure the lessons to fit your schedule.</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {TIME_PRESETS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setTimeAvailable(opt.value)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all relative
                        ${timeAvailable === opt.value ? 'border-terracotta-600 bg-terracotta-50/50 shadow-md' : 'border-sand-300 hover:border-sand-400 bg-white'}`}
                    >
                      <div className="flex items-center gap-1.5 text-terracotta-600 mb-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">{opt.label}</span>
                      </div>
                      <p className="text-xs text-charcoal-600">{opt.desc}</p>
                      {timeAvailable === opt.value && (
                        <div className="absolute top-3 right-3 w-5 h-5 bg-terracotta-600 text-white rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <div className="pt-4 border-t border-sand-200">
                  <label className="text-xs font-semibold uppercase text-charcoal-700 block mb-2">
                    Custom Duration — {timeAvailable >= 60 ? `${(timeAvailable / 60).toFixed(1)} hours` : `${timeAvailable} min`}
                  </label>
                  <input type="range" min="30" max="720" step="30" value={timeAvailable}
                    onChange={(e) => setTimeAvailable(Number(e.target.value))}
                    className="w-full accent-terracotta-600 cursor-pointer" />
                </div>
                <div className="flex justify-between pt-4">
                  <button onClick={() => setWizardStep(1)} className="px-6 py-3 text-charcoal-600 hover:text-charcoal-900 font-medium text-sm">Back</button>
                  <button onClick={() => setWizardStep(3)} className="px-8 py-3 bg-terracotta-600 text-white rounded-full font-medium hover:bg-terracotta-700 transition-colors flex items-center gap-2">
                    Next <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: interests */}
            {wizardStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-2xl text-charcoal-900 font-bold">What are you curious about?</h2>
                    <p className="text-charcoal-600 text-sm mt-1">Your AI teacher will tailor the lessons to your interests.</p>
                  </div>
                  <button onClick={() => setSelectedInterests([])} className="text-xs text-charcoal-500 hover:text-terracotta-600 flex items-center gap-1 underline">
                    <RotateCcw className="w-3.5 h-3.5" /> Clear
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PRESET_INTERESTS.map((opt) => {
                    const isSelected = selectedInterests.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        onClick={() => toggleInterest(opt.id)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all relative
                          ${isSelected ? 'border-terracotta-600 bg-terracotta-50/50 shadow-md' : 'border-sand-300 hover:border-sand-400 bg-white'}`}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-serif text-base font-bold text-charcoal-900">{opt.label}</h3>
                          {isSelected && <Check className="w-4 h-4 text-terracotta-600 flex-shrink-0" />}
                        </div>
                        <p className="text-xs text-charcoal-600 mt-0.5">{opt.desc}</p>
                      </button>
                    );
                  })}
                </div>

                {selectedInterests.length > 0 && (
                  <div className="bg-sand-50 p-4 rounded-2xl border border-sand-200">
                    <p className="text-xs font-semibold text-charcoal-500 uppercase mb-2">Selected ({selectedInterests.length}):</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedInterests.map((item) => (
                        <span key={item} className="px-3 py-1 bg-terracotta-600 text-white rounded-full text-xs font-medium flex items-center gap-1">
                          {item}
                          <button onClick={() => toggleInterest(item)} className="hover:text-sand-200 ml-1">×</button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {errorMsg && (
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-2xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-800">{errorMsg}</p>
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  <button onClick={() => setWizardStep(2)} className="px-6 py-3 text-charcoal-600 hover:text-charcoal-900 font-medium text-sm">Back</button>
                  <button
                    onClick={handleGenerate}
                    disabled={selectedInterests.length === 0 || loading}
                    className="px-8 py-3.5 bg-gold-500 text-charcoal-950 rounded-full font-bold hover:bg-gold-400 transition-colors flex items-center gap-2 shadow-lg disabled:opacity-50"
                  >
                    {loading ? (
                      <><RefreshCw className="w-5 h-5 animate-spin" /><span>Building Your Journey...</span></>
                    ) : (
                      <><Sparkles className="w-5 h-5" /><span>Start My Cultural Journey</span></>
                    )}
                  </button>
                </div>

                {loading && (
                  <div className="p-6 bg-terracotta-50/50 rounded-2xl border border-terracotta-200 text-center space-y-2">
                    <Sparkles className="w-8 h-8 text-terracotta-500 mx-auto animate-bounce" />
                    <p className="text-sm font-semibold text-charcoal-900">Your AI cultural teacher is preparing your lessons…</p>
                    <p className="text-xs text-charcoal-500">Curating knowledge about {cityName}'s living traditions.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  /* ─── RESULT: teaching experience (step 4) ─────────────────── */

  const steps = journey?.steps || [];
  const hasStructuredSteps = steps.length > 0;

  return (
    <div className="min-h-screen bg-ivory-50 pb-24">
      {/* Journey header */}
      <section className="bg-charcoal-900 text-ivory-50 py-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-20 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-terracotta-300 text-xs font-semibold uppercase tracking-wider mb-2">
                <Compass className="w-4 h-4" />
                <span>Cultural Teaching Journey · {cityName}</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                {journey?.title || `Cultural Journey in ${cityName}`}
              </h1>
              {journey?.summary && (
                <p className="mt-2 text-sand-300 text-sm max-w-2xl leading-relaxed">{journey.summary}</p>
              )}
            </div>
            <button
              onClick={handleRestart}
              className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-sand-200 text-xs font-semibold border border-charcoal-700 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> New Journey
            </button>
          </div>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 mt-8 space-y-6">
        {/* Plain-text fallback (Gemini returned prose, not JSON) */}
        {!hasStructuredSteps && journey?.summary && (
          <div className="bg-white rounded-3xl border border-sand-300 shadow-xl p-8">
            <div className="prose max-w-none text-charcoal-700 leading-relaxed whitespace-pre-line">
              {journey.summary}
            </div>
            <button onClick={handleRestart} className="mt-6 px-6 py-3 bg-terracotta-600 text-white rounded-full text-sm font-semibold hover:bg-terracotta-700 transition-colors">
              Try Again
            </button>
          </div>
        )}

        {/* Structured teaching steps */}
        {hasStructuredSteps && (
          <>
            {/* Step navigator */}
            <div className="bg-white rounded-2xl border border-sand-200 shadow-sm px-5 py-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-charcoal-500 flex-shrink-0">
                  <Tag className="w-3.5 h-3.5" />
                  <span className="font-semibold uppercase tracking-wider">{steps.length} lessons</span>
                </div>
                <StepNav
                  steps={steps}
                  currentIdx={lessonIdx}
                  onSelect={(i) => { setLessonIdx(i); window.scrollTo({ top: 200, behavior: 'smooth' }); }}
                />
                <div className="flex-shrink-0 text-xs text-charcoal-400 font-medium whitespace-nowrap">
                  {journey.totalDuration ? `~${journey.totalDuration} min` : ''}
                </div>
              </div>
            </div>

            {/* Current lesson */}
            <TeachingStep
              key={lessonIdx}
              step={steps[lessonIdx]}
              stepIdx={lessonIdx}
              totalSteps={steps.length}
              citySlug={activeSlug}
              onPrev={() => {
                if (lessonIdx > 0) {
                  setLessonIdx(lessonIdx - 1);
                  window.scrollTo({ top: 200, behavior: 'smooth' });
                }
              }}
              onNext={() => {
                if (lessonIdx < steps.length - 1) {
                  setLessonIdx(lessonIdx + 1);
                  window.scrollTo({ top: 200, behavior: 'smooth' });
                }
              }}
            />
          </>
        )}
      </main>
    </div>
  );
}
