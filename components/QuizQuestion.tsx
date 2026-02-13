'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuizQuestionProps {
  question: Question;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (answer: string) => void;
}

export default function QuizQuestion({
  question,
  currentQuestion,
  totalQuestions,
  onAnswer,
}: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleSubmit = () => {
    if (selectedAnswer) {
      onAnswer(selectedAnswer);
      setSelectedAnswer(null);
    }
  };

  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card max-w-2xl w-full">
        <div className="mb-6">
          <p className="text-center text-lg mb-2 text-[var(--text-light)]">
            Question {currentQuestion} of {totalQuestions}
          </p>
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <motion.h2
          className="text-2xl md:text-3xl mb-8 text-center font-playfair"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {question.question}
        </motion.h2>

        <div className="space-y-3 mb-8">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              className={`quiz-option ${selectedAnswer === option ? 'selected' : ''}`}
              onClick={() => setSelectedAnswer(option)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {option}
            </motion.button>
          ))}
        </div>

        <motion.button
          className="btn-primary w-full"
          onClick={handleSubmit}
          disabled={!selectedAnswer}
          whileHover={selectedAnswer ? { scale: 1.02 } : {}}
          whileTap={selectedAnswer ? { scale: 0.98 } : {}}
        >
          Submit Answer
        </motion.button>
      </div>
    </motion.div>
  );
}
