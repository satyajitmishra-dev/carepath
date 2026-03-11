import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithGoogle } from '../features/auth/authSlice';
import toast from 'react-hot-toast';

export default function SignupPage({ onNavigate }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailSignup = (e) => {
    e.preventDefault();
    toast('Email signup coming soon! Please use Google to create an account.', {
      icon: '🔐',
      style: { background: '#0A140F', color: '#E8F8F2', border: '1px solid rgba(80, 200, 120, 0.2)' }
    });
  };

  const handleGoogleSignup = async () => {
    const resultAction = await dispatch(loginWithGoogle());
    if (loginWithGoogle.fulfilled.match(resultAction)) {
      onNavigate('app');
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center p-4">
      <div className="absolute inset-0 gradient-mesh" />
      <div className="blob blob-2" />
      <div className="blob blob-1" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-dark p-8 sm:p-10 !rounded-3xl shadow-2xl relative overflow-hidden">
          {/* Subtle shine effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-transparent opacity-50" />
          
          <div className="relative z-10">
            <div className="flex justify-center mb-8">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 bg-[#0A140F] border border-emerald-500/20">
                <img src="/logo.png" alt="CarePath" className="w-14 h-14 object-cover scale-110 drop-shadow-md" />
              </div>
            </div>

            <h2 className="text-3xl font-extrabold text-[#E8F8F2] text-center mb-2 tracking-tight">
              Create Account
            </h2>
            <p className="text-emerald-100/50 text-sm text-center mb-8 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Your data is completely private
            </p>

            <button
              onClick={handleGoogleSignup}
              disabled={loading}
              className="w-full relative group overflow-hidden bg-white hover:bg-gray-50 text-gray-900 font-bold text-sm py-3.5 px-4 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed mb-6 shadow-md flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {loading ? 'Connecting...' : 'Sign up with Google'}
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="h-px bg-emerald-500/10 flex-1" />
              <span className="text-emerald-100/30 text-xs font-medium uppercase tracking-widest">or email</span>
              <div className="h-px bg-emerald-500/10 flex-1" />
            </div>

            <form onSubmit={handleEmailSignup} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-100/40" />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full bg-[#0A140F]/60 border border-emerald-500/20 text-[#E8F8F2] placeholder:text-emerald-100/30 text-sm rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all font-medium"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-100/40" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full bg-[#0A140F]/60 border border-emerald-500/20 text-[#E8F8F2] placeholder:text-emerald-100/30 text-sm rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-100/40" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-[#0A140F]/60 border border-emerald-500/20 text-[#E8F8F2] placeholder:text-emerald-100/30 text-sm rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full relative group overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-sm py-3.5 px-4 rounded-xl hover:from-emerald-400 hover:to-teal-500 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 mt-2"
              >
                Create Account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <p className="text-center text-emerald-100/50 text-xs mt-8">
              Already have an account?{' '}
              <button onClick={() => onNavigate('login')} className="text-emerald-400 font-bold hover:underline bg-transparent border-none cursor-pointer">
                Sign in
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
