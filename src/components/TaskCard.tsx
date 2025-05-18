
import { motion } from 'framer-motion';
import { Check, Clock, AlertTriangle, Calendar, Trash } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Task, Priority } from '@/types/task';
import { useState } from 'react';

interface TaskCardProps {
  task: Task;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onComplete, onDelete }: TaskCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  
  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'low':
        return 'bg-green-500/20 text-green-500 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };
  
  const getPriorityIcon = (priority: Priority) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="h-4 w-4" />;
      case 'medium':
        return <Clock className="h-4 w-4" />;
      case 'low':
        return <Calendar className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(task.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="task-card"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      whileHover={{ 
        scale: 1.02, 
        boxShadow: '0 0 20px rgba(139, 92, 246, 0.7)' 
      }}
    >
      {/* Card glow effect based on priority */}
      <div 
        className={cn(
          "absolute inset-0 -z-10 opacity-30 rounded-xl blur-xl transition-opacity duration-300",
          task.priority === 'high' ? 'bg-red-500' : 
          task.priority === 'medium' ? 'bg-yellow-500' : 
          'bg-green-500'
        )}
      ></div>
      
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-lg mb-2">{task.title}</h3>
          <p className="text-white/70 text-sm line-clamp-2 mb-4">{task.description}</p>
          
          <div className="flex flex-wrap gap-2 mt-2">
            <span 
              className={cn(
                "px-2 py-0.5 rounded-md text-xs font-medium inline-flex items-center gap-1 border",
                getPriorityColor(task.priority)
              )}
            >
              {getPriorityIcon(task.priority)}
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
            
            {task.category && (
              <span className="px-2 py-0.5 rounded-md bg-cosmic-purple/20 border border-cosmic-purple/30 text-cosmic-purple text-xs font-medium">
                {task.category}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onComplete(task.id)}
            className="flex-shrink-0 w-6 h-6 rounded-full border border-cosmic-teal/50 hover:border-cosmic-teal flex items-center justify-center transition-all duration-300 hover:bg-cosmic-teal/20"
            aria-label="Complete task"
          >
            {task.completed ? (
              <Check className="h-4 w-4 text-cosmic-teal" />
            ) : null}
          </button>
          
          <motion.button
            onClick={handleDelete}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovering ? 1 : 0 }}
            className="flex-shrink-0 w-6 h-6 rounded-full border border-red-500/50 hover:border-red-500 flex items-center justify-center transition-all duration-300 hover:bg-red-500/20"
            aria-label="Delete task"
          >
            <Trash className="h-3 w-3 text-red-500" />
          </motion.button>
        </div>
      </div>
      
      {task.dueDate && (
        <div className="mt-4 pt-3 border-t border-white/10 text-xs text-white/60 flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </div>
      )}
    </motion.div>
  );
}
