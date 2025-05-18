
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import StarryBackground from '@/components/StarryBackground';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import Navbar from '@/components/Navbar';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  useEffect(() => {
    document.title = "AetherList - Your Universe of Tasks";
  }, []);

  return (
    <div className="min-h-screen bg-cosmic-dark overflow-x-hidden">
      <StarryBackground />
      <Navbar />
      
      <HeroSection />
      <FeaturesSection />
      
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto glass-card p-10 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Begin Your Cosmic Journey</h2>
            <p className="text-lg mb-8 text-white/70">
              Transform your tasks into an organized universe of productivity. Start planning now and experience a new way of managing your tasks.
            </p>
            <Button 
              size="lg"
              className="bg-cosmic-purple hover:bg-cosmic-purple/90 text-white px-8 py-6 rounded-lg shadow-cosmic hover:shadow-cosmic-hover transition-all duration-300"
              asChild
            >
              <Link to="/dashboard">
                Enter AetherList
              </Link>
            </Button>
          </motion.div>
        </div>
        
        <div className="absolute inset-0 z-[-1] opacity-30 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cosmic-purple blur-[100px]"></div>
        </div>
      </section>
      
      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-white/50 text-sm">
                &copy; {new Date().getFullYear()} AetherList - Your Universe of Tasks
              </p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-white/50 hover:text-white transition-colors duration-200">About</a>
              <a href="#" className="text-white/50 hover:text-white transition-colors duration-200">Privacy</a>
              <a href="#" className="text-white/50 hover:text-white transition-colors duration-200">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
