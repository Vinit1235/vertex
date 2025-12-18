/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'hawkins-red': '#8B0000',
        'neon-red': '#FF0000',
        'upside-down': '#1a0a0a',
        'portal-blue': '#00BFFF',
        'stranger-pink': '#FF1493',
        'retro-yellow': '#FFD700',
        'mind-flayer': '#4A0E4E',
      },
      fontFamily: {
        'stranger': ['ITC Benguiat', 'Georgia', 'serif'],
        'retro': ['VT323', 'Courier New', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'flicker': 'flicker 3s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'lightning': 'lightning 5s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'glitch': 'glitch 1s linear infinite',
        'portal': 'portal 3s ease-in-out infinite',
        'christmas-light': 'christmas-light 1.5s ease-in-out infinite',
        'particle-float': 'particle-float 10s ease-in-out infinite',
        'shake': 'shake 0.5s ease-in-out',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': { opacity: '0.99' },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': { opacity: '0.4' },
        },
        glow: {
          '0%': { textShadow: '0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000' },
          '100%': { textShadow: '0 0 20px #ff0000, 0 0 30px #ff6666, 0 0 40px #ff0000' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        lightning: {
          '0%, 100%': { opacity: '0' },
          '10%': { opacity: '1' },
          '11%': { opacity: '0' },
          '12%': { opacity: '1' },
          '13%': { opacity: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        portal: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.1)', opacity: '1' },
        },
        'christmas-light': {
          '0%, 100%': { opacity: '1', filter: 'brightness(1.5)' },
          '50%': { opacity: '0.3', filter: 'brightness(0.5)' },
        },
        'particle-float': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(10px, -10px) rotate(90deg)' },
          '50%': { transform: 'translate(0, -20px) rotate(180deg)' },
          '75%': { transform: 'translate(-10px, -10px) rotate(270deg)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
      },
      backgroundImage: {
        'upside-gradient': 'linear-gradient(180deg, #0a0a0a 0%, #1a0505 50%, #2a0a0a 100%)',
        'normal-gradient': 'linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        'glass': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      },
      boxShadow: {
        'neon': '0 0 5px theme(colors.neon-red), 0 0 20px theme(colors.neon-red)',
        'neon-blue': '0 0 5px theme(colors.portal-blue), 0 0 20px theme(colors.portal-blue)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backdropBlur: {
        'glass': '10px',
      },
    },
  },
  plugins: [],
}
