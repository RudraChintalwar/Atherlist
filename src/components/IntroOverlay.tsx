
import { motion } from 'framer-motion';

export default function IntroOverlay() {
  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-cosmic-dark flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 3 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center">
        <motion.div 
          className="mb-6 inline-block"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: [0.5, 1.2, 1], opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div className="w-24 h-24 mx-auto rounded-full bg-cosmic-purple shadow-cosmic-hover flex items-center justify-center text-4xl">
            ⚛
          </div>
        </motion.div>
        
        <motion.h1 
          className="text-5xl font-bold bg-clip-text text-transparent bg-cosmic-gradient mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          AetherList
        </motion.h1>
        
        <motion.p
          className="text-xl text-white/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          Welcome to your cosmic productivity universe
        </motion.p>
      </div>
    </motion.div>
  );
}
