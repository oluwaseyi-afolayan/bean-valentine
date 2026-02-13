'use client';

import { useState, useCallback, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import IntroScreen from '@/components/IntroScreen';
import QuizQuestion, { Question } from '@/components/QuizQuestion';
import ReactionScreen from '@/components/ReactionScreen';
import FinalScreen from '@/components/FinalScreen';
import FloatingHearts from '@/components/FloatingHearts';
import MusicPlayer, { MusicPlayerRef } from '@/components/MusicPlayer';

const questions: Question[] = [
  {
    id: 1,
    question: 'What year did we first meet?',
    options: ['2022', '2023', '2024', '2025'],
    correctAnswer: '2024',
  },
  {
    id: 2,
    question: "What's my favorite movie?",
    options: [
      '10 things I hate about you',
      'Avengers: Infinity War',
      '500 Days of Summer',
      'Pride and Prejudice',
    ],
    correctAnswer: '10 things I hate about you',
  },
  {
    id: 3,
    question: 'What are the only things I can keep alive?',
    options: ['Succulents', 'Cacti', 'Efo', 'An argument'],
    correctAnswer: 'Cacti',
  },
  {
    id: 4,
    question: "Who's my favorite City player?",
    options: ['Kevin De Bruyne', 'Erling Haaland', 'Phil Foden', 'John Stones'],
    correctAnswer: 'Phil Foden',
  },
  {
    id: 5,
    question: "When's our anniversary?",
    options: ['July 15th', 'July 31st', 'August 1st', 'June 30th'],
    correctAnswer: 'July 31st',
  },
];

type Screen = 'intro' | 'quiz' | 'reaction' | 'final';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const musicPlayerRef = useRef<MusicPlayerRef>(null);

  const handleEnableAudio = useCallback(() => {
    // Start music when user clicks the intro button
    if (musicPlayerRef.current) {
      musicPlayerRef.current.play();
    }
  }, []);

  const handleStart = useCallback(() => {
    setCurrentScreen('quiz');
  }, []);

  const handleAnswer = useCallback((answer: string) => {
    const correct = answer === questions[currentQuestionIndex].correctAnswer;
    setIsCorrect(correct);
    setCurrentScreen('reaction');
  }, [currentQuestionIndex]);

  const handleContinue = useCallback(() => {
    if (isCorrect) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setCurrentScreen('quiz');
      } else {
        setCurrentScreen('final');
      }
    } else {
      setCurrentScreen('quiz');
    }
  }, [isCorrect, currentQuestionIndex]);

  const handleValentineAccepted = useCallback(() => {
    // Already handled in FinalScreen component
  }, []);

  return (
    <main className="relative">
      <FloatingHearts count={20} />
      <MusicPlayer ref={musicPlayerRef} videoId="3sur4BmjQt8" />
      
      <AnimatePresence mode="wait">
        {currentScreen === 'intro' && (
          <IntroScreen 
            key="intro" 
            onStart={handleStart}
            onEnableAudio={handleEnableAudio}
          />
        )}
        
        {currentScreen === 'quiz' && (
          <QuizQuestion
            key={`quiz-${currentQuestionIndex}`}
            question={questions[currentQuestionIndex]}
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
          />
        )}
        
        {currentScreen === 'reaction' && (
          <ReactionScreen
            key="reaction"
            isCorrect={isCorrect}
            onContinue={handleContinue}
          />
        )}
        
        {currentScreen === 'final' && (
          <FinalScreen key="final" onYes={handleValentineAccepted} />
        )}
      </AnimatePresence>
    </main>
  );
}