// types/task.ts
export type Task = {
  id: number;
  title: string;
  status: string;
  labels: string[];
  assignee: string;
  date: string;
  priority?: string;
  reporter?: string;
  teams?: string;
};