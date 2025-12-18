import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const lightColors = ['#FF0000', '#00FF00', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#FF69B4', '#00FF7F'];

export default function LightWall() {
  const { isUpsideDown, addSecret } = useTheme();
  const [message, setMessage] = useState('');
  const [displayMessage, setDisplayMessage] = useState('');
  const [isSpelling, setIsSpelling] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const spellMessage = () => {
    if (!message.trim()) return;
    
    setIsSpelling(true);
    setDisplayMessage('');
    const upperMessage = message.toUpperCase().replace(/[^A-Z ]/g, '');
    let index = 0;

    const interval = setInterval(() => {
      if (index < upperMessage.length) {
        const char = upperMessage[index];
        setCurrentIndex(alphabet.indexOf(char));
        setDisplayMessage(prev => prev + char);
        index++;

        // Easter egg for spelling specific words
        if (upperMessage === 'RUN' || upperMessage === 'HELP' || upperMessage === 'ELEVEN') {
          addSecret();
        }
      } else {
        clearInterval(interval);
        setIsSpelling(false);
        setCurrentIndex(-1);
      }
    }, 500);
  };

  return (
    <div className="glass-dark rounded-xl p-6">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        🎄 Joyce's Light Wall
      </h3>
      
      <p className="text-gray-400 text-sm mb-4">
        Type a message and watch it spell out like Joyce's Christmas lights!
      </p>

      {/* Light Grid */}
      <div className="grid grid-cols-9 gap-2 mb-6 p-4 bg-black/30 rounded-lg">
        {alphabet.map((letter, index) => (
          <motion.div
            key={letter}
            className="relative flex flex-col items-center"
          >
            {/* Light bulb */}
            <motion.div
              className="w-6 h-8 rounded-full"
              style={{
                backgroundColor: currentIndex === index ? lightColors[index % lightColors.length] : '#333',
                boxShadow: currentIndex === index 
                  ? `0 0 20px ${lightColors[index % lightColors.length]}, 0 0 40px ${lightColors[index % lightColors.length]}` 
                  : 'none',
              }}
              animate={currentIndex === index ? {
                scale: [1, 1.2, 1],
                opacity: [1, 0.8, 1],
              } : {}}
              transition={{ duration: 0.3 }}
            />
            {/* Letter label */}
            <span className={`text-xs mt-1 font-retro ${
              currentIndex === index ? 'text-white' : 'text-gray-600'
            }`}>
              {letter}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Wire decoration */}
      <div className="h-0.5 bg-gray-700 -mx-6 mb-4" style={{
        backgroundImage: 'repeating-linear-gradient(90deg, #333 0px, #333 20px, #555 20px, #555 40px)'
      }} />

      {/* Message Display */}
      {displayMessage && (
        <div className="mb-4 p-4 bg-black/30 rounded-lg">
          <p className="font-retro text-2xl text-center tracking-widest" style={{
            color: isUpsideDown ? '#FF0000' : '#00FF00',
            textShadow: `0 0 10px ${isUpsideDown ? '#FF0000' : '#00FF00'}`,
          }}>
            {displayMessage}
            {isSpelling && <span className="animate-pulse">_</span>}
          </p>
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="retro-input flex-1 rounded-lg"
          maxLength={20}
          disabled={isSpelling}
        />
        <motion.button
          onClick={spellMessage}
          disabled={isSpelling || !message.trim()}
          className="px-4 py-2 bg-red-600 text-white rounded-lg disabled:opacity-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isSpelling ? 'Spelling...' : 'Spell'}
        </motion.button>
      </div>

      <p className="text-gray-600 text-xs mt-2">
        Try spelling "RUN", "HELP", or "ELEVEN" for a surprise!
      </p>
    </div>
  );
}
