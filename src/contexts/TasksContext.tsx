"use client"
import { createContext, useContext, useState, ReactNode } from "react";
import { Task } from "@/app/types/Task";

type Column = { title: string; count: number; tasks: Task[] };

type TasksContextType = {
  columns: Column[];
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
  updateTask: (columnTitle: string, taskId: number, updates: Partial<Task>) => void;
  getTaskById: (taskId: number) => { task: Task; columnTitle: string } | null;
};

const TasksContext = createContext<TasksContextType | null>(null);

const initialColumns: Column[] = [
  {
    title: "To Do",
    count: 3,
    tasks: [
      { id: 1, title: "Write API Documentation",description:"code is debugged and reviewed. Ready for Testing."  ,status: "To Do", labels: ["Deployment"], assignee: "Admin", date: "29 Jul" },
      { id: 2, title: "Implement Search Function",description:"code is debugged and reviewed. Ready for Testing."  ,status: "To Do", labels: ["Deployment"], assignee: "Admin", date: "29 Jul" },
      { id: 3, title: "Deploy to Production",description:"code is debugged and reviewed. Ready for Testing."  ,status: "To Do", labels: ["Deployment"], assignee: "Admin", date: "29 Jul" },
    ],
  },
  {
    title: "Doing",
    count: 2,
    tasks: [
      { id: 4, title: "Code Review Completed",description:"code is debugged and reviewed. Ready for Testing." ,status: "Doing", labels: ["Deployment"], assignee: "Admin", date: "29 Jul" },
      { id: 5, title: "Design Mockups Finalized",description:"code is debugged and reviewed. Ready for Testing."  ,status: "Doing", labels: ["Deployment"], assignee: "Admin", date: "29 Jul" },
    ],
  },
  {
    title: "Completed",
    count: 4,
    tasks: [
      { id: 6, title: "Feature Testing Passed",description:"code is debugged and reviewed. Ready for Testing."  ,status: "Completed", labels: ["Testing", "Passed"], assignee: "QA Team", date: "30 Jul" },
      { id: 7, title: "UI Design Updated",description:"code is debugged and reviewed. Ready for Testing."  ,status: "Completed", labels: ["Design", "Updated"], assignee: "Designer", date: "31 Jul" },
      { id: 8, title: "Security Audit Scheduled",description:"code is debugged and reviewed. Ready for Testing."  ,status: "Completed", labels: ["Audit", "Scheduled"], assignee: "Security", date: "01 Aug" },
    ],
  },
  {
    title: "On Hold",
    count: 2,
    tasks: [
      { id: 9, title: "UI Review",description:"code is debugged and reviewed. Ready for Testing."  ,labels: [], assignee: "Designer", status: "On Hold", date: "" },
      { id: 10, title: "Backend Refactor",description:"code is debugged and reviewed. Ready for Testing."  ,labels: [], assignee: "Dev Team", status: "On Hold", date: "" },
    ],
  },
];

export function TasksProvider({ children }: { children: ReactNode }) {
  const [columns, setColumns] = useState<Column[]>(initialColumns);

  const updateTask = (columnTitle: string, taskId: number, updates: Partial<Task>) => {
    setColumns((prev) =>
      prev.map((column) =>
        column.title === columnTitle
          ? {
              ...column,
              tasks: column.tasks.map((task) =>
                task.id === taskId ? { ...task, ...updates } : task
              ),
            }
          : column
      )
    );
  };

  const getTaskById = (taskId: number) => {
    for (const column of columns) {
      const task = column.tasks.find((t) => t.id === taskId);
      if (task) return { task, columnTitle: column.title };
    }
    return null;
  };

  return (
    <TasksContext.Provider value={{ columns, setColumns, updateTask, getTaskById }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasks must be used within TasksProvider");
  return ctx;
}