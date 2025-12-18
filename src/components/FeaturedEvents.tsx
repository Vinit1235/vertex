import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowRight, Trophy, Code, Mic, Gamepad2, Music, Laptop } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface FeaturedEvent {
  id: number;
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  teamSize: string;
  prize: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  registration: 'Open' | 'Closing Soon' | 'Closed';
}

const FEATURED_EVENTS: FeaturedEvent[] = [
  {
    id: 1,
    title: "Code in the Dark",
    category: "Coding",
    date: "Feb 15, 2025",
    time: "10:00 AM - 12:00 PM",
    venue: "Main Arena",
    teamSize: "Individual",
    prize: "₹25,000",
    description: "Code a website in complete darkness! No preview, no inspection - just pure HTML/CSS skills.",
    icon: <Code className="w-6 h-6" />,
    color: "from-red-500 to-orange-500",
    difficulty: "Intermediate",
    registration: "Open"
  },
  {
    id: 2,
    title: "AI Showdown",
    category: "ML Competition",
    date: "Feb 15, 2025",
    time: "2:00 PM - 6:00 PM",
    venue: "Lab Complex",
    teamSize: "2-4 members",
    prize: "₹50,000",
    description: "Build an AI model to solve a mystery dataset. Best accuracy wins!",
    icon: <Laptop className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
    difficulty: "Advanced",
    registration: "Closing Soon"
  },
  {
    id: 3,
    title: "Bug Bounty Hunt",
    category: "Cybersecurity",
    date: "Feb 15, 2025",
    time: "4:00 PM - 8:00 PM",
    venue: "Cyber Zone",
    teamSize: "Individual",
    prize: "₹30,000",
    description: "Find vulnerabilities in our custom-built applications. Every bug counts!",
    icon: <Trophy className="w-6 h-6" />,
    color: "from-emerald-500 to-teal-500",
    difficulty: "Advanced",
    registration: "Open"
  },
  {
    id: 4,
    title: "Tech Talk: Future of AI",
    category: "Speaker Session",
    date: "Feb 15, 2025",
    time: "11:00 AM - 12:30 PM",
    venue: "Auditorium",
    teamSize: "All Welcome",
    prize: "Certificates",
    description: "Industry experts discuss AI trends, GPT revolution, and what's next for developers.",
    icon: <Mic className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500",
    difficulty: "Beginner",
    registration: "Open"
  },
  {
    id: 5,
    title: "Retro Gaming Tournament",
    category: "Gaming",
    date: "Feb 15, 2025",
    time: "8:00 PM - 11:00 PM",
    venue: "Arcade Zone",
    teamSize: "Individual",
    prize: "₹10,000",
    description: "Classic 80s arcade games competition. Pac-Man, Space Invaders, and more!",
    icon: <Gamepad2 className="w-6 h-6" />,
    color: "from-yellow-500 to-amber-500",
    difficulty: "Beginner",
    registration: "Open"
  },
  {
    id: 6,
    title: "Synthwave Night",
    category: "Cultural",
    date: "Feb 15, 2025",
    time: "9:00 PM - 12:00 AM",
    venue: "Open Stage",
    teamSize: "All Welcome",
    prize: "Vibes Only",
    description: "80s themed DJ night with neon lights, synth music, and dance battles!",
    icon: <Music className="w-6 h-6" />,
    color: "from-pink-500 to-violet-500",
    difficulty: "Beginner",
    registration: "Open"
  }
];

const categoryFilters = ['All', 'Coding', 'ML Competition', 'Cybersecurity', 'Speaker Session', 'Gaming', 'Cultural'];

export default function FeaturedEvents() {
  const { isUpsideDown } = useTheme();
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredEvents = activeFilter === 'All' 
    ? FEATURED_EVENTS 
    : FEATURED_EVENTS.filter(event => event.category === activeFilter);

  return (
    <section id="events" className={`py-20 relative overflow-hidden ${
      isUpsideDown ? 'bg-black' : 'bg-slate-950'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, ${isUpsideDown ? '#ff0000' : '#ffffff'} 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium mb-4">
            Featured Events
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What's <span className="text-red-500">Happening</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            From intense coding battles to epic gaming tournaments - there's something for everyone at VORTEX 2025
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {categoryFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Events Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className="group relative"
              >
                {/* Glow Effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${event.color} rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
                
                <div className="relative h-full glass-dark rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all">
                  {/* Category & Difficulty Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${event.color} text-white text-xs font-medium`}>
                      {event.icon}
                      {event.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      event.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                      event.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {event.difficulty}
                    </span>
                  </div>

                  {/* Event Title */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                    {event.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-3.5 h-3.5 text-red-500" />
                      <span>{event.date} • {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <MapPin className="w-3.5 h-3.5 text-red-500" />
                      <span>{event.venue}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Users className="w-3.5 h-3.5 text-red-500" />
                      <span>{event.teamSize}</span>
                    </div>
                  </div>

                  {/* Prize & Registration */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                      <span className="text-xs text-gray-500">Prize Pool</span>
                      <div className="text-lg font-bold text-white">{event.prize}</div>
                    </div>
                    <motion.a
                      href={event.registration !== 'Closed' ? '#register' : undefined}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        event.registration === 'Open'
                          ? 'bg-red-500 hover:bg-red-600 text-white'
                          : event.registration === 'Closing Soon'
                          ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          : 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
                      }`}
                      whileHover={{ scale: event.registration !== 'Closed' ? 1.05 : 1 }}
                      whileTap={{ scale: event.registration !== 'Closed' ? 0.95 : 1 }}
                    >
                      {event.registration === 'Open' && 'Register'}
                      {event.registration === 'Closing Soon' && 'Almost Full'}
                      {event.registration === 'Closed' && 'Closed'}
                      {event.registration === 'Open' && <ArrowRight className="w-4 h-4" />}
                    </motion.a>
                  </div>

                  {/* Status Indicator */}
                  {event.registration === 'Closing Soon' && (
                    <motion.div
                      className="absolute top-3 right-3 flex items-center gap-1"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                      </span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Link */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <a
            href="#schedule"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            View Complete Schedule
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Stats Banner */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {[
            { value: '20+', label: 'Events', icon: '🎯' },
            { value: '₹5L+', label: 'Total Prizes', icon: '💰' },
            { value: '50+', label: 'Speakers', icon: '🎤' },
            { value: '36hrs', label: 'Non-Stop Action', icon: '⚡' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="glass-dark rounded-xl p-4 text-center border border-white/5"
              whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.2)' }}
            >
              <span className="text-2xl mb-1 block">{stat.icon}</span>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
