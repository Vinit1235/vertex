import { motion, AnimatePresence } from 'framer-motion';
import { Award, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_visit',
    title: 'Welcome to Hawkins',
    description: 'You arrived at the event for the first time',
    icon: '🏠',
    rarity: 'common'
  },
  {
    id: 'upside_down',
    title: 'Dimension Traveler',
    description: 'Entered the Upside Down',
    icon: '🌀',
    rarity: 'rare'
  },
  {
    id: 'konami',
    title: 'Old School Gamer',
    description: 'Entered the Konami Code',
    icon: '🎮',
    rarity: 'epic'
  },
  {
    id: 'telekinesis',
    title: 'Like Eleven',
    description: 'Used telekinesis powers',
    icon: '🧠',
    rarity: 'rare'
  },
  {
    id: 'demogorgon_slayer',
    title: 'Demogorgon Slayer',
    description: 'Defeated 10 Demogorgons',
    icon: '⚔️',
    rarity: 'epic'
  },
  {
    id: 'night_owl',
    title: 'Night Owl',
    description: 'Visited during the witching hour',
    icon: '🦉',
    rarity: 'legendary'
  },
  {
    id: 'secret_finder',
    title: 'Secret Keeper',
    description: 'Found all hidden secrets',
    icon: '🔮',
    rarity: 'legendary'
  },
  {
    id: 'registered',
    title: 'Hawkins Lab Subject',
    description: 'Successfully registered for the event',
    icon: '📋',
    rarity: 'common'
  }
];

const rarityColors = {
  common: 'from-gray-500 to-gray-600',
  rare: 'from-blue-500 to-blue-600',
  epic: 'from-purple-500 to-purple-600',
  legendary: 'from-yellow-500 to-orange-500'
};

const rarityGlow = {
  common: 'shadow-gray-500/50',
  rare: 'shadow-blue-500/50',
  epic: 'shadow-purple-500/50',
  legendary: 'shadow-yellow-500/50'
};

export default function AchievementToast() {
  const { achievements } = useTheme();
  const [currentToast, setCurrentToast] = useState<Achievement | null>(null);
  const [queue, setQueue] = useState<Achievement[]>([]);
  const [shownAchievements, setShownAchievements] = useState<Set<string>>(new Set());

  // Watch for new achievements
  useEffect(() => {
    const newAchievements = achievements.filter(
      id => !shownAchievements.has(id)
    );

    if (newAchievements.length > 0) {
      const newItems = newAchievements
        .map(id => ACHIEVEMENTS.find(a => a.id === id))
        .filter(Boolean) as Achievement[];
      
      setQueue(prev => [...prev, ...newItems]);
      setShownAchievements(prev => new Set([...prev, ...newAchievements]));
    }
  }, [achievements, shownAchievements]);

  // Process queue
  useEffect(() => {
    if (!currentToast && queue.length > 0) {
      setCurrentToast(queue[0]);
      setQueue(prev => prev.slice(1));
    }
  }, [currentToast, queue]);

  // Auto-dismiss
  useEffect(() => {
    if (currentToast) {
      const timer = setTimeout(() => {
        setCurrentToast(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentToast]);

  return (
    <AnimatePresence>
      {currentToast && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.8 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-[200]"
        >
          <div className={`
            relative overflow-hidden rounded-lg p-1
            bg-gradient-to-r ${rarityColors[currentToast.rarity]}
            shadow-lg ${rarityGlow[currentToast.rarity]}
          `}>
            {/* Inner Content */}
            <div className="bg-black/90 rounded-md px-6 py-4 flex items-center gap-4 min-w-[300px]">
              {/* Icon */}
              <div className={`
                w-16 h-16 rounded-lg flex items-center justify-center text-3xl
                bg-gradient-to-br ${rarityColors[currentToast.rarity]}
                shadow-inner
              `}>
                {currentToast.icon}
              </div>

              {/* Text */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs text-gray-400 uppercase tracking-wider">
                    Achievement Unlocked!
                  </span>
                </div>
                <h4 className="font-bold text-white">{currentToast.title}</h4>
                <p className="text-sm text-gray-400">{currentToast.description}</p>
                <span className={`
                  text-xs uppercase tracking-wider font-bold
                  bg-gradient-to-r ${rarityColors[currentToast.rarity]} 
                  bg-clip-text text-transparent
                `}>
                  {currentToast.rarity}
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setCurrentToast(null)}
                className="absolute top-2 right-2 text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Shine Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />

            {/* Particles */}
            {currentToast.rarity === 'legendary' && (
              [...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                  initial={{ 
                    x: '50%', 
                    y: '50%',
                    opacity: 1 
                  }}
                  animate={{
                    x: `${50 + (Math.random() - 0.5) * 200}%`,
                    y: `${50 + (Math.random() - 0.5) * 200}%`,
                    opacity: 0
                  }}
                  transition={{
                    duration: 1,
                    delay: Math.random() * 0.3
                  }}
                />
              ))
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
