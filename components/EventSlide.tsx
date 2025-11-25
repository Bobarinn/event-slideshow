'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Event } from '@/data/events';

interface EventSlideProps {
  event: Event;
  index: number;
}

const difficultyColors = {
  1: {
    bg: 'bg-gradient-to-r from-emerald-500 to-teal-600',
    text: 'text-emerald-50',
    border: 'border-emerald-400',
    glow: 'shadow-emerald-500/50',
  },
  2: {
    bg: 'bg-gradient-to-r from-amber-500 to-orange-600',
    text: 'text-amber-50',
    border: 'border-amber-400',
    glow: 'shadow-amber-500/50',
  },
  3: {
    bg: 'bg-gradient-to-r from-rose-500 to-pink-600',
    text: 'text-rose-50',
    border: 'border-rose-400',
    glow: 'shadow-rose-500/50',
  },
};

const colorPalettes = [
  {
    primary: 'from-violet-600 via-purple-600 to-fuchsia-600',
    secondary: 'from-blue-500 to-cyan-500',
    accent: 'from-pink-500 to-rose-500',
  },
  {
    primary: 'from-indigo-600 via-blue-600 to-cyan-600',
    secondary: 'from-teal-500 to-emerald-500',
    accent: 'from-violet-500 to-purple-500',
  },
  {
    primary: 'from-orange-600 via-red-600 to-pink-600',
    secondary: 'from-amber-500 to-yellow-500',
    accent: 'from-rose-500 to-pink-500',
  },
  {
    primary: 'from-emerald-600 via-teal-600 to-cyan-600',
    secondary: 'from-green-500 to-emerald-500',
    accent: 'from-teal-500 to-cyan-500',
  },
  {
    primary: 'from-purple-600 via-pink-600 to-rose-600',
    secondary: 'from-fuchsia-500 to-pink-500',
    accent: 'from-violet-500 to-purple-500',
  },
];

export default function EventSlide({ event, index }: EventSlideProps) {
  const [mounted, setMounted] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const palette = colorPalettes[index % colorPalettes.length];
  const difficulty = difficultyColors[event.difficulty];
  const imagePath = `/event-images/${event.id}.jpg`;
  const imagePathPng = `/event-images/${event.id}.png`;

  useEffect(() => {
    setMounted(true);
    // Reset image state when event changes
    setImageError(false);
    setImageLoaded(false);
  }, [event.id]);

  // Check if image is already complete (cached) after render
  useEffect(() => {
    const checkImageComplete = () => {
      if (imgRef.current) {
        if (imgRef.current.complete && imgRef.current.naturalHeight !== 0) {
          setImageLoaded(true);
          setImageError(false);
        }
      }
    };

    // Check immediately
    checkImageComplete();
    
    // Also check after a short delay to catch images that load very quickly
    const timeout = setTimeout(checkImageComplete, 100);
    
    return () => clearTimeout(timeout);
  }, [event.id]);

  const slideVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      transition: {
        duration: 0.4,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1, rotate: -2 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        delay: 0.3,
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <motion.div
      key={event.id}
      variants={slideVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Animated Background Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${palette.primary} opacity-90`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]" />
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-8 md:px-16 lg:px-24 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 w-full items-center">
          {/* Left Side - Text Content */}
          <motion.div
            variants={contentVariants}
            className="space-y-6 lg:space-y-8 text-white"
          >
            {/* Event Number Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2"
            >
              <span className="text-6xl lg:text-8xl font-black opacity-20 leading-none">
                {String(event.id).padStart(2, '0')}
              </span>
            </motion.div>

            {/* Difficulty Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block"
            >
              <span
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${difficulty.bg} ${difficulty.text} border-2 ${difficulty.border} shadow-lg ${difficulty.glow}`}
              >
                {event.difficultyLabel}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight"
              style={{
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                background: `linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.9) 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {event.title}
            </motion.h1>

            {/* Duration if available */}
            {event.duration && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex items-center gap-2 text-white/80"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-lg font-medium">{event.duration}</span>
              </motion.div>
            )}

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-xl md:text-2xl leading-relaxed text-white/90 max-w-2xl"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}
            >
              {event.description}
            </motion.p>

            {/* Details List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="space-y-3 pt-4"
            >
              {event.details.map((detail, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + idx * 0.1, duration: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <div
                    className={`mt-2 w-2 h-2 rounded-full bg-gradient-to-r ${palette.accent} flex-shrink-0`}
                  />
                  <span className="text-lg md:text-xl text-white/80 leading-relaxed">
                    {detail}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            variants={imageVariants}
            className="relative w-full aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden shadow-2xl group"
            style={{
              boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)`,
            }}
          >
            {/* Image Container with Fallback */}
            <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900">
              {/* Image */}
              <img
                ref={imgRef}
                src={imagePathPng}
                alt={event.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:scale-110 ${
                  imageLoaded && !imageError ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => {
                  setImageLoaded(true);
                  setImageError(false);
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.includes('.jpg')) {
                    // Try JPG if PNG fails
                    target.src = imagePath;
                    target.onerror = () => {
                      setImageError(true);
                      setImageLoaded(false);
                    };
                  } else {
                    // Both failed
                    setImageError(true);
                    setImageLoaded(false);
                  }
                }}
                loading="eager"
              />
              
              {/* Placeholder when image is missing */}
              {imageError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
                  <div className="text-center p-8">
                    <svg
                      className="w-24 h-24 mx-auto mb-4 text-white/30"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-white/40 text-sm font-medium">
                      {event.id}.jpg or {event.id}.png
                    </p>
                  </div>
                </div>
              )}
              
              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent`}
              />
              
              {/* Decorative Corner Elements */}
              <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-white/20 rounded-tl-3xl" />
              <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-white/20 rounded-br-3xl" />
            </div>

            {/* Floating Badge on Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute top-6 right-6 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 shadow-lg"
            >
              <span className="text-white font-bold text-sm">
                Event #{event.id}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-pulse-slow" />
      
      {/* Floating Particles Effect */}
      {mounted && [...Array(6)].map((_, i) => {
        const randomX = Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920);
        const randomY = Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080);
        const randomDelay = Math.random() * 2;
        const randomDuration = 4 + Math.random() * 2;
        
        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            initial={{
              x: randomX,
              y: randomY,
              opacity: 0,
            }}
            animate={{
              y: randomY - 200,
              opacity: [0, 0.5, 0],
              scale: [1, 1.5, 0],
            }}
            transition={{
              duration: randomDuration,
              repeat: Infinity,
              delay: randomDelay,
              ease: 'easeOut',
            }}
          />
        );
      })}
    </motion.div>
  );
}

