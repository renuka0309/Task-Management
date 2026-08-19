"use client";
import { useState } from "react";
import TaskListView from "./TaskListView";
import Image from "next/image";
import { Tag, Calendar, Plus, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useTasks } from "@/contexts/TasksContext";
import { Task } from "../types/Task";
import TaskToolbar from "../components/TaskToolbarProps";

export default function TasksBoard() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"board" | "list">("board");
  const [isAddingTask, setAddingTask] = useState(false);
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [openColumnMenu, setOpenColumnMenu] = useState<string | null>(null);
  const [showFields, setShowFields] = useState(false);
  const [visibleFields, setVisibleFields] = useState({
    priority: true,
    members: true,
    dueDate: true,
    labels: true,
    status: true,
    reporter: true,
  })

  const toggleFields = (field: keyof typeof visibleFields) => {
    setVisibleFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }

  const {
    columns, setColumns,
    addingToColumn, setAddingToColumn,
    newTaskTitle, setNewTaskTitle,
    openMenuTaskId, setOpenMenuTaskId,
    handleAddTask, handleDeleteTask,
    updateTaskPriority,
  } = useTasks();

  const handleClearColumn = (columnTitle: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.title === columnTitle
          ? { ...column, tasks: [], count: 0 }
          : column
      )
    );
    setOpenColumnMenu(null);
  };
  // Add this function inside TasksBoard, before your return statement
  const filterTask = (task: Task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesFilters = Object.entries(filters).every(([field, values]) => {
      if (!values || values.length === 0) return true;
      const key = field.toLowerCase().replace(" ", "");
      if (key === "priority") return values.includes(task.priority ?? "");
      if (key === "labels") return task.labels.some((l) => values.includes(l));
      if (key === "members") return values.includes(task.assignee);
      if (key === "status") return values.includes(task.status);
      return true;
    });
    return matchesSearch && matchesFilters;
  };


  return (
    <div className="flex h-screen w-full bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Top bar */}
        <Topbar />

        {/* Header row */}
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold text-[#171717]">Tasks</h1>
            <div className="flex -space-x-2">
              <Image src="/icons/avatar.jpg" alt="" width={24} height={24} className="rounded-full border-2 border-white object-cover" />
              <div className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center border-2 border-white">D</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <TaskToolbar
              isSearching={isSearching} setIsSearching={setIsSearching}
              searchText={searchText} setSearchText={setSearchText}
              showFields={showFields} setShowFields={setShowFields}
              visibleFields={visibleFields} toggleFields={toggleFields}
              viewMode={viewMode} setViewMode={setViewMode}
              setFilters={setFilters}
            />

            <button
              onClick={() => setAddingTask(true)}
              style={{ backgroundColor: "var(--accent-color)" }}
              className="h-8 px-3 flex items-center gap-1.5 bg-black text-white rounded-md text-sm"
            >
              <Plus size={14} />
              Add Task  
            </button>

            {isAddingTask && (
              <div className="px-6 pb-4">
                <input
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Task Title..."
                  className="h-9 w-full rounded-md border border-[#E5E5E5] px-3 text-sm outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && newTaskTitle.trim()) {
                      handleAddTask("To Do");
                      setAddingTask(false);
                    }
                    if (e.key === "Escape") {
                      setNewTaskTitle("");
                      setAddingTask(false);
                    }
                  }}
                  autoFocus
                />
              </div>
            )}
          </div>
        </div>
        
        {/* Board columns */}
        {viewMode === "board" ? (
          <div className="flex-1 flex gap-4 px-6 pb-6 overflow-x-auto">

            {columns.map((col) => (
              <div key={col.title} className="w-72 shrink-0 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[#171717]">{col.title}</span>
                    <span className="text-xs text-[#737373]">{col.count}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#737373]">
                    <Plus size={14}
                      onClick={() => setAddingToColumn(col.title)}
                      className="cursor-pointer"
                    />
                    <MoreHorizontal size={14}
                      className="cursor-pointer"
                      onClick={() => setOpenColumnMenu(openColumnMenu === col.title ? null : col.title)}
                    />

                    {openColumnMenu === col.title && (
                      <div className="absolute right-0 top-5 w-40 rounded-md border border-[#E5E5E5] bg-white shadow-lg z-10">
                        <button
                          onClick={() => handleClearColumn(col.title)}
                          className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50"
                        >
                          Clear all tasks
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {col.tasks
                    .filter((filterTask) =>
                      filterTask.title.toLowerCase().includes(searchText.toLowerCase())
                    )
                    .map((task) => (
                      <div
                        key={task.id}
                        onClick={() => router.push(`/tasks/${task.id}`)}
                        className="border border-[#E5E5E5] rounded-md p-3 flex flex-col gap-2 bg-white">
                        <div className="flex items-start justify-between">
                          <span className="text-sm text-[#171717]">{task.title}</span>
                          <MoreHorizontal
                            size={14}
                            className="text-[#737373] shrink-0 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuTaskId(openMenuTaskId === task.id ? null : task.id);
                            }}
                          />

                          {openMenuTaskId === task.id && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="absolute right-0 top-5 w-32 rounded-md border border-[#E5E5E5] bg-white shadow-lg z-10"
                            >
                              <button
                                onClick={() => {
                                  handleDeleteTask(col.title, task.id);
                                  setOpenMenuTaskId(null);
                                }}
                                className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50"
                              >
                                Delete
                              </button>
                            </div>
                          )}

                        </div>

                        <div className="flex items-center justify-between">
                          {visibleFields.members && (
                            <div className="flex items-center gap-1.5">
                              <Image src="/icons/avatar.jpg" alt="" width={18} height={18}
                                className="rounded-full object-cover" />
                              <span className="text-xs text-[#737373]">{task.assignee}</span>
                            </div>
                          )}

                          {visibleFields.dueDate && task.date && (
                            <span className="flex gap-0.5 text-xs text-red-500 bg-red-50 px-1.5 py-0.5 rounded">
                              <Calendar size={14} className="pt-0.5" /> {task.date}</span>
                          )}
                        </div>


                        {visibleFields.labels && task.labels.length > 0 && (
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {task.labels.map((label, i) => (
                              <span key={i} className="text-xs text-[#737373] bg-[#F5F5F5] px-1.5 py-0.5 rounded flex items-center gap-1">
                                <Tag size={14} /> {label}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}

                  {
                    addingToColumn == col.title ? (
                      <div
                        className="flex items-center gap-2"
                      >
                        <input
                          autoFocus
                          value={newTaskTitle}
                          onChange={(e) => setNewTaskTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleAddTask(col.title);
                            }
                          }}
                          placeholder="Task name..."
                          className="flex-1 border border-[#E5E5E5] rounded-md px-2 py-1 text-sm outline-none"
                        />
                        <button
                          onClick={() => handleAddTask(col.title)}
                          className="text-sm text-[#171717]"
                        >
                          Add
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setAddingToColumn(col.title)}
                        className="text-sm text-[#737373] text-left px-1 py-1"
                      >
                        + Add Task
                      </button>
                    )
                  }
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 px-6 pb-6 overflow-y-auto">
            <TaskListView tasks={columns.flatMap((col) => col.tasks).filter(filterTask)}
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
        )
        }
      </main>
    </div>
  );
}