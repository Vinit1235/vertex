import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Music, Volume2, VolumeX, Radio, Play, Pause, SkipForward, SkipBack } from 'lucide-react';

// Radio stations with streaming URLs
const RADIO_STATIONS = [
  { id: 1, title: "80s Hits Radio", artist: "RetroFM", url: "https://streams.ilovemusic.de/iloveradio8.mp3" },
  { id: 2, title: "Classic Rock Radio", artist: "RockFM", url: "https://streams.ilovemusic.de/iloveradio16.mp3" },
  { id: 3, title: "Synthwave FM", artist: "Nightride.fm", url: "https://stream.nightride.fm/nightride.m4a" },
  { id: 4, title: "Chillsynth", artist: "Nightride.fm", url: "https://stream.nightride.fm/chillsynth.m4a" },
  { id: 5, title: "Lo-Fi Radio", artist: "LoFi Beats", url: "https://streams.ilovemusic.de/iloveradio17.mp3" },
];

export default function MusicPlayer() {
  const { isUpsideDown } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStation, setCurrentStation] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;
    
    audioRef.current.addEventListener('playing', () => {
      setIsLoading(false);
      setIsPlaying(true);
    });
    
    audioRef.current.addEventListener('waiting', () => {
      setIsLoading(true);
    });
    
    audioRef.current.addEventListener('error', () => {
      setIsLoading(false);
      setIsPlaying(false);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle play/pause
  const togglePlay = async () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      audioRef.current.src = RADIO_STATIONS[currentStation].url;
      try {
        await audioRef.current.play();
      } catch (err) {
        console.log('Playback failed:', err);
        setIsLoading(false);
      }
    }
  };

  // Change station
  const changeStation = async (index: number) => {
    if (!audioRef.current) return;
    setCurrentStation(index);
    
    if (isPlaying) {
      setIsLoading(true);
      audioRef.current.src = RADIO_STATIONS[index].url;
      try {
        await audioRef.current.play();
      } catch (err) {
        console.log('Playback failed:', err);
        setIsLoading(false);
      }
    }
  };

  const handleNext = () => {
    const nextIndex = (currentStation + 1) % RADIO_STATIONS.length;
    changeStation(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentStation - 1 + RADIO_STATIONS.length) % RADIO_STATIONS.length;
    changeStation(prevIndex);
  };

  // Handle volume change
  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Handle mute toggle
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      {/* Floating Music Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`
          fixed bottom-24 left-6 z-50 w-12 h-12 rounded-full
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
          className="fixed bottom-40 left-6 z-50 w-80"
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
                {RADIO_STATIONS[currentStation].title}
              </h4>
              <p className="text-gray-400 text-sm">
                {RADIO_STATIONS[currentStation].artist}
              </p>

              {/* Live Indicator */}
              <div className="mt-4 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`} />
                <span className="text-xs text-gray-400">{isPlaying ? 'LIVE' : 'OFFLINE'}</span>
                {isLoading && <span className="text-xs text-yellow-400">Loading...</span>}
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
                  onClick={togglePlay}
                  disabled={isLoading}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50"
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
                <button onClick={toggleMute}>
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-gray-400" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="flex-1 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer accent-red-500"
                />
              </div>
            </div>

            {/* Station List */}
            <div className="border-t border-red-900/30 max-h-40 overflow-y-auto">
              {RADIO_STATIONS.map((station, index) => (
                <button
                  key={station.id}
                  onClick={() => changeStation(index)}
                  className={`
                    w-full px-4 py-2 flex items-center justify-between text-left
                    hover:bg-red-900/20 transition-colors
                    ${index === currentStation ? 'bg-red-900/30' : ''}
                  `}
                >
                  <div className="flex items-center gap-3">
                    {index === currentStation && isPlaying ? (
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
                      <Radio className="w-4 h-4 text-gray-500" />
                    )}
                    <div>
                      <p className={`text-sm ${index === currentStation ? 'text-red-400' : 'text-white'}`}>
                        {station.title}
                      </p>
                      <p className="text-xs text-gray-500">{station.artist}</p>
                    </div>
                  </div>
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
