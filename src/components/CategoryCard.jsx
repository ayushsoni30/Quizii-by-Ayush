import React from 'react';
import { motion } from 'framer-motion';

export const CategoryCard = ({ category, onSelect, selected }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onSelect(category.id)}
      className={`p-6 rounded-2xl cursor-pointer transition-colors border shadow-sm text-center
        ${selected ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-800 hover:border-indigo-300'}`}
    >
      <h3 className="font-semibold text-lg">{category.name}</h3>
    </motion.div>
  );
};
