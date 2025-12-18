import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Music, Volume2, VolumeX, Radio, Play, Pause, SkipForward, SkipBack } from 'lucide-react';

// 80s themed playlist (just UI, no actual audio)
const PLAYLIST = [
  { id: 1, title: "Should I Stay or Should I Go", artist: "The Clash", duration: "3:08" },
  { id: 2, title: "Running Up That Hill", artist: "Kate Bush", duration: "4:58" },
  { id: 3, title: "Africa", artist: "Toto", duration: "4:55" },
  { id: 4, title: "Every Breath You Take", artist: "The Police", duration: "4:14" },
  { id: 5, title: "Hazy Shade of Winter", artist: "The Bangles", duration: "3:10" },
  { id: 6, title: "Pass the Dutchie", artist: "Musical Youth", duration: "3:45" },
  { id: 7, title: "Atmosphere", artist: "Joy Division", duration: "4:10" },
  { id: 8, title: "Heroes", artist: "Peter Gabriel", duration: "6:11" },
];

export default function MusicPlayer() {
  const { isUpsideDown } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(35);

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % PLAYLIST.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentTrack((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
    setProgress(0);
  };

  return (
    <>
      {/* Floating Music Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`
          fixed bottom-24 right-6 z-50 w-12 h-12 rounded-full
          ${isUpsideDown ? 'bg-red-900/80' : 'bg-slate-800/80'}
          backdrop-blur-sm border border-red-500/30
          flex items-center justify-center
          hover:scale-110 transition-transform
          shadow-lg shadow-red-500/20
        `}
        animate={isPlaying ? {
          boxShadow: ['0 0 10px #FF0000', '0 0 20px #FF0000', '0 0 10px #FF0000']
        } : {}}
        transition={{ duration: 1, repeat: Infinity }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Radio className="w-6 h-6 text-red-500" />
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-red-500"
            animate={{ scale: [1, 1.3], opacity: [0.8, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Music Player Panel */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-40 right-6 z-50 w-80"
        >
          <div className={`
            rounded-xl overflow-hidden
            ${isUpsideDown ? 'bg-red-950/95' : 'bg-slate-900/95'}
            backdrop-blur-md border border-red-500/30
            shadow-2xl shadow-red-500/20
          `}>
            {/* Header */}
            <div className="bg-gradient-to-r from-red-900/50 to-slate-900/50 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Music className="w-5 h-5 text-red-500" />
                <span className="font-retro text-sm text-red-400">HAWKINS RADIO</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>

            {/* Visualizer */}
            <div className="h-12 bg-black/30 flex items-end justify-center gap-1 px-4 py-2">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 bg-gradient-to-t from-red-600 to-red-400 rounded-t"
                  animate={isPlaying ? {
                    height: [
                      `${10 + Math.random() * 30}px`,
                      `${10 + Math.random() * 30}px`,
                      `${10 + Math.random() * 30}px`,
                    ]
                  } : { height: '10px' }}
                  transition={{ duration: 0.3, repeat: Infinity, repeatType: 'reverse' }}
                />
              ))}
            </div>

            {/* Current Track */}
            <div className="p-4">
              <h4 className="text-white font-bold truncate">
                {PLAYLIST[currentTrack].title}
              </h4>
              <p className="text-gray-400 text-sm">
                {PLAYLIST[currentTrack].artist}
              </p>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-red-600 to-red-400"
                    animate={isPlaying ? { width: ['0%', '100%'] } : {}}
                    transition={{ duration: 180, ease: 'linear' }}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1:05</span>
                  <span>{PLAYLIST[currentTrack].duration}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-6 mt-4">
                <button 
                  onClick={handlePrev}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <SkipBack className="w-5 h-5" />
                </button>
                
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center hover:scale-105 transition-transform"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white ml-1" />
                  )}
                </button>
                
                <button 
                  onClick={handleNext}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-2 mt-4">
                <button onClick={() => setIsMuted(!isMuted)}>
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-gray-400" />
                  )}
                </button>
                <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-3/4" />
                </div>
              </div>
            </div>

            {/* Playlist */}
            <div className="border-t border-red-900/30 max-h-40 overflow-y-auto">
              {PLAYLIST.map((track, index) => (
                <button
                  key={track.id}
                  onClick={() => {
                    setCurrentTrack(index);
                    setProgress(0);
                  }}
                  className={`
                    w-full px-4 py-2 flex items-center justify-between text-left
                    hover:bg-red-900/20 transition-colors
                    ${index === currentTrack ? 'bg-red-900/30' : ''}
                  `}
                >
                  <div className="flex items-center gap-3">
                    {index === currentTrack && isPlaying ? (
                      <motion.div
                        className="w-4 flex items-end gap-0.5"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="w-1 bg-red-500 rounded-t" style={{ height: `${6 + i * 2}px` }} />
                        ))}
                      </motion.div>
                    ) : (
                      <span className="text-gray-500 text-xs w-4">{index + 1}</span>
                    )}
                    <div>
                      <p className={`text-sm ${index === currentTrack ? 'text-red-400' : 'text-white'}`}>
                        {track.title}
                      </p>
                      <p className="text-xs text-gray-500">{track.artist}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{track.duration}</span>
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="bg-black/30 px-4 py-2 text-center">
              <p className="text-xs text-gray-600">
                🎵 The official VORTEX 2025 playlist
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
