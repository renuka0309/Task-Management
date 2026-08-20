"use client"
import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import MainContent from "@/app/components/MainContent";
import Sidebar from "@/app/components/Sidebar";
import { Task } from "@/app/types/Task";

const API_URL = "http://localhost:3001";

export default function TaskDetail() {
  const params = useParams();
  const taskId = Number(params.id);
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTask = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/tasks/${taskId}`);
      if (!res.ok) throw new Error("Task not found");
      const data: Task = await res.json();
      setTask(data);
    } catch (err) {
      console.error("Error fetching task:", err);
      setTask(null);
    } finally {
      setLoading(false);
    }
  }, [taskId]);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  const handleUpdateTask = async (updates: Partial<Task>) => {
    try {
      const res = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Failed to update task");
      const updated: Task = await res.json();
      setTask(updated);
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!task) return <p className="p-6">Task not found.</p>;

  return (
    <div className="flex">
      <Sidebar />
      <MainContent task={task} updateTask={handleUpdateTask} refetchTask={fetchTask} />
    </div>
  );
}