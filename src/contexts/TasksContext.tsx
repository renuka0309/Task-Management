
"use client"
const API_URL = "http://localhost:3001";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Task, Column, Update, Project } from "@/app/types/Task";


type TasksContextType = {
  columns: Column[];
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;

  loading: boolean;

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

// const initialProjects: Project[] = [
//   { id: 1, title: "Design Homepage", priority: "High", lead: "Admin", dueDate: "12 Sep 2026" },
//   { id: 2, title: "Develop Login Feature", priority: "Low", lead: "CN", dueDate: "15 Sep 2026" },
//   { id: 3, title: "Test Payment Gateway", priority: "Medium", lead: "Admin", dueDate: "18 Sep 2026" },
// ];

export function TasksProvider({ children }: { children: ReactNode }) {
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    async function loadTasks() {
      try {
        const res = await fetch(`${API_URL}/tasks`);
        const tasks: Task[] = await res.json();

        const statuses = ["To Do", "Doing", "Completed", "On Hold"];
        const grouped: Column[] = statuses.map((status) => ({
          title: status,
          count: tasks.filter((t) => t.status === status).length,
          tasks: tasks.filter((t) => t.status === status),
        }));

        setColumns(grouped);
      } catch (err) {
        console.error("Failed to load tasks:", err);
      } finally {
        setLoading(false);
      }
    }
    loadTasks();
  }, []);

  useEffect(() => {
  async function loadProjects() {
    try {
      const res = await fetch(`${API_URL}/projects`);
      const data: Project[] = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Failed to load projects:", err);
    } finally {
      setLoadingProjects(false);
    }
  }
  loadProjects();
}, []);

  

  const [addingToColumn, setAddingToColumn] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [openMenuTaskId, setOpenMenuTaskId] = useState<number | null>(null);

  const updateTask = async (columnTitle: string, taskId: number, updates: Partial<Task>) => {
    try {
      const res = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Failed to update task");
      const updatedTask: Task = await res.json();

      setColumns((prev) =>
        prev.map((column) => ({
          ...column,
          tasks: column.tasks.map((task) =>
            task.id === taskId ? updatedTask : task
          ),
        }))
      );

    } catch (err) {
      console.log("Error updating task:", err);
    }


  };

  const handleAddTask = async (columnTitle: string, projectId?: number) => {
    if (!newTaskTitle.trim()) return;

    try {
      const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTaskTitle,
          status: columnTitle,
          labels: ["Deployment"],
          assignee: "Admin",
          projectId,
        }),
      });
      if (!res.ok) throw new Error("Faield to create task");
      const newTask: Task = await res.json();

      setColumns((prev) =>
        prev.map((column) =>
          column.title === columnTitle
            ? { ...column, tasks: [...column.tasks, newTask], count: column.tasks.length + 1 }
            : column
        )
      );

      setNewTaskTitle("");
      setAddingToColumn(null);
    } catch (err) {
      console.error("Error adding task", err);
    }
  };

  const handleDeleteTask = async (columnTitle: string, taskId: number) => {
    try {
      const res = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete task");
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
    } catch (err) {
      console.log("Error deleting task:", err);
    }

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
        loading,
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