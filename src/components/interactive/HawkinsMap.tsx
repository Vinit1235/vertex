import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface Location {
  id: string;
  name: string;
  x: number;
  y: number;
  description: string;
  story?: string;
}

const locations: Location[] = [
  {
    id: 'hawkins-lab',
    name: 'Hawkins Lab',
    x: 50,
    y: 30,
    description: 'The main venue - where the hackathon takes place',
    story: 'Deep within these walls, experiments push the boundaries of what\'s possible...'
  },
  {
    id: 'the-gate',
    name: 'The Gate',
    x: 70,
    y: 60,
    description: 'AI/ML Track Zone',
    story: 'The portal between dimensions. Only the bravest dare to approach.'
  },
  {
    id: 'arcade',
    name: 'Palace Arcade',
    x: 20,
    y: 70,
    description: 'Gaming & Chill Zone',
    story: 'Take a break with classic 80s games and refreshments.'
  },
  {
    id: 'school',
    name: 'Hawkins High',
    x: 35,
    y: 45,
    description: 'Workshop Hall',
    story: 'Knowledge is power. Attend workshops from industry experts.'
  },
  {
    id: 'library',
    name: 'Library',
    x: 80,
    y: 35,
    description: 'Quiet Coding Zone',
    story: 'Need focus? This peaceful zone is for deep work.'
  },
];

export default function HawkinsMap() {
  const { isUpsideDown, addSecret } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [visitedLocations, setVisitedLocations] = useState<string[]>([]);

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
    
    if (!visitedLocations.includes(location.id)) {
      setVisitedLocations(prev => [...prev, location.id]);
      
      // Secret achievement for visiting all locations
      if (visitedLocations.length === locations.length - 1) {
        addSecret();
      }
    }
  };

  return (
    <>
      {/* Map Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 px-4 py-2 rounded-full glass-dark flex items-center gap-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MapPin size={18} className="text-red-500" />
        <span className="text-gray-300 font-retro text-sm">MAP</span>
      </motion.button>

      {/* Map Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="glass-dark rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="stranger-title text-2xl">HAWKINS MAP</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X size={24} className="text-gray-400" />
                </button>
              </div>

              {/* Map Container */}
              <div className={`relative aspect-video rounded-xl overflow-hidden ${
                isUpsideDown ? 'bg-red-950/30' : 'bg-slate-800'
              }`}>
                {/* Map Background */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />

                {/* Radar Sweep */}
                <motion.div
                  className={`absolute inset-0 ${
                    isUpsideDown 
                      ? 'bg-gradient-conic from-red-500/20 via-transparent to-transparent' 
                      : 'bg-gradient-conic from-green-500/20 via-transparent to-transparent'
                  }`}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  style={{ transformOrigin: 'center center' }}
                />

                {/* Locations */}
                {locations.map(location => (
                  <motion.button
                    key={location.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                      visitedLocations.includes(location.id) ? 'opacity-100' : 'opacity-70'
                    }`}
                    style={{ left: `${location.x}%`, top: `${location.y}%` }}
                    onClick={() => handleLocationClick(location)}
                    whileHover={{ scale: 1.3 }}
                    animate={{
                      scale: selectedLocation?.id === location.id ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ duration: 0.5, repeat: selectedLocation?.id === location.id ? Infinity : 0 }}
                  >
                    {/* Ping Effect */}
                    <motion.div
                      className={`absolute w-8 h-8 rounded-full ${
                        isUpsideDown ? 'bg-red-500' : 'bg-green-500'
                      } -inset-2`}
                      animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    
                    {/* Marker */}
                    <div className={`relative w-4 h-4 rounded-full ${
                      visitedLocations.includes(location.id)
                        ? isUpsideDown ? 'bg-red-500' : 'bg-green-500'
                        : 'bg-gray-500'
                    } shadow-lg`}>
                      <div className="absolute inset-1 rounded-full bg-white/30" />
                    </div>
                    
                    {/* Label */}
                    <span className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-white font-retro bg-black/50 px-2 py-1 rounded">
                      {location.name}
                    </span>
                  </motion.button>
                ))}

                {/* Gate Portal (Upside Down only) */}
                {isUpsideDown && (
                  <motion.div
                    className="absolute w-20 h-20 portal"
                    style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </div>

              {/* Location Info */}
              <AnimatePresence>
                {selectedLocation && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="mt-6 glass rounded-xl p-4"
                  >
                    <h3 className="text-lg font-bold text-white mb-2">
                      {selectedLocation.name}
                    </h3>
                    <p className="text-gray-400 mb-2">{selectedLocation.description}</p>
                    {selectedLocation.story && (
                      <p className="text-red-400/70 text-sm italic font-retro">
                        "{selectedLocation.story}"
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Progress */}
              <div className="mt-4 flex items-center gap-2">
                <span className="text-gray-500 text-sm">Explored:</span>
                <div className="flex gap-1">
                  {locations.map(loc => (
                    <div
                      key={loc.id}
                      className={`w-2 h-2 rounded-full ${
                        visitedLocations.includes(loc.id)
                          ? isUpsideDown ? 'bg-red-500' : 'bg-green-500'
                          : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-500 text-sm">
                  {visitedLocations.length}/{locations.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
