import { motion } from 'framer-motion';
import { UserRound, ArrowRight, Stethoscope } from 'lucide-react';

export default function SpecialistCard({ specialistType, searchQuery }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
      className="relative overflow-hidden"
    >
      <div className="glass-card p-6 relative group card-hover border-2 border-emerald-200/40">
        {/* Glow background */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/30" />
        </div>

        {/* Shimmer line */}
        <motion.div
          className="absolute top-0 left-0 w-full h-1 gradient-primary"
          initial={{ scaleX: 0, transformOrigin: 'left' }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-4">
              {/* Doctor icon */}
              <motion.div
                className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-lg shadow-emerald-500/20"
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.4 }}
              >
                <Stethoscope className="w-8 h-8 text-white" />
              </motion.div>

              <div>
                <p className="text-xs font-semibold text-emerald uppercase tracking-widest mb-1">
                  Recommended Specialist
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-evergreen tracking-tight">
                  {specialistType}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Based on your symptoms, we recommend consulting a {specialistType.toLowerCase()}
                </p>
              </div>
            </div>

            <motion.div
              className="hidden sm:flex w-12 h-12 rounded-xl bg-emerald-50 items-center justify-center shrink-0"
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(80,200,120,0.15)' }}
            >
              <ArrowRight className="w-5 h-5 text-teal" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
