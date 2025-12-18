import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
// Theme toggle only affects Hero section

// Import images
import eventImg1 from '../images/Gemini_Generated_Image_6gu0cw6gu0cw6gu0.png';
import eventImg2 from '../images/Gemini_Generated_Image_gshc50gshc50gshc.png';
import eventImg3 from '../images/Gemini_Generated_Image_wgfozxwgfozxwgfo.png';
import eventImg4 from '../images/Gemini_Generated_Image_x7dn4ex7dn4ex7dn.png';

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  category: string;
  aspectRatio: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: eventImg1,
    title: "Hackathon Night",
    category: "Venue",
    aspectRatio: "aspect-video"
  },
  {
    id: 2,
    src: eventImg2,
    title: "Coding Session",
    category: "Hackathon",
    aspectRatio: "aspect-video"
  },
  {
    id: 3,
    src: eventImg3,
    title: "Tech Arena",
    category: "Event",
    aspectRatio: "aspect-square"
  },
  {
    id: 4,
    src: eventImg4,
    title: "Innovation Zone",
    category: "Workshop",
    aspectRatio: "aspect-square"
  },
  {
    id: 5,
    src: eventImg1,
    title: "Award Ceremony",
    category: "Ceremony",
    aspectRatio: "aspect-video"
  },
  {
    id: 6,
    src: eventImg2,
    title: "Networking Lounge",
    category: "Lounge",
    aspectRatio: "aspect-video"
  },
  {
    id: 7,
    src: eventImg3,
    title: "Workshop Session",
    category: "Workshop",
    aspectRatio: "aspect-video"
  },
  {
    id: 8,
    src: eventImg4,
    title: "Team Collaboration",
    category: "Teamwork",
    aspectRatio: "aspect-square"
  },
];

export default function Gallery() {
  // Theme toggle only affects Hero section
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', ...new Set(galleryImages.map(img => img.category))];
  const filteredImages = filter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % filteredImages.length
      : (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <section id="gallery" className="py-24 relative overflow-hidden">
      <div className={`absolute inset-0 ${
        'bg-slate-900/30'
      }`} />

      <div className="max-w-7xl mx-auto px-4 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <span className="text-red-500 font-retro text-sm tracking-widest">
            VISUALS
          </span>
          <h2 className="stranger-title text-4xl md:text-5xl mt-4 mb-6">
            EVENT GALLERY
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            A glimpse into what awaits you at VORTEX 2025. 
            Experience the atmosphere before you arrive.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm capitalize transition-all ${
                filter === cat
                  ? 'bg-red-600 text-white'
                  : 'glass text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.1 }}
                className={`${image.aspectRatio} relative group cursor-pointer overflow-hidden rounded-xl`}
                onClick={() => setSelectedImage(image)}
              >
                {/* Actual Image */}
                <img 
                  src={image.src} 
                  alt={image.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-end justify-end p-4">
                  <p className="text-white font-bold text-lg">{image.title}</p>
                  <p className="text-white/70 text-sm">{image.category}</p>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3 px-2 py-1 glass rounded text-xs text-white/90">
                  {image.category}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12 glass-dark rounded-xl p-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-bold text-white mb-4">📸 Capture Your Moments</h3>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">
            Be part of VORTEX 2025 and create memories that last a lifetime.
            Join us for an unforgettable experience!
          </p>
          <motion.a
            href="#register"
            className="inline-block px-8 py-3 bg-red-600 text-white rounded-lg font-bold"
            whileHover={{ scale: 1.05 }}
          >
            Register Now
          </motion.a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 glass rounded-full z-10"
            >
              <X size={24} className="text-white" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
              className="absolute left-4 p-3 glass rounded-full"
            >
              <ChevronLeft size={24} className="text-white" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
              className="absolute right-4 p-3 glass rounded-full"
            >
              <ChevronRight size={24} className="text-white" />
            </button>

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-4xl w-full"
              onClick={e => e.stopPropagation()}
            >
              {/* Image Preview */}
              <div className="aspect-video relative rounded-xl overflow-hidden mb-4">
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="glass-dark rounded-xl p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold text-lg">{selectedImage.title}</h3>
                  <span className="text-gray-400 text-sm">{selectedImage.category}</span>
                </div>
                <span className="text-gray-500 text-sm">Image {selectedImage.id} of {filteredImages.length}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
