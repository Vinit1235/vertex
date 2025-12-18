import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SCHEDULE } from '../data/eventData';
import { useTheme } from '../context/ThemeContext';

const typeColors: Record<string, string> = {
  registration: 'bg-green-500',
  ceremony: 'bg-purple-500',
  hackathon: 'bg-red-500',
  break: 'bg-yellow-500',
  workshop: 'bg-blue-500',
  mentorship: 'bg-cyan-500',
  cultural: 'bg-pink-500',
};

const typeIcons: Record<string, string> = {
  registration: '📋',
  ceremony: '🎭',
  hackathon: '💻',
  break: '☕',
  workshop: '🔧',
  mentorship: '🎓',
  cultural: '🎉',
};

export default function Schedule() {
  const { isUpsideDown } = useTheme();
  const [activeDay, setActiveDay] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="schedule" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className={`absolute inset-0 ${
        isUpsideDown 
          ? 'bg-gradient-to-b from-transparent via-red-950/10 to-transparent' 
          : 'bg-gradient-to-b from-transparent via-slate-800/30 to-transparent'
      }`} />

      <div className="max-w-5xl mx-auto px-4 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <span className="text-red-500 font-retro text-sm tracking-widest">
            TIMELINE
          </span>
          <h2 className="stranger-title text-4xl md:text-5xl mt-4 mb-6">
            EVENT SCHEDULE
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Two days of intense coding, learning, and fun. 
            Here's what awaits you in the Upside Down.
          </p>
        </motion.div>

        {/* Day Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          {SCHEDULE.map((day, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveDay(index)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeDay === index
                  ? 'bg-red-600 text-white shadow-neon'
                  : 'glass text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {day.day}
            </motion.button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 via-red-500/50 to-transparent" />

          {/* Events */}
          <div className="space-y-8">
            {SCHEDULE[activeDay].events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-red-500 -translate-x-1/2 shadow-neon z-10" />

                {/* Time (Desktop) */}
                <div className={`hidden md:block w-1/2 ${
                  index % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'
                }`}>
                  <span className="text-red-400 font-retro text-lg">{event.time}</span>
                </div>

                {/* Event Card */}
                <motion.div
                  className={`ml-16 md:ml-0 w-full md:w-1/2 ${
                    index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="glass-dark rounded-xl p-6 relative overflow-hidden group">
                    {/* Type Indicator */}
                    <div className={`absolute top-0 left-0 w-1 h-full ${typeColors[event.type]}`} />
                    
                    {/* Mobile Time */}
                    <span className="md:hidden text-red-400 font-retro text-sm mb-2 block">
                      {event.time}
                    </span>

                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{typeIcons[event.type]}</span>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">
                          {event.title}
                        </h3>
                        <p className="text-gray-400 text-sm">{event.description}</p>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          {Object.entries(typeColors).map(([type, color]) => (
            <div key={type} className="flex items-center gap-2 text-sm text-gray-400">
              <span className={`w-3 h-3 rounded-full ${color}`} />
              <span className="capitalize">{type}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
