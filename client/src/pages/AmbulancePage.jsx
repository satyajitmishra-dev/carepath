import { motion } from 'framer-motion';
import { Truck, Navigation, ShieldAlert, Clock, ArrowRight, HeartPulse } from 'lucide-react';

export default function AmbulancePage({ onNavigate }) {
  return (
    <div className="relative min-h-screen bg-[#030A06] overflow-hidden pt-24 pb-12 flex flex-col items-center justify-center">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_40%,rgba(11,110,79,0.15),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_50%_60%,rgba(80,200,120,0.05),transparent_60%)]" />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{ backgroundImage: 'linear-gradient(rgba(80,200,120,1) 1px,transparent 1px),linear-gradient(90deg,rgba(80,200,120,1) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 w-full flex flex-col items-center text-center">
        
        {/* Development Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="mb-8 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-950/70 border border-emerald-500/30 backdrop-blur-md"
        >
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </div>
          <span className="text-emerald-300 text-xs font-bold tracking-[0.2em] uppercase">In Active Development</span>
        </motion.div>

        {/* Floating Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring', delay: 0.1 }}
          className="relative mb-10"
        >
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-teal-900/40 border border-emerald-400/20 shadow-[0_0_40px_rgba(80,200,120,0.15)] flex items-center justify-center backdrop-blur-xl"
          >
            <Truck className="w-12 h-12 text-emerald-400" strokeWidth={1.5} />
          </motion.div>
          {/* Ring glow */}
          <div className="absolute inset-0 rounded-3xl ring-1 ring-emerald-400/20 shadow-[0_0_60px_rgba(80,200,120,0.1)] -z-10" />
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-6">
            Smart Ambulance<br />
            <span className="bg-gradient-to-r from-emerald-300 to-teal-500 bg-clip-text text-transparent">Dispatch Network</span>
          </h1>
          <p className="text-slate-300/80 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            We are building a real-time, GPS-integrated network to connect you with the nearest emergency response vehicles. Get aid instantly when every second counts.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mb-12"
        >
          {[
            { icon: Navigation, title: 'Live Tracking', desc: 'Real-time GPS tracking of your dispatch.' },
            { icon: Clock, title: 'Under 10 Mins', desc: 'Optimized routing for fastest arrival.' },
            { icon: ShieldAlert, title: 'Priority Lane', desc: 'Direct coordination with hospital ERs.' },
          ].map((feature, idx) => (
            <div key={idx} className="bg-slate-900/40 border border-white/5 backdrop-blur-md rounded-2xl p-6 text-left hover:bg-slate-800/50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Back Home Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <button
            onClick={() => onNavigate('app')}
            className="group flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold transition-all border-none cursor-pointer shadow-lg shadow-emerald-500/20"
          >
             <HeartPulse className="w-4 h-4" />
             Back to Health Navigator
             <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

      </div>
    </div>
  );
}
