import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, X, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface CharacterSelectProps {
  onSelect?: (characterId: string) => void;
  onClose?: () => void;
  isModal?: boolean;
}

interface Character {
  id: string;
  name: string;
  avatar: string;
  role: string;
  description: string;
  color: string;
  quote: string;
}

const characters: Character[] = [
  {
    id: 'eleven',
    name: 'Eleven',
    avatar: '👧',
    role: 'The Powerful One',
    description: 'Psychic abilities, telekinesis, and a love for Eggo waffles.',
    color: 'from-pink-600 to-purple-900',
    quote: '"Friends don\'t lie."'
  },
  {
    id: 'mike',
    name: 'Mike Wheeler',
    avatar: '👦',
    role: 'The Leader',
    description: 'Dungeons & Dragons enthusiast and loyal friend.',
    color: 'from-blue-600 to-blue-900',
    quote: '"We never would have upset you if we knew you had superpowers."'
  },
  {
    id: 'dustin',
    name: 'Dustin Henderson',
    avatar: '🧢',
    role: 'The Brain',
    description: 'Science nerd with a heart of gold and the best catchphrases.',
    color: 'from-green-600 to-green-900',
    quote: '"She\'s our friend and she\'s crazy!"'
  },
  {
    id: 'lucas',
    name: 'Lucas Sinclair',
    avatar: '🎯',
    role: 'The Warrior',
    description: 'Practical thinker and expert with a slingshot.',
    color: 'from-orange-600 to-orange-900',
    quote: '"What\'s the weirdo doing?"'
  },
  {
    id: 'will',
    name: 'Will Byers',
    avatar: '🎨',
    role: 'The Survivor',
    description: 'Sensitive artist with a connection to the Upside Down.',
    color: 'from-cyan-600 to-cyan-900',
    quote: '"It got me. The Demogorgon."'
  },
  {
    id: 'max',
    name: 'Max Mayfield',
    avatar: '🛹',
    role: 'The Zoomer',
    description: 'Arcade champion and fearless newcomer.',
    color: 'from-red-600 to-red-900',
    quote: '"I\'m not afraid of you."'
  },
];

export default function CharacterSelect({ onSelect, onClose, isModal = false }: CharacterSelectProps) {
  const { unlockAchievement } = useTheme();
  const [isOpen, setIsOpen] = useState(isModal);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleSelect = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleConfirm = () => {
    if (selectedCharacter) {
      setConfirmed(true);
      unlockAchievement('Character Selected');
      
      // Store in localStorage
      localStorage.setItem('vortex_character', selectedCharacter.id);
      
      // Call external handler if provided
      if (onSelect) {
        onSelect(selectedCharacter.id);
      }
      
      setTimeout(() => {
        setIsOpen(false);
        setConfirmed(false);
        if (onClose) onClose();
      }, 1500);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Character Select Button - only show if not modal */}
      {!isModal && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-72 right-4 z-50 px-4 py-2 rounded-full glass-dark flex items-center gap-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Users size={18} className="text-cyan-500" />
          <span className="text-gray-300 font-retro text-sm">PARTY</span>
        </motion.button>
      )}

      {/* Character Select Modal */}
      <AnimatePresence>
        {(isOpen || isModal) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/90"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="glass-dark rounded-2xl p-6 max-w-4xl w-full"
              onClick={e => e.stopPropagation()}
            >
              {/* Confirmed State */}
              {confirmed ? (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
                  >
                    <Check size={48} className="text-green-500" />
                  </motion.div>
                  <p className="stranger-title text-3xl mb-4">WELCOME TO THE PARTY</p>
                  <p className="text-gray-400">You are now {selectedCharacter?.name}</p>
                </motion.div>
              ) : (
                <>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="stranger-title text-2xl">CHOOSE YOUR CHARACTER</h2>
                      <p className="text-gray-500 text-sm">Select who you'll be in the Upside Down</p>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-800 rounded-lg">
                      <X size={24} className="text-gray-400" />
                    </button>
                  </div>

                  {/* Character Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {characters.map(character => (
                      <motion.button
                        key={character.id}
                        onClick={() => handleSelect(character)}
                        className={`relative p-4 rounded-xl text-left transition-all ${
                          selectedCharacter?.id === character.id
                            ? 'ring-2 ring-red-500 bg-gradient-to-br ' + character.color
                            : 'glass hover:bg-white/5'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Selected Indicator */}
                        {selectedCharacter?.id === character.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center"
                          >
                            <Check size={14} className="text-white" />
                          </motion.div>
                        )}

                        <div className="text-4xl mb-3">{character.avatar}</div>
                        <h3 className="text-white font-bold mb-1">{character.name}</h3>
                        <p className="text-gray-400 text-xs mb-2">{character.role}</p>
                        <p className="text-gray-500 text-xs line-clamp-2">{character.description}</p>
                      </motion.button>
                    ))}
                  </div>

                  {/* Selected Character Info */}
                  {selectedCharacter && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass rounded-xl p-4 mb-6"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-6xl">{selectedCharacter.avatar}</div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{selectedCharacter.name}</h3>
                          <p className="text-red-400">{selectedCharacter.role}</p>
                          <p className="text-gray-400 text-sm italic mt-2">{selectedCharacter.quote}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Confirm Button */}
                  <div className="flex justify-end gap-4">
                    <motion.button
                      onClick={() => setIsOpen(false)}
                      className="px-6 py-3 glass text-gray-400 rounded-lg"
                      whileHover={{ scale: 1.05 }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      onClick={handleConfirm}
                      disabled={!selectedCharacter}
                      className={`px-6 py-3 rounded-lg ${
                        selectedCharacter
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      }`}
                      whileHover={selectedCharacter ? { scale: 1.05 } : {}}
                    >
                      Join the Party
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
