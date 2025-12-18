import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  isUpsideDown: boolean;
  toggleWorld: () => void;
  secretsFound: number;
  addSecret: () => void;
  achievements: string[];
  unlockAchievement: (achievement: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isUpsideDown, setIsUpsideDown] = useState(false);
  const [secretsFound, setSecretsFound] = useState(0);
  const [achievements, setAchievements] = useState<string[]>([]);

  const toggleWorld = () => {
    setIsUpsideDown(!isUpsideDown);
    if (!achievements.includes('First Portal')) {
      unlockAchievement('First Portal');
    }
  };

  const addSecret = () => {
    setSecretsFound(prev => prev + 1);
    if (secretsFound + 1 >= 5 && !achievements.includes('Secret Hunter')) {
      unlockAchievement('Secret Hunter');
    }
  };

  const unlockAchievement = (achievement: string) => {
    if (!achievements.includes(achievement)) {
      setAchievements(prev => [...prev, achievement]);
      // Show toast notification
      showAchievementToast(achievement);
    }
  };

  const showAchievementToast = (achievement: string) => {
    const toast = document.createElement('div');
    toast.className = 'fixed top-20 right-4 z-50 glass-dark px-6 py-4 rounded-lg animate-bounce';
    toast.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-2xl">🏆</span>
        <div>
          <p class="text-xs text-red-400 uppercase tracking-wider">Achievement Unlocked</p>
          <p class="text-white font-bold">${achievement}</p>
        </div>
      </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'u' || e.key === 'U') {
        toggleWorld();
      }
    };
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [isUpsideDown]);

  return (
    <ThemeContext.Provider value={{ 
      isUpsideDown, 
      toggleWorld, 
      secretsFound, 
      addSecret, 
      achievements, 
      unlockAchievement 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
