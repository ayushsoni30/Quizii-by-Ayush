import React from 'react';
import { motion } from 'framer-motion';

export const ProgressBar = ({ current, total }) => {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
      <motion.div
        className="bg-indigo-600 h-3 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
};
