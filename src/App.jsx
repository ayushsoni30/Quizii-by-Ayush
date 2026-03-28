import React, { useState } from 'react';
import { Home } from './pages/Home';
import { Quiz } from './pages/Quiz';
import { Result } from './pages/Result';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [gameState, setGameState] = useState('HOME');
  const [quizSettings, setQuizSettings] = useState({ categoryId: null, amount: 10 });
  const [score, setScore] = useState(0);

  const handleStart = (settings) => {
    setQuizSettings(settings);
    setGameState('QUIZ');
  };

  const handleFinish = (finalScore) => {
    setScore(finalScore);
    setGameState('RESULT');
  };

  const handleCancel = () => {
    setGameState('HOME');
  };

  const handleRestart = () => {
    setGameState('HOME');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8 selection:bg-indigo-100 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {gameState === 'HOME' && (
          <Home key="home" onStart={handleStart} />
        )}
        {gameState === 'QUIZ' && (
          <Quiz 
            key="quiz" 
            categoryId={quizSettings.categoryId} 
            amount={quizSettings.amount} 
            onFinish={handleFinish}
            onCancel={handleCancel}
          />
        )}
        {gameState === 'RESULT' && (
          <Result 
            key="result" 
            score={score} 
            total={quizSettings.amount} 
            onRestart={handleRestart} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
