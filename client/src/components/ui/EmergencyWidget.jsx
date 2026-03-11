import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X, Siren } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function EmergencyWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { result } = useSelector((state) => state.analysis);
  const { activeScreen } = useSelector((state) => state.analysis);

  // Only show on results page and when urgency is Emergency
  const isEmergency = result?.urgencyLevel === 'Emergency';
  const showWidget = activeScreen === 'results';

  if (!showWidget) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="mb-3 glass-card p-4 w-72 shadow-2xl border border-red-200/40"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Siren className="w-4 h-4 text-red-500" />
                <h4 className="font-bold text-sm text-evergreen">Emergency Helplines</h4>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <EmergencyLink number="108" label="Ambulance Service" />
              <EmergencyLink number="112" label="National Emergency" />
              <EmergencyLink number="102" label="Medical Helpline" />
              <EmergencyLink number="1800-599-0019" label="Health Helpline (Toll Free)" />
            </div>

            <p className="text-[10px] text-gray-400 mt-3 leading-relaxed">
              If you or someone nearby is experiencing a medical emergency, please call immediately.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        animate={isEmergency ? {
          boxShadow: [
            '0 0 0 0 rgba(220, 38, 38, 0.4)',
            '0 0 0 12px rgba(220, 38, 38, 0)',
          ],
        } : {}}
        transition={isEmergency ? { duration: 1.5, repeat: Infinity } : {}}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl cursor-pointer ${
          isEmergency
            ? 'bg-red-500 hover:bg-red-600'
            : 'gradient-primary hover:shadow-emerald-500/30'
        } transition-colors`}
      >
        <Phone className="w-6 h-6 text-white" />
      </motion.button>
    </div>
  );
}

function EmergencyLink({ number, label }) {
  return (
    <a
      href={`tel:${number}`}
      className="flex items-center justify-between p-2.5 rounded-lg bg-red-50/80 border border-red-100 hover:bg-red-100 transition-colors group no-underline"
    >
      <div>
        <p className="text-xs font-semibold text-red-700">{label}</p>
        <p className="text-[11px] text-red-500/70 font-mono">{number}</p>
      </div>
      <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center group-hover:bg-red-600 transition-colors">
        <Phone className="w-3.5 h-3.5 text-white" />
      </div>
    </a>
  );
}
