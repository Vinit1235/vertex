import { useTheme } from '../../context/ThemeContext';

export default function CRTEffect() {
  const { isUpsideDown } = useTheme();

  if (!isUpsideDown) return null;

  return (
    <>
      {/* Scanlines */}
      <div className="crt-overlay" />
      
      {/* Vignette */}
      <div 
        className="fixed inset-0 pointer-events-none z-[9998]"
        style={{
          background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.8) 100%)',
        }}
      />

      {/* Chromatic Aberration effect (subtle) */}
      <div 
        className="fixed inset-0 pointer-events-none z-[9997] mix-blend-screen opacity-10"
        style={{
          background: 'linear-gradient(90deg, rgba(255,0,0,0.1) 0%, transparent 50%, rgba(0,255,255,0.1) 100%)',
        }}
      />
    </>
  );
}
