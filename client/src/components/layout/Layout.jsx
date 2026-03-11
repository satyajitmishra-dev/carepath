import Navbar from './Navbar';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';
import EmergencyWidget from '../ui/EmergencyWidget';

export default function Layout({ children, onNavigate, currentPage }) {
  return (
    <div data-theme="carepath" className="min-h-screen flex flex-col relative">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#013220',
            color: '#D1F2EB',
            border: '1px solid rgba(80, 200, 120, 0.2)',
            borderRadius: '12px',
            fontSize: '14px',
            fontFamily: 'Inter, sans-serif',
          },
          success: { iconTheme: { primary: '#50C878', secondary: '#fff' } },
          error: { iconTheme: { primary: '#DC2626', secondary: '#fff' } },
        }}
      />
      <Navbar onNavigate={onNavigate} currentPage={currentPage} />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <EmergencyWidget />
      <Footer />
    </div>
  );
}
