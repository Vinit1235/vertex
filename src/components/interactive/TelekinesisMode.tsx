import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface Position {
  x: number;
  y: number;
}

interface Target {
  id: number;
  x: number;
  y: number;
  scale: number;
}

export default function TelekinesisMode() {
  const { isUpsideDown, unlockAchievement } = useTheme();
  const [isActive, setIsActive] = useState(false);
  const [mousePos, setMousePos] = useState<Position>({ x: 0, y: 0 });
  const [draggedObject, setDraggedObject] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [targets, setTargets] = useState<Target[]>([]);
  const [showRings, setShowRings] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate random targets
  useEffect(() => {
    if (isActive) {
      const newTargets: Target[] = [];
      for (let i = 0; i < 5; i++) {
        newTargets.push({
          id: i,
          x: Math.random() * (window.innerWidth - 100) + 50,
          y: Math.random() * (window.innerHeight - 200) + 100,
          scale: 1,
        });
      }
      setTargets(newTargets);
    }
  }, [isActive]);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    if (isActive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isActive]);

  // Handle object drag
  const handleObjectClick = (id: number) => {
    if (!isActive) return;
    
    setDraggedObject(id);
    setShowRings(true);
    
    setTimeout(() => {
      setShowRings(false);
      setDraggedObject(null);
      
      // Remove target and add score
      setTargets(prev => prev.filter(t => t.id !== id));
      setScore(prev => {
        const newScore = prev + 100;
        if (newScore >= 500) {
          unlockAchievement('Psychic Master');
        }
        return newScore;
      });
    }, 1000);
  };

  if (!isUpsideDown) return null;

  return (
    <>
      {/* Activation Button */}
      <motion.button
        onClick={() => setIsActive(!isActive)}
        className={`fixed bottom-24 right-4 z-50 px-4 py-2 rounded-full glass-dark ${
          isActive ? 'ring-2 ring-pink-500' : ''
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="text-pink-400 font-retro text-sm">
          {isActive ? '🧠 ACTIVE' : '🧠 ELEVEN MODE'}
        </span>
      </motion.button>

      {/* Game Overlay */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 pointer-events-none"
          >
            {/* Score */}
            <div className="absolute top-24 right-4 glass-dark rounded-lg px-4 py-2">
              <span className="text-pink-400 font-retro">SCORE: {score}</span>
            </div>

            {/* Instructions */}
            <div className="absolute top-24 left-4 glass-dark rounded-lg px-4 py-2">
              <span className="text-gray-400 font-retro text-sm">Click objects to move them</span>
            </div>

            {/* Targets */}
            {targets.map(target => (
              <motion.div
                key={target.id}
                className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 cursor-pointer pointer-events-auto flex items-center justify-center"
                style={{ left: target.x, top: target.y }}
                animate={draggedObject === target.id ? {
                  x: mousePos.x - target.x - 24,
                  y: mousePos.y - target.y - 24,
                  scale: 0,
                  opacity: 0,
                } : {
                  scale: [1, 1.1, 1],
                }}
                transition={draggedObject === target.id ? {
                  duration: 1,
                } : {
                  duration: 2,
                  repeat: Infinity,
                }}
                onClick={() => handleObjectClick(target.id)}
                whileHover={{ scale: 1.2 }}
              >
                <span className="text-2xl">⬡</span>
              </motion.div>
            ))}

            {/* Psychic Rings */}
            <AnimatePresence>
              {showRings && (
                <motion.div
                  className="fixed pointer-events-none"
                  style={{ left: mousePos.x - 100, top: mousePos.y - 100 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {[1, 2, 3].map(i => (
                    <motion.div
                      key={i}
                      className="absolute w-[200px] h-[200px] rounded-full border-2 border-pink-500"
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 2 + i * 0.5, opacity: 0 }}
                      transition={{ duration: 1, delay: i * 0.2 }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cursor Trail */}
            {isActive && (
              <motion.div
                className="fixed w-4 h-4 rounded-full bg-pink-500 pointer-events-none"
                style={{
                  left: mousePos.x - 8,
                  top: mousePos.y - 8,
                  boxShadow: '0 0 20px #FF1493, 0 0 40px #FF1493',
                }}
                animate={{
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
