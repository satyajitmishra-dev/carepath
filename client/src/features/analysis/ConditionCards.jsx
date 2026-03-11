import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

export default function ConditionCards({ conditions }) {
  if (!conditions || conditions.length === 0) return null;

  const colors = [
    { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-400' },
    { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', dot: 'bg-blue-400' },
    { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', dot: 'bg-purple-400' },
  ];

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
        <AlertCircle className="w-4 h-4" />
        Possible Conditions
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {conditions.map((condition, i) => {
          const color = colors[i % colors.length];
          return (
            <motion.div
              key={condition}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.1 * i, type: 'spring', stiffness: 200 }}
              whileHover={{ y: -3, scale: 1.02 }}
              className={`${color.bg} ${color.border} border rounded-xl p-4 card-hover cursor-default`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-2.5 h-2.5 rounded-full ${color.dot}`} />
                <span className={`${color.text} font-semibold text-sm`}>{condition}</span>
              </div>
              <p className="text-gray-400 text-[10px] mt-2 ml-5">Possible — not a diagnosis</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
