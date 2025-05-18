
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Task } from '@/types/task';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  completeTask: (id: string) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
  getTaskById: (id: string) => Task | undefined;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { toast } = useToast();

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error('Failed to parse saved tasks', error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...task,
      id: uuidv4(),
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
    
    toast({
      title: 'Task added',
      description: `"${task.title}" has been added to your universe`,
    });
  };

  const completeTask = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
    
    const taskName = tasks.find(task => task.id === id)?.title;
    toast({
      title: 'Task updated',
      description: `"${taskName}" has been marked as completed`,
    });
  };

  const deleteTask = (id: string) => {
    const taskName = tasks.find(task => task.id === id)?.title;
    
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    
    toast({
      title: 'Task removed',
      description: `"${taskName}" has been removed from your universe`,
      variant: 'destructive',
    });
  };

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id
          ? { ...task, ...updatedTask }
          : task
      )
    );
    
    toast({
      title: 'Task updated',
      description: `Your task has been updated`,
    });
  };

  const getTaskById = (id: string) => {
    return tasks.find(task => task.id === id);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        completeTask,
        deleteTask,
        updateTask,
        getTaskById,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
