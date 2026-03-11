import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

export default function TranslateWidget() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if script is already added
    if (document.getElementById('google-translate-script')) {
      setIsLoaded(true);
      return;
    }

    // Add Google Translate initialization script
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,bn,hi,te,ta,kn,ml,gu,mr,pa,ur', // Major Indian languages + English
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };

    // Load the script
    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.onload = () => setIsLoaded(true);
    document.body.appendChild(script);

    return () => {
      // Cleanup happens via page reload since Google Translate alters DOM heavily
    };
  }, []);

  return (
    <div className="relative group flex items-center">
      <div className="absolute inset-x-0 -inset-y-2" /> {/* Hover bridge */}
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer text-emerald-100"
      >
        <Globe className="w-4 h-4" />
        <span className="text-xs font-medium hidden sm:inline">Translate</span>
      </motion.div>

      {/* The actual translate dropdown (hidden until hovered/clicked) */}
      <div className="absolute right-0 top-full mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-2 rounded-xl glass-dark shadow-xl min-w-[150px]">
        <div className="text-xs text-emerald-200/60 mb-2 font-medium px-1">Select Language:</div>
        <div id="google_translate_element" className="translate-container" />
      </div>
    </div>
  );
}
