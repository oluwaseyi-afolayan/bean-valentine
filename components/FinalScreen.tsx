'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from '@/hooks/useWindowSize';

interface FinalScreenProps {
  onYes: () => void;
}

export default function FinalScreen({ onYes }: FinalScreenProps) {
  const [showConfetti, setShowConfetti] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleYes = () => {
    setShowMessage(true);
    setShowConfetti(true);
    onYes();
  };

  if (showMessage) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {showConfetti && (
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={500}
            colors={['#ffc9d9', '#ffb3c6', '#ff8fab', '#ff6b9d', '#fff5f7']}
          />
        )}
        <motion.div
          className="card text-center max-w-2xl glow"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          <motion.div
            className="text-7xl mb-6"
            animate={{ rotate: [0, 10, -10, 10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
          >
            🫰
          </motion.div>
          
          <motion.h1
            className="text-4xl md:text-5xl mb-6 font-playfair text-red-warm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            We're locked in... Woot Woot!
          </motion.h1>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={200}
          colors={['#ffc9d9', '#ffb3c6', '#ff8fab', '#ff6b9d', '#fff5f7']}
        />
      )}
      
      <motion.div
        className="card text-center max-w-2xl glow"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <motion.div
          className="text-8xl mb-8 pulse"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
        >
          💝
        </motion.div>

        <motion.h1
          className="text-4xl md:text-5xl mb-8 font-playfair text-red-warm"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Will you be my Valentine?
        </motion.h1>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.button
            className="btn-primary text-xl px-8 py-4"
            onClick={handleYes}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Yes
          </motion.button>

          <motion.button
            className="btn-primary text-xl px-8 py-4"
            onClick={handleYes}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Obviously yes
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
