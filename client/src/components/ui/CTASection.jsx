import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Lock, Zap } from 'lucide-react';

export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => document.getElementById('symptom-input')?.focus(), 600);
  };

  return (
    <section className="py-32 px-6 relative overflow-hidden" id="cta" ref={ref}>

      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-emerald-500/20 to-transparent" />

      {/* Large ambient blob */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[360px] blur-[140px]"
          style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.06), rgba(6,78,59,0.04), transparent 80%)' }} />
      </div>

      {/* Decorative corner gradients */}
      <div className="absolute top-0 left-0 w-64 h-64 blur-[80px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.04), transparent 70%)' }} />
      <div className="absolute bottom-0 right-0 w-64 h-64 blur-[80px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.04), transparent 70%)' }} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl mx-auto text-center relative z-10"
      >
        {/* Label */}
        <div className="inline-block px-3 py-1 rounded-full mb-8 text-[11px] font-bold tracking-[0.2em] uppercase"
          style={{
            background: 'rgba(4, 40, 24, 0.6)',
            border: '1px solid rgba(52,211,153,0.2)',
            color: 'rgba(52,211,153,0.7)',
            backdropFilter: 'blur(12px)',
          }}>
          Get Started Free
        </div>

        {/* Headline */}
        <h2
          className="text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.0] mb-6"
          style={{ fontFamily: "'Syne', sans-serif", color: '#fff' }}
        >
          Ready to Find Your
          <br />
          <span className="gradient-text">Right Specialist?</span>
        </h2>

        <p className="mb-12 max-w-sm mx-auto leading-relaxed text-base"
          style={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'Inter', sans-serif" }}>
          Stop guessing which doctor to see. Let AI guide you in under 60 seconds — no account required.
        </p>

        {/* CTA button */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.04, y: -4 }}
          whileTap={{ scale: 0.97 }}
          className="relative inline-flex items-center gap-3 px-9 py-4 rounded-2xl text-sm font-bold text-white cursor-pointer border-none overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #059669 0%, #10b981 45%, #34d399 100%)',
            boxShadow: '0 0 40px rgba(16,185,129,0.25), 0 8px 32px rgba(0,0,0,0.4)',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {/* Shimmer sweep */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)',
            }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
          />
          <span className="relative z-10">Describe Your Symptoms Now</span>
          <ArrowRight className="relative z-10 w-4 h-4" />
        </motion.button>

        {/* Trust pills */}
        <div className="flex items-center justify-center gap-6 mt-7">
          {[
            { icon: Zap, text: 'Instant results' },
            { icon: Lock, text: '100% private' },
          ].map(({ icon: Ic, text }) => (
            <span key={text} className="flex items-center gap-1.5 text-xs font-semibold"
              style={{ color: 'rgba(255,255,255,0.2)' }}>
              <Ic className="w-3 h-3" style={{ color: 'rgba(52,211,153,0.4)' }} />
              {text}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #020806)' }} />
    </section>
  );
}
