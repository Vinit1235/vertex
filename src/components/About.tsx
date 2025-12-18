import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HIGHLIGHTS, WHO_IS_THIS_FOR } from '../data/eventData';
export default function About() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className={`absolute inset-0 transition-colors duration-500 ${
        'bg-slate-900/50'
      }`} />

      <div className="max-w-7xl mx-auto px-4 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-red-500 font-retro text-sm tracking-widest">
            WHY ATTEND
          </span>
          <h2 className="stranger-title text-4xl md:text-5xl mt-4 mb-6">
            ENTER THE UNKNOWN
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            36 hours of non-stop innovation, creativity, and adventure. 
            Build the future, break barriers, and discover what lies beyond.
          </p>
        </motion.div>

        {/* Highlights Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {HIGHLIGHTS.map((highlight, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-dark rounded-xl p-6 text-center card-hover"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl mb-4">{highlight.icon}</div>
              <h3 className="text-white font-bold mb-2">{highlight.title}</h3>
              <p className="text-gray-400 text-sm">{highlight.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Who Is This For */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-center text-2xl md:text-3xl font-bold text-white mb-12">
            Who Is This For?
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHO_IS_THIS_FOR.map((item, index) => (
              <motion.div
                key={index}
                className="glass rounded-xl p-8 text-center relative overflow-hidden group"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -10 }}
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity bg-blue-500" />
                
                <div className="text-5xl mb-4">{item.icon}</div>
                <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
