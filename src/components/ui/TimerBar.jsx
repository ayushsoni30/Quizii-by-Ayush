import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const TimerBar = ({ duration, onTimeout, active, resetKey }) => {
  // We don't necessarily need internal state for exact smooth width if Framer Motion handles it,
  // but we need a tick to call onTimeout. 
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration, resetKey]);

  useEffect(() => {
    if (!active || timeLeft <= 0) {
      if (active && timeLeft <= 0) {
        onTimeout();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 0.1);
    }, 100); // Check every 100ms for smoother warning color transitions

    return () => clearInterval(timer);
  }, [active, timeLeft, onTimeout]);

  const percentage = Math.max(0, (timeLeft / duration) * 100);
  const isDanger = timeLeft <= 3.5;

  return (
    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mt-2">
      <motion.div
        className={`h-full rounded-full ${isDanger ? 'bg-red-500' : 'bg-emerald-500'}`}
        initial={{ width: '100%' }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.1, ease: 'linear' }}
      />
    </div>
  );
};
