import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, Download, RotateCcw, Sliders } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function PhotoFilter() {
  const { addSecret } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [filteredImage, setFilteredImage] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    darkness: 50,
    spores: 30,
    decay: 20,
    vignette: 60,
    redTint: 40,
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        addSecret();
      };
      reader.readAsDataURL(file);
    }
  };

  const applyFilter = () => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw original image
      ctx.drawImage(img, 0, 0);

      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Apply Upside Down filter
      for (let i = 0; i < data.length; i += 4) {
        // Darken
        const darkFactor = 1 - (filters.darkness / 100) * 0.5;
        data[i] *= darkFactor;     // R
        data[i + 1] *= darkFactor; // G
        data[i + 2] *= darkFactor; // B

        // Red tint
        data[i] += (filters.redTint / 100) * 50;
        data[i + 1] -= (filters.redTint / 100) * 20;
        data[i + 2] -= (filters.redTint / 100) * 30;

        // Decay (desaturation with red bias)
        const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
        const decayFactor = filters.decay / 100;
        data[i] = data[i] * (1 - decayFactor) + gray * decayFactor + 20 * decayFactor;
        data[i + 1] = data[i + 1] * (1 - decayFactor) + gray * decayFactor * 0.7;
        data[i + 2] = data[i + 2] * (1 - decayFactor) + gray * decayFactor * 0.7;

        // Clamp values
        data[i] = Math.min(255, Math.max(0, data[i]));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1]));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2]));
      }

      ctx.putImageData(imageData, 0, 0);

      // Add vignette
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, canvas.width * 0.2,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.7
      );
      gradient.addColorStop(0, 'rgba(0,0,0,0)');
      gradient.addColorStop(1, `rgba(0,0,0,${filters.vignette / 100})`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add spores
      const sporeCount = Math.floor((filters.spores / 100) * 200);
      for (let i = 0; i < sporeCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 3 + 1;
        const opacity = Math.random() * 0.5 + 0.2;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 0, 0, ${opacity})`;
        ctx.fill();
      }

      // Add floating particles
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.beginPath();
        ctx.arc(x, y, Math.random() * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 100, 100, ${Math.random() * 0.3})`;
        ctx.fill();
      }

      setFilteredImage(canvas.toDataURL());
    };
    img.src = image;
  };

  useEffect(() => {
    if (image) {
      applyFilter();
    }
  }, [image, filters]);

  const downloadImage = () => {
    if (!filteredImage) return;
    const link = document.createElement('a');
    link.download = 'upside-down-photo.png';
    link.href = filteredImage;
    link.click();
  };

  const FilterSlider = ({ label, value, onChange, color }: {
    label: string;
    value: number;
    onChange: (v: number) => void;
    color: string;
  }) => (
    <div className="mb-3">
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, ${color} ${value}%, #374151 ${value}%)`
        }}
      />
    </div>
  );

  return (
    <>
      {/* Photo Filter Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-60 right-6 z-40 px-4 py-2 rounded-full glass-dark flex items-center gap-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Camera size={18} className="text-purple-500" />
        <span className="text-gray-300 font-retro text-sm">FILTER</span>
      </motion.button>

      {/* Photo Filter Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/90"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="glass-dark rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="stranger-title text-2xl">UPSIDE DOWN FILTER</h2>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-800 rounded-lg">
                  <X size={24} className="text-gray-400" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Image Area */}
                <div>
                  {!image ? (
                    <motion.div
                      onClick={() => fileInputRef.current?.click()}
                      className="aspect-video bg-gray-900 rounded-xl border-2 border-dashed border-gray-700 flex flex-col items-center justify-center cursor-pointer hover:border-red-500 transition-colors"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Camera size={48} className="text-gray-600 mb-4" />
                      <p className="text-gray-500">Click to upload an image</p>
                      <p className="text-gray-600 text-sm mt-2">Transform it to the Upside Down</p>
                    </motion.div>
                  ) : (
                    <div className="relative">
                      <img
                        src={filteredImage || image}
                        alt="Filtered"
                        className="w-full rounded-xl"
                      />
                      <div className="absolute bottom-4 right-4 flex gap-2">
                        <motion.button
                          onClick={() => { setImage(null); setFilteredImage(null); }}
                          className="p-2 glass rounded-lg"
                          whileHover={{ scale: 1.1 }}
                          title="Reset"
                        >
                          <RotateCcw size={20} className="text-white" />
                        </motion.button>
                        <motion.button
                          onClick={downloadImage}
                          className="p-2 bg-red-600 rounded-lg"
                          whileHover={{ scale: 1.1 }}
                          title="Download"
                        >
                          <Download size={20} className="text-white" />
                        </motion.button>
                      </div>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <canvas ref={canvasRef} className="hidden" />
                </div>

                {/* Controls */}
                <div className="glass rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Sliders size={20} className="text-red-500" />
                    <h3 className="text-white font-bold">Filter Controls</h3>
                  </div>

                  <FilterSlider
                    label="Darkness"
                    value={filters.darkness}
                    onChange={(v) => setFilters(f => ({ ...f, darkness: v }))}
                    color="#8B0000"
                  />
                  <FilterSlider
                    label="Spores"
                    value={filters.spores}
                    onChange={(v) => setFilters(f => ({ ...f, spores: v }))}
                    color="#FF4444"
                  />
                  <FilterSlider
                    label="Decay"
                    value={filters.decay}
                    onChange={(v) => setFilters(f => ({ ...f, decay: v }))}
                    color="#4A0E4E"
                  />
                  <FilterSlider
                    label="Vignette"
                    value={filters.vignette}
                    onChange={(v) => setFilters(f => ({ ...f, vignette: v }))}
                    color="#000000"
                  />
                  <FilterSlider
                    label="Red Tint"
                    value={filters.redTint}
                    onChange={(v) => setFilters(f => ({ ...f, redTint: v }))}
                    color="#FF0000"
                  />

                  {/* Preset Buttons */}
                  <div className="mt-6 pt-4 border-t border-gray-700">
                    <p className="text-gray-400 text-sm mb-3">Presets</p>
                    <div className="flex flex-wrap gap-2">
                      <motion.button
                        onClick={() => setFilters({ darkness: 70, spores: 50, decay: 40, vignette: 80, redTint: 60 })}
                        className="px-3 py-1 bg-red-900/50 text-red-400 rounded-lg text-sm"
                        whileHover={{ scale: 1.05 }}
                      >
                        Full Upside Down
                      </motion.button>
                      <motion.button
                        onClick={() => setFilters({ darkness: 30, spores: 20, decay: 10, vignette: 40, redTint: 20 })}
                        className="px-3 py-1 bg-purple-900/50 text-purple-400 rounded-lg text-sm"
                        whileHover={{ scale: 1.05 }}
                      >
                        Subtle
                      </motion.button>
                      <motion.button
                        onClick={() => setFilters({ darkness: 50, spores: 0, decay: 60, vignette: 50, redTint: 30 })}
                        className="px-3 py-1 bg-gray-700 text-gray-300 rounded-lg text-sm"
                        whileHover={{ scale: 1.05 }}
                      >
                        Vintage Decay
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="mt-6 p-4 bg-red-900/20 rounded-lg border border-red-900/30">
                <p className="text-red-400 text-sm">
                  💡 <strong>Tip:</strong> Upload a photo of yourself or your surroundings and transform it into the Upside Down! 
                  Share your creepy creation on social media with #VORTEX2025
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
