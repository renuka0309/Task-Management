"use client"
import { createContext, useContext, useState, ReactNode } from "react";
import { Task, Column, Update, Project } from "@/app/types/Task";

type TasksContextType = {
  columns: Column[];
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;

  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;

  addingToColumn: string | null;
  setAddingToColumn: (title: string | null) => void;

  newTaskTitle: string;
  setNewTaskTitle: (title: string) => void;

  openMenuTaskId: number | null;
  setOpenMenuTaskId: (id: number | null) => void;

  handleAddTask: (columnTitle: string, projectId?: number) => void;
  handleDeleteTask: (columnTitle: string, taskId: number) => void;

  updateTask: (columnTitle: string, taskId: number, updates: Partial<Task>) => void;
  updateTaskPriority: (columnTitle: string, taskId: number, newPriority: string) => void;
  
  getTaskById: (taskId: number) => { task: Task; columnTitle: string } | null;
};

const TasksContext = createContext<TasksContextType | null>(null);

const initialColumns: Column[] = [
  {
    title: "To Do",
    count: 3,
    tasks: [
      {
        id: 1,
        title: "Write API Documentation",
        status: "To Do",
        labels: ["Research", "Documentation"],
        assignee: "Designer",
        date: "31 Jul",
        priority: "High",
        description:
          "Create and manage your API documentation to guide developers in using the inventory and sales metrics features effectively",
        subtasks: [
          { id: 1, task: "Subtask 1", priority: "High", member: "", dueDate: "12 Sep 2026" },
          { id: 2, task: "Subtask 2", priority: "Low", member: "CN", dueDate: "15 Sep 2026" },
          { id: 3, task: "Subtask 3", priority: "Medium", member: "+", dueDate: "18 Sep 2026" },
        ],
        updates: [],
      },
      {
        id: 2,
        title: "Implement Search Function",
        status: "To Do",
        labels: ["Development"],
        assignee: "Admin",
        date: "29 Jul",
        priority: "Medium",
        subtasks: [],
        updates: [],
      },
      {
        id: 3,
        title: "Deploy to Production",
        status: "To Do",
        labels: ["Deployment"],
        assignee: "Admin",
        date: "29 Jul",
        priority: "Urgent",
        subtasks: [],
        updates: [],
      },
    ],
  },
  {
    title: "Doing",
    count: 2,
    tasks: [
      {
        id: 4,
        title: "Code Review Completed",
        status: "Doing",
        labels: ["Development"],
        assignee: "Admin",
        date: "29 Jul",
        priority: "Medium",
        subtasks: [],
        updates: [],
      },
      {
        id: 5,
        title: "Design Mockups Finalized",
        status: "Doing",
        labels: ["Design"],
        assignee: "Admin",
        date: "29 Jul",
        priority: "High",
        subtasks: [],
        updates: [],
      },
    ],
  },
  {
    title: "Completed",
    count: 3,
    tasks: [
      {
        id: 6,
        title: "Feature Testing Passed",
        status: "Completed",
        labels: ["Testing", "Passed"],
        assignee: "QA Team",
        date: "30 Jul",
        priority: "Low",
        subtasks: [],
        updates: [],
      },
      {
        id: 7,
        title: "UI Design Updated",
        status: "Completed",
        labels: ["Design", "Updated"],
        assignee: "Designer",
        date: "31 Jul",
        priority: "Medium",
        subtasks: [],
        updates: [],
      },
      {
        id: 8,
        title: "Security Audit Scheduled",
        status: "Completed",
        labels: ["Audit", "Scheduled"],
        assignee: "Security",
        date: "01 Aug",
        priority: "High",
        subtasks: [],
        updates: [],
      },
    ],
  },
  {
    title: "On Hold",
    count: 2,
    tasks: [
      {
        id: 9,
        title: "UI Review",
        status: "On Hold",
        labels: [],
        assignee: "Designer",
        date: "",
        subtasks: [],
        updates: [],
      },
      {
        id: 10,
        title: "Backend Refactor",
        status: "On Hold",
        labels: [],
        assignee: "Dev Team",
        date: "",
        subtasks: [],
        updates: [],
      },
    ],
  },
];

const initialProjects: Project[] = [
  { id: 1, title: "Design Homepage", priority: "High", lead: "Admin", dueDate: "12 Sep 2026" },
  { id: 2, title: "Develop Login Feature", priority: "Low", lead: "CN", dueDate: "15 Sep 2026" },
  { id: 3, title: "Test Payment Gateway", priority: "Medium", lead: "Admin", dueDate: "18 Sep 2026" },
];

export function TasksProvider({ children }: { children: ReactNode }) {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const [addingToColumn, setAddingToColumn] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [openMenuTaskId, setOpenMenuTaskId] = useState<number | null>(null);

  const updateTask = (columnTitle: string, taskId: number, updates: Partial<Task>) => {
    setColumns((prev) =>
      prev.map((column) =>
        column.title === columnTitle
          ? {
              ...column,
              tasks: column.tasks.map((task) => {
                if (task.id !== taskId) return task;

                let newUpdatesLog = task.updates ?? [];

                if (updates.priority !== undefined && updates.priority !== task.priority) {
                  const logEntry: Update = {
                    id: Date.now(),
                    text: `You changed priority from ${task.priority ?? "No priority"} to ${updates.priority}`,
                    timestamp: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
                  };
                  newUpdatesLog = [logEntry, ...newUpdatesLog];
                }

                return { ...task, ...updates, updates: newUpdatesLog };
              }),
            }
          : column
      )
    );
  };

  const handleAddTask = (columnTitle: string, projectId?: number) => {
    if (!newTaskTitle.trim()) return;
    const newTask: Task = {
      id: Math.max(0, ...columns.flatMap((c) => c.tasks.map((t) => t.id))) + 1,
      title: newTaskTitle,
      status: columnTitle,
      labels: ["Deployment"],
      assignee: "Admin",
      date: "",
      subtasks: [],
      updates: [],
      projectId,
    };
    setColumns((prev) =>
      prev.map((column) =>
        column.title === columnTitle
          ? { ...column, tasks: [...column.tasks, newTask], count: column.tasks.length + 1 }
          : column
      )
    );
    setNewTaskTitle("");
    setAddingToColumn(null);
  };

  const handleDeleteTask = (columnTitle: string, taskId: number) => {
    setColumns((prev) =>
      prev.map((column) =>
        column.title === columnTitle
          ? {
              ...column,
              tasks: column.tasks.filter((t) => t.id !== taskId),
              count: column.tasks.filter((t) => t.id !== taskId).length,
            }
          : column
      )
    );
  };

  const updateTaskPriority = (columnTitle: string, taskId: number, newPriority: string) => {
    updateTask(columnTitle, taskId, { priority: newPriority });
  };

  
  const getTaskById = (taskId: number) => {
    for (const column of columns) {
      const task = column.tasks.find((t) => t.id === taskId);
      if (task) return { task, columnTitle: column.title };
    }
    return null;
  };

  return (
    <TasksContext.Provider
      value={{
        columns,
        setColumns,
        projects,
        setProjects,
        addingToColumn,
        setAddingToColumn,
        newTaskTitle,
        setNewTaskTitle,
        openMenuTaskId,
        setOpenMenuTaskId,
        handleAddTask,
        handleDeleteTask,
        updateTask,
        updateTaskPriority,
        
        getTaskById,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasks must be used within TasksProvider");
  return ctx;
}