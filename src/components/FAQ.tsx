import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown } from 'lucide-react';
import { FAQ_DATA } from '../data/eventData';
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className={`absolute inset-0 ${
        'bg-slate-900/30'
      }`} />

      <div className="max-w-3xl mx-auto px-4 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <span className="text-red-500 font-retro text-sm tracking-widest">
            QUESTIONS
          </span>
          <h2 className="stranger-title text-4xl md:text-5xl mt-4 mb-6">
            FAQ
          </h2>
          <p className="text-gray-400">
            Everything you need to know about VORTEX. Can't find the answer? 
            <a href="#" className="text-red-400 hover:underline ml-1">Contact us</a>.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {FAQ_DATA.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className={`glass-dark rounded-xl overflow-hidden ${
                  openIndex === index ? 'ring-1 ring-red-500/50' : ''
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="text-white font-medium pr-4">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={20} className="text-red-500 flex-shrink-0" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 border-t border-gray-800">
                        <p className="text-gray-400 pt-4">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Still have questions */}
        <motion.div
          className="text-center mt-12 glass-dark rounded-xl p-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-bold text-white mb-4">Still have questions?</h3>
          <p className="text-gray-400 mb-6">
            Can't find the answer you're looking for? Reach out to our team.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="mailto:hello@vortex2025.com"
              className="px-6 py-3 bg-red-600 text-white rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Email Us
            </motion.a>
            <motion.a
              href="#"
              className="px-6 py-3 glass text-gray-300 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Discord
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
