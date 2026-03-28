import React, { useState, useEffect } from 'react';
import { fetchQuestions } from '../services/api';
import { shuffleArray, playSound } from '../utils/helpers';
import { QuestionCard } from '../components/QuestionCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { TimerBar } from '../components/ui/TimerBar';
import { motion, AnimatePresence } from 'framer-motion';

export const Quiz = ({ categoryId, amount, onFinish, onCancel }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timerActive, setTimerActive] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchQuestions(amount, categoryId)
      .then(data => {
        setQuestions(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [amount, categoryId]);

  useEffect(() => {
    if (questions.length > 0 && currentIndex < questions.length) {
      const q = questions[currentIndex];
      setOptions(shuffleArray([...q.incorrect_answers, q.correct_answer]));
      setSelectedAnswer(null);
      setTimerActive(true);
    }
  }, [currentIndex, questions]);

  const handleTimeout = () => {
    handleAnswer('', true); // empty answer implies wrong
  };

  const handleAnswer = (answer, isTimeout = false) => {
    if (selectedAnswer !== null) return; // prevent double clicks

    setTimerActive(false);
    setSelectedAnswer(isTimeout ? '[TIMEOUT]' : answer);
    
    const correctAns = questions[currentIndex].correct_answer;
    const isCorrect = answer === correctAns;

    if (isCorrect) {
      setScore(prev => prev + 1);
      playSound('correct');
    } else {
      playSound('wrong');
    }

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        onFinish(score + (isCorrect ? 1 : 0), questions.length);
      }
    }, 2000); // Wait 2s showing the correct answer before next question
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
      <p className="text-slate-500 font-medium animate-pulse">Summoning questions...</p>
    </div>
  );
  
  if (error) return (
    <div className="text-center mt-20 flex flex-col items-center justify-center min-h-[60vh]">
      <p className="text-red-500 text-xl font-bold mb-6 bg-red-50 py-4 px-8 rounded-2xl">{error}</p>
      <button onClick={onCancel} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg transition-all font-semibold">Return Home</button>
    </div>
  );

  const currentQ = questions[currentIndex];
  const isTimeoutState = selectedAnswer === '[TIMEOUT]';

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <span className="font-bold text-slate-700 bg-slate-100 px-4 py-2 rounded-lg">
          Question {currentIndex + 1} <span className="text-slate-400 font-normal">/ {questions.length}</span>
        </span>
        <div className="flex items-center gap-6">
           <span className="font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg">
             Score: {score}
           </span>
           <button onClick={onCancel} className="text-slate-400 hover:text-red-500 font-medium transition-colors">
             Quit
           </button>
        </div>
      </div>
      
      <ProgressBar current={currentIndex} total={questions.length} />
      
      <AnimatePresence mode="wait">
        <motion.div
           key={currentIndex}
           initial={{ opacity: 0, x: 50 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -50 }}
           transition={{ duration: 0.3 }}
        >
          {isTimeoutState && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-4 text-orange-500 font-bold text-xl"
            >
              Time's up! ⏰
            </motion.div>
          )}

          {selectedAnswer && !isTimeoutState && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-center mb-4 font-bold text-xl ${selectedAnswer === currentQ.correct_answer ? 'text-emerald-500' : 'text-red-500'}`}
            >
              {selectedAnswer === currentQ.correct_answer ? 'Correct! 🎉 You nailed it!' : 'Wrong Answer ❌'}
            </motion.div>
          )}

          <QuestionCard
            question={currentQ.question}
            options={options}
            selectedAnswer={selectedAnswer === '[TIMEOUT]' ? '' : selectedAnswer}
            correctAnswer={currentQ.correct_answer}
            onSelectOption={handleAnswer}
          />
          <TimerBar
            duration={15}
            active={timerActive}
            resetKey={currentIndex}
            onTimeout={handleTimeout}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
