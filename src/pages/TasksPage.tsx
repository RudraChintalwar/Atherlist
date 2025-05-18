
import { useEffect, useState } from 'react';
import { useTaskContext } from '@/context/TaskContext';
import Sidebar from '@/components/Sidebar';
import TaskCard from '@/components/TaskCard';
import AddTaskForm from '@/components/AddTaskForm';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Task } from '@/types/task';
import { PlusIcon, Search } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import StarryBackground from '@/components/StarryBackground';

export default function TasksPage() {
  const { tasks, addTask, completeTask, deleteTask } = useTaskContext();
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  
  useEffect(() => {
    document.title = "Tasks - AetherList";
  }, []);

  // Filter tasks based on search query and priority
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesPriority = 
      filterPriority === 'all' || 
      task.priority === filterPriority;
    
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-cosmic-dark text-white">
      <StarryBackground />
      
      <Sidebar />
      
      <main className="pl-64 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Tasks</h1>
              <p className="text-white/70 mt-1">Manage your cosmic task collection</p>
            </div>
            
            <Button 
              onClick={() => setIsAddingTask(true)}
              className="bg-cosmic-purple hover:bg-cosmic-purple/90 flex items-center gap-2"
            >
              <PlusIcon size={18} />
              New Task
            </Button>
          </div>
          
          <div className="glass p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tasks..."
                  className="pl-10 bg-white/5 border-white/10"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={filterPriority === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterPriority('all')}
                  className={filterPriority === 'all' ? 'bg-cosmic-purple' : 'border-white/10'}
                >
                  All
                </Button>
                <Button
                  variant={filterPriority === 'high' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterPriority('high')}
                  className={filterPriority === 'high' ? 'bg-red-500' : 'border-white/10'}
                >
                  High
                </Button>
                <Button
                  variant={filterPriority === 'medium' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterPriority('medium')}
                  className={filterPriority === 'medium' ? 'bg-yellow-500' : 'border-white/10'}
                >
                  Medium
                </Button>
                <Button
                  variant={filterPriority === 'low' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterPriority('low')}
                  className={filterPriority === 'low' ? 'bg-green-500' : 'border-white/10'}
                >
                  Low
                </Button>
              </div>
            </div>
          </div>
          
          {filteredTasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass p-8 text-center"
            >
              <h3 className="text-lg font-medium mb-2">No tasks found</h3>
              <p className="text-white/70 mb-4">
                Try adjusting your search or filters, or create a new task
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
                    staggerChildren: 0.05
                  }
                }
              }}
            >
              {filteredTasks.map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onComplete={completeTask}
                  onDelete={deleteTask}
                />
              ))}
            </motion.div>
          )}
        </div>
      </main>
      
      <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
        <DialogContent className="sm:max-w-lg bg-transparent border-none shadow-none p-0">
          <AnimatePresence>
            {isAddingTask && <AddTaskForm onAddTask={addTask} onClose={() => setIsAddingTask(false)} />}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  );
}
