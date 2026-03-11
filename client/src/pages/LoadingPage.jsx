import { motion } from 'framer-motion';
import { Activity, Heart } from 'lucide-react';

export default function LoadingPage() {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-mesh" />
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      <div className="relative z-10 flex flex-col items-center gap-8 px-4">
        {/* ECG Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Pulsing circle */}
          <motion.div
            className="w-32 h-32 rounded-full bg-emerald-100/50 flex items-center justify-center"
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: [
                '0 0 0 0 rgba(80, 200, 120, 0.3)',
                '0 0 0 30px rgba(80, 200, 120, 0)',
                '0 0 0 0 rgba(80, 200, 120, 0)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div
              className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center shadow-xl"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Activity className="w-10 h-10 text-white" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ECG Line SVG */}
        <svg width="280" height="60" viewBox="0 0 280 60" className="opacity-60">
          <motion.path
            d="M0,30 L40,30 L55,30 L65,8 L75,52 L85,20 L95,40 L105,30 L140,30 L155,30 L165,8 L175,52 L185,20 L195,40 L205,30 L280,30"
            fill="none"
            stroke="#50C878"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>

        {/* Text */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-evergreen mb-2">
            Analyzing Your Symptoms
          </h2>
          <motion.p
            className="text-gray-500 text-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Our AI is finding the right specialist for you...
          </motion.p>
        </motion.div>

        {/* Loading steps */}
        <div className="flex flex-col gap-3 mt-4">
          {[
            { text: 'Reading symptoms', delay: 0 },
            { text: 'Identifying conditions', delay: 0.8 },
            { text: 'Matching specialist', delay: 1.6 },
            { text: 'Finding nearby clinics', delay: 2.4 },
          ].map(({ text, delay }, i) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay, duration: 0.4 }}
              className="flex items-center gap-3"
            >
              <motion.div
                className="w-6 h-6 rounded-full border-2 border-emerald-300 flex items-center justify-center"
                animate={{
                  backgroundColor: ['rgba(80,200,120,0)', 'rgba(80,200,120,0.2)', 'rgba(80,200,120,0)'],
                  borderColor: ['#86efac', '#50C878', '#86efac'],
                }}
                transition={{ delay: delay + 0.5, duration: 1.5, repeat: Infinity }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-emerald-500"
                  animate={{ scale: [0, 1, 0] }}
                  transition={{ delay: delay + 0.5, duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
              <span className="text-sm text-gray-600 font-medium">{text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
