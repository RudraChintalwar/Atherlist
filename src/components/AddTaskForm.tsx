
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Task, Priority } from '@/types/task';
import { Calendar } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface AddTaskFormProps {
  onAddTask: (task: Omit<Task, 'id'>) => void;
  onClose: () => void;
}

export default function AddTaskForm({ onAddTask, onClose }: AddTaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState<Date | undefined>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title) return;
    
    onAddTask({
      title,
      description,
      priority,
      category,
      completed: false,
      dueDate: dueDate?.toISOString(),
      createdAt: new Date().toISOString(),
    });
    
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.3 }}
      className="glass p-6 max-w-lg w-full mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4 text-center">Create Cosmic Task</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title" className="text-sm font-medium text-white/80">
            Task Name
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task name"
            className="mt-1 bg-white/5 border-white/10 focus:border-cosmic-purple/50 focus:ring focus:ring-cosmic-purple/20"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="description" className="text-sm font-medium text-white/80">
            Description
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's this task about?"
            className="mt-1 bg-white/5 border-white/10 focus:border-cosmic-purple/50 focus:ring focus:ring-cosmic-purple/20"
            rows={3}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="priority" className="text-sm font-medium text-white/80">
              Priority
            </Label>
            <Select value={priority} onValueChange={(value: Priority) => setPriority(value)}>
              <SelectTrigger className="mt-1 bg-white/5 border-white/10">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="category" className="text-sm font-medium text-white/80">
              Category
            </Label>
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category"
              className="mt-1 bg-white/5 border-white/10 focus:border-cosmic-purple/50 focus:ring focus:ring-cosmic-purple/20"
            />
          </div>
        </div>
        
        <div>
          <Label className="text-sm font-medium text-white/80">
            Due Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "mt-1 w-full justify-start text-left font-normal bg-white/5 border-white/10",
                  !dueDate && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {dueDate ? format(dueDate, "PPP") : <span>Select date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={dueDate}
                onSelect={setDueDate}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="flex justify-end gap-3 pt-2">
          <Button 
            type="button"
            variant="outline"
            onClick={onClose}
            className="border-white/20 hover:border-white/40 bg-white/5"
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="bg-cosmic-purple hover:bg-cosmic-purple/90"
          >
            Create Task
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
