import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, ChevronDown, Users, Trophy, Clock, ArrowRight, Zap } from 'lucide-react';
import { EVENT_CONFIG, HIGHLIGHTS } from '../data/eventData';
import { useTheme } from '../context/ThemeContext';
import GradientText from './ui/GradientText';

export default function Hero() {
  const { isUpsideDown, unlockAchievement } = useTheme();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [titleClicks, setTitleClicks] = useState(0);
  const [activeHighlight, setActiveHighlight] = useState(0);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Countdown Timer
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = EVENT_CONFIG.date.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  // Rotate highlights
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHighlight((prev) => (prev + 1) % HIGHLIGHTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Easter Egg: Click title 11 times
  const handleTitleClick = () => {
    const newCount = titleClicks + 1;
    setTitleClicks(newCount);
    
    if (newCount === 11) {
      unlockAchievement('Eleven');
      setTitleClicks(0);
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Base */}
        <div className={`absolute inset-0 transition-all duration-1000 ${
          isUpsideDown 
            ? 'bg-gradient-to-br from-black via-red-950/50 to-black' 
            : 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
        }`} />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 rounded-full opacity-30 blur-3xl"
          style={{ background: isUpsideDown ? '#FF000033' : '#0066FF33' }}
          animate={{ 
            x: [0, 50, 0], 
            y: [0, 30, 0],
            scale: [1, 1.1, 1] 
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: isUpsideDown ? '#8B0000' : '#00BFFF33' }}
          animate={{ 
            x: [0, -30, 0], 
            y: [0, -50, 0],
            scale: [1, 1.2, 1] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${isUpsideDown ? 'bg-red-500' : 'bg-blue-400'}`}
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pt-24 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-sm text-red-400 font-medium">Registration Open • Limited Spots</span>
            </motion.div>

            {/* Main Title */}
            <motion.div
              ref={titleRef}
              onClick={handleTitleClick}
              className="mb-6 cursor-pointer select-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="block text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                Welcome to
              </span>
              <h1 className="stranger-title text-6xl md:text-7xl lg:text-8xl glitch" data-text="VORTEX">
                VORTEX
              </h1>
              <span className="block text-xl md:text-2xl font-light text-gray-400 mt-2">
                <GradientText colors={['#FF6B6B', '#4ECDC4', '#FF6B6B']} animationSpeed={3}>
                  Tech Fest & Hackathon 2025
                </GradientText>
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="text-base md:text-lg text-gray-400 mb-6 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Join 500+ innovators for a 36-hour hackathon experience. Build, learn, and compete for ₹5 Lakh+ in prizes.
            </motion.p>

            {/* Event Quick Info */}
            <motion.div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <Calendar size={16} className="text-red-500" />
                <span className="text-sm text-gray-300">Feb 15-16, 2025</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <MapPin size={16} className="text-red-500" />
                <span className="text-sm text-gray-300">IIT Delhi</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <Clock size={16} className="text-red-500" />
                <span className="text-sm text-gray-300">36 Hours</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <motion.a
                href="#register"
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-xl overflow-hidden shadow-lg shadow-red-500/25"
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(255,0,0,0.3)' }}
                whileTap={{ scale: 0.98 }}
              >
                <Zap size={18} className="relative z-10" />
                <span className="relative z-10">Register Now - Free</span>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
              <motion.a
                href="#about"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-gray-300 hover:text-white hover:border-white/40 rounded-xl transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More
              </motion.a>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 md:gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {[
                { value: '₹5L+', label: 'Prize Pool' },
                { value: '500+', label: 'Participants' },
                { value: '36h', label: 'Duration' },
                { value: '6', label: 'Tracks' },
              ].map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-xl md:text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Countdown Card */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl blur-xl opacity-20" />
            
            <div className="relative glass-dark rounded-3xl p-6 md:p-8 border border-red-500/20">
              {/* Countdown Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-red-500" />
                  <span className="text-sm text-gray-400 uppercase tracking-wider font-medium">Event Countdown</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 border border-green-500/30">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-xs text-green-400 font-medium">Live</span>
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="grid grid-cols-4 gap-2 md:gap-3 mb-6">
                {[
                  { value: timeLeft.days, label: 'Days' },
                  { value: timeLeft.hours, label: 'Hours' },
                  { value: timeLeft.minutes, label: 'Mins' },
                  { value: timeLeft.seconds, label: 'Secs' },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-800/80 to-slate-900/80 border border-white/5 p-3 md:p-4">
                      <div className="absolute inset-0 bg-gradient-to-t from-red-500/5 to-transparent" />
                      <motion.div
                        key={item.value}
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-2xl md:text-4xl font-bold text-white text-center font-mono"
                      >
                        {item.value.toString().padStart(2, '0')}
                      </motion.div>
                      <div className="text-[10px] md:text-xs text-gray-500 text-center mt-1 uppercase tracking-wider">
                        {item.label}
                      </div>
                    </div>
                    {/* Separator dots */}
                    {index < 3 && (
                      <div className="absolute -right-1 md:-right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1 z-10">
                        <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-red-500/50" />
                        <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-red-500/50" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Highlights Carousel */}
              <div className="border-t border-white/10 pt-5">
                <div className="flex items-center gap-2 mb-3">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-gray-400">Event Highlights</span>
                </div>
                
                <div className="relative h-16 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeHighlight}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-2xl">{HIGHLIGHTS[activeHighlight].icon}</div>
                        <div>
                          <h4 className="text-white font-semibold">{HIGHLIGHTS[activeHighlight].title}</h4>
                          <p className="text-sm text-gray-400">{HIGHLIGHTS[activeHighlight].description}</p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Carousel Dots */}
                <div className="flex justify-center gap-2 mt-3">
                  {HIGHLIGHTS.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveHighlight(index)}
                      className={`h-1.5 rounded-full transition-all ${
                        index === activeHighlight
                          ? 'bg-red-500 w-6'
                          : 'bg-gray-600 hover:bg-gray-500 w-1.5'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="grid grid-cols-2 gap-3 mt-5 pt-5 border-t border-white/10">
                <a
                  href="#tracks"
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                >
                  <Users className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-gray-300 group-hover:text-white">View Tracks</span>
                </a>
                <a
                  href="#schedule"
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                >
                  <Calendar className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-gray-300 group-hover:text-white">Schedule</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={24} className="text-gray-500" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
