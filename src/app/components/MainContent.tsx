"use client"
import { useState } from "react";
import { Tag, MoreHorizontal, Lock, Eye, Share2, Ellipsis, PanelLeft } from "lucide-react";
import DetailsPanel from "./DetailsPanel";
import CalendarPicker from "./CalendarPicker";
import Updates from "./Updates";
import Comments from "./Comments";
import { Task, Subtask } from "../types/Task";
import PriorityDropdown from "./PriorityDropdown";


export default function MainContent({
    task,
    updateTask,
}: {
    task: Task;
    updateTask: (updates: Partial<Task>) => void;
}) {

    const subtasks = task.subtasks ?? [];
    const [isAddingSubtask, setIsAddingSubtask] = useState(false);
    const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
    const [openSubtaskMenuId, setOpenSubtaskMenuId] = useState<number | null>(null);

    const handleAddSubtask = () => {
        if (!newSubtaskTitle.trim()) return;

        const newSubtask: Subtask = {
            id: Math.max(0, ...subtasks.map((s) => s.id)) + 1,
            task: newSubtaskTitle,
            priority: "No priority",
            member: "",
            dueDate: "",
        };

        updateTask({ subtasks: [...subtasks, newSubtask] });
        setNewSubtaskTitle("");
        setIsAddingSubtask(false);
    };

    const handleDeleteSubtask = (subtaskId: number) => {
        const updated = subtasks.filter((s) => s.id !== subtaskId);
        updateTask({ subtasks: updated });
        setOpenSubtaskMenuId(null);
    };
    return (
        <main className="flex-1 px-8 py-6">
            <div className="flex">
                <div className="flex-1 min-w-0">
                    <div className="flex gap-2 ">
                        <h1>{task.title}</h1>

                    </div>
                    <p className="text-sm text-gray-300">
                        {task.description}

                    </p>

                    <section className="mt-6">
                        <div className="flex items-center gap-4">
                            <span className="w-16 text-sm text-gray-500">Properties</span>

                            <div className="flex items-center gap-2">
                                <span>ⓐ</span>
                                <span className="text-sm">{task.assignee}</span>
                            </div>

                            <CalendarPicker
                                className="bg-red-200 rounded-full"
                            />

                        </div>

                        <div className="mt-4 flex items-center gap-4">
                            <span className="w-16 text-sm text-gray-500">
                                Labels
                            </span>

                            <div className="flex gap-2">
                                {task.labels.map((label, index) => (
                                    <span key={index} className="flex items-center gap-1">
                                        <Tag size={14} className="mt-[5px]" /> {label}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mt-4 flex items-center gap-4">
                            <span className="w-16 text-sm text-gray-500">Resources</span>

                            <span className="text-sm text-gray-400">
                                🔗 Add document or link...
                            </span>
                        </div>
                    </section>

                    <section className="mt-8">
                        <div className="flex items-center gap-2 mb-4">
                            <span>⌄</span>
                            <h2 className="text-sm font-medium">Subtasks</h2>
                        </div>

                        <div className="border rounded-lg">

                            <div className="grid grid-cols-5 border-b px-4 py-2 text-xs font-semibold text-black-600">
                                <span>Task</span>
                                <span>Priority</span>
                                <span>Members</span>
                                <span>Due Date</span>
                                <span className="text-right">Actions</span>
                            </div>

                            {subtasks.map((subtask) => (
                                <div
                                    key={subtask.task}
                                    className="grid grid-cols-5 border-b px-4 py-3 text-sm"
                                >
                                    <span>{subtask.task}</span>
                                    <PriorityDropdown
                                        value={subtask.priority}
                                        onChange={(newPriority) => {
                                            const updated = subtasks.map((s) =>
                                                s.id === subtask.id ? { ...s, priority: newPriority } : s
                                            );
                                            updateTask({ subtasks: updated });
                                        }}
                                    />

                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs">
                                        {subtask.member}
                                    </span>

                                    <span className="text-sm text-gray-600">
                                        <CalendarPicker
                                            onDateSelect={(newDate: string) => {
                                                const updated = subtasks.map((s) =>
                                                    s.id === subtask.id ? { ...s, dueDate: newDate } : s
                                                );
                                                updateTask({ subtasks: updated });
                                            }}
                                        />

                                    </span>

                                    <span className="text-right relative">
                                        <MoreHorizontal
                                            size={14}
                                            className="cursor-pointer inline-block"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setOpenSubtaskMenuId(openSubtaskMenuId === subtask.id ? null : subtask.id);
                                            }}
                                        />
                                        {openSubtaskMenuId === subtask.id && (
                                            <div
                                                onClick={(e) => e.stopPropagation()}
                                                className="absolute right-0 top-5 w-32 rounded-md border border-[#E5E5E5] bg-white shadow-lg z-10"
                                            >
                                                <button
                                                    onClick={() => handleDeleteSubtask(subtask.id)}
                                                    className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </span>

                                </div>
                            ))}

                            <div className="px-4 py-3 text-sm text-gray-500">
                                {isAddingSubtask ? (
                                    <div className="flex items-center gap-2 px-4 py-3">
                                        <input
                                            autoFocus
                                            value={newSubtaskTitle}
                                            onChange={(e) => setNewSubtaskTitle(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") handleAddSubtask();
                                                if (e.key === "Escape") {
                                                    setNewSubtaskTitle("");
                                                    setIsAddingSubtask(false);
                                                }
                                            }}
                                            placeholder="Subtask name..."
                                            className="flex-1 border border-[#E5E5E5] rounded-md px-2 py-1 text-sm outline-none"
                                        />
                                        <button onClick={handleAddSubtask} className="text-sm text-[#171717]">
                                            Add
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setIsAddingSubtask(true)}
                                        className="px-4 py-3 text-sm text-gray-500 text-left w-full"
                                    >
                                        + Add Subtasks
                                    </button>
                                )}
                            </div>

                        </div>
                    </section>
                    <Comments />
                </div>



                <div className="ml-5 flex w-[323px] flex-col">
                    <div className="flex items-center gap-2 mt-1 ml-auto">
                        <div className="flex items-center justify-center h-5 w-8 border border-[#E5E5E5] rounded-md">
                            <Lock size={14} />
                        </div>

                        <div className="flex items-center gap-1 h-5 px-2 border border-[#E5E5E5] rounded-md w-fit">
                            <Eye size={14} />
                            <span className="text-xs text-[#737373]">1</span>
                        </div>

                        <div className="flex items-center justify-center h-5 w-8 border border-[#E5E5E5] rounded-md">
                            <Share2 size={14} />
                        </div>

                        <div className="flex items-center justify-center h-5 w-8 border border-[#E5E5E5] rounded-md">
                            <Ellipsis size={14} />
                        </div>

                        <div className="flex items-center justify-center h-5 w-8 border border-[#E5E5E5] rounded-md">
                            <PanelLeft size={14} />
                        </div>
                    </div>
                    <DetailsPanel task={task} updateTask={updateTask} />
                    <Updates updates={task.updates ?? []}/>
                </div>

            </div>
        </main>
    )
}