import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';

export default function DisclaimerBanner({ disclaimer }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="bg-amber-50 border border-amber-200/60 rounded-xl p-4 flex items-start gap-3"
      id="disclaimer-banner"
    >
      <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
        <ShieldAlert className="w-4 h-4 text-amber-600" />
      </div>
      <div>
        <p className="text-amber-800 font-semibold text-xs uppercase tracking-wider mb-1">
          Medical Disclaimer
        </p>
        <p className="text-amber-700/80 text-sm leading-relaxed">
          {disclaimer || 'This tool is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider with any questions you may have regarding a medical condition.'}
        </p>
      </div>
    </motion.div>
  );
}
