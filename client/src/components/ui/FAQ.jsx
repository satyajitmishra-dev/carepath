import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQ_DATA = [
  {
    q: 'Is CarePath a replacement for a doctor?',
    a: 'Absolutely not. CarePath is a navigation tool that helps you identify which type of specialist to consult. It does not provide medical diagnoses or treatment recommendations.',
  },
  {
    q: 'How accurate is the AI analysis?',
    a: 'Our AI uses Llama 3.1 to analyze symptoms and suggest the most relevant specialist type. While highly informed, it is not a substitute for professional medical judgment.',
  },
  {
    q: 'Is my health data stored?',
    a: 'No. CarePath does not store, log, or transmit your symptom data. All analysis happens in real-time and nothing is persisted after your session ends.',
  },
  {
    q: 'How does the affordable filter work?',
    a: 'The affordable filter shows only clinics with consultation fees under ₹500, making it easier for students and budget-conscious patients to find quality care.',
  },
  {
    q: 'Can I use this on mobile?',
    a: 'Yes! CarePath is fully responsive and installable as a PWA for quick home-screen access. Location detection works best on mobile.',
  },
  {
    q: 'Which cities are supported?',
    a: 'Currently our clinic database covers the Kolkata metropolitan area. We plan to expand to more cities in future releases.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-32 px-6 relative overflow-hidden" id="faq" ref={ref}>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-blue-400/15 to-transparent" />

      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <div className="inline-block px-3 py-1 rounded-full mb-6 text-[11px] font-bold tracking-[0.2em] uppercase"
            style={{
              background: 'rgba(0, 20, 60, 0.5)',
              border: '1px solid rgba(96,165,250,0.18)',
              color: 'rgba(96,165,250,0.65)',
              backdropFilter: 'blur(12px)',
            }}>
            FAQ
          </div>
          <h2
            className="text-5xl sm:text-6xl font-bold tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif", color: '#fff' }}
          >
            Common <span className="gradient-text">Questions</span>
          </h2>
        </motion.div>

        {/* Items */}
        <div className="space-y-2">
          {FAQ_DATA.map(({ q, a }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.06 + i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: open === i ? 'rgba(4, 50, 28, 0.35)' : 'rgba(255,255,255,0.018)',
                  border: open === i ? '1px solid rgba(52,211,153,0.18)' : '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer bg-transparent border-none gap-4"
                >
                  <span
                    className="font-semibold text-sm leading-snug transition-colors duration-200"
                    style={{ color: open === i ? '#fff' : 'rgba(255,255,255,0.55)', fontFamily: "'Inter', sans-serif" }}
                  >
                    {q}
                  </span>
                  <motion.div
                    animate={{ rotate: open === i ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0"
                  >
                    <ChevronDown
                      className="w-4 h-4 transition-colors duration-200"
                      style={{ color: open === i ? 'rgba(52,211,153,0.9)' : 'rgba(255,255,255,0.18)' }}
                    />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-6">
                        <div className="h-px mb-4" style={{ background: 'rgba(52,211,153,0.1)' }} />
                        <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>{a}</p>
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
