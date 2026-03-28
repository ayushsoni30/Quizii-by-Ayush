import React from 'react';
import { Card } from './ui/Card';
import { decodeHtml } from '../utils/helpers';
import { motion } from 'framer-motion';

export const QuestionCard = ({
  question,
  options,
  selectedAnswer,
  correctAnswer,
  onSelectOption
}) => {
  return (
    <Card className="w-full max-w-2xl mx-auto p-6 md:p-8">
      <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 text-center leading-relaxed">
        {decodeHtml(question)}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option, index) => {
          let stateClass = "bg-white border-slate-200 text-slate-700 hover:bg-slate-50";
          if (selectedAnswer) {
            if (option === correctAnswer) {
              stateClass = "bg-emerald-500 border-emerald-500 text-white shadow-md"; //  correct answer in green
            } else if (option === selectedAnswer) {
              stateClass = "bg-red-500 border-red-500 text-white shadow-md"; //  selected answer in red if it was wrong
            } else {
              stateClass = "bg-slate-100 border-slate-200 text-slate-400 opacity-50"; // Dim others
            }
          }

          return (
            <motion.button
              key={index}
              disabled={!!selectedAnswer}
              onClick={() => onSelectOption(option)}
              whileHover={{ scale: selectedAnswer ? 1 : 1.02 }}
              whileTap={{ scale: selectedAnswer ? 1 : 0.98 }}
              className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all duration-200 flex items-center ${stateClass}`}
            >
              <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center mr-3 font-bold">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="flex-1">{decodeHtml(option)}</span>
            </motion.button>
          );
        })}
      </div>
    </Card>
  );
};
