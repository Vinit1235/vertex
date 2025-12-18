import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SPONSORS } from '../data/eventData';
export default function Sponsors() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const renderSponsorTier = (sponsors: typeof SPONSORS.title, tierName: string, size: string) => (
    <div className="mb-12">
      <h3 className={`text-center text-sm text-gray-500 uppercase tracking-widest mb-6`}>
        {tierName} {tierName !== 'Title Sponsor' && 'Partners'}
      </h3>
      <div className="flex flex-wrap justify-center items-center gap-6">
        {sponsors.map((sponsor, index) => (
          <motion.div
            key={sponsor.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.1, y: -5 }}
            className={`glass rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${size}`}
          >
            <span className={`${
              tierName === 'Title Sponsor' ? 'text-6xl' : 
              tierName === 'Platinum' ? 'text-5xl' :
              tierName === 'Gold' ? 'text-4xl' : 'text-3xl'
            } mb-2`}>
              {sponsor.logo}
            </span>
            <span className="text-gray-400 text-sm">{sponsor.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="sponsors" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-800/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <span className="text-red-500 font-retro text-sm tracking-widest">
            PARTNERS
          </span>
          <h2 className="stranger-title text-4xl md:text-5xl mt-4 mb-6">
            OUR SPONSORS
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            VORTEX wouldn't be possible without our amazing sponsors. 
            They believe in empowering the next generation of innovators.
          </p>
        </motion.div>

        {/* Sponsor Tiers */}
        {renderSponsorTier(SPONSORS.title, 'Title Sponsor', 'w-48 h-36 p-6')}
        {renderSponsorTier(SPONSORS.platinum, 'Platinum', 'w-40 h-32 p-5')}
        {renderSponsorTier(SPONSORS.gold, 'Gold', 'w-36 h-28 p-4')}
        {renderSponsorTier(SPONSORS.silver, 'Silver', 'w-32 h-24 p-3')}
        {renderSponsorTier(SPONSORS.community, 'Community', 'w-28 h-20 p-2')}

        {/* Become a Sponsor CTA */}
        <motion.div
          className="text-center mt-16 glass-dark rounded-xl p-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-bold text-white mb-4">
            Interested in Sponsoring?
          </h3>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">
            Partner with VORTEX to reach 500+ talented developers, 
            promote your brand, and shape the future of tech.
          </p>
          <motion.a
            href="#contact"
            className="inline-block px-8 py-3 bg-red-600 text-white rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Become a Sponsor
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
