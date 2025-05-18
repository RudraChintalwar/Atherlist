
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Star {
  element: HTMLDivElement;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

export default function StarryBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>();
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const stars: Star[] = [];
    const numStars = 150;
    
    // Create stars
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const size = Math.random();
      const opacity = Math.random() * 0.8 + 0.2;
      const speed = Math.random() * 0.05 + 0.01;
      
      star.style.setProperty('--star-opacity', opacity.toString());
      star.style.transform = `translate(${x}px, ${y}px)`;
      
      if (size > 0.8) {
        star.classList.add('large');
      }
      
      container.appendChild(star);
      stars.push({ element: star, x, y, size, opacity, speed });
    }
    
    starsRef.current = stars;
    
    // Animated background
    let time = 0;
    const animate = () => {
      time += 0.01;
      
      // Move stars
      stars.forEach(star => {
        star.y += star.speed;
        
        // Reset position if star moves off screen
        if (star.y > window.innerHeight) {
          star.y = -5;
          star.x = Math.random() * window.innerWidth;
        }
        
        star.element.style.transform = `translate(${star.x}px, ${star.y}px)`;
        
        // Twinkle effect
        const newOpacity = star.opacity * (0.7 + Math.sin(time * 3 + star.x) * 0.3);
        star.element.style.setProperty('--star-opacity', newOpacity.toString());
      });
      
      // Move glow effect
      if (glowRef.current) {
        const glowX = 50 + Math.sin(time) * 10;
        const glowY = 50 + Math.cos(time * 0.5) * 20;
        glowRef.current.style.left = `${glowX}%`;
        glowRef.current.style.top = `${glowY}%`;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    // Resize handler
    const handleResize = () => {
      stars.forEach(star => {
        if (star.x > window.innerWidth) {
          star.x = Math.random() * window.innerWidth;
        }
        if (star.y > window.innerHeight) {
          star.y = Math.random() * window.innerHeight;
        }
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      <div ref={containerRef} className="bg-stars" />
      
      {/* Cosmic nebula glow effect */}
      <motion.div
        ref={glowRef}
        className="absolute w-[60vw] h-[60vh] rounded-full bg-cosmic-purple opacity-10 blur-[100px]"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute left-[20%] top-[60%] w-[40vw] h-[40vh] rounded-full bg-cosmic-teal opacity-5 blur-[80px]"
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cosmic-dark/80" />
    </div>
  );
}
