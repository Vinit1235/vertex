import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sparkles } from 'lucide-react';

const SECRET_LOCATIONS = [
  { id: 'eleven', hint: 'Click on the portal 11 times', message: 'Eleven would be proud!' },
  { id: 'stranger', hint: 'Stay on the page for 3 minutes', message: 'Time flies in the Upside Down!' },
  { id: 'friends', hint: 'Scroll to the very bottom', message: 'Friends don\'t lie!' },
  { id: 'eggo', hint: 'Find the hidden waffle', message: '🧇 Eggo found!' },
  { id: 'demo', hint: 'Defeat 5 Demogorgons', message: 'Monster hunter!' },
];

export default function SecretPortal() {
  const { secretsFound, isUpsideDown } = useTheme();
  const [showSecret, setShowSecret] = useState(false);
  const [currentSecret, setCurrentSecret] = useState<typeof SECRET_LOCATIONS[0] | null>(null);
  const [portalClicks, setPortalClicks] = useState(0);

  // Check for 11 clicks secret
  useEffect(() => {
    if (portalClicks === 11) {
      setCurrentSecret(SECRET_LOCATIONS[0]);
      setShowSecret(true);
      setPortalClicks(0);
    }
  }, [portalClicks]);

  // Time-based secret (3 minutes)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!localStorage.getItem('secret_time')) {
        setCurrentSecret(SECRET_LOCATIONS[1]);
        setShowSecret(true);
        localStorage.setItem('secret_time', 'true');
      }
    }, 180000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Hidden Clickable Portal */}
      <motion.div
        onClick={() => setPortalClicks(prev => prev + 1)}
        className="fixed bottom-4 left-4 z-30 w-8 h-8 cursor-pointer opacity-10 hover:opacity-30 transition-opacity"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-r from-red-600 to-purple-600 animate-pulse" />
      </motion.div>

      {/* Secret Revealed Modal */}
      <AnimatePresence>
        {showSecret && currentSecret && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md"
            onClick={() => setShowSecret(false)}
          >
            {/* Portal Effect */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', damping: 15 }}
              className="relative"
            >
              {/* Outer Ring */}
              <motion.div
                className="w-80 h-80 rounded-full border-4 border-red-500"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Middle Ring */}
              <motion.div
                className="absolute inset-4 rounded-full border-2 border-purple-500"
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Inner Ring */}
              <motion.div
                className="absolute inset-8 rounded-full border border-blue-500"
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              />

              {/* Center Content */}
              <div className="absolute inset-12 rounded-full bg-gradient-to-br from-red-900 to-purple-900 flex flex-col items-center justify-center p-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                </motion.div>
                
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl font-bold text-white mb-2"
                >
                  SECRET FOUND!
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-red-300 text-sm"
                >
                  {currentSecret.message}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-gray-400 text-xs mt-4"
                >
                  {secretsFound + 1}/8 secrets discovered
                </motion.p>
              </div>

              {/* Particles */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-red-500 rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                  }}
                  animate={{
                    x: Math.cos((i * Math.PI * 2) / 20) * (150 + Math.random() * 50),
                    y: Math.sin((i * Math.PI * 2) / 20) * (150 + Math.random() * 50),
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </motion.div>

            {/* Click to close hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 1 }}
              className="absolute bottom-8 text-gray-500 text-sm"
            >
              Click anywhere to close
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden Eggo Waffle Easter Egg */}
      <motion.div
        onClick={() => {
          if (!localStorage.getItem('secret_eggo')) {
            setCurrentSecret(SECRET_LOCATIONS[3]);
            setShowSecret(true);
            localStorage.setItem('secret_eggo', 'true');
          }
        }}
        className="fixed top-1/2 right-2 z-30 cursor-pointer opacity-5 hover:opacity-30 transition-opacity text-2xl"
        whileHover={{ scale: 1.5, rotate: 15 }}
        style={{ transform: 'translateY(-50%)' }}
      >
        🧇
      </motion.div>
    </>
  );
}
