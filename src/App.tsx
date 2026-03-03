/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles,
  RotateCcw,
  Wand2
} from 'lucide-react';

const CATEGORIES = [
  { id: 'science', name: 'Science' },
  { id: 'arts', name: 'Arts' },
  { id: 'literature', name: 'Literature' },
  { id: 'capitals', name: 'Capitals' },
  { id: 'surprise', name: 'Surprise' },
  { id: 'history_geo', name: 'History & Geography' },
  { id: 'visuals', name: 'Visuals' },
  { id: 'current_affairs', name: 'Current Affairs' },
];

const TEAMS = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTeam, setActiveTeam] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [usedCategories, setUsedCategories] = useState<Set<string>>(new Set());
  const [usedTeams, setUsedTeams] = useState<Set<string>>(new Set());
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isExhausted, setIsExhausted] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleCrystalBallClick = () => {
    if (isSpinning || isExhausted) return;
    
    const availableCategories = CATEGORIES.filter(c => !usedCategories.has(c.id));
    const availableTeams = TEAMS.filter(t => !usedTeams.has(t));

    if (availableCategories.length === 0 || availableTeams.length === 0) {
      setIsExhausted(true);
      return;
    }

    setIsSpinning(true);
    setSelectedCategory(null);
    setActiveTeam(null);

    // Simulate a selection process
    setTimeout(() => {
      const randomCategory = availableCategories[Math.floor(Math.random() * availableCategories.length)];
      const randomTeam = availableTeams[Math.floor(Math.random() * availableTeams.length)];
      
      setSelectedCategory(randomCategory.id);
      setActiveTeam(randomTeam);
      
      setUsedCategories(prev => new Set(prev).add(randomCategory.id));
      setUsedTeams(prev => new Set(prev).add(randomTeam));
      
      setIsSpinning(false);

      // Check if exhausted for next turn
      if (availableCategories.length <= 1 || availableTeams.length <= 1) {
        setIsExhausted(true);
      }
    }, 2000);
  };

  const resetGame = () => {
    setUsedCategories(new Set());
    setUsedTeams(new Set());
    setSelectedCategory(null);
    setActiveTeam(null);
    setIsExhausted(false);
    setIsSpinning(false);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans overflow-hidden cursor-none relative">
      {/* Vibrant Merging and Intersecting Gradient Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Dark Base */}
        <div className="absolute inset-0 bg-[#020617]" />
        
        {/* Intersecting Blobs: Vibrant Purples and Blues */}
        <motion.div 
          animate={{ 
            x: ['-25%', '25%', '-25%'],
            y: ['-25%', '25%', '-25%'],
            scale: [1, 1.5, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(167,139,250,0.5)_0%,transparent_60%)] blur-[100px]"
        />
        <motion.div 
          animate={{ 
            x: ['25%', '-25%', '25%'],
            y: ['25%', '-25%', '25%'],
            scale: [1.5, 1, 1.5]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(126,34,206,0.6)_0%,transparent_60%)] blur-[100px]"
        />
        <motion.div 
          animate={{ 
            x: ['-25%', '25%', '-25%'],
            y: ['25%', '-25%', '25%'],
            scale: [1.2, 0.8, 1.2]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.5)_0%,transparent_60%)] blur-[100px]"
        />
        <motion.div 
          animate={{ 
            x: ['25%', '-25%', '25%'],
            y: ['-25%', '25%', '-25%'],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(29,78,216,0.6)_0%,transparent_60%)] blur-[100px]"
        />
        
        {/* Subtle Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>

      {/* Persistent Glitter Layer */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: Math.random(),
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{ 
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_8px_white]"
          />
        ))}
      </div>

      {/* Heading: Simon Says! */}
      <div className="fixed top-12 left-0 w-full flex flex-col items-center z-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <h1 className="text-6xl md:text-8xl font-serif italic font-bold tracking-tighter bg-gradient-to-b from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(129,140,248,0.5)]">
            Simon Says!
          </h1>
          {/* Glitter around heading */}
          <div className="absolute -inset-12">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 1.5 + Math.random(),
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
                className="absolute"
                style={{
                  top: Math.random() * 100 + '%',
                  left: Math.random() * 100 + '%',
                }}
              >
                <Sparkles className="w-5 h-5 text-cyan-300" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Magic Wand (Follows Cursor) */}
      <motion.div 
        className="fixed pointer-events-none z-50"
        animate={{ 
          x: mousePos.x - 10, 
          y: mousePos.y - 10,
          rotate: isSpinning ? [0, 45, 0] : 0
        }}
        transition={{ 
          type: "spring", 
          damping: 25, 
          stiffness: 250,
          rotate: isSpinning ? { repeat: Infinity, duration: 0.5 } : { duration: 0.2 }
        }}
      >
        <div className="relative">
          <Wand2 className="w-12 h-12 text-indigo-400 drop-shadow-[0_0_15px_rgba(129,140,248,0.8)]" />
          <motion.div 
            animate={{ opacity: isSpinning ? [0, 1, 0] : 0 }}
            transition={{ repeat: Infinity, duration: 0.3 }}
            className="absolute top-0 right-0"
          >
            <Sparkles className="w-6 h-6 text-cyan-300" />
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content: Crystal Ball */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="relative group cursor-none" onClick={handleCrystalBallClick}>
          {/* Outer Glow */}
          <motion.div 
            animate={{ 
              scale: isSpinning ? [1, 1.2, 1] : 1,
              opacity: isSpinning ? [0.5, 0.8, 0.5] : 0.5
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full"
          />
          
          {/* The Crystal Ball */}
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotate: isSpinning ? 360 : 0
            }}
            transition={{ 
              y: { repeat: Infinity, duration: 5, ease: "easeInOut" },
              rotate: isSpinning ? { repeat: Infinity, duration: 1, ease: "linear" } : { duration: 0.5 }
            }}
            className="relative w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-white/20 via-white/5 to-black border border-white/30 backdrop-blur-md overflow-hidden shadow-[0_0_50px_rgba(99,102,241,0.2)] flex items-center justify-center"
          >
            {/* Internal Swirls */}
            <div className="absolute inset-0 opacity-40">
              <div className="absolute top-0 left-0 w-full h-full bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.2),transparent)] animate-[spin_12s_linear_infinite]" />
              <div className="absolute top-0 left-0 w-full h-full bg-[conic-gradient(from_180deg,transparent,rgba(99,102,241,0.2),transparent)] animate-[spin_18s_linear_infinite_reverse]" />
            </div>

            {/* Content Display */}
            <AnimatePresence mode="wait">
              {isSpinning ? (
                <motion.div
                  key="spinning"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  className="flex flex-col items-center"
                >
                  <Sparkles className="w-16 h-16 text-indigo-400 animate-pulse" />
                </motion.div>
              ) : selectedCategory ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center text-center px-8"
                >
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-indigo-400 text-xs uppercase tracking-[0.4em] mb-4 font-bold"
                  >
                    The Oracle Speaks
                  </motion.div>
                  <div className="text-4xl md:text-5xl font-serif italic mb-6 leading-tight">
                    {CATEGORIES.find(c => c.id === selectedCategory)?.name}
                  </div>
                  {activeTeam && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.4 }}
                      className="bg-white/10 px-6 py-2 rounded-full border border-white/20 text-lg font-mono tracking-widest"
                    >
                      TEAM {activeTeam}
                    </motion.div>
                  )}
                </motion.div>
              ) : isExhausted ? (
                <motion.div
                  key="exhausted"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center px-8"
                >
                  <p className="text-white/40 text-sm uppercase tracking-widest mb-4">
                    All paths have been explored
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center px-12"
                >
                  <p className="text-white/30 text-sm uppercase tracking-[0.3em] leading-relaxed animate-pulse">
                    Wield the wand to reveal your fate
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Glass Reflections */}
            <div className="absolute top-[10%] left-[20%] w-[25%] h-[15%] bg-white/30 blur-xl rounded-full rotate-[-45deg]" />
            <div className="absolute bottom-[10%] right-[20%] w-[15%] h-[8%] bg-white/10 blur-lg rounded-full" />
          </motion.div>
        </div>

        {/* Control Panel */}
        <div className="mt-12 flex flex-col items-center gap-6">
          {!isSpinning && !isExhausted && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCrystalBallClick}
              className="px-12 py-4 bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/50 rounded-full text-indigo-400 uppercase tracking-[0.3em] font-bold transition-all shadow-[0_0_20px_rgba(99,102,241,0.2)] cursor-none"
            >
              Decide
            </motion.button>
          )}
          
          {isExhausted && !isSpinning && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="px-12 py-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full text-white/60 uppercase tracking-[0.3em] font-bold transition-all cursor-none"
            >
              Reset Oracle
            </motion.button>
          )}
        </div>

        {/* Status Indicators (Subtle) */}
        <div className="mt-12 flex gap-8 opacity-20 hover:opacity-100 transition-opacity duration-500">
          <div className="text-[10px] uppercase tracking-widest">
            Used: {usedCategories.size} / {CATEGORIES.length} Categories
          </div>
          <div className="text-[10px] uppercase tracking-widest">
            Used: {usedTeams.size} / {TEAMS.length} Teams
          </div>
        </div>
      </main>

      {/* Custom Cursor Hint */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 opacity-20 text-[10px] uppercase tracking-[0.5em] pointer-events-none">
        Simon Oracle v2.0
      </div>
    </div>
  );
}
