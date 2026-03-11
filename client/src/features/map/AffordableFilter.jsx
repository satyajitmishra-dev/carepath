import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAffordable } from './mapSlice';
import { Filter, IndianRupee, BadgeCheck } from 'lucide-react';

export default function AffordableFilter() {
  const dispatch = useDispatch();
  const { affordableOnly, clinics, filteredClinics } = useSelector((state) => state.map);

  const affordableCount = clinics.filter((c) => c.affordable).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
          <Filter className="w-4 h-4 text-teal" />
        </div>
        <div>
          <p className="text-sm font-semibold text-evergreen">
            Show affordable clinics only
          </p>
          <p className="text-[11px] text-gray-400 flex items-center gap-1">
            <IndianRupee className="w-3 h-3" />
            Under ₹500 consultation fee · {affordableCount} available
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {affordableOnly && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-1 px-2 py-1 bg-green-50 border border-green-100 rounded-lg text-[11px] font-medium text-green-700"
          >
            <BadgeCheck className="w-3 h-3" />
            {filteredClinics.length} shown
          </motion.span>
        )}

        {/* Toggle */}
        <motion.button
          onClick={() => dispatch(toggleAffordable())}
          whileTap={{ scale: 0.95 }}
          className={`relative w-14 h-7 rounded-full transition-all duration-300 cursor-pointer ${
            affordableOnly
              ? 'bg-emerald-500 shadow-md shadow-emerald-500/30'
              : 'bg-gray-200'
          }`}
        >
          <motion.div
            className="absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md"
            animate={{ left: affordableOnly ? '30px' : '2px' }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </motion.button>
      </div>
    </motion.div>
  );
}
