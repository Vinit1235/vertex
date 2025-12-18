import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useState, useEffect } from 'react';
import { 
  Users, 
  Target, 
  Trophy, 
  Clock, 
  Eye, 
  Zap, 
  TrendingUp,
  Activity
} from 'lucide-react';

interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  icon: React.ReactNode;
  color: string;
  animated?: boolean;
}

export default function LiveStats() {
  const { isUpsideDown, secretsFound, achievements } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState({
    registrations: 1247,
    activeViewers: 89,
    secretsTotal: 8,
    daysLeft: 0,
    hoursLeft: 0,
  });

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        registrations: prev.registrations + Math.floor(Math.random() * 3),
        activeViewers: Math.max(50, prev.activeViewers + Math.floor(Math.random() * 10) - 5),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Calculate time until event
  useEffect(() => {
    const eventDate = new Date('2025-02-15T09:00:00');
    const now = new Date();
    const diff = eventDate.getTime() - now.getTime();
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    setStats(prev => ({ ...prev, daysLeft: days, hoursLeft: hours }));
  }, []);

  const statItems: StatItem[] = [
    {
      label: 'Registered',
      value: stats.registrations,
      icon: <Users className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-500',
      animated: true
    },
    {
      label: 'Online Now',
      value: stats.activeViewers,
      icon: <Eye className="w-5 h-5" />,
      color: 'from-green-500 to-emerald-500',
      animated: true
    },
    {
      label: 'Secrets Found',
      value: secretsFound,
      suffix: `/${stats.secretsTotal}`,
      icon: <Target className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      label: 'Achievements',
      value: achievements.length,
      suffix: '/8',
      icon: <Trophy className="w-5 h-5" />,
      color: 'from-yellow-500 to-orange-500'
    },
  ];

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsVisible(!isVisible)}
        className={`
          fixed left-6 bottom-56 z-50 w-12 h-12 rounded-full
          ${isUpsideDown ? 'bg-red-900/80' : 'bg-slate-800/80'}
          backdrop-blur-sm border border-red-500/30
          flex items-center justify-center
          hover:scale-110 transition-transform
          shadow-lg shadow-red-500/20
        `}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Activity className="w-6 h-6 text-red-500" />
      </motion.button>

      {/* Stats Panel */}
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="fixed left-6 bottom-72 z-50"
        >
          <div className={`
            rounded-xl overflow-hidden w-72
            ${isUpsideDown ? 'bg-red-950/95' : 'bg-slate-900/95'}
            backdrop-blur-md border border-red-500/30
            shadow-2xl shadow-red-500/20
          `}>
            {/* Header */}
            <div className="bg-gradient-to-r from-red-900/50 to-slate-900/50 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-red-500" />
                <span className="font-retro text-sm text-red-400">LIVE STATS</span>
              </div>
              <div className="flex items-center gap-1">
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-500"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="text-xs text-green-400">LIVE</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="p-4 space-y-3">
              {statItems.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className={`
                    w-10 h-10 rounded-lg flex items-center justify-center
                    bg-gradient-to-br ${stat.color}
                  `}>
                    {stat.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">
                      {stat.label}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <motion.span
                        key={stat.value}
                        className="text-xl font-bold text-white"
                        initial={stat.animated ? { scale: 1.2, color: '#FF0000' } : {}}
                        animate={{ scale: 1, color: '#FFFFFF' }}
                        transition={{ duration: 0.3 }}
                      >
                        {stat.value.toLocaleString()}
                      </motion.span>
                      {stat.suffix && (
                        <span className="text-sm text-gray-500">{stat.suffix}</span>
                      )}
                    </div>
                  </div>
                  {stat.animated && (
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                    >
                      <Zap className="w-4 h-4 text-yellow-500" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Countdown */}
            <div className="bg-black/30 p-4 border-t border-red-900/30">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-red-500" />
                <span className="text-xs text-gray-400 uppercase tracking-wider">
                  Event Starts In
                </span>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 bg-black/50 rounded-lg p-2 text-center">
                  <span className="text-2xl font-bold text-red-500">{stats.daysLeft}</span>
                  <p className="text-xs text-gray-500">DAYS</p>
                </div>
                <div className="flex-1 bg-black/50 rounded-lg p-2 text-center">
                  <span className="text-2xl font-bold text-red-500">{stats.hoursLeft}</span>
                  <p className="text-xs text-gray-500">HOURS</p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="p-4 border-t border-red-900/30">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-gray-400">Your Progress</span>
                <span className="text-red-400">
                  {Math.round((secretsFound / stats.secretsTotal + achievements.length / 8) * 50)}%
                </span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-red-600 via-purple-500 to-red-600"
                  style={{
                    backgroundSize: '200% 100%',
                  }}
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${(secretsFound / stats.secretsTotal + achievements.length / 8) * 50}%`,
                    backgroundPosition: ['0% 50%', '100% 50%'],
                  }}
                  transition={{
                    width: { duration: 1 },
                    backgroundPosition: { duration: 2, repeat: Infinity, ease: 'linear' }
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
