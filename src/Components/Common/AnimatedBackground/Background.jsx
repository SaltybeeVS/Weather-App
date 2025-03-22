import React, { useState, useEffect, useRef, useCallback } from "react";

// Static styles moved to Tailwind classes
const cyberParticleClasses = "absolute rounded-full blur-sm transition-transform duration-200 ease-out opacity-90";
const cyberEnergyBeamClasses = "absolute w-0.5 h-screen bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-80";

function Background() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const particles = useRef(
    Array.from({ length: 150 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 2,
      color: `hsl(${Math.random() * 360}, 100%, 80%)`,
    }))
  );

  const energyBeams = useRef(
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }))
  );

  // Throttle mouse handler using requestAnimationFrame
  const handleMouseMove = useCallback((e) => {
    requestAnimationFrame(() => {
      setMousePos({ x: e.clientX, y: e.clientY });
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-[-1] bg-[rgba(10,4,32,0.8)] overflow-hidden backdrop-blur-[12px]">
      <div className="absolute w-full h-full opacity-60 animate-glitchEffect bg-repeating-linear-gradient">
        <div 
          className="absolute w-[200%] h-[200%] opacity-80 bg-[length:40px_40px] animate-gridMove"
          style={{
            backgroundImage: `linear-gradient(rgba(0,255,255,0.2) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0,255,255,0.2) 1px, transparent 1px)`,
            transform: `translate(${-mousePos.x * 0.05}px, ${-mousePos.y * 0.05}px)`
          }}
        />
        
        {particles.current.map((particle) => (
          <div
            key={particle.id}
            className={cyberParticleClasses}
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              background: particle.color,
              transform: `translate(${(mousePos.x - particle.x) * 0.05}px, 
                                   ${(mousePos.y - particle.y) * 0.05}px)`,
              filter: `drop-shadow(0 0 6px ${particle.color})`
            }}
          />
        ))}

        {energyBeams.current.map((beam) => (
          <div
            key={beam.id}
            className={cyberEnergyBeamClasses}
            style={{
              left: beam.x,
              top: beam.y,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default React.memo(Background);