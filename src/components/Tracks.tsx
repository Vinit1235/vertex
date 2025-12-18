import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronRight } from 'lucide-react';
import { TRACKS } from '../data/eventData';
import { useTheme } from '../context/ThemeContext';

export default function Tracks() {
  const { isUpsideDown } = useTheme();
  const [selectedTrack, setSelectedTrack] = useState<number | null>(null);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="tracks" className="py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 50px,
            ${isUpsideDown ? '#FF0000' : '#00BFFF'} 50px,
            ${isUpsideDown ? '#FF0000' : '#00BFFF'} 51px
          )`
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <span className="text-red-500 font-retro text-sm tracking-widest">
            CHALLENGES
          </span>
          <h2 className="stranger-title text-4xl md:text-5xl mt-4 mb-6">
            TRACKS & CHALLENGES
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose your dimension. Each track offers unique challenges 
            designed to push your limits and unlock your potential.
          </p>
        </motion.div>

        {/* Tracks Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRACKS.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <motion.div
                className={`glass-dark rounded-xl p-6 cursor-pointer transition-all duration-300 h-full ${
                  selectedTrack === track.id ? 'ring-2 ring-red-500' : ''
                }`}
                onClick={() => setSelectedTrack(selectedTrack === track.id ? null : track.id)}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${track.color} opacity-10`} />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-5xl">{track.icon}</span>
                    <span className="text-xs text-gray-500 font-retro">
                      TRACK {track.id.toString().padStart(2, '0')}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-1">{track.name}</h3>
                  <p className="text-red-400 text-sm mb-3">{track.subtitle}</p>
                  <p className="text-gray-400 mb-4">{track.description}</p>
                  
                  <motion.div
                    className="flex items-center gap-2 text-red-400 text-sm"
                    animate={{ x: selectedTrack === track.id ? 5 : 0 }}
                  >
                    <span>View Challenges</span>
                    <ChevronRight size={16} className={`transition-transform ${
                      selectedTrack === track.id ? 'rotate-90' : ''
                    }`} />
                  </motion.div>
                </div>

                {/* Expanded Challenges */}
                <AnimatePresence>
                  {selectedTrack === track.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-gray-800 mt-4 pt-4">
                        <p className="text-xs text-gray-500 uppercase mb-3">Challenges:</p>
                        <ul className="space-y-2">
                          {track.challenges.map((challenge, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-center gap-2 text-sm text-gray-300"
                            >
                              <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                              {challenge}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <p className="text-gray-500 mb-4">Can't decide? No worries!</p>
          <p className="text-gray-400">
            You can switch tracks during the event or work on cross-track projects.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
