import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { useState, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setSymptomText } from '../../features/symptoms/symptomsSlice';
import toast from 'react-hot-toast';

export default function VoiceInput() {
  const dispatch = useDispatch();
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(
    typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)
  );
  const recognitionRef = useRef(null);

  const startListening = useCallback(() => {
    if (!isSupported) {
      toast.error('Voice input is not supported in this browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-IN';

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      dispatch(setSymptomText(transcript));
      toast.success('Voice captured!', { icon: '🎙️' });
    };

    recognition.onerror = (event) => {
      console.error('Speech error:', event.error);
      if (event.error === 'not-allowed') {
        toast.error('Microphone access denied');
      } else {
        toast.error('Voice input failed. Try again.');
      }
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
  }, [dispatch, isSupported]);

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  if (!isSupported) return null;

  return (
    <motion.button
      type="button"
      onClick={isListening ? stopListening : startListening}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer border-none ${
        isListening
          ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
          : 'bg-emerald-900/40 text-emerald-300 hover:bg-emerald-100'
      }`}
      title={isListening ? 'Stop listening' : 'Speak your symptoms'}
    >
      <AnimatePresence mode="wait">
        {isListening ? (
          <motion.div key="listening" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            <MicOff className="w-4 h-4" />
          </motion.div>
        ) : (
          <motion.div key="idle" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            <Mic className="w-4 h-4" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulsing ring when listening */}
      {isListening && (
        <motion.div
          className="absolute inset-0 rounded-xl border-2 border-red-400"
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
}
