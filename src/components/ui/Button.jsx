import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false, ...props }) => {
  const baseStyle = "px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md",
    secondary: "bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-md",
    success: "bg-green-500 text-white hover:bg-green-600 shadow-md",
    outline: "bg-transparent text-slate-700 border border-slate-300 hover:bg-slate-50",
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseStyle} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
};
