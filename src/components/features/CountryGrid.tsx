import React, { useState, useEffect } from 'react';
import { Globe2, ChevronLeft, ChevronRight } from 'lucide-react';
import CountryCard from './country/CountryCard';
import { POPULAR_EXCHANGES } from '../../constants/countries';
import { motion } from 'framer-motion';

export default function CountryGrid() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transition, setTransition] = useState(true);
  const itemsToShow = 4;
  const totalItems = POPULAR_EXCHANGES.length;
  
  // Sonsuz dövr üçün ilk 4 elementi sona əlavə et
  const slides = [...POPULAR_EXCHANGES, ...POPULAR_EXCHANGES.slice(0, 4)];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev >= totalItems) {
          setTransition(false);
          return 0;
        }
        setTransition(true);
        return prev + 1;
      });
    }, 8000);
    
    return () => clearInterval(interval);
  }, [totalItems]);

  // Transition-i yenidən aktivləşdir
  useEffect(() => {
    if (!transition) {
      const timeout = setTimeout(() => setTransition(true), 50);
      return () => clearTimeout(timeout);
    }
  }, [transition]);

  return (
    <div className="mt-12">
      <div className="flex items-center gap-2 mb-6">
        <Globe2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Most Popular Exchanges</h2>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="overflow-hidden mx-12">
          <div 
            className="flex gap-6"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
              transition: transition ? 'transform 0.6s ease-in-out' : 'none',
              width: '200%'
            }}
          >
            {slides.map((exchange, idx) => (
              <div
                key={`${exchange.country}-${idx}`}
                className="w-1/4 flex-shrink-0 px-3"
              >
                <CountryCard {...exchange} />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-110 transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>

        <button
          onClick={() => setCurrentIndex(prev => Math.min(totalItems, prev + 1))}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-110 transition-all"
        >
          <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </div>
  );
}