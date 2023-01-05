import { Contact } from "./contact.model";

export type Task = {
  title: string;
  assignedTo: Contact[];
  dueDate: Date;
  category: { name: string; color: string };
  urgency: { name: string; image: string, imageDetail: string };
  description: string;
  subtasks: {name: string, completed: boolean}[];
  status: string;
  id: number;
};

export type EditedTask = {
  title: string;
  description: string;
  dueDate: Date;
  urgency: { name: string; image: string; imageDetail: string };
  assignedTo: Contact[];
};