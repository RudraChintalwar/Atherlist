
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const HeroParticles = () => {
  const particlesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = particlesContainerRef.current;
    if (!container) return;
    
    // Clear any existing particles
    container.innerHTML = '';
    
    // Create static particles
    const numParticles = 40;
    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement('div');
      
      // Random properties
      const size = Math.random() * 3 + 1; // 1-4px
      const x = Math.random() * 100; // 0-100%
      const y = Math.random() * 100; // 0-100%
      const delay = Math.random() * 5; // 0-5s delay
      const duration = Math.random() * 10 + 15; // 15-25s
      const color = [
        '#8B5CF6', // Purple
        '#9b87f5', // Light purple
        '#D946EF', // Pink
        '#A9A6FF', // Lavender
      ][Math.floor(Math.random() * 4)];
      
      // Apply styles
      particle.className = 'absolute rounded-full';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = color;
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
      particle.style.opacity = (Math.random() * 0.5 + 0.2).toString();
      
      // Add animation with CSS
      particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
      
      container.appendChild(particle);
    }
    
    // Create the floating animation if it doesn't exist
    if (!document.getElementById('particle-keyframes')) {
      const style = document.createElement('style');
      style.id = 'particle-keyframes';
      style.textContent = `
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -10px) rotate(5deg); }
          50% { transform: translate(-5px, -5px) rotate(0deg); }
          75% { transform: translate(-10px, 10px) rotate(-5deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Cleanup
    return () => {
      if (document.getElementById('particle-keyframes')) {
        document.getElementById('particle-keyframes')?.remove();
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        ref={particlesContainerRef} 
        className="absolute inset-0 z-0"
      />
      
      {/* Cosmic glows */}
      <motion.div
        className="absolute w-[60vw] h-[60vh] rounded-full bg-cosmic-purple opacity-10 blur-[100px]"
        animate={{
          scale: [1, 1.05, 1],
          x: [0, 10, -10, 0],
          y: [0, -10, 10, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
      
      <motion.div
        className="absolute w-[40vw] h-[40vh] rounded-full bg-cosmic-teal opacity-5 blur-[80px]"
        animate={{
          scale: [1, 1.08, 1],
          x: [0, -15, 15, 0],
          y: [0, 15, -15, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        style={{
          left: '25%',
          top: '60%',
        }}
      />
    </div>
  );
};

export default HeroParticles;
