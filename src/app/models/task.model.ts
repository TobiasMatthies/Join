export type Task = {
  title: string;
  assignedTo: any[];
  dueDate: Date;
  category: { name: string; color: string };
  urgency: string;
  description: string;
  subtasks: [];
};