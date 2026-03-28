import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { motion } from 'framer-motion';

export const Result = ({ score, total, onRestart }) => {
  const percentage = Math.round((score / total) * 100);
  let message = "";
  let colorClass = "";

  if (percentage >= 80) {
    message = "Outstanding Betaaaaa! 🏆";
    colorClass = "text-emerald-500";
  } else if (percentage >= 50) {
    message = "Good Job Betaa! 👍";
    colorClass = "text-indigo-500";
  } else {
    message = "Keep Practicing Betaa! 💪";
    colorClass = "text-orange-500";
  }

  useEffect(() => {
    if (percentage >= 50) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
      }, 250);

      return () => clearInterval(interval);
    }
  }, [percentage]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center justify-center min-h-[80vh] px-4"
    >
      <Card className="w-full max-w-lg p-10 text-center">
        <h2 className="text-4xl font-extrabold text-slate-800 mb-2">Quiz Complete!</h2>
        <p className="text-green-500 text-lg mb-8">Your Score Betaa</p>
        
        <div className="relative w-48 h-48 mx-auto mb-8">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96" cy="96" r="88"
              className="text-slate-100 stroke-current"
              strokeWidth="12" fill="transparent"
            />
            <motion.circle
              cx="96" cy="96" r="88"
              className={`${colorClass} stroke-current drop-shadow-md`}
              strokeWidth="12" fill="transparent"
              strokeDasharray={2 * Math.PI * 88}
              strokeDashoffset={2 * Math.PI * 88 * (1 - percentage / 100)}
              strokeLinecap="round"
              initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 88 * (1 - Math.max(0.01, percentage) / 100) }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
            <span className={`text-5xl font-black ${colorClass}`}>{score}</span>
            <span className="text-slate-400 font-bold text-xl border-t-2 border-slate-200 mt-1 pt-1 w-16">/ {total}</span>
          </div>
        </div>

        <h3 className={`text-3xl font-bold mb-8 ${colorClass}`}>{message}</h3>

        <Button onClick={onRestart} className="w-full py-4 text-xl">
          Click Here to Restart
        </Button>
      </Card>
    </motion.div>
  );
};
