import { motion } from 'framer-motion';
import {
  Users, Target, Heart, Code, Sparkles, GraduationCap,
  Brain, Shield, Globe, Lightbulb, ArrowLeft
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { clearResults } from '../features/analysis/analysisSlice';

const PROBLEM_STATS = [
  { value: '70%', label: 'patients visit the wrong specialist first', icon: Target },
  { value: '₹800+', label: 'wasted per wrong doctor visit on average', icon: Heart },
  { value: '2-3 hrs', label: 'lost in waiting at the wrong clinic', icon: Users },
];

const TECH_STACK = [
  { name: 'React.js', category: 'Frontend', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { name: 'Tailwind CSS', category: 'Styling', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  { name: 'Redux Toolkit', category: 'State', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { name: 'Node.js', category: 'Backend', color: 'bg-green-50 text-green-700 border-green-200' },
  { name: 'Express.js', category: 'API', color: 'bg-gray-900/40 text-emerald-100/80 border-emerald-500/20' },
  { name: 'Gemini AI', category: 'AI Engine', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { name: 'Leaflet.js', category: 'Maps', color: 'bg-emerald-900/40 text-emerald-400 border-emerald-500/30' },
  { name: 'Framer Motion', category: 'Animation', color: 'bg-pink-50 text-pink-700 border-pink-200' },
];

const TEAM_MEMBERS = [
  { name: 'Team Member 1', role: 'AI + Backend Developer', icon: Brain },
  { name: 'Team Member 2', role: 'Maps + Frontend Developer', icon: Globe },
  { name: 'Team Member 3', role: 'UI/UX + Frontend', icon: Sparkles },
  { name: 'Team Member 4', role: 'Data + QA + Pitch', icon: Lightbulb },
];

const FEATURES = [
  { icon: Brain, title: 'AI-Powered Analysis', desc: 'Gemini AI identifies the right specialist from plain-language symptom descriptions' },
  { icon: Shield, title: 'Privacy First', desc: 'No data stored,Your health info stays with you.' },
  { icon: Target, title: '3 Urgency Levels', desc: 'Emergency, Urgent, or Routine — know exactly when to act fast' },
  { icon: Globe, title: 'Interactive Map', desc: 'Find nearest specialists with real-time distance, fees, and ratings' },
  { icon: Heart, title: 'Affordable Filter', desc: 'Filter clinics under ₹500 to find budget-friendly healthcare' },
  { icon: GraduationCap, title: 'Made for Everyone', desc: 'Designed for students, elderly, and tier-2/3 city patients' },
];

export default function AboutPage() {
  const dispatch = useDispatch();

  return (
    <div className="relative min-h-[calc(100vh-5rem)]">
      <div className="absolute inset-0 gradient-mesh" />
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-10">
        {/* Back */}
        <motion.button
          onClick={() => dispatch(clearResults())}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -3 }}
          className="flex items-center gap-2 text-sm font-medium text-emerald-300 hover:text-[#E8F8F2] transition-colors cursor-pointer bg-transparent border-none mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/60 border border-emerald-500/30/60 text-xs font-semibold text-emerald-300 mb-4">
            XiBit 2K26 Hackathon
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#E8F8F2] tracking-tight flex items-center justify-center gap-4">
            About <span className="gradient-text">CarePath</span>
            <img src="/logo.png" alt="CarePath Logo" className="w-20 h-20 object-cover scale-110 drop-shadow-[0_0_15px_rgba(80,200,120,0.4)]" />
          </h1>
          <p className="text-emerald-100/50 mt-3 max-w-lg mx-auto">
            An AI-powered healthcare navigation platform that helps patients find the right specialist — instantly.
          </p>
        </motion.div>

        {/* Problem stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14"
        >
          {PROBLEM_STATS.map(({ value, label, icon: Icon }, i) => (
            <motion.div
              key={value}
              whileHover={{ y: -4, scale: 1.02 }}
              className="glass-card p-5 text-center card-hover border border-red-100/50"
            >
              <div className="flex justify-center mb-3">
                <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-red-500" />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-red-600 font-mono">{value}</div>
              <p className="text-emerald-100/50 text-xs mt-1">{label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Features grid */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <h2 className="text-2xl font-bold text-[#E8F8F2] mb-6 text-center">What CarePath Does</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
            {FEATURES.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                whileHover={{ y: -3 }}
                className="glass-card p-5 card-hover group"
              >
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center mb-3 group-hover:shadow-lg group-hover:shadow-emerald-500/20 transition-shadow">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-[#E8F8F2] text-sm mb-1">{title}</h3>
                <p className="text-emerald-100/50 text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech stack */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <h2 className="text-2xl font-bold text-[#E8F8F2] mb-6 text-center flex items-center justify-center gap-2">
            <Code className="w-5 h-5 text-emerald-300" />
            Tech Stack
          </h2>
          <div className="flex flex-wrap justify-center gap-2 mb-14">
            {TECH_STACK.map(({ name, category, color }) => (
              <motion.div
                key={name}
                whileHover={{ scale: 1.06, y: -2 }}
                className={`px-4 py-2 rounded-xl border text-xs font-semibold ${color} cursor-default`}
              >
                <span className="font-bold">{name}</span>
                <span className="opacity-60 ml-1.5">· {category}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <h2 className="text-2xl font-bold text-[#E8F8F2] mb-6 text-center flex items-center justify-center gap-2">
            <Users className="w-5 h-5 text-emerald-300" />
            Our Team
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {TEAM_MEMBERS.map(({ name, role, icon: Icon }, i) => (
              <motion.div
                key={name}
                whileHover={{ y: -4 }}
                className="glass-card p-4 text-center card-hover"
              >
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-500/20">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-[#E8F8F2] text-sm">{name}</h4>
                <p className="text-emerald-100/40 text-[11px] mt-0.5">{role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Built at */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center py-8"
        >
          <p className="text-emerald-100/40 text-xs">
            Built with ❤️ at <span className="font-semibold text-emerald-300">Brainware University</span> · XiBit 2K26 Hackathon
          </p>
        </motion.div>
      </div>
    </div>
  );
}
