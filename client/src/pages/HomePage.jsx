import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  MapPin, Clock, Shield, Zap,
  Activity, Brain, CheckCircle2, Star, ArrowRight, Sparkles,
  Stethoscope, HeartPulse, Lock
} from 'lucide-react';
import SearchBar from '../features/symptoms/SearchBar';
import HowItWorks from '../components/ui/HowItWorks';
import Testimonials from '../components/ui/Testimonials';
import FAQ from '../components/ui/FAQ';
import CTASection from '../components/ui/CTASection';

/* ─── Count-Up Stat ─────────────────────────────────────────── */
function CountUpStat({ end, duration = 2, prefix = '', suffix = '', decimals = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let startTime = null, af;
    const run = (ts) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / (duration * 1000), 1);
      setCount(end * (1 - Math.pow(1 - p, 4)));
      if (p < 1) af = requestAnimationFrame(run);
      else setCount(end);
    };
    const t = setTimeout(() => { af = requestAnimationFrame(run); }, 100);
    return () => { clearTimeout(t); if (af) cancelAnimationFrame(af); };
  }, [end, duration, inView]);

  return <span ref={ref}>{prefix}{count.toFixed(decimals)}{suffix}</span>;
}

/* ─── Floating Badge ────────────────────────────────────────── */
function FloatingBadge({ icon: Icon, label, value, gradient, className, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 180, damping: 18 }}
      className={`absolute z-20 ${className}`}
    >
      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 5 + delay, repeat: Infinity, ease: 'easeInOut' }}
        className="relative group"
      >
        {/* Glow halo behind badge */}
        <div className={`absolute inset-0 rounded-2xl blur-md opacity-30 ${gradient}`} />
        <div
          className="relative flex items-center gap-3 px-4 py-3 rounded-2xl min-w-max"
          style={{
            background: 'rgba(4, 10, 7, 0.85)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.09)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.04) inset, 0 16px 48px rgba(0,0,0,0.6)',
          }}
        >
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${gradient} shadow-lg shrink-0`}>
            <Icon className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-white font-bold text-sm leading-tight">{value}</div>
            <div className="text-white/35 text-[10px] font-semibold mt-0.5 uppercase tracking-widest">{label}</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Pulse Ring ────────────────────────────────────────────── */
function PulseRing({ delay = 0, color = 'rgba(52,211,153,0.18)' }) {
  return (
    <motion.div
      className="absolute inset-0 rounded-full pointer-events-none"
      style={{ border: `1px solid ${color}` }}
      initial={{ scale: 1, opacity: 0.6 }}
      animate={{ scale: 1.45, opacity: 0 }}
      transition={{ duration: 3, repeat: Infinity, delay, ease: 'easeOut' }}
    />
  );
}

/* ─── Marquee ticker ────────────────────────────────────────── */
const TICKER_ITEMS = [
  { icon: Stethoscope, text: 'AI Symptom Analysis' },
  { icon: MapPin, text: '40+ Verified Clinics' },
  { icon: HeartPulse, text: 'Emergency Triage' },
  { icon: Brain, text: 'Llama 3.1 Powered' },
  { icon: Lock, text: '100% Private Data' },
  { icon: Zap, text: '< 60s Results' },
  { icon: Shield, text: 'HIPAA Compliant' },
  { icon: Star, text: '4.9/5 User Rating' },
];

function Marquee() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]; // double for seamless loop
  return (
    <div className="relative overflow-hidden py-3 border-y border-white/[0.04] bg-white/[0.015]">
      {/* left/right fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#020806] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#020806] to-transparent z-10 pointer-events-none" />
      <motion.div
        className="flex gap-10 w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {items.map(({ icon: Icon, text }, i) => (
          <div key={i} className="flex items-center gap-2.5 text-white/25 text-xs font-semibold tracking-wide uppercase whitespace-nowrap select-none">
            <Icon className="w-3.5 h-3.5 text-emerald-500/50 shrink-0" />
            {text}
            <span className="text-white/10 ml-4">·</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Hero stat pill ────────────────────────────────────────── */
function StatPill({ value, label }) {
  return (
    <div
      className="flex flex-col items-center px-5 py-4 rounded-2xl group hover:border-emerald-500/15 transition-all duration-500"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '0 0 0 1px rgba(255,255,255,0.025) inset',
      }}
    >
      <span className="text-white font-black text-2xl tracking-tight leading-none">{value}</span>
      <span className="text-white/25 text-[10px] font-bold uppercase tracking-widest mt-1.5">{label}</span>
    </div>
  );
}

/* ─── Main ──────────────────────────────────────────────────── */
export default function HomePage() {
  const { scrollY } = useScroll();
  const doctorY = useTransform(scrollY, [0, 600], [0, 55]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.7]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const h = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);

  return (
    <>
      {/* ═══════════════════ HERO ═══════════════════ */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative min-h-screen overflow-hidden bg-[#020806]"
      >
        {/* ── Multi-layer background atmosphere ── */}

        {/* Deep primary glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_60%_at_62%_-8%,rgba(4,100,60,0.45),transparent_70%)]" />

        {/* Secondary ambient glow low-left */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_30%_40%_at_0%_90%,rgba(52,211,153,0.07),transparent_60%)]" />

        {/* Warm golden accent glow — premium */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_20%_20%_at_90%_80%,rgba(251,191,36,0.04),transparent_60%)]" />

        {/* Fine grid */}
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(80,200,120,1) 1px,transparent 1px),linear-gradient(90deg,rgba(80,200,120,1) 1px,transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        {/* Diagonal subtle rule — editorial detail */}
        <div
          className="absolute inset-0 opacity-[0.012] pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(-45deg,rgba(255,255,255,0.8) 0px,rgba(255,255,255,0.8) 1px,transparent 1px,transparent 60px)',
          }}
        />

        {/* Mouse spotlight */}
        <motion.div
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            background: `radial-gradient(700px at ${mouse.x}px ${mouse.y}px, rgba(52,211,153,0.05), transparent 50%)`,
          }}
        />

        {/* ── Content ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 min-h-screen flex items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center py-24 pt-36">

            {/* ══ LEFT ══ */}
            <div className="flex flex-col items-start">

              {/* Eyebrow pill */}
              <motion.div
                initial={{ opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mb-9"
              >
                <div
                  className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full"
                  style={{
                    background: 'rgba(4, 50, 28, 0.7)',
                    border: '1px solid rgba(52,211,153,0.2)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 0 20px rgba(52,211,153,0.06)',
                  }}
                >
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                    animate={{ scale: [1, 1.9, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <Sparkles className="w-3 h-3 text-emerald-400/70" />
                  <span className="text-emerald-300/80 text-[11px] font-bold tracking-[0.2em] uppercase">
                    AI Health Navigator
                  </span>
                </div>
              </motion.div>

              {/* ── Headline typography ── */}
              <div className="mb-8">
                <h1
                  className="tracking-[-0.03em] leading-[1.0]"
                  style={{ fontSize: 'clamp(3rem, 7vw, 5.8rem)', fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
                >
                  {/* "Find the" */}
                  <motion.span
                    className="block mb-1"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                    initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  >
                    Find the
                  </motion.span>

                  {/* "Right Doctor." — word clip with emerald gradient */}
                  <span className="block leading-[1.08] mb-1 overflow-hidden">
                    <motion.span
                      className="inline-flex gap-[0.15em]"
                      style={{
                        background: 'linear-gradient(135deg, #a7f3d0 0%, #34d399 35%, #059669 70%, #6ee7b7 100%)',
                        backgroundSize: '200% auto',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                      variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.13, delayChildren: 0.22 } },
                      }}
                      initial="hidden"
                      animate="visible"
                    >
                      {['Right', 'Doctor.'].map((w) => (
                        <motion.span
                          key={w}
                          className="inline-block"
                          variants={{
                            hidden: { y: '110%' },
                            visible: {
                              y: '0%',
                              transition: { type: 'spring', stiffness: 120, damping: 15 },
                            },
                          }}
                        >
                          {w}
                        </motion.span>
                      ))}
                    </motion.span>
                  </span>

                  {/* "Right Now." — secondary clip, white */}
                  <span className="block leading-[1.08] overflow-hidden">
                    <motion.span
                      className="inline-flex gap-[0.15em] text-white"
                      variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.14, delayChildren: 0.58 } },
                      }}
                      initial="hidden"
                      animate="visible"
                    >
                      {['Right', 'Now.'].map((w) => (
                        <motion.span
                          key={w}
                          className="inline-block"
                          variants={{
                            hidden: { y: '110%' },
                            visible: {
                              y: '0%',
                              transition: { type: 'spring', stiffness: 110, damping: 13 },
                            },
                          }}
                        >
                          {w}
                        </motion.span>
                      ))}
                    </motion.span>
                  </span>
                </h1>

                {/* Subheadline */}
                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-7 max-w-md leading-relaxed"
                  style={{
                    color: 'rgba(255,255,255,0.38)',
                    fontSize: '1.05rem',
                    fontWeight: 400,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Describe your symptoms in plain language. Our AI connects you to the right specialist — without the guesswork.
                </motion.p>
              </div>

              {/* ── Search bar ── */}
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[520px]"
              >
                <div className="relative">
                  {/* outer glow ring */}
                  <div
                    className="absolute -inset-px rounded-[1.6rem]"
                    style={{
                      background: 'linear-gradient(135deg, rgba(52,211,153,0.15), rgba(16,185,129,0.06), rgba(52,211,153,0.12))',
                    }}
                  />
                  <div
                    className="relative rounded-[1.5rem] p-1.5"
                    style={{
                      background: 'rgba(4, 10, 7, 0.75)',
                      backdropFilter: 'blur(32px)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      boxShadow: '0 0 0 1px rgba(255,255,255,0.03) inset, 0 24px 80px rgba(0,0,0,0.6)',
                    }}
                  >
                    <SearchBar />
                  </div>
                </div>
              </motion.div>

              {/* ── Trust chips ── */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="mt-6 flex flex-wrap items-center gap-5"
              >
                {[
                  { icon: Shield, text: 'HIPAA Compliant' },
                  { icon: CheckCircle2, text: 'No login needed' },
                  { icon: Zap, text: '< 60s results' },
                ].map(({ icon: Ic, text }) => (
                  <div key={text} className="flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase"
                    style={{ color: 'rgba(255,255,255,0.22)' }}>
                    <Ic className="w-3.5 h-3.5" style={{ color: 'rgba(52,211,153,0.5)' }} />
                    {text}
                  </div>
                ))}
              </motion.div>

              {/* ── Stats row ── */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.45 }}
                className="mt-10 grid grid-cols-3 gap-3 w-full max-w-[360px]"
              >
                <StatPill value={<CountUpStat end={40} suffix="+" />} label="Clinics" />
                <StatPill value={<CountUpStat end={60} prefix="<" suffix="s" />} label="Analysis" />
                <StatPill value={<CountUpStat end={100} suffix="%" />} label="Private" />
              </motion.div>
            </div>

            {/* ══ RIGHT — Doctor visual ══ */}
            <div className="relative flex items-center justify-center lg:justify-end h-[520px] lg:h-[640px] lg:-mt-20">

              {/* Large ambient blob */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[520px] h-[520px] rounded-full blur-[120px]"
                  style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, rgba(4,50,28,0.08) 50%, transparent 70%)' }} />
              </div>

              {/* Orbit ring 1 */}
              <motion.div
                className="absolute w-[430px] h-[430px] lg:w-[530px] lg:h-[530px] rounded-full"
                style={{ border: '1px solid rgba(52,211,153,0.07)' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 65, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-emerald-400/50 shadow-[0_0_10px_rgba(52,211,153,0.6)]" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-teal-400/30" />
              </motion.div>

              {/* Orbit ring 2 */}
              <motion.div
                className="absolute w-[360px] h-[360px] lg:w-[450px] lg:h-[450px] rounded-full"
                style={{ border: '1px dashed rgba(255,255,255,0.03)' }}
                animate={{ rotate: -360 }}
                transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
              />

              {/* Doctor orb */}
              <motion.div
                style={{ y: doctorY }}
                initial={{ opacity: 0, scale: 0.72, y: 55 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1.2, type: 'spring', stiffness: 70, damping: 17 }}
                className="relative z-10 w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] lg:w-[430px] lg:h-[430px]"
              >
                <PulseRing delay={0} />
                <PulseRing delay={1.0} color="rgba(16,185,129,0.12)" />
                <PulseRing delay={2.0} color="rgba(52,211,153,0.08)" />

                {/* Orb base */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle at 40% 35%, rgba(16,185,129,0.18) 0%, rgba(4,10,7,0.92) 65%)',
                    boxShadow: 'inset 0 0 80px rgba(16,185,129,0.07)',
                  }}
                />
                <div
                  className="absolute inset-2 rounded-full"
                  style={{
                    background: 'radial-gradient(circle at 30% 25%, rgba(52,211,153,0.08), rgba(2,8,6,0.95))',
                    border: '1px solid rgba(52,211,153,0.12)',
                  }}
                />

                {/* Doctor image */}
                <motion.img
                  src="/hero.png"
                  alt="AI Doctor"
                  className="absolute inset-0 w-full h-full object-cover rounded-full"
                  style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.7))' }}
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Glossy ring */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    boxShadow: '0 0 0 1px rgba(52,211,153,0.14), 0 0 80px rgba(16,185,129,0.12), inset 0 1px 0 rgba(255,255,255,0.08)',
                  }}
                />
              </motion.div>

              {/* ── Floating Badges ── */}
              <FloatingBadge
                icon={Brain}
                value="AI Analysis"
                label="Instant triage"
                gradient="bg-gradient-to-br from-violet-500 to-purple-700"
                className="-left-4 top-[11%] lg:-left-10"
                delay={1.0}
              />
              <FloatingBadge
                icon={MapPin}
                value={<CountUpStat end={40} suffix="+ Clinics" duration={2.5} />}
                label="Near you"
                gradient="bg-gradient-to-br from-emerald-400 to-teal-700"
                className="-right-2 top-[19%] lg:-right-6"
                delay={1.2}
              />
              <FloatingBadge
                icon={Clock}
                value={<CountUpStat end={60} prefix="< " suffix=" sec" duration={2} />}
                label="To specialist"
                gradient="bg-gradient-to-br from-amber-400 to-orange-600"
                className="-left-6 bottom-[20%] lg:-left-14"
                delay={1.4}
              />
              <FloatingBadge
                icon={Star}
                value={<><CountUpStat end={4.9} decimals={1} duration={2} /> / 5.0</>}
                label="User rating"
                gradient="bg-gradient-to-br from-yellow-400 to-amber-500"
                className="-right-4 bottom-[24%] lg:-right-10"
                delay={1.6}
              />

              {/* Powered-by chip */}
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.0 }}
                className="absolute bottom-[4%] left-1/2 -translate-x-1/2 z-20"
              >
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl"
                  style={{
                    background: 'rgba(3, 9, 5, 0.9)',
                    backdropFilter: 'blur(24px)',
                    border: '1px solid rgba(52,211,153,0.16)',
                    boxShadow: '0 0 24px rgba(16,185,129,0.07), 0 8px 32px rgba(0,0,0,0.6)',
                  }}
                >
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="text-white text-xs font-bold">Powered by Llama 3.1</div>
                    <div className="text-[10px]" style={{ color: 'rgba(52,211,153,0.45)' }}>Real-time · Always on</div>
                  </div>
                  <div className="flex gap-0.5 ml-1 items-end h-3.5">
                    {[0, 0.18, 0.36].map((d, i) => (
                      <motion.div
                        key={i}
                        className="w-0.5 rounded-full bg-emerald-400"
                        animate={{ height: [3, 12, 3] }}
                        transition={{ duration: 1.1, repeat: Infinity, delay: d }}
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <span className="text-[9px] font-bold tracking-[0.28em] uppercase" style={{ color: 'rgba(255,255,255,0.12)' }}>Scroll</span>
          <div className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <motion.div
              className="w-0.5 h-2 rounded-full bg-emerald-400/40"
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* ═══════════════ MARQUEE TICKER ═══════════════ */}
      <Marquee />

      {/* ═══════════════ SECTIONS ═══════════════ */}
      <div className="relative bg-[#020806] z-20">
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <CTASection />
      </div>
    </>
  );
}
