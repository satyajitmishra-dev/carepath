import { motion } from 'framer-motion';
import { Activity, Heart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearResults } from '../../features/analysis/analysisSlice';
import { clearSymptoms } from '../../features/symptoms/symptomsSlice';
import { clearClinics } from '../../features/map/mapSlice';
import TranslateWidget from '../ui/TranslateWidget';

export default function Navbar({ onNavigate, currentPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { activeScreen } = useSelector((state) => state.analysis);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogoClick = () => {
    dispatch(clearResults());
    dispatch(clearSymptoms());
    dispatch(clearClinics());
    onNavigate?.('app');
  };

  const handleNavClick = (page) => {
    if (page === 'home') {
      handleLogoClick();
    } else if (page === 'about') {
      onNavigate?.('about');
    }
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-4 mt-3">
        <div className="glass-dark rounded-2xl px-6 py-3 flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <motion.button
            onClick={handleLogoClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2.5 cursor-pointer bg-transparent border-none"
          >
            <div className="relative flex items-center justify-center">
              <img src="/logo.svg" alt="CarePath Logo" className="w-10 h-10 object-contain drop-shadow-[0_0_12px_rgba(80,200,120,0.4)]" />
              <motion.div
                className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg leading-tight tracking-tight">
                Care<span className="text-emerald-400">Path</span>
              </span>
              <span className="text-emerald-300/60 text-[10px] font-medium tracking-widest uppercase">
                AI Health Navigator
              </span>
            </div>
          </motion.button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink
              active={currentPage === 'app' && activeScreen === 'home'}
              onClick={() => handleNavClick('home')}
            >
              Home
            </NavLink>
            <NavLink
              active={currentPage === 'app' && activeScreen === 'results'}
              onClick={() => {}}
            >
              Results
            </NavLink>
            <NavLink
              active={currentPage === 'about'}
              onClick={() => handleNavClick('about')}
            >
              About
            </NavLink>
          </div>

          {/* CTA + Auth + Mobile toggle */}
          <div className="flex items-center gap-3">
            <TranslateWidget />

            <motion.div
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
              animate={{ borderColor: ['rgba(80,200,120,0.2)', 'rgba(80,200,120,0.5)', 'rgba(80,200,120,0.2)'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Heart className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-300 text-xs font-medium">Saving Lives with AI</span>
            </motion.div>

            {/* Auth State UI */}
            <div className="hidden sm:flex items-center gap-2">
              {isAuthenticated ? (
                <div className="relative group">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0A140F]/40 border border-emerald-500/20 cursor-pointer"
                  >
                    {user?.photoURL ? (
                      <img src={user.photoURL} alt="Profile" className="w-6 h-6 rounded-full border border-emerald-400/30" />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-bold text-emerald-300">
                        {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                      </div>
                    )}
                    <span className="text-emerald-100/80 text-xs font-medium max-w-[80px] truncate">
                      {user?.displayName?.split(' ')[0] || 'User'}
                    </span>
                  </motion.button>
                  
                  {/* Dropdown */}
                  <div className="absolute right-0 top-full mt-2 w-36 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top-right z-50">
                    <div className="glass-dark border border-emerald-500/20 rounded-xl py-1 shadow-xl">
                      <button 
                        onClick={() => {
                          import('../../features/auth/authSlice').then(m => dispatch(m.logoutUser()));
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-red-400 hover:bg-white/5 cursor-pointer bg-transparent border-none"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => onNavigate?.('login')}
                  className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 cursor-pointer border-none"
                >
                  Log In
                </motion.button>
              )}
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white p-2 rounded-lg hover:bg-[#0A140F]/10 transition-colors"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden glass-dark rounded-xl mt-2 p-4 max-w-7xl mx-auto"
          >
            <div className="flex flex-col gap-2">
              <MobileLink onClick={() => handleNavClick('home')}>Home</MobileLink>
              <MobileLink onClick={() => handleNavClick('about')}>About</MobileLink>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

function NavLink({ children, active, onClick }) {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      onClick={onClick}
      className={`text-sm font-medium cursor-pointer transition-colors bg-transparent border-none ${
        active
          ? 'text-emerald-400'
          : 'text-emerald-200/70 hover:text-white'
      }`}
    >
      {children}
    </motion.button>
  );
}

function MobileLink({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-left text-emerald-200/80 hover:text-white px-3 py-2 rounded-lg hover:bg-[#0A140F]/5 transition-all text-sm font-medium"
    >
      {children}
    </button>
  );
}
