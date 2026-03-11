import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useState } from 'react';

const FAQ_DATA = [
  {
    q: 'Is CarePath a replacement for a doctor?',
    a: 'Absolutely not. CarePath is a navigation tool that helps you identify which type of specialist to consult. It does not provide medical diagnoses or treatment recommendations.',
  },
  {
    q: 'How accurate is the AI analysis?',
    a: 'Our AI uses Google\'s Gemini model to analyze symptoms and suggest the most relevant specialist type. While highly informed, it is not a substitute for professional medical judgment.',
  },
  {
    q: 'Is my health data stored?',
    a: 'No. CarePath does not store, log, or transmit your symptom data. All analysis happens in real-time and nothing is saved after your session.',
  },
  {
    q: 'How does the affordable filter work?',
    a: 'The affordable filter shows only clinics with consultation fees under ₹500, making it easier for students and budget-conscious patients to find quality care.',
  },
  {
    q: 'Can I use this on mobile?',
    a: 'Yes! CarePath is fully responsive and works beautifully on phones, tablets, and desktops. Location detection works best on mobile devices.',
  },
  {
    q: 'Which cities are supported?',
    a: 'Currently, our clinic database covers the Kolkata metropolitan area. We plan to expand to other cities in future versions.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-16 px-4" id="faq">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-xs font-semibold text-blue-700 mb-4">
            <HelpCircle className="w-3 h-3" />
            Common Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F8F2] tracking-tight">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {FAQ_DATA.map(({ q, a }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.06 }}
            >
              <div
                className={`glass-card overflow-hidden transition-all duration-300 ${
                  openIndex === i ? 'border-emerald-500/30 shadow-md shadow-emerald-500/5' : ''
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left cursor-pointer bg-transparent border-none"
                >
                  <span className="font-semibold text-[#E8F8F2] text-sm pr-4">{q}</span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0"
                  >
                    <ChevronDown className="w-4 h-4 text-emerald-300" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-4 pb-4">
                        <div className="h-px bg-emerald-100 mb-3" />
                        <p className="text-emerald-100/50 text-sm leading-relaxed">{a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
