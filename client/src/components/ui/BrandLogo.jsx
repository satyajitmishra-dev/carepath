import { motion } from 'framer-motion';

export default function BrandLogo({
  size = 'md',
  theme = 'dark',
  showWordmark = true,
  showTagline = false,
  className = '',
}) {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const titleSizeMap = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  const taglineSizeMap = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
    xl: 'text-sm',
  };

  const isDark = theme === 'dark';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <motion.div
        whileHover={{ rotate: -4, scale: 1.04 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className={`relative ${sizeMap[size]} shrink-0 rounded-2xl overflow-hidden ${
          isDark ? 'shadow-[0_0_24px_rgba(80,200,120,0.18)]' : 'shadow-lg shadow-emerald-500/10'
        }`}
      >
        <img src="/logo.svg" alt="CarePath logo" className="w-full h-full object-contain" />
      </motion.div>

      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span className={`${titleSizeMap[size]} font-black tracking-tight ${isDark ? 'text-white' : 'text-evergreen'}`}>
            Care<span className="text-emerald-400">Path</span>
          </span>
          {showTagline && (
            <span className={`${taglineSizeMap[size]} mt-1 uppercase tracking-[0.22em] font-semibold ${isDark ? 'text-emerald-300/60' : 'text-teal/70'}`}>
              AI Health Navigator
            </span>
          )}
        </div>
      )}
    </div>
  );
}
