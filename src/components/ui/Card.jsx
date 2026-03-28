import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({ children, className = '', animate = true }) => {
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20 } : false}
      animate={animate ? { opacity: 1, y: 0 } : false}
      exit={animate ? { opacity: 0, scale: 0.95 } : false}
      className={`bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 ${className}`}
    >
      {children}
    </motion.div>
  );
};
