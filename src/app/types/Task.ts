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
  description?: string;
  subtasks?: Subtask[];
};

export type Subtask = {
  id: number;
  task: string;
  priority: string;
  member: string;
  dueDate: string;
};