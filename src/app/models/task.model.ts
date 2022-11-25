export type Task = {
  title: string;
  assignedTo: any[];
  dueDate: Date;
  category: { name: string; color: string };
  urgency: { name: string; image: string };
  description: string;
  subtasks: any[];
  status: string;
  id: number;
};