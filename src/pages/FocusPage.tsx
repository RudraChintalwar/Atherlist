
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTaskContext } from '@/context/TaskContext';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, CheckCircle, Clock, ArrowLeft as ArrowLeftIcon, ArrowRight, Plus, Minus } from 'lucide-react';
import StarryBackground from '@/components/StarryBackground';
import { Link } from 'react-router-dom';
import AmbientPlayer from '@/components/AmbientPlayer';
import TaskProgressBar from '@/components/TaskProgressBar';

export default function FocusPage() {
  const { tasks, completeTask } = useTaskContext();
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(25); // Default timer value: 25 minutes
  const [timeRemaining, setTimeRemaining] = useState(timerMinutes * 60); // Convert to seconds
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const incompleteTasks = tasks.filter(task => !task.completed);
  const currentTask = incompleteTasks[currentTaskIndex];
  
  // Reset timer when minutes change
  useEffect(() => {
    setTimeRemaining(timerMinutes * 60);
    setProgress(0);
  }, [timerMinutes]);
  
  // Timer functionality
  useEffect(() => {
    let interval: number;
    
    if (isTimerActive && timeRemaining > 0) {
      interval = window.setInterval(() => {
        setTimeRemaining(prev => prev - 1);
        setProgress(((timerMinutes * 60 - timeRemaining + 1) / (timerMinutes * 60)) * 100);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isTimerActive, timeRemaining, timerMinutes]);
  
  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Increase timer by 5 minutes
  const increaseTimer = () => {
    setTimerMinutes(prev => prev + 5);
  };
  
  // Decrease timer by 5 minutes (minimum 5 minutes)
  const decreaseTimer = () => {
    setTimerMinutes(prev => Math.max(5, prev - 5));
  };
  
  // Handle task completion
  const handleComplete = () => {
    if (currentTask) {
      completeTask(currentTask.id);
      
      if (currentTaskIndex < incompleteTasks.length - 1) {
        setCurrentTaskIndex(prev => prev + 1);
      }
      
      // Reset timer
      setTimeRemaining(timerMinutes * 60);
      setProgress(0);
      setIsTimerActive(false);
    }
  };
  
  // Handle skipping to next task
  const handleSkip = () => {
    if (currentTaskIndex < incompleteTasks.length - 1) {
      setCurrentTaskIndex(prev => prev + 1);
      setTimeRemaining(timerMinutes * 60);
      setProgress(0);
      setIsTimerActive(false);
    }
  };
  
  // Handle going to previous task
  const handlePrevious = () => {
    if (currentTaskIndex > 0) {
      setCurrentTaskIndex(prev => prev - 1);
      setTimeRemaining(timerMinutes * 60);
      setProgress(0);
      setIsTimerActive(false);
    }
  };
  
  useEffect(() => {
    document.title = "Focus - AetherList";
  }, []);

  return (
    <div className="min-h-screen bg-cosmic-dark text-white flex flex-col">
      <StarryBackground />
      
      <header className="p-4 absolute top-0 left-0 w-full z-10">
        <div className="container mx-auto flex justify-between items-center">
          <Link 
            to="/dashboard" 
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft size={18} />
            <span>Exit Focus Mode</span>
          </Link>
          
          <AmbientPlayer />
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center gap-8 py-16">
        <div className="container mx-auto px-4 max-w-xl">
          <AnimatePresence mode='wait'>
            {!currentTask ? (
              <motion.div
                key="no-tasks"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="glass-card p-8 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-cosmic-purple/20 rounded-full flex items-center justify-center">
                  <CheckCircle size={28} className="text-cosmic-purple" />
                </div>
                <h2 className="text-2xl font-bold mb-4">All Tasks Complete!</h2>
                <p className="text-white/70 mb-6">
                  Great job! You've completed all your tasks. Time for a well-deserved break.
                </p>
                <Button 
                  className="bg-cosmic-purple hover:bg-cosmic-purple/90"
                  asChild
                >
                  <Link to="/dashboard">Return to Dashboard</Link>
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key={currentTask.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="glass-card p-8 relative overflow-hidden"
              >
                <div 
                  className={`absolute inset-0 -z-10 opacity-30 rounded-xl blur-xl transition-opacity duration-300 ${
                    currentTask.priority === 'high' ? 'bg-red-500' : 
                    currentTask.priority === 'medium' ? 'bg-yellow-500' : 
                    'bg-green-500'
                  }`}
                ></div>
                
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-2">Focus Mode</h2>
                  <p className="text-white/70 mb-1">Concentrate on one task at a time</p>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-3">{currentTask.title}</h3>
                  {currentTask.description && (
                    <p className="text-white/70 mb-4">{currentTask.description}</p>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className={`px-2 py-0.5 rounded-md text-xs font-medium inline-flex items-center gap-1 border ${
                      currentTask.priority === 'high' ? 'bg-red-500/20 text-red-500 border-red-500/30' : 
                      currentTask.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30' : 
                      'bg-green-500/20 text-green-500 border-green-500/30'
                    }`}>
                      {currentTask.priority.charAt(0).toUpperCase() + currentTask.priority.slice(1)}
                    </span>
                    
                    {currentTask.category && (
                      <span className="px-2 py-0.5 rounded-md bg-cosmic-purple/20 border border-cosmic-purple/30 text-cosmic-purple text-xs font-medium">
                        {currentTask.category}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="mb-8">
                  {/* Timer Settings */}
                  <div className="flex items-center justify-center gap-4 mb-3">
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="h-8 w-8 border-white/20 hover:border-white/40 bg-white/5"
                      onClick={decreaseTimer}
                      disabled={timerMinutes <= 5}
                    >
                      <Minus size={16} />
                    </Button>
                    
                    <div className="flex items-center justify-center gap-2">
                      <Clock size={18} className="text-cosmic-teal" />
                      <span className="text-2xl font-mono">{formatTime(timeRemaining)}</span>
                      <span className="text-xs text-white/60 ml-1">({timerMinutes} min)</span>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="h-8 w-8 border-white/20 hover:border-white/40 bg-white/5"
                      onClick={increaseTimer}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                  
                  <Progress value={progress} className="h-2 bg-white/10" />
                </div>
                
                <div className="flex justify-center gap-4">
                  <Button 
                    variant="outline" 
                    className="border-white/20 hover:border-white/40 bg-white/5"
                    onClick={() => setIsTimerActive(!isTimerActive)}
                  >
                    {isTimerActive ? 'Pause' : 'Start'} Focus
                  </Button>
                  
                  <Button 
                    onClick={handleComplete}
                    className="bg-cosmic-teal hover:bg-cosmic-teal/90"
                  >
                    Complete Task
                  </Button>
                  
                  <div className="flex gap-2">
                    {currentTaskIndex > 0 && (
                      <Button 
                        variant="ghost"
                        onClick={handlePrevious}
                        className="hover:bg-white/5"
                        title="Previous Task"
                      >
                        <ArrowLeftIcon size={18} />
                      </Button>
                    )}
                    
                    {currentTaskIndex < incompleteTasks.length - 1 && (
                      <Button 
                        variant="ghost"
                        onClick={handleSkip}
                        className="hover:bg-white/5"
                        title="Next Task"
                      >
                        <ArrowRight size={18} />
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="text-center mt-6 text-sm text-white/50">
                  <p>Task {currentTaskIndex + 1} of {incompleteTasks.length}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="container mx-auto px-4 max-w-xl">
          <TaskProgressBar />
        </div>
      </main>
    </div>
  );
}
