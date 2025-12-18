import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

// Components
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedEvents from './components/FeaturedEvents';
import About from './components/About';
import Tracks from './components/Tracks';
import Schedule from './components/Schedule';
import Speakers from './components/Speakers';
import Registration from './components/Registration';
import FAQ from './components/FAQ';
import Sponsors from './components/Sponsors';
import Footer from './components/Footer';
import Gallery from './components/Gallery';

// Effects
import ParticleSystem from './components/effects/ParticleSystem';
import LightningEffect from './components/effects/LightningEffect';
import CRTEffect from './components/effects/CRTEffect';

// Interactive
import HawkinsMap from './components/interactive/HawkinsMap';
import TelekinesisMode from './components/interactive/TelekinesisMode';
import KonamiCode from './components/interactive/KonamiCode';
import DemogorgonHunt from './components/interactive/DemogorgonHunt';
import WalkieTalkie from './components/interactive/WalkieTalkie';
import CharacterSelect from './components/interactive/CharacterSelect';
import AchievementToast from './components/interactive/AchievementToast';
import MusicPlayer from './components/interactive/MusicPlayer';
import LiveStats from './components/interactive/LiveStats';
import FloatingNav from './components/interactive/FloatingNav';
import SecretPortal from './components/interactive/SecretPortal';
import LightWall from './components/interactive/LightWall';

function AppContent() {
  // Theme toggle only affects Hero section now
  const [isLoading, setIsLoading] = useState(true);
  const [showCharacterSelect, setShowCharacterSelect] = useState(false);

  // Check for night owl achievement
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 5) {
      // Midnight visit - could trigger achievement
    }
  }, []);

  // Show character select after loading for first-time visitors
  useEffect(() => {
    if (!isLoading && !localStorage.getItem('vortex_character')) {
      setTimeout(() => setShowCharacterSelect(true), 1000);
    }
  }, [isLoading]);

  const handleCharacterSelect = (characterId: string) => {
    localStorage.setItem('vortex_character', characterId);
    setShowCharacterSelect(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main Content */}
      {!isLoading && (
        <>
          {/* Background Effects */}
          <ParticleSystem />
          <LightningEffect />
          <CRTEffect />

          {/* Navigation */}
          <Navbar />

          {/* Main Sections */}
          <main>
            <Hero />
            <FeaturedEvents />
            <About />
            <Tracks />
            <Schedule />
            <Speakers />
            <Gallery />
            <Registration />
            <FAQ />
            <Sponsors />
          </main>

          {/* Footer */}
          <Footer />

          {/* Interactive Elements */}
          <HawkinsMap />
          <TelekinesisMode />
          <KonamiCode />
          <DemogorgonHunt />
          <WalkieTalkie />
          <MusicPlayer />
          <LiveStats />
          <FloatingNav />
          <AchievementToast />
          <SecretPortal />
          <LightWall />

          {/* Character Select Modal */}
          <AnimatePresence>
            {showCharacterSelect && (
              <CharacterSelect 
                isModal={true}
                onSelect={handleCharacterSelect}
                onClose={() => setShowCharacterSelect(false)}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
