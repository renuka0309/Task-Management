"use client";
import { useState } from "react";
import TaskListView from "./TaskListView";
import Image from "next/image";
import { Menu, Grid2X2, Search, Tag, Calendar, SlidersHorizontal, Filter, Plus, PanelLeft, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import FilterIcon from "../components/FilterIcon";

type Task = {
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

export default function TasksBoard() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"board" | "list">("board");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isAddingTask, setAddingTask] = useState(false);
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
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
  const [addingToColumn, setAddingToColumn] = useState<string | null>(null);
  const [columns, setColumns] = useState<{ title: string; count: number; tasks: Task[] }[]>([
    {
      title: "To Do",
      count: 3,
      tasks: [
        { id: 1, title: "Write API Documentation", status: "ToDo", labels: ["Deployment", "Deployment"], assignee: "Admin", date: "29 Jul" },
        { id: 2, title: "Implement Search Function", status: "ToDo", labels: ["Deployment", "Deployment"], assignee: "Admin", date: "29 Jul" },
        { id: 3, title: "Deploy to Production", status: "ToDO", labels: ["Deployment", "Deployment"], assignee: "Admin", date: "29 Jul" },
      ],
    },
    {
      title: "Doing",
      count: 2,
      tasks: [
        { id: 4, title: "Code Review Completed", status: "Doing", labels: ["Deployment", "Deployment"], assignee: "Admin", date: "29 Jul" },
        { id: 5, title: "Design Mockups Finalized", status: "Doing", labels: ["Deployment", "Deployment"], assignee: "Admin", date: "29 Jul" },
      ],
    },
    {
      title: "Completed",
      count: 4,
      tasks: [
        { id: 6, title: "Feature Testing Passed", status: "Completed", labels: ["Testing", "Passed"], assignee: "QA Team", date: "30 Jul" },
        { id: 7, title: "UI Design Updated", status: "Completed", labels: ["Design", "Updated"], assignee: "Designer", date: "31 Jul" },
        { id: 8, title: "Security Audit Scheduled", status: "Completed", labels: ["Audit", "Scheduled"], assignee: "Security", date: "01 Aug" },
      ],
    },
    {
      title: "On Hold",
      count: 5,
      tasks: [
        { id: 9, title: "UI Review", labels: [], assignee: "Designer", status: "On Hold", date: "" },
        { id: 10, title: "Backend Refactor", labels: [], assignee: "Dev Team", status: "On Hold", date: "" },
      ],
    },
  ]);

  const handleAddTask = (columnTitle: string) => {
    if (!newTaskTitle.trim()) return;
    const newTask = {
      id: Math.max(
        ...columns.flatMap((column) => column.tasks.map((task) => task.id))
      ) + 1,
      title: newTaskTitle,
      status: columnTitle,
      labels: ["Deployment"],
      assignee: "Admin",
      date: "",
    };


    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.title === columnTitle
          ? {
            ...column,
            tasks: [...column.tasks, newTask],
            count: column.tasks.length + 1,
          }
          : column
      )
    );
    setNewTaskTitle("");
    setAddingToColumn(null);
  }

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
            <button
              onClick={() => setIsSearching(true)}
              className="h-8 w-8 flex items-center justify-center border border-[#E5E5E5] rounded-md">
              <Search size={14}

                className="text-[#737373]" />
            </button>

            {isSearching && (
              <input
                autoFocus
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search tasks..."
                className="h-8 w-48 rounded-md border border-[#E5E5E5] px-2 text-sm outline-none"
              />
            )}
            <div className="flex items-center gap-2">

              <div className="relative">
                <button
                  onClick={() => setShowFields((prev) => !prev)}
                  className="h-8 px-3 flex items-center gap-1.5 border border-[#E5E5E5] rounded-md text-sm text-[#171717]">
                  <SlidersHorizontal size={14} />
                  Fields
                </button>

                {showFields && (
                  <div className="absolute mt-2 w-56 rounded-md border border-[#E5E5E5] bg-white p-3 shadow-sm">
                    <div className="flex items-center gap-1 border-b border-[#E5E5E5] p-2">
                      <button
                        onClick={() => setViewMode("list")}
                        className="flex flex-1 items-center justify-center gap-2 rounded-md px-2 py-1.5 text-sm"
                      >
                        <Menu size={14} />
                        List
                      </button>

                      <button
                        onClick={() => setViewMode("board")}
                        className="flex flex-1 items-center justify-center gap-2 rounded-md px-2 py-1.5 text-sm"
                      >
                        <Grid2X2 size={14} />
                        Board
                      </button>
                    </div>

                    <div className="flex flex-col justify-between gap-2 p-2">
                      <label className="flex items-center justify-between px-2 py-1.5 text-sm">
                        <span>Priority</span>
                        <input
                          type="checkbox"
                          checked={visibleFields.priority}
                          onChange={() => toggleFields("priority")}
                        />
                      </label>

                      <label className="flex items-center justify-between px-2 py-1.5 text-sm">
                        <span>Members</span>
                        <input
                          type="checkbox"
                          checked={visibleFields.members}
                          onChange={() => toggleFields("members")} />

                      </label>


                      <label className="flex items-center justify-between px-2 py-1.5 text-sm">
                        <span>Due Date</span>
                        <input type="checkbox"
                          checked={visibleFields.dueDate}
                          onChange={() => toggleFields("dueDate")}
                        />

                      </label>

                      <label className="flex items-center justify-between px-2 py-1.5 text-sm">
                        <span>Labels</span>
                        <input type="checkbox"
                          checked={visibleFields.labels}
                          onChange={() => toggleFields("labels")}
                        />

                      </label>


                      <label className="flex items-center justify-between px-2 py-1.5 text-sm">
                        Status
                        <input type="checkbox"
                          checked={visibleFields.status}
                          onChange={() => toggleFields("status")}
                        />

                      </label>

                      <label className="flex items-center justify-between px-2 py-1.5 text-sm">
                        <span>Reporter</span>
                        <input type="checkbox"
                          checked={visibleFields.reporter}
                          onChange={() => toggleFields("reporter")}
                        />

                      </label>
                    </div>
                  </div>
                )}
              </div>

              <FilterIcon onChange={setFilters} />

            </div>
            <button
              onClick={() => setAddingTask(true)}
              className="h-8 px-3 flex items-center gap-1.5 bg-black text-white rounded-md text-sm">
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
                    <Plus size={14} />
                    <MoreHorizontal size={14} />
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
                          <MoreHorizontal size={14} className="text-[#737373] shrink-0" />
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
            />
          </div>
        )
        }
      </main>
    </div>
  );
}