
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import HeroParticles from './ui/HeroParticles';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <HeroParticles />
      
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto"
        >
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-cosmic-gradient"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            AetherList
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/80 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Your Universe of Tasks
          </motion.p>
          
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8">
              Organize your tasks in a cosmic productivity chamber where each task orbits with its own gravitational priority in your mental solar system.
            </p>
          </motion.div>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Button 
              size="lg"
              className="bg-cosmic-purple hover:bg-cosmic-purple/90 text-white px-8 py-6 rounded-lg shadow-cosmic hover:shadow-cosmic-hover transition-all duration-300"
              asChild
            >
              <Link to="/dashboard">
                Start Planning
              </Link>
            </Button>
            <Button 
              size="lg"
              variant="outline" 
              className="border-cosmic-pink/50 hover:border-cosmic-pink bg-background/30 backdrop-blur-sm text-white px-8 py-6 rounded-lg shadow-cosmic-pink hover:shadow-cosmic-hover transition-all duration-300"
              asChild
            >
              <Link to="/focus">
                Enter Zen Mode
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 1.2,
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0.5
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-white/60">
            <path d="M12 5v14m-7-7 7 7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
