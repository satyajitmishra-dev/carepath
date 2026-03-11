import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { auth } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser, setAuthLoading } from './features/auth/authSlice';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LoadingPage from './pages/LoadingPage';
import ResultsPage from './pages/ResultsPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import EmergencyWidget from './components/ui/EmergencyWidget';
import ScrollToTop from './components/ui/ScrollToTop';
import toast from 'react-hot-toast';

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
};

export default function App() {
  const dispatch = useDispatch();
  const { activeScreen } = useSelector((state) => state.analysis);
  const { isAuthenticated, guestConsultations } = useSelector((state) => state.auth);
  
  const [currentPage, setCurrentPage] = useState('app'); // 'app' | 'about' | 'login' | 'signup'

  // Global Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(setUser({
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
        }));
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  // Protected route logic interceptor for the symptom analyzer
  useEffect(() => {
    if (currentPage === 'app' && activeScreen !== 'home' && !isAuthenticated) {
      if (guestConsultations >= 1) {
        toast('Create a free account to continue your healthcare journey 🌿', {
          icon: '✨',
          duration: 5000,
          style: { background: '#0A140F', color: '#E8F8F2', border: '1px solid rgba(80, 200, 120, 0.2)' }
        });
        setCurrentPage('login');
      }
    }
  }, [currentPage, activeScreen, isAuthenticated, guestConsultations]);

  const showApp = currentPage === 'app';

  return (
    <Layout onNavigate={setCurrentPage} currentPage={currentPage}>
      <AnimatePresence mode="wait">
        {!showApp && currentPage === 'about' && (
          <motion.div key="about" {...pageTransition}>
            <AboutPage />
          </motion.div>
        )}
        {!showApp && currentPage === 'login' && (
          <motion.div key="login" {...pageTransition}>
            <LoginPage onNavigate={setCurrentPage} />
          </motion.div>
        )}
        {!showApp && currentPage === 'signup' && (
          <motion.div key="signup" {...pageTransition}>
            <SignupPage onNavigate={setCurrentPage} />
          </motion.div>
        )}

        {showApp && activeScreen === 'home' && (
          <motion.div key="home" {...pageTransition}>
            <HomePage />
          </motion.div>
        )}
        {showApp && activeScreen === 'loading' && (
          <motion.div key="loading" {...pageTransition}>
            <LoadingPage />
          </motion.div>
        )}
        {showApp && activeScreen === 'results' && (
          <motion.div key="results" {...pageTransition}>
            <ResultsPage />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating widgets */}
      {currentPage !== 'login' && currentPage !== 'signup' && (
        <>
          <EmergencyWidget />
          <ScrollToTop />
        </>
      )}
    </Layout>
  );
}
