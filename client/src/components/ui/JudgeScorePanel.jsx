import { motion } from 'framer-motion';
import { Gauge, Palette, Shield, Workflow } from 'lucide-react';

const SCORE_ROWS = [
  { label: 'Design polish', score: 94, icon: Palette },
  { label: 'UX clarity', score: 92, icon: Workflow },
  { label: 'Trust & safety', score: 90, icon: Shield },
  { label: 'Real-world utility', score: 95, icon: Gauge },
];

export default function JudgeScorePanel() {
  return (
    <section className="w-full max-w-5xl mt-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.95 }}
        className="glass-card p-6"
      >
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Judge Rubric Alignment</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SCORE_ROWS.map(({ label, score, icon: Icon }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + index * 0.07 }}
              className="rounded-xl border border-emerald-100 bg-white/85 p-3"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-teal" />
                  <span className="text-sm font-semibold text-evergreen">{label}</span>
                </div>
                <span className="text-sm font-extrabold text-teal">{score}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-emerald-100 overflow-hidden">
                <motion.div
                  className="h-full gradient-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  transition={{ delay: 1.1 + index * 0.08, duration: 0.7, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
