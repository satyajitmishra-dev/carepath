import { motion } from 'framer-motion';
import { MessageSquareText, Brain, MapPin, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    icon: MessageSquareText,
    title: 'Describe Symptoms',
    description: 'Type your symptoms in plain language — no medical jargon needed. Just say what you feel.',
    color: 'from-emerald-400 to-emerald-600',
    bgColor: 'bg-emerald-900/40',
    borderColor: 'border-emerald-500/30',
  },
  {
    step: '02',
    icon: Brain,
    title: 'AI Analyzes',
    description: 'Our AI engine identifies possible conditions, the right specialist, and urgency level in seconds.',
    color: 'from-teal-400 to-teal-600',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
  },
  {
    step: '03',
    icon: MapPin,
    title: 'Find Nearby Clinics',
    description: 'See nearby specialists on an interactive map with fees, ratings, and one-tap directions.',
    color: 'from-green-400 to-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 relative" id="how-it-works">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/60 border border-emerald-500/30/60 text-xs font-semibold text-emerald-300 mb-4">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F8F2] tracking-tight">
            How <span className="gradient-text">CarePath</span> Works
          </h2>
          <p className="text-emerald-100/50 mt-3 max-w-md mx-auto text-sm">
            From symptoms to specialist in under 60 seconds — no login, no hassle.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {STEPS.map(({ step, icon: Icon, title, description, color, bgColor, borderColor }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.15, type: 'spring', stiffness: 200 }}
              className="relative z-10"
            >
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`glass-card p-6 text-center card-hover border ${borderColor} relative overflow-hidden group`}
              >
                {/* Step number watermark */}
                <span className="absolute top-3 right-4 text-6xl font-black text-emerald-400/10 select-none pointer-events-none group-hover:text-emerald-400/20 transition-colors">
                  {step}
                </span>

                {/* Icon */}
                <div className="relative z-10 flex justify-center mb-4">
                  <motion.div
                    whileHover={{ rotate: [0, -8, 8, 0] }}
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>
                </div>

                <h3 className="text-lg font-bold text-[#E8F8F2] mb-2 relative z-10">{title}</h3>
                <p className="text-emerald-100/50 text-sm leading-relaxed relative z-10">{description}</p>

                {/* Arrow connector on mobile */}
                {i < STEPS.length - 1 && (
                  <div className="md:hidden flex justify-center mt-4">
                    <ArrowRight className="w-5 h-5 text-emerald-300 rotate-90" />
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
