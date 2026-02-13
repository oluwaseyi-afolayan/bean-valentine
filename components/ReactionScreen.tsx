'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface ReactionScreenProps {
  isCorrect: boolean;
  onContinue: () => void;
}

const correctMessages = [
  "Yes! You're daddy's girl",
  'Oouuu you want me baddd',
  'Good Girl ;)',
  'Yesss! Love you',
  'Type Shit Princess',
];

const wrongMessages = [
  'Ehn?? Try again',
  'Enipe?!',
  'Haaaa Wahala de!!!',
  'Cynthia Ofori',
  'Why do you hate me?',
];

const correctEmojis = ['😌', '💕', '✨', '😈', '🥴', '🌟'];
const wrongEmojis = ['😪', '🙂', '😐', '💔', '😭', '😕'];

export default function ReactionScreen({
  isCorrect,
  onContinue,
}: ReactionScreenProps) {
  // Memoize random selections to prevent changes on re-renders
  const { message, emoji } = useMemo(() => {
    const messages = isCorrect ? correctMessages : wrongMessages;
    const emojis = isCorrect ? correctEmojis : wrongEmojis;
    return {
      message: messages[Math.floor(Math.random() * messages.length)],
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    };
  }, [isCorrect]);

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="card text-center max-w-lg"
        style={{
          background: isCorrect
            ? 'rgba(255, 245, 247, 0.95)'
            : 'rgba(255, 255, 255, 0.95)',
        }}
      >
        <motion.div
          className="text-8xl mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          {emoji}
        </motion.div>

        <motion.h2
          className={`text-3xl md:text-4xl mb-8 font-playfair ${
            isCorrect ? 'text-red-warm' : 'text-[var(--text-dark)]'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {message}
        </motion.h2>

        <motion.button
          className={isCorrect ? 'btn-primary' : 'btn-secondary'}
          onClick={onContinue}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isCorrect ? 'Next Question' : 'Try Again'}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
