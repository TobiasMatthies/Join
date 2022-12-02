export type Task = {
  title: string;
  assignedTo: any[];
  dueDate: any;
  category: { name: string; color: string };
  urgency: { name: string; image: string, imageDetail: string };
  description: string;
  subtasks: any[];
  status: string;
  id: number;
};