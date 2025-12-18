import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, X, Send, Volume2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface Message {
  id: number;
  from: string;
  text: string;
  timestamp: Date;
  isPlayer: boolean;
}

const characters = [
  { id: 'eleven', name: 'Eleven', avatar: '👧', responses: [
    "Friends don't lie.",
    "I can do this.",
    "The gate... it's open.",
    "I'm going to find them.",
    "Promise?"
  ]},
  { id: 'mike', name: 'Mike', avatar: '👦', responses: [
    "We need to stick together!",
    "Has anyone seen Will?",
    "The compass is pointing that way.",
    "Let's go to the arcade.",
    "Over and out!"
  ]},
  { id: 'dustin', name: 'Dustin', avatar: '🧢', responses: [
    "Son of a bitch!",
    "This is totally tubular!",
    "I found something!",
    "Code red! CODE RED!",
    "Grrrr... copy that."
  ]},
  { id: 'hopper', name: 'Hopper', avatar: '🚔', responses: [
    "Stay inside. Don't open the door.",
    "I'm on my way.",
    "What did I tell you about going out?",
    "Keep the channel clear.",
    "Roger that, over."
  ]},
  { id: 'joyce', name: 'Joyce', avatar: '💡', responses: [
    "Will? Will, can you hear me?",
    "He's trying to communicate!",
    "I know my son is alive.",
    "The lights... they're flickering!",
    "Stay safe out there."
  ]},
];

export default function WalkieTalkie() {
  const { addSecret } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [selectedChar, setSelectedChar] = useState(characters[0]);
  const [isStatic, setIsStatic] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (!inputText.trim()) return;

    // Add player message
    const playerMsg: Message = {
      id: Date.now(),
      from: 'You',
      text: inputText,
      timestamp: new Date(),
      isPlayer: true,
    };
    setMessages(prev => [...prev, playerMsg]);
    setInputText('');

    // Static effect
    setIsStatic(true);
    setTimeout(() => setIsStatic(false), 500);

    // Character response after delay
    setTimeout(() => {
      const response = selectedChar.responses[Math.floor(Math.random() * selectedChar.responses.length)];
      const charMsg: Message = {
        id: Date.now() + 1,
        from: selectedChar.name,
        text: response,
        timestamp: new Date(),
        isPlayer: false,
      };
      setMessages(prev => [...prev, charMsg]);

      // Easter egg for specific messages
      if (inputText.toLowerCase().includes('upside down') || inputText.toLowerCase().includes('011')) {
        addSecret();
      }
    }, 1000 + Math.random() * 1000);
  };

  return (
    <>
      {/* Walkie-Talkie Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-48 right-4 z-50 px-4 py-2 rounded-full glass-dark flex items-center gap-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Radio size={18} className="text-yellow-500" />
        <span className="text-gray-300 font-retro text-sm">RADIO</span>
      </motion.button>

      {/* Walkie-Talkie Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, rotateY: 90 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.8, rotateY: -90 }}
              className="relative w-full max-w-md"
              onClick={e => e.stopPropagation()}
            >
              {/* Walkie-Talkie Body */}
              <div className="bg-gradient-to-b from-gray-700 to-gray-900 rounded-3xl p-6 shadow-2xl border-4 border-gray-600">
                {/* Antenna */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-3 h-12 bg-gradient-to-t from-gray-600 to-gray-400 rounded-full" />
                
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-2 right-2 p-1 hover:bg-gray-600 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </button>

                {/* Screen */}
                <div className={`relative bg-black rounded-xl p-4 mb-4 h-64 overflow-hidden ${
                  isStatic ? 'animate-shake' : ''
                }`}>
                  {/* Static Effect */}
                  {isStatic && (
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent animate-pulse" />
                  )}
                  
                  {/* CRT Lines */}
                  <div className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)'
                    }}
                  />

                  {/* Channel Info */}
                  <div className="flex items-center justify-between mb-3 border-b border-gray-800 pb-2">
                    <span className="text-green-500 font-retro text-xs">CH-11</span>
                    <div className="flex items-center gap-2">
                      <Volume2 size={14} className="text-green-500" />
                      <span className="text-green-500 font-retro text-xs">ONLINE</span>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="h-44 overflow-y-auto space-y-2 pr-2 scrollbar-thin">
                    {messages.length === 0 && (
                      <p className="text-gray-600 text-center font-retro text-sm mt-8">
                        Select a character and send a message...
                      </p>
                    )}
                    {messages.map(msg => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, x: msg.isPlayer ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`flex ${msg.isPlayer ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] rounded-lg px-3 py-2 ${
                          msg.isPlayer 
                            ? 'bg-blue-900/50 text-blue-200' 
                            : 'bg-green-900/50 text-green-200'
                        }`}>
                          <p className="text-xs opacity-70 mb-1">{msg.from}</p>
                          <p className="font-retro text-sm">{msg.text}</p>
                        </div>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Character Selector */}
                <div className="flex justify-center gap-2 mb-4">
                  {characters.map(char => (
                    <motion.button
                      key={char.id}
                      onClick={() => setSelectedChar(char)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all ${
                        selectedChar.id === char.id 
                          ? 'bg-red-600 ring-2 ring-red-400' 
                          : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title={char.name}
                    >
                      {char.avatar}
                    </motion.button>
                  ))}
                </div>

                {/* Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder={`Message ${selectedChar.name}...`}
                    className="flex-1 bg-gray-800 border-2 border-gray-600 rounded-lg px-4 py-2 text-white font-retro focus:outline-none focus:border-red-500"
                  />
                  <motion.button
                    onClick={sendMessage}
                    className="px-4 py-2 bg-red-600 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send size={20} className="text-white" />
                  </motion.button>
                </div>

                {/* Speaker Grille */}
                <div className="mt-4 grid grid-cols-8 gap-1">
                  {[...Array(24)].map((_, i) => (
                    <div key={i} className="w-full h-1 bg-gray-600 rounded-full" />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
