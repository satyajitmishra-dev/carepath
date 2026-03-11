import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const TESTIMONIALS = [
  {
    text: '"I had a persistent headache for weeks and didn\'t know who to see. CarePath told me to visit a Neurologist — turns out I needed one!"',
    name: 'Priya S.',
    location: 'Kolkata',
    rating: 5,
    avatar: '👩‍💼',
  },
  {
    text: '"My mother had stomach issues and we kept visiting the wrong doctors. This app saved us time and money by pointing us to a Gastroenterologist."',
    name: 'Rahul M.',
    location: 'Howrah',
    rating: 5,
    avatar: '👨‍💻',
  },
  {
    text: '"The affordable clinic filter is a game-changer for students like me. Found a great doctor under ₹300 within 2km!"',
    name: 'Ananya D.',
    location: 'Salt Lake',
    rating: 5,
    avatar: '👩‍🎓',
  },
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.25 },
  }),
};

export default function Testimonials() {
  const [[currentIndex, direction], setSlide] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  const paginate = useCallback((newDirection) => {
    setSlide(([prev]) => {
      const next = (prev + newDirection + TESTIMONIALS.length) % TESTIMONIALS.length;
      return [next, newDirection];
    });
  }, []);

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(timer);
  }, [isPaused, paginate]);

  const { text, name, location, rating, avatar } = TESTIMONIALS[currentIndex];

  return (
    <section className="py-16 px-4" id="testimonials">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-xs font-semibold text-amber-700 mb-4">
            ⭐ What Users Say
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#E8F8F2] tracking-tight">
            Trusted by <span className="gradient-text">Real People</span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative max-w-xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Nav Arrows */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-12 z-20 w-9 h-9 rounded-full bg-[#0A140F]/60 border border-emerald-500/20 backdrop-blur-md flex items-center justify-center text-emerald-300 hover:text-white hover:border-emerald-400/50 transition-all cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-12 z-20 w-9 h-9 rounded-full bg-[#0A140F]/60 border border-emerald-500/20 backdrop-blur-md flex items-center justify-center text-emerald-300 hover:text-white hover:border-emerald-400/50 transition-all cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Card container */}
          <div className="overflow-hidden relative min-h-[220px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="glass-card p-6 sm:p-8 card-hover relative group"
              >
                {/* Quote icon */}
                <Quote className="absolute top-4 right-4 w-8 h-8 text-emerald-100 group-hover:text-emerald-200 transition-colors" />

                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: rating }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-emerald-100/70 text-sm sm:text-base leading-relaxed mb-5 relative z-10">
                  {text}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-3 border-t border-gray-100/10">
                  <span className="text-2xl">{avatar}</span>
                  <div>
                    <p className="font-bold text-[#E8F8F2] text-sm">{name}</p>
                    <p className="text-emerald-100/40 text-[11px]">{location}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide([i, i > currentIndex ? 1 : -1])}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer border-none ${
                  i === currentIndex
                    ? 'w-6 h-2 bg-emerald-400'
                    : 'w-2 h-2 bg-emerald-400/30 hover:bg-emerald-400/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
