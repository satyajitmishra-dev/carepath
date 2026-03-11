import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence, useInView } from 'framer-motion';
import {
  Stethoscope, MapPin, Clock, Shield, Zap, Heart,
  Activity, Brain, CheckCircle2, Star, ArrowRight, Sparkles
} from 'lucide-react';
import SearchBar from '../features/symptoms/SearchBar';
import HowItWorks from '../components/ui/HowItWorks';
import Testimonials from '../components/ui/Testimonials';
import FAQ from '../components/ui/FAQ';
import CTASection from '../components/ui/CTASection';

/* ─── Count Up Statistic ────────────────────────────────────── */
function CountUpStat({ end, duration = 2, prefix = '', suffix = '', decimals = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / (duration * 1000), 1);
      
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      setCount(end * easeOutQuart);
      
      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end); // ensure we hit Exact end number
      }
    };
    
    // start animation slightly delayed
    const timer = setTimeout(() => {
        animationFrame = requestAnimationFrame(animate);
    }, 100);
    
    return () => {
        clearTimeout(timer);
        if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [end, duration, isInView]);

  return (
    <span ref={ref}>{prefix}{count.toFixed(decimals)}{suffix}</span>
  );
}

/* ─── Floating Pill Badge ───────────────────────────────────── */
function FloatingBadge({ icon: Icon, label, value, color, className, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 200, damping: 18 }}
      className={`absolute z-20 ${className}`}
    >
      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut' }}
        className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl px-4 py-3 shadow-2xl shadow-black/30 flex items-center gap-3 min-w-max"
      >
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="text-white font-black text-sm leading-none">{value}</div>
          <div className="text-white/60 text-[10px] font-medium mt-0.5 uppercase tracking-wide">{label}</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Typing Symptom Cycle ──────────────────────────────────── */
const SYMPTOM_EXAMPLES = [
  'chest pain and shortness of breath…',
  'severe headache with blurred vision…',
  'swollen joints and morning stiffness…',
  'persistent cough for 3 weeks…',
  'sudden vision loss in one eye…',
];

function TypingCycler() {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const word = SYMPTOM_EXAMPLES[idx];
    if (typing) {
      if (displayed.length < word.length) {
        const t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 45);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 1800);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 22);
        return () => clearTimeout(t);
      } else {
        setIdx((i) => (i + 1) % SYMPTOM_EXAMPLES.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, idx]);

  return (
    <span className="text-emerald-300 font-semibold">
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-0.5 h-5 bg-emerald-400 ml-0.5 align-middle"
      />
    </span>
  );
}

/* ─── Pulse Ring ────────────────────────────────────────────── */
function PulseRing({ delay = 0 }) {
  return (
    <motion.div
      className="absolute inset-0 rounded-full border-2 border-emerald-400/30 pointer-events-none"
      initial={{ scale: 1, opacity: 0.6 }}
      animate={{ scale: 1.35, opacity: 0 }}
      transition={{ duration: 2.4, repeat: Infinity, delay, ease: 'easeOut' }}
    />
  );
}

const WORD_CONTAINER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const WORD_CHILD = {
  hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', damping: 14, stiffness: 110 } },
};

/* ─── Main Page ─────────────────────────────────────────────── */
export default function HomePage() {
  const { scrollY } = useScroll();
  const doctorY = useTransform(scrollY, [0, 600], [0, 80]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const h = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);

  return (
    <>
      {/* ════════════ HERO ════════════ */}
      <div className="relative min-h-screen overflow-hidden bg-[#030A06]">
        
        {/* Deep radial glow background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_-10%,rgba(11,110,79,0.45),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_10%_80%,rgba(80,200,120,0.12),transparent_60%)]" />

        {/* Mouse spotlight */}
        <motion.div
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            background: `radial-gradient(500px at ${mouse.x}px ${mouse.y}px, rgba(80,200,120,0.07), transparent 50%)`
          }}
        />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(80,200,120,1) 1px,transparent 1px),linear-gradient(90deg,rgba(80,200,120,1) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 min-h-screen flex items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center py-20 pt-28">

            {/* ── LEFT COLUMN ── */}
            <div className="flex flex-col items-start">

              {/* Live badge */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, type: 'spring' }}
                className="mb-7"
              >
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-950/70 border border-emerald-500/40 backdrop-blur-md">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-emerald-400"
                    animate={{ scale: [1, 1.6, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  />
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300 text-xs font-bold tracking-[0.18em] uppercase">AI Health Navigator</span>
                </div>
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, type: 'spring', stiffness: 90, damping: 16 }}
                className="mb-6"
              >
                <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black tracking-tight leading-[1.05]">
                  <span className="block text-white">Find the</span>
                  <span className="block bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-400 bg-clip-text text-transparent">Right Doctor.</span>
                  <span className="block text-white">Right Now.</span>
                </h1>
              </motion.div>

              {/* Typing sub */}
              {/* Search */}
              <motion.div
                initial={{ opacity: 0, y: 32, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.9, type: 'spring', stiffness: 100, damping: 16 }}
                className="w-full max-w-xl relative"
              >
                <div className="absolute -inset-3 bg-gradient-to-r from-emerald-500/20 via-teal-500/10 to-emerald-500/20 blur-2xl rounded-[3rem] -z-10" />
                <SearchBar />
              </motion.div>

              {/* Trust row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-7 flex flex-wrap items-center gap-5"
              >
                {[
                  { icon: Shield, text: 'No data stored' },
                  { icon: CheckCircle2, text: 'No login required' },
                  { icon: Zap, text: '< 60s results' },
                ].map(({ icon: Ic, text }) => (
                  <div key={text} className="flex items-center gap-1.5 text-white/35 text-xs font-medium">
                    <Ic className="w-3.5 h-3.5 text-emerald-500" />
                    {text}
                  </div>
                ))}
              </motion.div>

              {/* Mini stat row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.35 }}
                className="mt-10 grid grid-cols-3 gap-4 w-full max-w-md"
              >
                {[
                  { value: <CountUpStat end={40} suffix="+" duration={2} />, label: 'Clinics' },
                  { value: <CountUpStat end={60} prefix="< " suffix="s" duration={2} />, label: 'Analysis' },
                  { value: <CountUpStat end={100} suffix="%" duration={2} />, label: 'Private' },
                ].map(({ value, label }) => (
                  <div key={label} className="rounded-2xl bg-white/[0.04] border border-white/[0.07] px-4 py-3 text-center">
                    <div className="text-xl font-black text-emerald-300 leading-none">{value}</div>
                    <div className="text-[10px] text-white/35 font-semibold uppercase tracking-widest mt-1">{label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── RIGHT COLUMN — Doctor Visual ── */}
            <div className="relative flex items-center justify-center lg:justify-end h-[520px] lg:h-[640px] lg:-mt-36">

              {/* Outer ambient glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[480px] h-[480px] rounded-full bg-emerald-500/10 blur-[80px]" />
              </div>

              {/* Decorative rings */}
              <motion.div
                className="absolute w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] rounded-full border border-emerald-500/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-emerald-400/60" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-teal-400/40" />
              </motion.div>
              <motion.div
                className="absolute w-[340px] h-[340px] lg:w-[430px] lg:h-[430px] rounded-full border border-emerald-500/[0.07]"
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
              />

              {/* Doctor image container */}
              <motion.div
                style={{ y: doctorY }}
                initial={{ opacity: 0, scale: 0.7, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1, type: 'spring', stiffness: 80, damping: 18 }}
                className="relative z-10 w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] lg:w-[420px] lg:h-[420px]"
              >
                {/* Pulse rings */}
                <PulseRing delay={0} />
                <PulseRing delay={0.8} />
                <PulseRing delay={1.6} />

                {/* Glowing circle base */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-600/30 via-teal-700/20 to-transparent blur-xl" />
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-emerald-900/80 to-[#030A06]/90 border border-emerald-500/20 shadow-[inset_0_0_60px_rgba(80,200,120,0.08)]" />

                {/* Doctor image */}
                <motion.img
                  src="/hero.png"
                  alt="AI Doctor"
                  className="absolute inset-0 w-full h-full object-cover rounded-full drop-shadow-2xl"
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Inner ring glow */}
                <div className="absolute inset-0 rounded-full ring-2 ring-emerald-400/25 shadow-[0_0_60px_rgba(80,200,120,0.2)]" />
              </motion.div>

              {/* ── Floating Badges ── */}
              <FloatingBadge
                icon={Brain}
                value="AI Analysis"
                label="Instant diagnosis"
                color="bg-gradient-to-br from-violet-500 to-purple-600"
                className="-left-4 top-[12%] lg:-left-10"
                delay={1.0}
              />
              <FloatingBadge
                icon={MapPin}
                value={<CountUpStat end={40} suffix="+ Clinics" duration={2.5} />}
                label="Near you"
                color="bg-gradient-to-br from-emerald-500 to-teal-600"
                className="-right-2 top-[18%] lg:-right-6"
                delay={1.2}
              />
              <FloatingBadge
                icon={Clock}
                value={<CountUpStat end={60} prefix="< " suffix=" sec" duration={2} />}
                label="To specialist"
                color="bg-gradient-to-br from-amber-500 to-orange-500"
                className="-left-6 bottom-[18%] lg:-left-14"
                delay={1.4}
              />
              <FloatingBadge
                icon={Star}
                value={<><CountUpStat end={4.9} decimals={1} duration={2} /> / 5.0</>}
                label="User rating"
                color="bg-gradient-to-br from-yellow-400 to-amber-500"
                className="-right-4 bottom-[22%] lg:-right-10"
                delay={1.6}
              />

              {/* Live indicator badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
                className="absolute bottom-[6%] left-1/2 -translate-x-1/2 z-20"
              >
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="backdrop-blur-xl bg-emerald-950/80 border border-emerald-500/30 rounded-2xl px-5 py-3 flex items-center gap-3 shadow-xl shadow-black/40"
                >
                  <Activity className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="text-white text-xs font-bold">Powered by Gemini AI</div>
                    <div className="text-emerald-400/70 text-[10px]">Real-time analysis · Always on</div>
                  </div>
                  <div className="flex gap-1 ml-1">
                    {[0, 0.15, 0.3].map((d, i) => (
                      <motion.div
                        key={i}
                        className="w-1 rounded-full bg-emerald-400"
                        animate={{ height: [6, 14, 6] }}
                        transition={{ duration: 1, repeat: Infinity, delay: d }}
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll chevron */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          <span className="text-white/20 text-[10px] uppercase tracking-[0.2em] font-semibold">Scroll</span>
          <motion.div
            className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center pt-1.5"
            animate={{}}
          >
            <motion.div
              className="w-1 h-2 rounded-full bg-emerald-400/60"
              animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* ════════════ BELOW HERO ════════════ */}
      <div className="relative bg-[#030A06] z-20">
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <CTASection />
      </div>
    </>
  );
}
