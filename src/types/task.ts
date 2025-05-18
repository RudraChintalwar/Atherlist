
export type Priority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  category?: string;
  completed: boolean;
  dueDate?: string;
  createdAt: string;
}
