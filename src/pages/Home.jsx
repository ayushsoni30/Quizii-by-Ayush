import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../services/api';
import { Button } from '../components/ui/Button';
import { CategoryCard } from '../components/CategoryCard';
import { motion } from 'framer-motion';

export const Home = ({ onStart }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories().then(data => {
      setCategories(data);
      setLoading(false);
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[80vh] px-4"
    >
      <div className="text-center mb-10 mt-8 ">
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 mb-4 pb-2">
          QUIZII<sub className="text-black text-xl">by Ayush</sub>
        </h1>
        <p className="text-slate-500 text-lg md:text-xl">Select a category to start the ultimate challenge!</p>
      </div>

      {loading ? (
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full mb-10 overflow-y-auto max-h-[50vh] p-4 custom-scrollbar">
            <CategoryCard
              category={{ id: null, name: "Any Category" }}
              selected={selectedCategory === null}
              onSelect={setSelectedCategory}
            />
            {categories.map(cat => (
              <CategoryCard
                key={cat.id}
                category={cat}
                selected={selectedCategory === cat.id}
                onSelect={setSelectedCategory}
              />
            ))}
          </div>

          <Button
            onClick={() => onStart({ categoryId: selectedCategory, amount: 10 })}
            className="w-full md:w-auto md:px-16 py-4 text-xl shadow-xl shadow-indigo-200"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
           Start Quiz
          </Button>
        </>
      )}
    </motion.div>
  );
};
