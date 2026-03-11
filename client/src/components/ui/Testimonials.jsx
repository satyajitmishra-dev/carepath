import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const TESTIMONIALS = [
  {
    text: 'I had a persistent headache for weeks and didn\'t know who to see. CarePath told me to visit a Neurologist — turns out I needed one!',
    name: 'Priya S.',
    location: 'Kolkata',
    role: 'Software Engineer',
    rating: 5,
    initials: 'PS',
    accentFrom: '#7c3aed',
    accentTo: '#6d28d9',
  },
  {
    text: 'My mother had stomach issues and we kept visiting the wrong doctors. This app saved us time and money by pointing us to a Gastroenterologist.',
    name: 'Rahul M.',
    location: 'Howrah',
    role: 'Business Owner',
    rating: 5,
    initials: 'RM',
    accentFrom: '#0284c7',
    accentTo: '#0891b2',
  },
  {
    text: 'The affordable clinic filter is a game-changer for students like me. Found a great doctor under ₹300 within 2km!',
    name: 'Ananya D.',
    location: 'Salt Lake',
    role: 'University Student',
    rating: 5,
    initials: 'AD',
    accentFrom: '#059669',
    accentTo: '#0d9488',
  },
];

export default function Testimonials() {
  const [[current, dir], setSlide] = useState([0, 0]);
  const [paused, setPaused] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const paginate = useCallback((d) => {
    setSlide(([prev]) => [(prev + d + TESTIMONIALS.length) % TESTIMONIALS.length, d]);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => paginate(1), 5000);
    return () => clearInterval(t);
  }, [paused, paginate]);

  const variants = {
    enter: (d) => ({ x: d > 0 ? '55%' : '-55%', opacity: 0, filter: 'blur(4px)' }),
    center: { x: '0%', opacity: 1, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 240, damping: 26 } },
    exit: (d) => ({ x: d < 0 ? '55%' : '-55%', opacity: 0, filter: 'blur(4px)', transition: { duration: 0.2 } }),
  };

  return (
    <section className="py-32 px-6 relative overflow-hidden" id="testimonials" ref={ref}>

      {/* Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-amber-400/15 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] blur-[140px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(251,191,36,0.025), transparent 80%)' }} />

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <div className="inline-block px-3 py-1 rounded-full mb-6 text-[11px] font-bold tracking-[0.2em] uppercase"
            style={{
              background: 'rgba(40, 30, 0, 0.6)',
              border: '1px solid rgba(251,191,36,0.18)',
              color: 'rgba(251,191,36,0.65)',
              backdropFilter: 'blur(12px)',
            }}>
            What Users Say
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2
              className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.0]"
              style={{ fontFamily: "'Syne', sans-serif", color: '#fff' }}
            >
              Trusted by<br />
              <span className="gradient-text">Real People</span>
            </h2>
            <p className="text-white/30 max-w-xs text-sm leading-relaxed sm:text-right">
              Real patients. Real outcomes. No sponsored reviews.
            </p>
          </div>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Nav buttons */}
          {[-1, 1].map((d) => (
            <button
              key={d}
              onClick={() => paginate(d)}
              className={`absolute top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ${d < 0 ? '-left-5 sm:-left-14' : '-right-5 sm:-right-14'}`}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(16px)',
                color: 'rgba(255,255,255,0.35)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; }}
              aria-label={d < 0 ? 'Previous' : 'Next'}
            >
              {d < 0
                ? <ChevronLeft className="w-4 h-4" />
                : <ChevronRight className="w-4 h-4" />}
            </button>
          ))}

          {/* Card */}
          <div className="overflow-hidden min-h-[280px]">
            <AnimatePresence initial={false} custom={dir} mode="wait">
              <motion.div
                key={current}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative rounded-3xl p-9 sm:p-12 overflow-hidden"
                style={{
                  background: 'rgba(6, 14, 10, 0.65)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(32px)',
                  boxShadow: '0 0 0 1px rgba(255,255,255,0.03) inset, 0 32px 80px rgba(0,0,0,0.6)',
                }}
              >
                {/* Ambient top glow matching user's accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${TESTIMONIALS[current].accentFrom}40, transparent)`,
                  }}
                />

                {/* Large decorative quote */}
                <Quote className="absolute top-8 right-9 w-14 h-14" style={{ color: 'rgba(255,255,255,0.025)' }} />

                {/* Stars */}
                <div className="flex gap-1 mb-8">
                  {Array.from({ length: TESTIMONIALS[current].rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Quote text */}
                <p
                  className="text-xl sm:text-2xl leading-[1.55] mb-10 relative z-10 font-light"
                  style={{ color: 'rgba(255,255,255,0.65)', fontFamily: "'Inter', sans-serif" }}
                >
                  "{TESTIMONIALS[current].text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${TESTIMONIALS[current].accentFrom}, ${TESTIMONIALS[current].accentTo})` }}
                  >
                    <span className="text-white text-xs font-black">{TESTIMONIALS[current].initials}</span>
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{TESTIMONIALS[current].name}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      {TESTIMONIALS[current].role} · {TESTIMONIALS[current].location}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide([i, i > current ? 1 : -1])}
                aria-label={`Testimonial ${i + 1}`}
                className={`transition-all duration-400 rounded-full border-none cursor-pointer ${i === current ? 'w-7 h-1.5 bg-emerald-400' : 'w-1.5 h-1.5'}`}
                style={{ background: i === current ? undefined : 'rgba(255,255,255,0.12)' }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
