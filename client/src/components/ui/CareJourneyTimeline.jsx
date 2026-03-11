import { motion } from 'framer-motion';
import { Activity, AlertCircle, CheckCircle2, MapPinned, Stethoscope } from 'lucide-react';

export default function CareJourneyTimeline({ urgencyLevel, specialistType }) {
  const steps = [
    {
      title: 'Symptoms interpreted',
      description: 'Your input is parsed into structured clinical hints.',
      icon: Activity,
    },
    {
      title: `Urgency: ${urgencyLevel}`,
      description: 'Safety-first triage prioritizes emergency signals before recommendations.',
      icon: AlertCircle,
    },
    {
      title: `Specialist matched: ${specialistType}`,
      description: 'A focused specialist recommendation is generated for faster care routing.',
      icon: Stethoscope,
    },
    {
      title: 'Nearby options ranked',
      description: 'Clinics are sorted by distance with affordability and direction support.',
      icon: MapPinned,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="glass-card p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle2 className="w-4 h-4 text-emerald" />
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Care Journey</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {steps.map(({ title, description, icon: Icon }, index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 + index * 0.08 }}
            className="rounded-xl border border-emerald-100 bg-white/85 p-4"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center mb-2.5">
              <Icon className="w-4 h-4 text-teal" />
            </div>
            <p className="text-xs font-bold text-evergreen leading-snug">{title}</p>
            <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">{description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
