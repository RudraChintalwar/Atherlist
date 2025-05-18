
import { useTaskContext } from '@/context/TaskContext';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle } from 'lucide-react';

export default function TaskProgressBar() {
  const { tasks } = useTaskContext();
  
  // Calculate completion percentage
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  return (
    <motion.div 
      className="glass-card p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-white/90">Task Progress</h3>
        <Badge variant="outline" className="bg-cosmic-purple/20 text-cosmic-purple border-cosmic-purple/30">
          {completedTasks} / {totalTasks}
        </Badge>
      </div>
      
      <div className="relative">
        <Progress 
          value={progressPercentage} 
          className="h-3 bg-white/10"
        />
        
        {/* Custom glowing indicator at the progress point */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2"
          style={{ 
            left: `${progressPercentage}%`, 
            transform: `translateX(-50%) translateY(-50%)` 
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {progressPercentage === 100 ? (
            <CheckCircle className="w-6 h-6 text-cosmic-teal" />
          ) : (
            <div className="w-4 h-4 rounded-full bg-cosmic-purple shadow-[0_0_10px_3px_rgba(139,92,246,0.7)]"></div>
          )}
        </motion.div>
      </div>
      
      <div className="text-center mt-2">
        <p className="text-xs text-white/70">
          {progressPercentage === 100 
            ? "All tasks completed!" 
            : `${Math.round(progressPercentage)}% complete`}
        </p>
      </div>
    </motion.div>
  );
}
