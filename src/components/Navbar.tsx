import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap, Volume2, VolumeX, LogIn, User, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import GradientText from './ui/GradientText';
import LoginPage from './LoginPage';
import logo from '../images/logo.png';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Events', href: '#events' },
  { name: 'Tracks', href: '#tracks' },
  { name: 'Schedule', href: '#schedule' },
  { name: 'Speakers', href: '#speakers' },
  { name: 'Register', href: '#register' },
  { name: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { isUpsideDown, toggleWorld, secretsFound, achievements } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'glass-dark py-2' 
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a 
              href="#"
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.05 }}
            >
              <img src={logo} alt="VORTEX Logo" className="w-10 h-10 rounded-full object-cover shadow-neon" />
              <GradientText
                colors={['#FF0000', '#FF4444', '#FF0000', '#CC0000', '#FF0000']}
                animationSpeed={4}
                className="text-xl font-bold hidden sm:block"
              >
                VORTEX
              </GradientText>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors animated-underline"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Stats Display */}
              <div className="hidden lg:flex items-center gap-4 mr-4 text-xs text-gray-400">
                <span title="Secrets Found">🔍 {secretsFound}</span>
                <span title="Achievements">🏆 {achievements.length}</span>
              </div>

              {/* User/Login Button */}
              {isAuthenticated ? (
                <div className="relative">
                  <motion.button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-3 py-2 rounded-full glass text-gray-300 hover:text-white transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center">
                      <User size={14} />
                    </div>
                    <span className="hidden sm:inline text-sm">{user?.name?.split(' ')[0]}</span>
                  </motion.button>

                  {/* User Dropdown */}
                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 top-12 w-48 glass-dark rounded-lg overflow-hidden z-50"
                      >
                        <div className="p-3 border-b border-gray-800">
                          <p className="text-white font-medium text-sm">{user?.name}</p>
                          <p className="text-gray-500 text-xs truncate">{user?.email}</p>
                        </div>
                        <div className="p-2">
                          <button
                            onClick={() => {
                              logout();
                              setShowUserMenu(false);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-sm"
                          >
                            <LogOut size={16} />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.button
                  onClick={() => setShowLogin(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full glass text-gray-300 hover:text-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogIn size={16} />
                  <span className="hidden sm:inline text-sm">Login</span>
                </motion.button>
              )}

              {/* Audio Toggle */}
              <motion.button
                onClick={() => setAudioEnabled(!audioEnabled)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Toggle Audio"
              >
                {audioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </motion.button>

              {/* Reality Toggle */}
              <motion.button
                onClick={toggleWorld}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full glass transition-all duration-300 ${
                  isUpsideDown 
                    ? 'border-red-500 text-red-400' 
                    : 'border-blue-500 text-blue-400'
                }`}
                whileHover={{ scale: 1.05, boxShadow: isUpsideDown ? '0 0 20px #FF0000' : '0 0 20px #00BFFF' }}
                whileTap={{ scale: 0.95 }}
                title="Press 'U' to toggle"
              >
                <Zap size={16} className={isUpsideDown ? 'text-red-500' : 'text-blue-500'} />
                <span className="text-xs font-medium hidden sm:inline">
                  {isUpsideDown ? 'Upside Down' : 'Normal World'}
                </span>
                <div className={`w-8 h-4 rounded-full relative transition-colors ${
                  isUpsideDown ? 'bg-red-900' : 'bg-blue-900'
                }`}>
                  <motion.div
                    className={`absolute top-0.5 w-3 h-3 rounded-full ${
                      isUpsideDown ? 'bg-red-500' : 'bg-blue-500'
                    }`}
                    animate={{ left: isUpsideDown ? '16px' : '2px' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </div>
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-300 hover:text-white"
                whileTap={{ scale: 0.9 }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-40 glass-dark md:hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              
              {/* Mobile Login Button */}
              {!isAuthenticated && (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setShowLogin(true);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-3 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <LogIn size={18} />
                  Login / Register
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <AnimatePresence>
        {showLogin && (
          <LoginPage 
            onClose={() => setShowLogin(false)}
            onSwitchToRegister={() => {
              setShowLogin(false);
              document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
