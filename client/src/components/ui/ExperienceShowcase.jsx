import { motion } from 'framer-motion';
import { BrainCircuit, MapPinned, ShieldCheck, Sparkles } from 'lucide-react';

const EXPERIENCE_PILLARS = [
  {
    title: 'Clinical-grade triage flow',
    description: 'Input validation, urgency stratification, and clear specialist matching in one guided interaction.',
    icon: BrainCircuit,
  },
  {
    title: 'Geo-intelligent discovery',
    description: 'Live distance-sorted clinics, affordability controls, and one-tap navigation for quick action.',
    icon: MapPinned,
  },
  {
    title: 'Trust-first safety design',
    description: 'Medical disclaimers, emergency escalation cues, and privacy-forward no-login access.',
    icon: ShieldCheck,
  },
];

export default function ExperienceShowcase() {
  return (
    <section className="w-full max-w-5xl mt-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
        className="glass-card p-6 sm:p-7"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
          <div>
            <p className="text-xs font-semibold text-emerald uppercase tracking-widest">Product Experience</p>
            <h3 className="text-2xl font-extrabold text-evergreen tracking-tight">Designed for confidence in critical moments</h3>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-teal text-xs font-semibold w-fit">
            <Sparkles className="w-3.5 h-3.5" />
            Judge-ready interaction quality
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {EXPERIENCE_PILLARS.map(({ title, description, icon: Icon }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 + index * 0.08 }}
              whileHover={{ y: -3 }}
              className="rounded-2xl border border-emerald-100 bg-white/80 p-4"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-teal" />
              </div>
              <h4 className="text-sm font-bold text-evergreen">{title}</h4>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
