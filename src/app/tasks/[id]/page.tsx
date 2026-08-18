"use client"
import { useParams } from "next/navigation";
import { useTasks } from "@/contexts/TasksContext";
import MainContent from "@/app/components/MainContent";
import Sidebar from "@/app/components/Sidebar";

export default function TaskDetail() {
  const params = useParams();
  const taskId = Number(params.id);
  const { getTaskById, updateTask } = useTasks();

  const result = getTaskById(taskId);

  if (!result) return <p className="p-6">Task not found.</p>;

  const { task, columnTitle } = result;

  const handleUpdateTask = (updates: Partial<typeof task>) => {
    updateTask(columnTitle, taskId, updates);
  };

  return (
    <div className="flex">
      <Sidebar />
      <MainContent task={task} updateTask={handleUpdateTask} />
    </div>
  );
}