
import { motion } from 'framer-motion';
import { CheckCircle, Star, Timer, Shield } from 'lucide-react';

const features = [
  {
    icon: <Star className="h-8 w-8 text-cosmic-purple" />,
    title: 'Cosmic Prioritization',
    description: 'Visualize your tasks as celestial bodies with gravitational priority, helping you focus on what truly matters.'
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-cosmic-teal" />,
    title: 'Task Universe',
    description: 'Organize your projects in an interactive galaxy of related tasks and subtasks that evolve as you complete them.'
  },
  {
    icon: <Timer className="h-8 w-8 text-cosmic-pink" />,
    title: 'Zen Focus Mode',
    description: 'Enter a distraction-free environment with ambient sounds and visual cues to achieve deep work states.'
  },
  {
    icon: <Shield className="h-8 w-8 text-cosmic-lightPurple" />,
    title: 'Visual Progress',
    description: 'Watch your productivity visualized through stunning cosmic charts and animated progress indicators.'
  }
];

export default function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-cosmic-gradient">
            Celestial Features
          </h2>
          <p className="text-lg text-white/70">
            Experience productivity like never before with these cosmic-powered features
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="glass-card p-6 hover:translate-y-[-5px] transition-all duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <div className="absolute inset-0 z-[-1] opacity-30 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-cosmic-purple blur-[100px]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-cosmic-pink blur-[100px]"></div>
      </div>
    </section>
  );
}
