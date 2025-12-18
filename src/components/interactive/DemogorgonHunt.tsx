import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Target, Crosshair } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface Demogorgon {
  id: number;
  x: number;
  y: number;
  health: number;
  speed: number;
}

export default function DemogorgonHunt() {
  const { unlockAchievement, addSecret } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [demogorgons, setDemogorgons] = useState<Demogorgon[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    spawnDemogorgon();

    // Timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Spawn new demogorgons
    const spawner = setInterval(() => {
      if (timeLeft > 0) {
        spawnDemogorgon();
      } else {
        clearInterval(spawner);
      }
    }, 2000);
  };

  const spawnDemogorgon = () => {
    const newDemogorgon: Demogorgon = {
      id: Date.now(),
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20,
      health: 1,
      speed: Math.random() * 2 + 1,
    };
    setDemogorgons(prev => [...prev, newDemogorgon]);

    // Auto-remove after 3 seconds if not killed
    setTimeout(() => {
      setDemogorgons(prev => prev.filter(d => d.id !== newDemogorgon.id));
    }, 3000);
  };

  const killDemogorgon = (id: number) => {
    setDemogorgons(prev => prev.filter(d => d.id !== id));
    setScore(prev => {
      const newScore = prev + 100;
      if (newScore >= 500) unlockAchievement('Demogorgon Slayer');
      if (newScore >= 1000) addSecret();
      return newScore;
    });
  };

  const endGame = () => {
    setGameOver(true);
    setIsPlaying(false);
    setDemogorgons([]);
    if (score > highScore) {
      setHighScore(score);
    }
  };

  return (
    <>
      {/* Game Button */}
      <motion.button
        onClick={() => setIsPlaying(true)}
        className="fixed bottom-36 right-6 z-40 px-4 py-2 rounded-full glass-dark flex items-center gap-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Target size={18} className="text-red-500" />
        <span className="text-gray-300 font-retro text-sm">HUNT</span>
      </motion.button>

      {/* Game Modal */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/95 cursor-crosshair"
            style={{ cursor: 'crosshair' }}
          >
            {/* Close Button */}
            <button
              onClick={() => { setIsPlaying(false); setDemogorgons([]); }}
              className="absolute top-4 right-4 z-10 p-2 glass rounded-full"
            >
              <X size={24} className="text-white" />
            </button>

            {/* HUD */}
            <div className="absolute top-4 left-4 flex gap-6">
              <div className="glass-dark rounded-lg px-4 py-2">
                <span className="text-red-500 font-retro">SCORE: {score}</span>
              </div>
              <div className="glass-dark rounded-lg px-4 py-2">
                <span className="text-yellow-500 font-retro">TIME: {timeLeft}s</span>
              </div>
              <div className="glass-dark rounded-lg px-4 py-2">
                <span className="text-gray-400 font-retro">HIGH: {highScore}</span>
              </div>
            </div>

            {/* Instructions */}
            {!gameOver && demogorgons.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  onClick={startGame}
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <p className="stranger-title text-4xl mb-4">DEMOGORGON HUNT</p>
                  <p className="text-gray-400 mb-6">Click to eliminate the Demogorgons!</p>
                  <span className="neon-button">START GAME</span>
                </motion.button>
              </div>
            )}

            {/* Demogorgons */}
            {demogorgons.map(demo => (
              <motion.div
                key={demo.id}
                className="absolute cursor-pointer"
                style={{ left: `${demo.x}%`, top: `${demo.y}%` }}
                initial={{ scale: 0, rotate: 0 }}
                animate={{ 
                  scale: [0, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                exit={{ scale: 0, rotate: 180 }}
                onClick={() => killDemogorgon(demo.id)}
                whileHover={{ scale: 1.2 }}
              >
                {/* Demogorgon Visual */}
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 bg-red-900/50 rounded-full blur-xl animate-pulse" />
                  <div className="relative w-full h-full flex items-center justify-center text-6xl">
                    🌸
                  </div>
                  {/* Petal head animation */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <div className="w-16 h-16 border-4 border-red-600 rounded-full border-dashed" />
                  </motion.div>
                </div>
              </motion.div>
            ))}

            {/* Game Over */}
            {gameOver && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="glass-dark rounded-2xl p-8 text-center">
                  <p className="stranger-title text-4xl mb-4">GAME OVER</p>
                  <p className="text-2xl text-red-500 font-retro mb-2">Score: {score}</p>
                  {score >= highScore && score > 0 && (
                    <p className="text-yellow-400 font-retro mb-4">🏆 NEW HIGH SCORE!</p>
                  )}
                  <div className="flex gap-4 justify-center mt-6">
                    <motion.button
                      onClick={startGame}
                      className="px-6 py-3 bg-red-600 text-white rounded-lg"
                      whileHover={{ scale: 1.05 }}
                    >
                      Play Again
                    </motion.button>
                    <motion.button
                      onClick={() => { setIsPlaying(false); setGameOver(false); }}
                      className="px-6 py-3 glass text-gray-300 rounded-lg"
                      whileHover={{ scale: 1.05 }}
                    >
                      Exit
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Crosshair cursor indicator */}
            <Crosshair 
              size={32} 
              className="fixed pointer-events-none text-red-500 opacity-50"
              style={{ 
                position: 'fixed',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
