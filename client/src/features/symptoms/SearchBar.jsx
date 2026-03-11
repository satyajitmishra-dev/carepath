import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { setSymptomText, addChip, removeChip, setChips, setError } from './symptomsSlice';
import { analyzeSymptoms } from '../analysis/analysisSlice';
import { incrementGuestConsultation } from '../auth/authSlice';
import { validateSymptomInput, parseSymptoms } from '../../utils/haversine';
import { useGeolocation } from '../../hooks/useGeolocation';
import VoiceInput from '../../components/ui/VoiceInput';
import toast from 'react-hot-toast';

const EXAMPLE_SYMPTOMS = [
  'headache, fever, stiff neck',
  'chest pain, shortness of breath',
  'itchy skin rash, mild fever',
  'knee pain, swelling, difficulty walking',
  'sore throat, ear pain, congestion',
  'stomach pain, vomiting, bloating',
];

export default function SearchBar() {
  const dispatch = useDispatch();
  const { symptomText, symptomChips, error } = useSelector((state) => state.symptoms);
  const { isLoading } = useSelector((state) => state.analysis);
  const { detectLocation } = useGeolocation();
  const inputRef = useRef(null);
  const submitLockRef = useRef(false);
  const [isFocused, setIsFocused] = useState(false);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setCharCount(symptomText.length);
  }, [symptomText]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length <= 500) {
      dispatch(setSymptomText(value));
      dispatch(setError(null));

      // auto-detect chips on comma or semicolon
      if (value.endsWith(',') || value.endsWith(';')) {
        const chips = parseSymptoms(value);
        dispatch(setChips(chips));
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
    if (e.key === ',' || e.key === ';') {
      const chips = parseSymptoms(symptomText + e.key);
      dispatch(setChips(chips));
    }
  };

  const handleSubmit = async () => {
    if (submitLockRef.current || isLoading) {
      return;
    }

    const currentText = symptomText.trim();
    const validation = validateSymptomInput(currentText);
    if (!validation.valid) {
      dispatch(setError(validation.error));
      toast.error(validation.error);
      return;
    }

    // Parse final chips
    const finalChips = parseSymptoms(currentText);
    if (finalChips.length > 0) {
      dispatch(setChips(finalChips));
    }

    // Detect location and analyze simultaneously
    submitLockRef.current = true;
    detectLocation();

    try {
      await dispatch(analyzeSymptoms(currentText)).unwrap();
      dispatch(setSymptomText('')); // Clear input after successful analysis
      dispatch(setChips([])); // Clear chips after successful analysis
      dispatch(setError(null)); // Clear any previous errors
    } catch (err) {
      const errorMessage = err?.message || 'AI Analysis failed. Please try again or check your connection.';
      dispatch(setError(errorMessage));
      toast.error(errorMessage, {
        style: { background: '#0A140F', color: '#E8F8F2', border: '1px solid rgba(239, 68, 68, 0.4)' }
      });
    } finally {
      submitLockRef.current = false;
    }
  };

  const handleExampleClick = (example) => {
    dispatch(setSymptomText(example));
    const chips = parseSymptoms(example);
    dispatch(setChips(chips));
    inputRef.current?.focus();
  };

  const handleRemoveChip = (index) => {
    dispatch(removeChip(index));
    const remaining = symptomChips.filter((_, i) => i !== index);
    dispatch(setSymptomText(remaining.join(', ')));
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Main search container */}
      <motion.div
        layout
        className={`glass-input p-2 ${isFocused ? 'shadow-xl shadow-emerald-500/10' : ''} ${error ? '!border-red-400' : ''}`}
      >
        {/* Symptom chips */}
        <AnimatePresence mode="popLayout">
          {symptomChips.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-wrap gap-1.5 px-2 pt-1 pb-2"
            >
              {symptomChips.map((chip, i) => (
                <motion.span
                  key={chip + i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-emerald-900/40 text-emerald-300 border border-emerald-500/30/60"
                >
                  {chip}
                  <button
                    onClick={() => handleRemoveChip(i)}
                    className="ml-0.5 hover:bg-emerald-200/50 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input row */}
        <div className="flex items-center gap-2 px-2">
          <Search className={'w-5 h-5 shrink-0 transition-colors ' + (isFocused ? 'text-emerald' : 'text-emerald-100/40')} />
          <input
            ref={inputRef}
            type="text"
            value={symptomText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Describe your symptoms... e.g. headache, fever, chest pain"
            disabled={isLoading}
            className="flex-1 bg-transparent outline-none text-[#E8F8F2] placeholder:text-emerald-100/40 text-base py-2.5 font-medium disabled:opacity-50"
            id="symptom-input"
          />

          {/* Character counter */}
          <span className={'text-[11px] font-mono tabular-nums shrink-0 ' + (charCount > 450 ? 'text-amber-500' : 'text-emerald-100/40')}>
            {charCount}/500
          </span>

          {/* Voice input */}
          <VoiceInput />

          {/* Submit button */}
          <motion.button
            onClick={handleSubmit}
            disabled={isLoading || !symptomText.trim()}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn-ripple gradient-primary text-white font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20 cursor-pointer shrink-0"
            id="find-specialist-btn"
          >
            {isLoading ? (
              <motion.div
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span className="hidden sm:inline">Find My Specialist</span>
                <ArrowRight className="w-4 h-4 sm:hidden" />
              </>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex items-center gap-2 mt-2 px-3 py-2 bg-red-50 border border-red-200 rounded-lg"
          >
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span className="text-red-600 text-sm">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Example symptoms */}
      <div className="mt-5">
        <p className="text-xs text-emerald-100/50 font-medium mb-2 px-1">💡 Try an example:</p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_SYMPTOMS.map((example) => (
            <motion.button
              key={example}
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleExampleClick(example)}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#0A140F]/80 border border-emerald-500/20 text-emerald-300 hover:bg-emerald-900/40 hover:border-emerald-300 transition-all cursor-pointer shadow-sm backdrop-blur-sm"
            >
              {example}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
