import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export default function LightningEffect() {
  const { isUpsideDown } = useTheme();
  const [showLightning, setShowLightning] = useState(false);

  useEffect(() => {
    if (!isUpsideDown) return;

    const triggerLightning = () => {
      setShowLightning(true);
      setTimeout(() => setShowLightning(false), 150);
    };

    // Random lightning strikes
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        triggerLightning();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isUpsideDown]);

  if (!isUpsideDown) return null;

  return (
    <AnimatePresence>
      {showLightning && (
        <motion.div
          className="lightning-flash"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0, 0.5, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </AnimatePresence>
  );
}
