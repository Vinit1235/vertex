import { useEffect, useRef, CSSProperties, ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  className?: string;
}

export default function GradientText({
  children,
  colors = ["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"],
  animationSpeed = 3,
  showBorder = false,
  className = "",
}: GradientTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const gradient = `linear-gradient(90deg, ${colors.join(', ')})`;
      textRef.current.style.backgroundImage = gradient;
      textRef.current.style.backgroundSize = '300% 100%';
      textRef.current.style.animation = `gradient-shift ${animationSpeed}s ease infinite`;
    }
  }, [colors, animationSpeed]);

  const baseStyles: CSSProperties = {
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    display: 'inline-block',
  };

  const borderStyles: CSSProperties = showBorder ? {
    padding: '0.5rem 1rem',
    border: '2px solid transparent',
    borderImage: `linear-gradient(90deg, ${colors.join(', ')}) 1`,
    borderRadius: '0.5rem',
  } : {};

  return (
    <>
      <style>
        {`
          @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
      <span
        ref={textRef}
        className={className}
        style={{ ...baseStyles, ...borderStyles }}
      >
        {children}
      </span>
    </>
  );
}
