import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Shield } from 'lucide-react';

export default function CTASection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Focus the search input after scrolling
    setTimeout(() => {
      document.getElementById('symptom-input')?.focus();
    }, 600);
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden" id="cta">
      <div className="absolute inset-0 gradient-primary opacity-5" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div
            className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/20"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F8F2] tracking-tight mb-4">
            Ready to Find Your <span className="gradient-text">Specialist?</span>
          </h2>
          <p className="text-emerald-100/50 mb-8 max-w-md mx-auto">
            Stop guessing which doctor to visit. Let AI guide you to the right specialist in under 60 seconds.
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="btn-ripple gradient-primary text-white px-8 py-4 rounded-2xl text-base font-bold inline-flex items-center gap-3 shadow-xl shadow-emerald-500/20 cursor-pointer border-none"
          >
            Describe Your Symptoms Now
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <div className="flex items-center justify-center gap-6 mt-6 text-emerald-100/40">
            <span className="flex items-center gap-1.5 text-xs">
            </span>
            <span className="text-xs">•</span>
            <span className="text-xs">Free to use</span>
            <span className="text-xs">•</span>
            <span className="text-xs">100% private</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
