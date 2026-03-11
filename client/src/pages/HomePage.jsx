import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import {
  Stethoscope, MapPin, Clock, Shield, Zap, Heart,
  Activity, Brain, Eye, Bone, Ear, Pill
} from 'lucide-react';
import SearchBar from '../features/symptoms/SearchBar';
import HowItWorks from '../components/ui/HowItWorks';
import Testimonials from '../components/ui/Testimonials';
import FAQ from '../components/ui/FAQ';
import CTASection from '../components/ui/CTASection';
import BrandLogo from '../components/ui/BrandLogo';

const STATS = [
  { icon: Clock, value: '< 60s', label: 'To Right Specialist', color: 'text-emerald' },
  { icon: MapPin, value: '40+', label: 'Clinics Mapped', color: 'text-emerald-300' },
  { icon: Shield, value: '100%', label: 'Privacy Safe', color: 'text-emerald' },
  { icon: Zap, value: 'AI', label: 'Powered Analysis', color: 'text-emerald-300' },
];

const FLOATING_ICONS = [
  { Icon: Stethoscope, x: '8%', y: '20%', delay: 0, size: 28, depth: 1.2 },
  { Icon: Heart, x: '85%', y: '15%', delay: 1, size: 24, depth: 0.8 },
  { Icon: Brain, x: '90%', y: '55%', delay: 2, size: 26, depth: 1.5 },
  { Icon: Eye, x: '5%', y: '65%', delay: 0.5, size: 22, depth: 0.5 },
  { Icon: Bone, x: '15%', y: '80%', delay: 1.5, size: 20, depth: 1.1 },
  { Icon: Ear, x: '82%', y: '78%', delay: 2.5, size: 22, depth: 0.9 },
  { Icon: Pill, x: '75%', y: '25%', delay: 3, size: 20, depth: 1.3 },
  { Icon: Activity, x: '50%', y: '85%', delay: 1.8, size: 24, depth: 0.7 },
];

// Magnetic 3D Card Component
function MagneticCard({ children, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, perspective: 1000 }}
      className="relative transform-gpu"
    >
      <motion.div
        className={className}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// Word Reveal Animation
const textContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const textChild = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', damping: 12, stiffness: 100 },
  },
};

export default function HomePage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Mouse Glow Effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <>
      <div 
        className="relative min-h-[calc(100vh-5rem)] overflow-hidden"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Interactive Mouse Glow */}
        <motion.div
          className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
          animate={{ opacity: isHovering ? 1 : 0 }}
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(80, 200, 120, 0.08), transparent 40%)`
          }}
        />

        {/* Animated background mesh & Parallax Blobs */}
        <div className="absolute inset-0 gradient-mesh" />
        <motion.div style={{ y: y1 }} className="blob blob-1" />
        <motion.div style={{ y: y2 }} className="blob blob-2" />
        <div className="blob blob-3" />

        {/* Floating medical icons with depth Parallax */}
        {FLOATING_ICONS.map(({ Icon, x, y, delay, size, depth }, i) => (
          <motion.div
            key={i}
            className="absolute hidden md:block pointer-events-none z-0"
            style={{ 
              left: x, 
              top: y, 
              y: useTransform(scrollY, [0, 1000], [0, 100 * depth]),
              filter: `blur(${Math.max(0, (depth - 1) * 3)}px)`
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.15, scale: depth }}
            transition={{ delay: delay + 0.5, duration: 1.2, type: 'spring' }}
          >
            <motion.div
              animate={{ y: [-15, 15, -15], rotate: [-5, 5, -5] }}
              transition={{ duration: 5 + i * 0.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Icon size={size} className="text-emerald-300" />
            </motion.div>
          </motion.div>
        ))}

        {/* Main content */}
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] px-4 py-16 pt-24"
        >
          <motion.div
            initial={{ opacity: 0, y: -24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, type: 'spring', bounce: 0.35 }}
            className="mb-5"
          >
            <div className="rounded-3xl border border-emerald-400/15 bg-[#0A140F]/30 px-4 py-3 backdrop-blur-md">
              <BrandLogo size="lg" theme="dark" showTagline />
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
            className="mb-8"
          >
            <div className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-900/40 border border-emerald-500/30 backdrop-blur-md overflow-hidden cursor-default shadow-sm hover:shadow-md transition-all">
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-emerald-200/40 to-transparent" />
              
              <motion.div
                className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(80,200,120,0.8)]"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-bold tracking-wider text-emerald-300 uppercase">
                AI-Powered Healthcare Navigator
              </span>
            </div>
          </motion.div>

          {/* Heading with word-by-word reveal */}
          <motion.div
            variants={textContainer}
            initial="hidden"
            animate="visible"
            className="text-center mb-6 max-w-4xl"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#E8F8F2] leading-[1.1]">
               <motion.span variants={textChild} className="inline-block mr-3">Find</motion.span>
               <motion.span variants={textChild} className="inline-block mr-3">the</motion.span>
               <motion.span variants={textChild} className="inline-block mr-3">Right</motion.span>
               <motion.span variants={textChild} className="inline-block">Doctor.</motion.span>
               <br className="hidden sm:block" />
               <motion.span variants={textChild} className="inline-block mr-3 gradient-text">Right</motion.span>
               <motion.span variants={textChild} className="inline-block gradient-text">Now.</motion.span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl text-emerald-100/70 text-center max-w-2xl mb-12 leading-relaxed font-medium"
          >
            Describe your symptoms in plain language. Our AI instantly identifies the
            right specialist and maps the nearest verified clinics.
          </motion.p>

          {/* Search bar with intense entrance */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.8, type: 'spring', stiffness: 100 }}
            style={{ perspective: 1000 }}
            className="w-full max-w-2xl relative z-20"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-100/30 to-teal-100/30 blur-2xl -z-10 rounded-[3rem]" />
            <SearchBar />
          </motion.div>

          {/* Stats row with Magnetic 3D Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full max-w-3xl"
          >
            {STATS.map(({ icon: Icon, value, label, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + (i * 0.1) }}
              >
                <MagneticCard className="h-full">
                  <div className="glass-card p-5 text-center group cursor-default h-full relative overflow-hidden flex flex-col items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:shadow-emerald-200/50 group-hover:shadow-lg transition-all duration-300">
                      <Icon className={`w-6 h-6 ${color}`} />
                    </div>
                    <div className="text-2xl font-black text-[#E8F8F2] font-mono tracking-tight">{value}</div>
                    <div className="text-xs text-emerald-100/50 font-semibold mt-1 uppercase tracking-wider">{label}</div>
                  </div>
                </MagneticCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-12 flex items-center justify-center gap-3 text-emerald-100/40 font-medium"
          >
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-xs uppercase tracking-widest">No data stored · No login required · Not a diagnostic tool</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Sections below hero (Parallax container) */}
      <div className="relative bg-[#0A140F] z-20">
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <CTASection />
      </div>
    </>
  );
}
