import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Instagram, Linkedin, Mail, MapPin, Heart } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const christmasLightColors = [
  'bg-red-500', 'bg-yellow-400', 'bg-green-500', 'bg-blue-500', 
  'bg-pink-500', 'bg-purple-500', 'bg-orange-500', 'bg-cyan-400'
];

export default function Footer() {
  const { addSecret } = useTheme();
  const [clickCount, setClickCount] = useState(0);

  // Easter egg: Click logo 5 times
  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount === 5) {
      addSecret();
      setClickCount(0);
    }
  };

  const footerLinks = {
    event: [
      { name: 'About', href: '#about' },
      { name: 'Tracks', href: '#tracks' },
      { name: 'Schedule', href: '#schedule' },
      { name: 'Speakers', href: '#speakers' },
    ],
    register: [
      { name: 'Register', href: '#register' },
      { name: 'Team Formation', href: '#' },
      { name: 'Prizes', href: '#' },
      { name: 'FAQ', href: '#faq' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Code of Conduct', href: '#' },
      { name: 'Contact', href: '#' },
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="relative pt-24 pb-12 overflow-hidden">
      {/* Christmas Lights */}
      <div className="absolute top-0 left-0 right-0 flex justify-between px-2">
        {[...Array(26)].map((_, i) => (
          <motion.div
            key={i}
            className={`christmas-light ${christmasLightColors[i % christmasLightColors.length]}`}
            style={{
              animationDelay: `${i * 0.1}s`,
              boxShadow: `0 0 10px ${christmasLightColors[i % christmasLightColors.length].replace('bg-', '').replace('-500', '')}`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
          />
        ))}
      </div>

      {/* Wire connecting lights */}
      <div className="absolute top-3 left-0 right-0 h-0.5 bg-gray-700" />

      <div className="absolute inset-0 bg-slate-900/50" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <motion.div
              className="flex items-center gap-3 mb-6 cursor-pointer"
              onClick={handleLogoClick}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center shadow-neon">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <span className="stranger-title text-2xl">VORTEX</span>
            </motion.div>
            
            <p className="text-gray-400 mb-6">
              The ultimate hackathon experience. 36 hours of coding, creativity, 
              and connection in the Upside Down.
            </p>

            {/* Location */}
            <div className="flex items-center gap-2 text-gray-500 mb-4">
              <MapPin size={16} className="text-red-500" />
              <span className="text-sm">Hawkins, Indiana</span>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2 text-gray-500">
              <Mail size={16} className="text-red-500" />
              <a href="mailto:hello@vortex2025.com" className="text-sm hover:text-red-400 transition-colors">
                hello@vortex2025.com
              </a>
            </div>
          </div>

          {/* Event Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Event</h4>
            <ul className="space-y-3">
              {footerLinks.event.map(link => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Participate Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Participate</h4>
            <ul className="space-y-3">
              {footerLinks.register.map(link => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map(link => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="glass-dark rounded-xl p-8 mb-16">
          <div className="md:flex items-center justify-between gap-8">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold text-white mb-2">Stay Updated</h3>
              <p className="text-gray-400">Get the latest news and updates about VORTEX.</p>
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="retro-input rounded-lg flex-1 md:w-64"
              />
              <motion.button
                className="px-6 py-3 bg-red-600 text-white rounded-lg whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-gray-500 text-sm flex items-center gap-1">
            © 2025 VORTEX. Made with <Heart size={14} className="text-red-500" /> by the Hawkins team.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map(social => (
              <motion.a
                key={social.label}
                href={social.href}
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-500/20 transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.label}
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </div>

          {/* Back to top */}
          <motion.a
            href="#"
            className="text-gray-500 text-sm hover:text-white transition-colors"
            whileHover={{ y: -2 }}
          >
            Back to top ↑
          </motion.a>
        </div>

        {/* Hidden Easter Egg Text */}
        <div className="mt-8 text-center">
          <p className="text-gray-800 text-xs font-retro select-none">
            Friends don't lie.
          </p>
        </div>
      </div>
    </footer>
  );
}
