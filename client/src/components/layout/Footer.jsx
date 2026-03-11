import { motion } from 'framer-motion';
import { Activity, Heart, Github, Mail, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative mt-auto">
      <div className="glass-dark border-t border-emerald-500/10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="CarePath Logo" className="w-10 h-10 object-contain drop-shadow-md" />
              <div>
                <span className="text-white font-bold text-sm">
                  Care<span className="text-emerald-400">Path</span>
                </span>
                <p className="text-emerald-300/50 text-[10px]">Find the right doctor. Right now.</p>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="flex items-center gap-2 justify-center">
              <Shield className="w-3.5 h-3.5 text-amber-400/70 shrink-0" />
              <p className="text-emerald-300/40 text-[11px] text-center">
                CarePath does not provide medical diagnosis. Always consult a qualified doctor.
              </p>
            </div>

            {/* Links */}
            <div className="flex items-center gap-4 justify-end">
              <FooterIcon icon={Heart} />
              <FooterIcon icon={Github} />
              <FooterIcon icon={Mail} />
              <span className="text-emerald-300/30 text-[11px]">
                © 2026 Team XiBit
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterIcon({ icon: Icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.15, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="w-8 h-8 rounded-lg bg-[#0A140F]/5 flex items-center justify-center cursor-pointer hover:bg-emerald-500/10 transition-colors border border-white/5"
    >
      <Icon className="w-3.5 h-3.5 text-emerald-300/60" />
    </motion.div>
  );
}
