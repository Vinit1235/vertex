import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Twitter, Linkedin } from 'lucide-react';
import { SPEAKERS } from '../data/eventData';
export default function Speakers() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="speakers" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className={`absolute inset-0 ${
        'bg-slate-900/30'
      }`} />

      <div className="max-w-7xl mx-auto px-4 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <span className="text-red-500 font-retro text-sm tracking-widest">
            MENTORS
          </span>
          <h2 className="stranger-title text-4xl md:text-5xl mt-4 mb-6">
            SPEAKERS & MENTORS
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Learn from industry experts who have conquered their own dimensions. 
            Get guidance, feedback, and inspiration from the best.
          </p>
        </motion.div>

        {/* Speakers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SPEAKERS.map((speaker, index) => (
            <motion.div
              key={speaker.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <motion.div
                className="glass-dark rounded-xl overflow-hidden"
                whileHover={{ y: -10 }}
              >
                {/* Speaker Image */}
                <div className="relative aspect-square bg-gradient-to-br from-red-900/30 to-black overflow-hidden">
                  <img 
                    src={speaker.image} 
                    alt={speaker.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                  {/* Social Links on hover */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.a
                      href={speaker.social.twitter}
                      className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Twitter size={18} />
                    </motion.a>
                    <motion.a
                      href={speaker.social.linkedin}
                      className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Linkedin size={18} />
                    </motion.a>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {speaker.name}
                  </h3>
                  <p className="text-red-400 text-sm mb-1">{speaker.role}</p>
                  <p className="text-gray-500 text-sm mb-3">{speaker.company}</p>
                  
                  <div className="pt-3 border-t border-gray-800">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                      Speaking On
                    </p>
                    <p className="text-gray-300 text-sm">{speaker.topic}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Become a Mentor CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <p className="text-gray-400 mb-4">
            Interested in mentoring at VORTEX?
          </p>
          <motion.a
            href="#contact"
            className="inline-block px-6 py-3 border border-red-500 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Apply as Mentor
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
