import { motion } from 'framer-motion';
import {
  Stethoscope, MapPin, Clock, Shield, Zap, Heart,
  Activity, Brain, Eye, Bone, Ear, Pill
} from 'lucide-react';
import SearchBar from '../features/symptoms/SearchBar';
import HowItWorks from '../components/ui/HowItWorks';
import Testimonials from '../components/ui/Testimonials';
import FAQ from '../components/ui/FAQ';
import CTASection from '../components/ui/CTASection';

const STATS = [
  { icon: Clock, value: '< 60s', label: 'To Right Specialist', color: 'text-emerald' },
  { icon: MapPin, value: '40+', label: 'Clinics Mapped', color: 'text-teal' },
  { icon: Shield, value: '100%', label: 'Privacy Safe', color: 'text-emerald' },
  { icon: Zap, value: 'AI', label: 'Powered Analysis', color: 'text-teal' },
];

const FLOATING_ICONS = [
  { Icon: Stethoscope, x: '8%', y: '20%', delay: 0, size: 28 },
  { Icon: Heart, x: '85%', y: '15%', delay: 1, size: 24 },
  { Icon: Brain, x: '90%', y: '55%', delay: 2, size: 26 },
  { Icon: Eye, x: '5%', y: '65%', delay: 0.5, size: 22 },
  { Icon: Bone, x: '15%', y: '80%', delay: 1.5, size: 20 },
  { Icon: Ear, x: '82%', y: '78%', delay: 2.5, size: 22 },
  { Icon: Pill, x: '75%', y: '25%', delay: 3, size: 20 },
  { Icon: Activity, x: '50%', y: '85%', delay: 1.8, size: 24 },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative min-h-[calc(100vh-5rem)] overflow-hidden">
        {/* Animated background mesh */}
        <div className="absolute inset-0 gradient-mesh" />

        {/* Animated blobs */}
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />

        {/* Floating medical icons */}
        {FLOATING_ICONS.map(({ Icon, x, y, delay, size }, i) => (
          <motion.div
            key={i}
            className="absolute hidden md:block pointer-events-none"
            style={{ left: x, top: y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.12, scale: 1 }}
            transition={{ delay: delay + 0.5, duration: 0.8 }}
          >
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Icon size={size} className="text-teal" />
            </motion.div>
          </motion.div>
        ))}

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] px-4 py-16 pt-24">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/60 border border-emerald-200/60 backdrop-blur-sm">
              <motion.div
                className="w-2 h-2 rounded-full bg-emerald-500"
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs font-semibold text-teal tracking-wide">
                AI-Powered Healthcare Navigator
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-center mb-4 max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-evergreen leading-tight">
              Find the Right Doctor.{' '}
              <span className="gradient-text">Right Now.</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-600 text-center max-w-xl mb-10 leading-relaxed"
          >
            Describe your symptoms in plain language. Our AI instantly identifies the
            right specialist and shows nearby clinics on the map.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, type: 'spring', stiffness: 100 }}
            className="w-full max-w-2xl"
          >
            <SearchBar />
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full max-w-2xl"
          >
            {STATS.map(({ icon: Icon, value, label, color }) => (
              <motion.div
                key={label}
                whileHover={{ y: -4, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="glass-card p-4 text-center card-hover group cursor-default"
              >
                <div className="flex justify-center mb-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                </div>
                <div className="text-xl font-bold text-evergreen font-mono">{value}</div>
                <div className="text-[11px] text-gray-500 font-medium mt-0.5">{label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-10 flex items-center gap-2 text-gray-400"
          >
            <Shield className="w-3.5 h-3.5" />
            <span className="text-xs">No data stored · No login required · Not a diagnostic tool</span>
          </motion.div>
        </div>
      </div>

      {/* Sections below hero */}
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTASection />
    </>
  );
}
