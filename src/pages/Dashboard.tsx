
import { useEffect, useState } from 'react';
import { useTaskContext } from '@/context/TaskContext';
import Sidebar from '@/components/Sidebar';
import TaskCard from '@/components/TaskCard';
import AddTaskForm from '@/components/AddTaskForm';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Task } from '@/types/task';
import { PlusIcon, CheckSquare } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import StarryBackground from '@/components/StarryBackground';
import TaskProgressBar from '@/components/TaskProgressBar';
import { useToast } from '@/hooks/use-toast';
import IntroOverlay from '@/components/IntroOverlay';

export default function Dashboard() {
  const { tasks, addTask, completeTask, deleteTask } = useTaskContext();
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    document.title = "Dashboard - AetherList";
    
    // Show intro only on first visit
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    if (hasSeenIntro) {
      setShowIntro(false);
    }
    
    const timer = setTimeout(() => {
      setShowIntro(false);
      localStorage.setItem('hasSeenIntro', 'true');
    }, 4000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleAddTask = (newTask: Omit<Task, 'id'>) => {
    addTask(newTask);
    toast({
      title: "New task created",
      description: "Your cosmic task has been added to your universe",
    });
  };
  
  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);
  
  return (
    <div className="min-h-screen bg-cosmic-dark text-white overflow-hidden relative">
      <StarryBackground />
      
      <AnimatePresence>
        {showIntro && <IntroOverlay />}
      </AnimatePresence>
      
      <Sidebar />
      
      <main className="pl-64 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <motion.h1 
                className="text-3xl font-bold"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Dashboard
              </motion.h1>
              <motion.p 
                className="text-white/70 mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Manage your cosmic task universe
              </motion.p>
            </div>
            
            <Button 
              onClick={() => setIsAddingTask(true)}
              className="bg-cosmic-purple hover:bg-cosmic-purple/90 flex items-center gap-2 shadow-cosmic hover:shadow-cosmic-hover transition-all duration-300"
            >
              <PlusIcon size={18} />
              New Task
            </Button>
          </div>
          
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <TaskProgressBar />
          </motion.div>
          
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xl font-semibold">Active Tasks</h2>
              <span className="bg-cosmic-purple/20 text-cosmic-purple px-2 py-0.5 rounded-full text-sm">
                {incompleteTasks.length}
              </span>
            </div>
            
            {incompleteTasks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass p-8 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-cosmic-purple/20 rounded-full flex items-center justify-center">
                  <CheckSquare size={24} className="text-cosmic-purple" />
                </div>
                <h3 className="text-lg font-medium mb-2">No active tasks</h3>
                <p className="text-white/70 mb-4">
                  Your cosmic productivity chamber awaits. Create a new task to get started.
                </p>
                <Button 
                  onClick={() => setIsAddingTask(true)}
                  variant="outline"
                  className="border-cosmic-purple/50 hover:bg-cosmic-purple/10"
                >
                  Create Task
                </Button>
              </motion.div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                {incompleteTasks.map((task) => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    onComplete={completeTask}
                    onDelete={deleteTask}
                  />
                ))}
              </motion.div>
            )}
          </motion.div>
          
          {completedTasks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xl font-semibold">Completed Tasks</h2>
                <span className="bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full text-sm">
                  {completedTasks.length}
                </span>
              </div>
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05
                    }
                  }
                }}
              >
                {completedTasks.slice(0, 3).map((task) => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    onComplete={completeTask}
                    onDelete={deleteTask} 
                  />
                ))}
              </motion.div>
              
              {completedTasks.length > 3 && (
                <div className="mt-4 text-center">
                  <Button 
                    variant="ghost" 
                    className="text-white/70 hover:text-white"
                  >
                    View All Completed Tasks
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </main>
      
      <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
        <DialogContent className="sm:max-w-lg bg-transparent border-none shadow-none p-0">
          <AnimatePresence>
            {isAddingTask && <AddTaskForm onAddTask={handleAddTask} onClose={() => setIsAddingTask(false)} />}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  );
}
