'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import EventSlide from '@/components/EventSlide';
import GridView from '@/components/GridView';
import { events } from '@/data/events';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showGridView, setShowGridView] = useState(false);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't handle keys when grid view is open (except Escape)
      if (showGridView && e.key !== 'Escape') {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setCurrentIndex((prev) => (prev + 1) % events.length);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'Escape') {
        if (showGridView) {
          setShowGridView(false);
        } else if (isFullscreen) {
          exitFullscreen();
        }
      } else if (e.key === 'g' || e.key === 'G') {
        setShowGridView(true);
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [isFullscreen, showGridView]);

  // Handle mouse movement to show/hide controls
  useEffect(() => {
    if (showGridView) {
      setShowControls(true);
      return;
    }

    let timeoutId: NodeJS.Timeout;

    const handleMouseMove = () => {
      setShowControls(true);
      
      // Clear existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      // Set new timeout to hide controls after 5 seconds
      timeoutId = setTimeout(() => {
        setShowControls(false);
      }, 5000);
    };

    // Initial timeout to hide controls after 5 seconds
    timeoutId = setTimeout(() => {
      setShowControls(false);
    }, 5000);

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [showGridView]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const handleSlideClick = () => {
    setShowGridView(true);
  };

  const handleSelectSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <main
      className={`min-h-screen w-full overflow-hidden ${
        isFullscreen ? 'fullscreen' : ''
      }`}
    >
      {!showGridView && (
        <>
          <div className="relative">
            <div 
              onClick={handleSlideClick} 
              className="absolute inset-0 z-40 cursor-pointer"
              style={{ cursor: 'pointer' }}
              onMouseDown={(e) => {
                // Only open grid if clicking on the background, not on interactive elements
                const target = e.target as HTMLElement;
                if (target.tagName === 'BUTTON' || 
                    target.closest('button') || 
                    target.closest('[role="button"]') ||
                    target.closest('a')) {
                  e.stopPropagation();
                }
              }}
            />
            <EventSlide event={events[currentIndex]} index={currentIndex} />
            
            {/* Click Hint */}
            {/* <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="fixed top-8 left-8 z-50 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm border border-white/20 hover:bg-white/20 transition-all duration-300 pointer-events-none"
            >
              <div className="flex items-center gap-2">
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
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                </svg>
                <span>Click to view all • Press G</span>
              </div>
            </motion.div> */}
          </div>
          
          {/* Left Navigation Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: showControls ? 1 : 0,
              x: showControls ? 0 : -20
            }}
            transition={{ duration: 0.3 }}
            className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="px-6 py-3 bg-black/60 backdrop-blur-xl rounded-full text-white hover:bg-black/80 transition-all duration-300 border border-white/20 hover:border-white/40 hover:scale-110 active:scale-95 font-medium shadow-2xl"
              aria-label="Previous slide"
            >
              ← Prev
            </button>
          </motion.div>

          {/* Right Navigation Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ 
              opacity: showControls ? 1 : 0,
              x: showControls ? 0 : 20
            }}
            transition={{ duration: 0.3 }}
            className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-4"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="px-6 py-3 bg-black/60 backdrop-blur-xl rounded-full text-white hover:bg-black/80 transition-all duration-300 border border-white/20 hover:border-white/40 hover:scale-110 active:scale-95 font-medium shadow-2xl"
              aria-label="Next slide"
            >
              Next →
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowGridView(true);
              }}
              className="px-6 py-3 bg-black/60 backdrop-blur-xl rounded-full text-white hover:bg-black/80 transition-all duration-300 border border-white/20 hover:border-white/40 hover:scale-110 active:scale-95 font-medium shadow-2xl"
              aria-label="View all slides"
              title="View All Slides (G)"
            >
              Grid
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFullscreen();
              }}
              className="px-6 py-3 bg-black/60 backdrop-blur-xl rounded-full text-white hover:bg-black/80 transition-all duration-300 border border-white/20 hover:border-white/40 hover:scale-110 active:scale-95 text-xl shadow-2xl"
              aria-label="Toggle fullscreen"
              title={isFullscreen ? 'Exit Fullscreen (F)' : 'Enter Fullscreen (F)'}
            >
              {isFullscreen ? '⤓' : '⤢'}
            </button>
          </motion.div>

          {/* Bottom Center - Dots Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: showControls ? 1 : 0,
              y: showControls ? 0 : 20
            }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="px-6 py-3 bg-black/80 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl">
              <div className="flex gap-2 items-center">
                {events.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      goToSlide(idx);
                    }}
                    className={`rounded-full transition-all duration-300 ${
                      idx === currentIndex
                        ? 'bg-white w-8 h-3 shadow-lg'
                        : 'bg-white/40 hover:bg-white/60 w-3 h-3'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Slide Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showControls ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-8 right-8 z-50 px-4 py-2 bg-black/60 backdrop-blur-xl rounded-full text-white text-sm border border-white/20 shadow-2xl"
          >
            {currentIndex + 1} / {events.length}
          </motion.div>
        </>
      )}

      {/* Grid View */}
      {showGridView && (
        <GridView
          events={events}
          currentIndex={currentIndex}
          onSelectSlide={handleSelectSlide}
          onClose={() => setShowGridView(false)}
        />
      )}
    </main>
  );
}

