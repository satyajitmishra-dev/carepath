import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp, ThumbsDown, MessageSquareHeart } from 'lucide-react';
import { useState } from 'react';

export default function PostVisitFeedback() {
  const [hasVoted, setHasVoted] = useState(false);
  const [voteType, setVoteType] = useState(null); // 'up' | 'down'

  const handleVote = (type) => {
    setVoteType(type);
    setHasVoted(true);
    // In a real app, this would send an API request to log the feedback
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="mt-8 mb-4 max-w-2xl mx-auto w-full"
    >
      <div className="glass-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-emerald-100/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
            <MessageSquareHeart className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <h4 className="font-bold text-evergreen text-sm">Was this recommendation helpful?</h4>
            <p className="text-xs text-gray-500 mt-0.5">Your feedback improves our AI engine.</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!hasVoted ? (
            <motion.div
              key="voting"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="flex items-center gap-2"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleVote('up')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                <ThumbsUp className="w-4 h-4" /> Yes
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleVote('down')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <ThumbsDown className="w-4 h-4" /> No
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="thank-you"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="px-4 py-2 rounded-xl bg-emerald-100/50 text-emerald-700 text-sm font-bold flex items-center gap-2"
            >
              🎉 Thank you for your feedback!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
