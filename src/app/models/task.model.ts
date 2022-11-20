export type Task = {
  title: string;
  assignedTo: [];
  dueDate: Date;
  category: string;
  urgency: string;
  description: string;
  subtasks: [];
}