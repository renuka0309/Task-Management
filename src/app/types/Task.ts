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
  updates? : Update[];
  projectId?: number;
};

export type Subtask = {
  id: number;
  task: string;
  priority: string;
  member: string;
  dueDate: string;
};

export type Update={
  id: number;
  text: string;
  timestamp: string;
}

export type Column={
  title: string;
  count: number;
  tasks: Task[];
}

export type Project={
  id: number;
  title: string;
  priority: string;
  lead: string;
  dueDate: string;
}