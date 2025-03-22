import React, { useState, useEffect } from "react";
import "./Background.modules.css";

function Background() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [energyBeams, setEnergyBeams] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    const initParticles = () => {
      const newParticles = Array.from({ length: 150 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 2,
        color: `hsl(${Math.random() * 360}, 100%, 80%)`,
      }));
      setParticles(newParticles);
    };

    const initEnergyBeams = () => {
      const beams = Array.from({ length: 10 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      }));
      setEnergyBeams(beams);
    };

    initParticles();
    initEnergyBeams();

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="cyber-background">
      <div className="crt-effect"></div>
      
      <div
        className="cyber-grid"
        style={{
          transform: `translate(
            ${-mousePos.x * 0.05}px, 
            ${-mousePos.y * 0.05}px
          )`,
        }}
      ></div>

      {particles.map((particle) => (
        <div
          key={particle.id}
          className="cyber-particle"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            background: particle.color,
            transform: `translate(
              ${(mousePos.x - particle.x) * 0.05}px,
              ${(mousePos.y - particle.y) * 0.05}px
            )`,
          }}
        ></div>
      ))}

      {energyBeams.map((beam) => (
        <div
          key={beam.id}
          className="cyber-energy-beam"
          style={{
            left: beam.x,
            top: beam.y,
          }}
        ></div>
      ))}
      
      <div className="cyber-glitch"></div>
    </div>
  );
}

export default Background;
