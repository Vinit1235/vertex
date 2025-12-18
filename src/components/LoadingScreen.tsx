import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('INITIALIZING');
  const [showIntro, setShowIntro] = useState(true);
  const [introText, setIntroText] = useState('');
  
  const introLines = [
    'November 6, 1983...',
    'A gate was opened.',
    'Between our world and the unknown.',
    'Now, something stirs.',
    'In February 2025...',
    'A new portal emerges.',
    'VORTEX awaits.',
  ];

  const loadingMessages = [
    'INITIALIZING PORTAL',
    'DETECTING ANOMALIES',
    'SYNCING WITH HAWKINS LAB',
    'MAPPING UPSIDE DOWN',
    'CALIBRATING PSYCHIC ENERGY',
    'ESTABLISHING CONNECTION',
    'POWERING UP',
    'WELCOME TO VORTEX'
  ];

  // Cinematic Intro
  useEffect(() => {
    if (!showIntro) return;
    
    let lineIndex = 0;
    let charIndex = 0;
    
    const typeWriter = setInterval(() => {
      if (lineIndex < introLines.length) {
        const currentLine = introLines[lineIndex];
        if (charIndex <= currentLine.length) {
          setIntroText(currentLine.slice(0, charIndex));
          charIndex++;
        } else {
          // Pause between lines
          setTimeout(() => {
            lineIndex++;
            charIndex = 0;
            setIntroText('');
          }, 800);
        }
      } else {
        clearInterval(typeWriter);
        setTimeout(() => setShowIntro(false), 500);
      }
    }, 80);

    return () => clearInterval(typeWriter);
  }, [showIntro]);

  // Loading Progress
  useEffect(() => {
    if (showIntro) return;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete, showIntro]);

  useEffect(() => {
    if (showIntro) return;
    
    const messageIndex = Math.min(
      Math.floor(progress / (100 / loadingMessages.length)),
      loadingMessages.length - 1
    );
    setLoadingText(loadingMessages[messageIndex]);
  }, [progress, showIntro]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Stars Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Red Particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`red-${i}`}
          className="absolute w-1 h-1 bg-red-500 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            opacity: 0
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 2, 0],
            y: [null, Math.random() * -200],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      <AnimatePresence mode="wait">
        {showIntro ? (
          /* Cinematic Intro */
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center px-8"
          >
            {/* VHS Effect Lines */}
            <div className="fixed inset-0 pointer-events-none opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
              }} />
            </div>

            {/* Intro Text */}
            <motion.p
              className="font-retro text-2xl md:text-4xl text-red-500 min-h-[3rem]"
              style={{
                textShadow: '0 0 10px #FF0000, 0 0 20px #FF0000',
              }}
            >
              {introText}
              <span className="animate-pulse">|</span>
            </motion.p>

            {/* Skip Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              onClick={() => setShowIntro(false)}
              className="mt-8 text-gray-600 text-sm hover:text-gray-400 transition-colors"
            >
              Press any key to skip
            </motion.button>
          </motion.div>
        ) : (
          /* Loading Screen */
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            {/* Portal Animation */}
            <motion.div
              className="relative w-48 h-48 mb-12 mx-auto"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              {/* Outer Ring */}
              <div className="absolute inset-0 rounded-full border-4 border-red-900/50 animate-pulse" />
              
              {/* Middle Ring */}
              <motion.div
                className="absolute inset-4 rounded-full border-2 border-red-600/50"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Inner Glow */}
              <div className="absolute inset-8 rounded-full bg-gradient-to-r from-red-600 to-red-900 opacity-50 blur-xl animate-pulse" />
              <div className="absolute inset-12 rounded-full bg-gradient-to-r from-red-500 to-red-800 opacity-70 blur-lg" />
              
              {/* Core */}
              <div className="absolute inset-16 rounded-full bg-black flex items-center justify-center">
                <motion.span 
                  className="stranger-title text-4xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  V
                </motion.span>
              </div>

              {/* Orbiting Particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-red-500 rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                  }}
                  animate={{
                    x: Math.cos((i * Math.PI * 2) / 8 + Date.now() / 1000) * 80,
                    y: Math.sin((i * Math.PI * 2) / 8 + Date.now() / 1000) * 80,
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              ))}
            </motion.div>

            {/* Title */}
            <motion.h1
              className="stranger-title text-5xl md:text-7xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              VORTEX
            </motion.h1>

            {/* Loading Bar Container */}
            <div className="w-72 md:w-96 mx-auto mb-4">
              {/* Track */}
              <div className="h-3 bg-gray-900 rounded-full overflow-hidden border border-red-900/30">
                {/* Progress Fill */}
                <motion.div
                  className="h-full rounded-full relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(90deg, #8B0000, #FF0000, #FF4444, #FF0000, #8B0000)',
                    backgroundSize: '200% 100%',
                  }}
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${progress}%`,
                    backgroundPosition: ['0% 50%', '100% 50%'],
                  }}
                  transition={{
                    backgroundPosition: {
                      duration: 1,
                      repeat: Infinity,
                      ease: 'linear',
                    }
                  }}
                >
                  {/* Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.div>
              </div>
              
              {/* Percentage */}
              <div className="flex justify-between mt-2 text-xs">
                <span className="text-gray-600 font-retro">PORTAL SYNC</span>
                <span className="text-red-500 font-retro">{progress}%</span>
              </div>
            </div>

            {/* Loading Text */}
            <motion.p
              key={loadingText}
              className="font-retro text-red-400 text-lg tracking-widest"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {loadingText}
              <span className="animate-pulse">...</span>
            </motion.p>

            {/* Easter Egg Hint */}
            <motion.p
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-800 font-retro text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 2 }}
            >
              ↑↑↓↓←→←→BA • Friends don't lie
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
