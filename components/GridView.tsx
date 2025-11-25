'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Event } from '@/data/events';

interface GridViewProps {
  events: Event[];
  currentIndex: number;
  onSelectSlide: (index: number) => void;
  onClose: () => void;
}

type SortOption = 'index' | 'alphabetical' | 'difficulty';
type SortOrder = 'asc' | 'desc';

export default function GridView({
  events,
  currentIndex,
  onSelectSlide,
  onClose,
}: GridViewProps) {
  const [sortBy, setSortBy] = useState<SortOption>('index');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const sortedEvents = useMemo(() => {
    const eventsWithIndex = events.map((event, index) => ({ event, index }));
    
    let sorted = [...eventsWithIndex];

    switch (sortBy) {
      case 'index':
        sorted.sort((a, b) => {
          return sortOrder === 'asc' ? a.index - b.index : b.index - a.index;
        });
        break;
      case 'alphabetical':
        sorted.sort((a, b) => {
          const comparison = a.event.title.localeCompare(b.event.title);
          return sortOrder === 'asc' ? comparison : -comparison;
        });
        break;
      case 'difficulty':
        sorted.sort((a, b) => {
          const comparison = a.event.difficulty - b.event.difficulty;
          return sortOrder === 'asc' ? comparison : -comparison;
        });
        break;
    }

    return sorted;
  }, [events, sortBy, sortOrder]);

  const difficultyColors = {
    1: {
      bg: 'bg-gradient-to-r from-emerald-500 to-teal-600',
      text: 'text-emerald-50',
    },
    2: {
      bg: 'bg-gradient-to-r from-amber-500 to-orange-600',
      text: 'text-amber-50',
    },
    3: {
      bg: 'bg-gradient-to-r from-rose-500 to-pink-600',
      text: 'text-rose-50',
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        {/* Header with Controls */}
        <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              {/* Title */}
              <div className="flex items-center gap-4">
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40"
                  aria-label="Close grid view"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <h1 className="text-3xl md:text-4xl font-black text-white">
                  All Events
                </h1>
                <span className="text-white/60 text-sm">
                  {events.length} events
                </span>
              </div>

              {/* Sort Controls */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Sort By */}
                <div className="flex items-center gap-2">
                  <label className="text-white/80 text-sm font-medium">
                    Sort by:
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg text-white border border-white/20 hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 cursor-pointer"
                  >
                    <option value="index">Index</option>
                    <option value="alphabetical">Alphabetical</option>
                    <option value="difficulty">Difficulty</option>
                  </select>
                </div>

                {/* Sort Order */}
                <button
                  onClick={() =>
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                  }
                  className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg text-white border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center gap-2"
                  aria-label={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
                >
                  {sortOrder === 'asc' ? (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                      Ascending
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                      Descending
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Container */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {sortedEvents.map(({ event, index }) => {
              const difficulty = difficultyColors[event.difficulty];
              const imagePath = `/event-images/${event.id}.jpg`;
              const imagePathPng = `/event-images/${event.id}.png`;
              const isCurrent = index === currentIndex;

              return (
                <motion.button
                  key={`${event.id}-${index}`}
                  variants={itemVariants}
                  onClick={() => {
                    onSelectSlide(index);
                    onClose();
                  }}
                  className={`relative group text-left focus:outline-none focus:ring-2 focus:ring-white/50 rounded-2xl overflow-hidden transition-all duration-300 ${
                    isCurrent
                      ? 'ring-4 ring-white/50 shadow-2xl scale-[1.02]'
                      : 'hover:scale-[1.02] hover:shadow-2xl'
                  }`}
                  aria-label={`View ${event.title}`}
                >
                  {/* Image Container */}
                  <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                    <img
                      src={imagePath}
                      alt={event.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (!target.src.includes('.png')) {
                          target.src = imagePathPng;
                          target.onerror = () => {
                            target.style.display = 'none';
                          };
                        } else {
                          target.style.display = 'none';
                        }
                      }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                    {/* Current Indicator */}
                    {isCurrent && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-4 left-4 z-20 px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 backdrop-blur-md rounded-full border border-white/30 shadow-lg"
                      >
                        <span className="text-white text-xs font-bold">
                          Current
                        </span>
                      </motion.div>
                    )}

                    {/* Event Number */}
                    <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/20">
                      <span className="text-white text-sm font-bold">
                        #{event.id}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 to-transparent z-10">
                    <h3 className="text-white font-bold text-lg mb-1 line-clamp-2 group-hover:text-white transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-white/70 text-sm line-clamp-2 mb-3">
                      {event.description}
                    </p>
                    
                    {/* Difficulty Badge - Moved here to be above content */}
                    <div className="relative z-20 inline-block">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${difficulty.bg} ${difficulty.text} shadow-lg`}
                      >
                        {event.difficultyLabel}
                      </span>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-300" />
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        {/* Footer */}
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <p className="text-white/40 text-sm mb-2">
            Click on any event to view it in the slideshow
          </p>
          <p className="text-white/30 text-xs">
            Press ESC or click outside to close
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

