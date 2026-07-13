import { useEffect, useState } from 'react';

export default function MouseTracker() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      // If hovering over a clickable element, we could increase glow intensity
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <div className="animated-grid" />
      <div
        id="mouse-glow"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          opacity: isHovering ? 0.8 : 0.4,
          background: isHovering 
            ? 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 40%)' 
            : 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 50%)'
        }}
      />
    </>
  );
}
