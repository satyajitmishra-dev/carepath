import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

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

export default function Testimonials() {
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-evergreen tracking-tight">
            Trusted by <span className="gradient-text">Real People</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map(({ text, name, location, rating, avatar }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.12, type: 'spring', stiffness: 200 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-card p-5 card-hover relative group"
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
              <p className="text-gray-600 text-sm leading-relaxed mb-4 relative z-10">
                {text}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                <span className="text-2xl">{avatar}</span>
                <div>
                  <p className="font-bold text-evergreen text-sm">{name}</p>
                  <p className="text-gray-400 text-[11px]">{location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
