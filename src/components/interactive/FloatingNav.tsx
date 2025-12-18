import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { 
  Menu, 
  X, 
  Home, 
  Info, 
  Layers, 
  Calendar, 
  Users, 
  Image, 
  ClipboardList, 
  HelpCircle,
  Heart,
  ChevronUp
} from 'lucide-react';

const menuItems = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: Info },
  { id: 'tracks', label: 'Tracks', icon: Layers },
  { id: 'schedule', label: 'Schedule', icon: Calendar },
  { id: 'speakers', label: 'Speakers', icon: Users },
  { id: 'gallery', label: 'Gallery', icon: Image },
  { id: 'register', label: 'Register', icon: ClipboardList },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
  { id: 'sponsors', label: 'Sponsors', icon: Heart },
];

export default function FloatingNav() {
  const { isUpsideDown } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll position
  useState(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Main FAB */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          fixed right-6 bottom-6 z-50 w-14 h-14 rounded-full
          ${isOpen 
            ? 'bg-red-600' 
            : isUpsideDown 
              ? 'bg-red-900/90' 
              : 'bg-slate-800/90'
          }
          backdrop-blur-sm border-2 
          ${isOpen ? 'border-red-400' : 'border-red-500/30'}
          flex items-center justify-center
          shadow-lg shadow-red-500/30
          transition-colors duration-300
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-red-500" />
        )}
      </motion.button>

      {/* Menu Items - Circular Layout */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Items */}
            {menuItems.map((item, index) => {
              // Calculate position in arc
              const angle = (index / (menuItems.length - 1)) * Math.PI + Math.PI / 2;
              const radius = 150;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.button
                  key={item.id}
                  initial={{ 
                    opacity: 0, 
                    scale: 0,
                    x: 0,
                    y: 0
                  }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    x: -x - 24,
                    y: -y - 24
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0,
                    x: 0,
                    y: 0
                  }}
                  transition={{ 
                    delay: index * 0.05,
                    type: 'spring',
                    stiffness: 300,
                    damping: 20
                  }}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    fixed right-6 bottom-6 z-50 w-12 h-12 rounded-full
                    ${isUpsideDown ? 'bg-red-900' : 'bg-slate-800'}
                    border border-red-500/50
                    flex items-center justify-center
                    hover:bg-red-600 hover:scale-110
                    transition-colors duration-200
                    group
                  `}
                  style={{ originX: 0.5, originY: 0.5 }}
                >
                  <item.icon className="w-5 h-5 text-red-400 group-hover:text-white" />
                  
                  {/* Tooltip */}
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`
                      absolute right-14 px-3 py-1 rounded-lg
                      ${isUpsideDown ? 'bg-red-900' : 'bg-slate-800'}
                      text-white text-sm whitespace-nowrap
                      border border-red-500/30
                      pointer-events-none
                      opacity-0 group-hover:opacity-100
                      transition-opacity
                    `}
                  >
                    {item.label}
                  </motion.span>
                </motion.button>
              );
            })}

            {/* Center decoration when open */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              className="fixed right-6 bottom-6 z-40 w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                right: '24px',
                bottom: '24px',
                marginRight: '-126px',
                marginBottom: '-126px'
              }}
            >
              <div className="absolute inset-0 rounded-full border border-red-500/20 animate-pulse" />
              <div className="absolute inset-8 rounded-full border border-red-500/10" />
              <div className="absolute inset-16 rounded-full border border-red-500/5" />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && !isOpen && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className={`
              fixed right-6 bottom-24 z-50 w-10 h-10 rounded-full
              ${isUpsideDown ? 'bg-red-900/80' : 'bg-slate-800/80'}
              backdrop-blur-sm border border-red-500/30
              flex items-center justify-center
              hover:scale-110 transition-transform
              shadow-lg shadow-red-500/20
            `}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronUp className="w-5 h-5 text-red-500" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
