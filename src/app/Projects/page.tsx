"use client"
import Link from "next/link";
import { useState } from "react";
import { useTasks } from "@/contexts/TasksContext";
import { Plus, MoreHorizontal } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import TaskToolbar from "../components/TaskToolbarProps";
import { Project } from "../types/Task";
import PriorityDropdown from "../components/PriorityDropdown";
import CalendarPicker from "../components/CalendarPicker";

export default function ProjectsPage() {

  const { projects, setProjects } = useTasks();

  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [viewMode, setViewMode] = useState<"board" | "list">("board");
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
  });

  const toggleFields = (field: keyof typeof visibleFields) => {
    setVisibleFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }

  const handleAddProject = () => {
    if (!newProjectTitle.trim()) return;
    const newProject: Project = {
      id: Math.max(0, ...projects.map((p) => p.id)) + 1,
      title: newProjectTitle,
      priority: "No priority",
      lead: "Admin",
      dueDate: "",
    };
    setProjects((prev) => [...prev, newProject]);
    setNewProjectTitle("");
    setIsAddingProject(false);
  };

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const updateProjectPriority = (projectId: number, newPriority: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, priority: newPriority } : p))
    );
  };

  const updateProjectDueDate = (projectId: number, newDate: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, dueDate: newDate } : p))
    );
  };

  const handleDeleteProject = (projectId: number) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
  };

  const [openMenuProjectId, setOpenMenuProjectId] = useState<number | null>(null);
  return (
    <div className="flex h-screen w-full bg-white">
      <Sidebar />
      <main className="flex-1 flex flex-col">

        <Topbar />
        <div className="flex-1 flex flex-col px-6 py-4">
          <div className="flex items-center gap-2 ">
            <h1 className="text-lg font-semibold mb-4">Projects</h1>
            <div className="flex gap-2 ml-[920]">
              <TaskToolbar
                isSearching={isSearching} setIsSearching={setIsSearching}
                searchText={searchText} setSearchText={setSearchText}
                showFields={showFields} setShowFields={setShowFields}
                visibleFields={visibleFields} toggleFields={toggleFields}
                viewMode={viewMode} setViewMode={setViewMode}
                setFilters={setFilters}
              />
              <button
                onClick={() => setIsAddingProject(true)}
                className="h-8 px-3 flex items-center gap-1.5 bg-black text-white rounded-md text-sm"
              >
                <Plus size={14} />
                Add Project
              </button>
            </div>
          </div>

          {isAddingProject && (
            <div className="px-6 pb-4">
              <input
                value={newProjectTitle}
                onChange={(e) => setNewProjectTitle(e.target.value)}
                placeholder="Project Title..."
                className="h-9 w-full rounded-md border border-[#E5E5E5] px-3 text-sm outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddProject();
                  if (e.key === "Escape") {
                    setNewProjectTitle("");
                    setIsAddingProject(false);
                  }
                }}
                autoFocus
              />
            </div>
          )}

          {
            <div className="border border-[#E5E5E5] rounded-md">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[#737373] border-b border-[#E5E5E5]">
                    <th className="py-2 px-4 font-normal">Projects</th>
                    <th className="font-normal">Priority</th>
                    <th className="font-normal">Lead</th>
                    <th className="font-normal">Due Date</th>
                    <th className="font-normal pr-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((project) => (
                    <tr key={project.id} className="border-b border-[#E5E5E5] hover:bg-[#FAFAFA]">
                      <td className="py-2.5 px-4">
                        <Link href={`/projects/${project.id}`} className="text-[#171717]">
                          {project.title}
                        </Link>
                      </td>

                      <td>
                        <PriorityDropdown
                          value={project.priority}
                          onChange={(newPriority) => updateProjectPriority(project.id, newPriority)}
                        />
                      </td>

                      <td className="text-[#171717]">{project.lead}</td>

                      <td>
                        <CalendarPicker
                          onDateSelect={(newDate: string) => updateProjectDueDate(project.id, newDate)}
                        />
                      </td>

                      <td className="pr-4 relative">
                        <MoreHorizontal
                          size={14}
                          className="text-[#737373] cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuProjectId(openMenuProjectId === project.id ? null : project.id);
                          }}
                        />

                        {openMenuProjectId === project.id && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute right-4 top-6 w-32 rounded-md border border-[#E5E5E5] bg-white shadow-lg z-10"
                          >
                            <button
                              onClick={() => {
                                handleDeleteProject(project.id);
                                setOpenMenuProjectId(null);
                              }}
                              className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
        </div>
      </main>
    </div>

  )
}
