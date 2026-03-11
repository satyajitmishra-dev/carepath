import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function SymptomChip({ label, onRemove }) {
  return (
    <motion.span
      layout
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-900/40 text-emerald-300 border border-emerald-500/30/60 shadow-sm"
    >
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-0.5 hover:bg-emerald-200/50 rounded-full p-0.5 transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </motion.span>
  );
}
