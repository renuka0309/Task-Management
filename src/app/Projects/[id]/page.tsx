"use client"
import { useParams } from "next/navigation";
import { useTasks } from "@/contexts/TasksContext";
import TaskListView from "@/app/tasks/TaskListView";
import Link from "next/link";

export default function ProjectDetail() {
  const params = useParams();
  const projectId = Number(params.id);

  const {
    columns, projects,
    addingToColumn, setAddingToColumn,
    newTaskTitle, setNewTaskTitle,
    openMenuTaskId, setOpenMenuTaskId,
    handleAddTask, handleDeleteTask,
    updateTaskPriority, 
  } = useTasks();

  const project = projects.find((p) => p.id === projectId);
  const allTasks = columns.flatMap((col) => col.tasks);
  const projectTasks = allTasks.filter((task) => task.projectId === projectId);
  if (!project) return <p className="p-6">Project not found.</p>;

  return (
    <div className="px-6 py-4">
      <div className="text-sm text-[#737373] mb-2">
        <Link href="/projects">Projects</Link> &gt; {project.title}
      </div>
      <h1 className="text-lg font-semibold mb-4">Tasks</h1>

      <TaskListView
        tasks={projectTasks}
        addingToColumn={addingToColumn}
        setAddingToColumn={setAddingToColumn}
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
        handleAddTask={handleAddTask}
        handleDeleteTask={handleDeleteTask}
        openMenuTaskId={openMenuTaskId}
        setOpenMenuTaskId={setOpenMenuTaskId}
        updateTaskPriority={updateTaskPriority}
        
      />
    </div>
  );
}