import { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function KonamiCode() {
  const { unlockAchievement, addSecret } = useTheme();
  const [sequence, setSequence] = useState<string[]>([]);
  
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...sequence, e.code].slice(-konamiCode.length);
      setSequence(newSequence);

      if (newSequence.join(',') === konamiCode.join(',')) {
        // Konami code entered!
        unlockAchievement('Konami Master');
        addSecret();
        
        // Show 011 Easter egg
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 z-[100] bg-black flex items-center justify-center';
        overlay.innerHTML = `
          <div class="text-center">
            <p class="stranger-title text-9xl animate-pulse" style="color: #FF0000; text-shadow: 0 0 50px #FF0000;">011</p>
            <p class="text-gray-400 mt-4 font-retro">Friends don't lie.</p>
          </div>
        `;
        document.body.appendChild(overlay);
        
        setTimeout(() => {
          overlay.style.transition = 'opacity 1s';
          overlay.style.opacity = '0';
          setTimeout(() => overlay.remove(), 1000);
        }, 3000);

        setSequence([]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sequence, unlockAchievement, addSecret]);

  return null; // This is a background listener component
}
