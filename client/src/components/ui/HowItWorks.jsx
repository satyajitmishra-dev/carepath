import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MessageSquareText, Brain, MapPin } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    icon: MessageSquareText,
    title: 'Describe Symptoms',
    description: 'Type what you feel in plain English — no medical jargon. Voice input also supported for hands-free triage.',
    accent: 'from-emerald-400 to-emerald-600',
    glowColor: 'rgba(52,211,153,0.12)',
    borderColor: 'rgba(52,211,153,0.14)',
    numberColor: 'rgba(52,211,153,0.06)',
  },
  {
    step: '02',
    icon: Brain,
    title: 'AI Analyzes',
    description: 'Llama 3.1 identifies possible conditions, urgency level, and the ideal specialist type in seconds.',
    accent: 'from-teal-400 to-cyan-600',
    glowColor: 'rgba(34,211,238,0.1)',
    borderColor: 'rgba(34,211,238,0.12)',
    numberColor: 'rgba(34,211,238,0.05)',
  },
  {
    step: '03',
    icon: MapPin,
    title: 'Find Nearby Clinics',
    description: 'See verified specialists on a live interactive map — complete with fees, ratings, and one-tap directions.',
    accent: 'from-green-400 to-emerald-600',
    glowColor: 'rgba(74,222,128,0.1)',
    borderColor: 'rgba(74,222,128,0.12)',
    numberColor: 'rgba(74,222,128,0.05)',
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-32 px-6 relative overflow-hidden" id="how-it-works" ref={ref}>

      {/* Section divider top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-emerald-500/20 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.04), transparent 80%)' }} />

      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          {/* label */}
          <div className="inline-block px-3 py-1 rounded-full mb-6 text-[11px] font-bold tracking-[0.2em] uppercase"
            style={{
              background: 'rgba(4, 40, 24, 0.6)',
              border: '1px solid rgba(52,211,153,0.18)',
              color: 'rgba(52,211,153,0.7)',
              backdropFilter: 'blur(12px)',
            }}>
            3-Step Process
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2
              className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.0]"
              style={{ fontFamily: "'Syne', sans-serif", color: '#fff' }}
            >
              How <span className="gradient-text">CarePath</span>
              <br />Works
            </h2>
            <p className="text-white/30 max-w-xs text-sm leading-relaxed sm:text-right">
              From symptoms to specialist — no login, no friction, under 60 seconds.
            </p>
          </div>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative">

          {/* Connector (desktop) */}
          <div
            className="hidden md:block absolute top-[60px] left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px z-0"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(52,211,153,0.18), transparent)' }}
          />

          {STEPS.map(({ step, icon: Icon, title, description, accent, glowColor, borderColor, numberColor }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.18 + i * 0.16, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 group"
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className="relative rounded-3xl p-8 overflow-hidden h-full"
                style={{
                  background: 'rgba(6, 14, 10, 0.7)',
                  border: `1px solid ${borderColor}`,
                  backdropFilter: 'blur(24px)',
                  boxShadow: `0 0 0 1px rgba(255,255,255,0.025) inset, 0 20px 60px rgba(0,0,0,0.5)`,
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${glowColor}, transparent 70%)` }}
                />

                {/* Top row: icon + big number */}
                <div className="flex items-center justify-between mb-8">
                  {/* Icon badge */}
                  <div
                    className={`w-13 h-13 w-12 h-12 rounded-2xl bg-gradient-to-br ${accent} flex items-center justify-center shadow-lg relative`}
                    style={{ boxShadow: `0 0 20px ${glowColor.replace('0.12', '0.3')}` }}
                  >
                    <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                    {/* Step pip */}
                    <div
                      className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#020806] flex items-center justify-center"
                      style={{ border: `1px solid ${borderColor}` }}
                    >
                      <span className="text-[8px] font-black text-emerald-400">{i + 1}</span>
                    </div>
                  </div>

                  {/* Large ghost number */}
                  <span
                    className="text-7xl font-black leading-none select-none"
                    style={{ color: numberColor, fontFamily: "'Syne', sans-serif" }}
                  >
                    {step}
                  </span>
                </div>

                <h3
                  className="text-xl font-bold text-white mb-3"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.32)' }}>
                  {description}
                </p>

                {/* Bottom accent line */}
                <div
                  className={`absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r ${accent} opacity-0 group-hover:opacity-25 transition-opacity duration-500`}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
