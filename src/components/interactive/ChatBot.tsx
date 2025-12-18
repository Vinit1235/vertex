import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

// Simple response patterns for the chatbot
const getBotResponse = (input: string): string => {
  const lowerInput = input.toLowerCase().trim();
  
  // Greetings
  if (lowerInput.match(/^(hi|hello|hey|hola|namaste)/)) {
    return "Hey there, friend! 👋 Welcome to VORTEX 2025 - the Upside Down of tech events! How can I help you today?";
  }
  
  // Event date/when
  if (lowerInput.match(/when|date|schedule|time/)) {
    return "📅 VORTEX 2025 is happening on February 15-16, 2025! Mark your calendar and prepare to enter the Upside Down of innovation!";
  }
  
  // Location/venue
  if (lowerInput.match(/where|location|venue|place|address/)) {
    return "📍 We're hosting VORTEX 2025 at IIT Delhi Campus! The gateway to the Upside Down awaits you there.";
  }
  
  // Registration
  if (lowerInput.match(/register|registration|sign up|join|participate/)) {
    return "🎟️ Ready to join? Scroll down to our Registration section or click the 'Register Now' button in the navigation. Early bird slots are filling fast!";
  }
  
  // Prizes
  if (lowerInput.match(/prize|reward|win|money|award/)) {
    return "🏆 We have prizes worth ₹5,00,000+! Including cash prizes, internship opportunities, goodies, and certificates for all participants!";
  }
  
  // Tracks/themes
  if (lowerInput.match(/track|theme|category|domain|topic/)) {
    return "🚀 We have 4 exciting tracks:\n• AI/ML - Build intelligent systems\n• Web3 - Decentralized future\n• IoT - Connected devices\n• Open Innovation - Your wild ideas!\nChoose your adventure!";
  }
  
  // Team size
  if (lowerInput.match(/team|member|group|solo|alone/)) {
    return "👥 Teams can have 2-4 members. You can also register solo and we'll help you find teammates through our Discord community!";
  }
  
  // Contact
  if (lowerInput.match(/contact|email|phone|reach|support/)) {
    return "📧 Reach out to us at:\n• Email: vortex2025@iitdelhi.ac.in\n• Discord: discord.gg/vortex2025\n• Instagram: @vortex.iitd";
  }
  
  // Sponsors
  if (lowerInput.match(/sponsor|partner|company|companies/)) {
    return "🤝 We're backed by amazing sponsors including tech giants and startups! Check out our Sponsors section to see who's supporting the Upside Down revolution!";
  }
  
  // Food/accommodation
  if (lowerInput.match(/food|eat|meal|accommodation|stay|sleep|hotel/)) {
    return "🍕 Don't worry! Food and refreshments will be provided throughout the event. For accommodation, we'll share details with registered participants closer to the date!";
  }
  
  // Stranger Things reference
  if (lowerInput.match(/stranger things|eleven|demogorgon|upside down|hawkins/)) {
    return "🔦 Ah, I see you're a person of culture! Yes, our theme is inspired by Stranger Things. Just like Eleven, you'll need to tap into your hidden powers to win! Friends don't lie... and neither do we about the amazing experience awaiting you!";
  }
  
  // Thanks
  if (lowerInput.match(/thank|thanks|thx|appreciate/)) {
    return "You're welcome! 😊 Feel free to ask if you have more questions. See you at VORTEX 2025!";
  }
  
  // Bye
  if (lowerInput.match(/bye|goodbye|see you|later|cya/)) {
    return "Goodbye, friend! 👋 Remember, in the Upside Down of VORTEX, amazing things await. See you at the event! 🚀";
  }
  
  // Help
  if (lowerInput.match(/help|what can you|commands|options/)) {
    return "I can help you with:\n• Event dates & schedule\n• Venue location\n• Registration info\n• Prizes & rewards\n• Tracks & themes\n• Team requirements\n• Contact details\n• And more! Just ask away! 🎯";
  }
  
  // Default response
  const defaultResponses = [
    "Interesting question! 🤔 I'm still learning about that. Try asking about our event dates, registration, prizes, or tracks!",
    "Hmm, that's a bit outside my knowledge from the Upside Down. Can I help you with registration, schedule, or prizes instead?",
    "I'm not sure about that one! But I can tell you all about VORTEX 2025 - dates, venue, prizes, tracks, and more!",
    "That's beyond my current abilities, friend! Try asking about the event details, registration process, or prizes!"
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};

export default function ChatBot() {
  const { isUpsideDown } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hey there! 👋 I'm the VORTEX Bot. Ask me anything about the event - dates, registration, prizes, tracks, and more!",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: getBotResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`
          fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full
          ${isUpsideDown ? 'bg-red-900/80' : 'bg-gradient-to-r from-red-600 to-red-500'}
          backdrop-blur-sm border border-red-500/30
          flex items-center justify-center
          hover:scale-110 transition-transform
          shadow-lg shadow-red-500/30
        `}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
      >
        <MessageCircle className="w-6 h-6 text-white" />
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 left-6 z-50 w-96 max-w-[calc(100vw-3rem)]"
          >
            <div className={`
              rounded-2xl overflow-hidden
              ${isUpsideDown ? 'bg-red-950/95' : 'bg-slate-900/95'}
              backdrop-blur-md border border-red-500/30
              shadow-2xl shadow-red-500/20
              flex flex-col
              h-[500px] max-h-[70vh]
            `}>
              {/* Header */}
              <div className="bg-gradient-to-r from-red-900/80 to-slate-900/80 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">VORTEX Bot</h3>
                    <p className="text-xs text-green-400 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      Online
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`
                      flex items-start gap-2 max-w-[80%]
                      ${message.isBot ? 'flex-row' : 'flex-row-reverse'}
                    `}>
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                        ${message.isBot 
                          ? 'bg-gradient-to-r from-red-600 to-red-500' 
                          : 'bg-gradient-to-r from-blue-600 to-blue-500'}
                      `}>
                        {message.isBot ? (
                          <Bot className="w-4 h-4 text-white" />
                        ) : (
                          <User className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className={`
                        rounded-2xl px-4 py-2
                        ${message.isBot 
                          ? 'bg-slate-800 text-white rounded-tl-sm' 
                          : 'bg-red-600 text-white rounded-tr-sm'}
                      `}>
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        <p className="text-[10px] text-gray-400 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-slate-800 rounded-2xl rounded-tl-sm px-4 py-3">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Quick replies */}
              <div className="px-4 pb-2 flex gap-2 overflow-x-auto">
                {['When is the event?', 'How to register?', 'Prizes?'].map((quick) => (
                  <button
                    key={quick}
                    onClick={() => {
                      setInputValue(quick);
                      setTimeout(handleSend, 100);
                    }}
                    className="px-3 py-1 text-xs bg-slate-800 text-gray-300 rounded-full hover:bg-slate-700 transition-colors whitespace-nowrap"
                  >
                    {quick}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-red-900/30">
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything..."
                    className="flex-1 bg-slate-800 text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 placeholder-gray-500"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                  >
                    <Send className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
