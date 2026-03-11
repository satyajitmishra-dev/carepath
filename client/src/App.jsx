import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LoadingPage from './pages/LoadingPage';
import ResultsPage from './pages/ResultsPage';
import AboutPage from './pages/AboutPage';
import EmergencyWidget from './components/ui/EmergencyWidget';
import ScrollToTop from './components/ui/ScrollToTop';

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
};

export default function App() {
  const { activeScreen } = useSelector((state) => state.analysis);
  const [currentPage, setCurrentPage] = useState('app'); // 'app' | 'about'

  const showApp = currentPage === 'app';

  return (
    <Layout onNavigate={setCurrentPage} currentPage={currentPage}>
      <AnimatePresence mode="wait">
        {!showApp && currentPage === 'about' && (
          <motion.div key="about" {...pageTransition}>
            <AboutPage />
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
      <EmergencyWidget />
      <ScrollToTop />
    </Layout>
  );
}
