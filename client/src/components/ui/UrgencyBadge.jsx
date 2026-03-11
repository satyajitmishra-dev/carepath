import { motion } from 'framer-motion';
import { AlertTriangle, Clock, CalendarCheck, Phone, Siren } from 'lucide-react';

const URGENCY_CONFIG = {
  Emergency: {
    bgClass: 'urgency-emergency',
    icon: Siren,
    text: 'EMERGENCY — Call 108 or go to ER immediately',
    subtext: 'This needs immediate medical attention',
    color: '#DC2626',
  },
  Urgent: {
    bgClass: 'urgency-urgent',
    icon: Clock,
    text: 'URGENT — See a doctor today',
    subtext: 'Schedule a visit as soon as possible',
    color: '#D97706',
  },
  Routine: {
    bgClass: 'urgency-routine',
    icon: CalendarCheck,
    text: 'ROUTINE — Book an appointment this week',
    subtext: 'Not an emergency, but do follow up',
    color: '#16A34A',
  },
};

export default function UrgencyBadge({ level, reason }) {
  const config = URGENCY_CONFIG[level] || URGENCY_CONFIG.Routine;
  const IconComp = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className={`${config.bgClass} rounded-2xl p-6 text-white relative overflow-hidden`}
      id="urgency-badge"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-2 right-4 w-32 h-32 rounded-full border-4 border-white/20" />
        <div className="absolute bottom-2 left-4 w-20 h-20 rounded-full border-2 border-white/10" />
      </div>

      <div className="relative z-10 flex items-start gap-4">
        <motion.div
          animate={level === 'Emergency' ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-14 h-14 rounded-2xl bg-[#0A140F]/20 flex items-center justify-center shrink-0 backdrop-blur-sm"
        >
          <IconComp className="w-7 h-7 text-white" />
        </motion.div>

        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{config.text}</h2>
          <p className="text-white/80 text-sm mt-1">{config.subtext}</p>
          {reason && (
            <p className="text-white/70 text-xs mt-2 bg-[#0A140F]/10 rounded-lg px-3 py-1.5 inline-block backdrop-blur-sm">
              {reason}
            </p>
          )}
        </div>

        {level === 'Emergency' && (
          <motion.a
            href="tel:108"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-[#0A140F] text-red-600 px-4 py-2.5 rounded-xl font-bold text-sm shrink-0 shadow-lg no-underline"
          >
            <Phone className="w-4 h-4" />
            Call 108
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}
