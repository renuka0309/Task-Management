"use client"
import { useState } from "react";
import { Tag, Lock, Eye, Share2, Ellipsis, PanelLeft } from "lucide-react";
import DetailsPanel from "./DetailsPanel";
import CalendarPicker from "./CalendarPicker";
import Updates from "./Updates";
import Comments from "./Comments";

export default function MainContent() {

    const subtasks = [
        {
            task: "Subtask 1",
            priority: "High",
            member: "",
            dueDate: "12 Sep 2026"
        },
        {
            task: "Subtask 2",
            priority: "Low",
            member: "CN",
            dueDate: "15 Sep 2026",
        },
        {
            task: "Subtask 3",
            priority: "Medium",
            member: "+",
            dueDate: "18 Sep 2026",
        },
    ]



    return (
        <main className="flex-1 px-8 py-6">
            <div className="flex">
                <div className="flex-1 min-w-0">
                    <div className="flex gap-2 ">
                        <h1>Write API Documentation</h1>

                    </div>
                    <p className="text-sm text-gray-300">Create and manage your API documentation to guide developers in using the inventory and sales metrics features effectively

                    </p>



                    <section className="mt-6">
                        <div className="flex items-center gap-4">
                            <span className="w-16 text-sm text-gray-500">Properties</span>

                            <div className="flex items-center gap-2">
                                <span>ⓐ</span>
                                <span className="text-sm">Designer</span>
                            </div>

                            <CalendarPicker className="bg-red-200 rounded-full" />

                        </div>

                        <div className="mt-4 flex items-center gap-4">
                            <span className="w-16 text-sm text-gray-500">Labels</span>

                            <div className="flex gap-2">
                                <Tag size={14} className="mt-[5px]" /><span> Research</span>
                                <Tag size={14} className="mt-[5px]" /><span>Design</span>
                                <Tag size={14} className="mt-[5px]" /><span>Development</span>
                                <Tag size={14} className="mt-[5px]" /><span>Testing</span>
                                <Tag size={14} className="mt-[5px]" /><span>Deployment</span>
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

                        <div className="border rounded-lg overflow-hidden">

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
                                    <span className={`w-fit rounded-full px-2 py-1 text-xs ${subtask.priority === "High"
                                        ? "bg-red-50 text-red-500"
                                        : subtask.priority === "Medium"
                                            ? "bg-yellow-50 text-yellow-600"
                                            : "bg-green-50 text-gray-600"
                                        }`}>
                                        {subtask.priority}
                                    </span>

                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs">
                                        {subtask.member}
                                    </span>

                                    <span className="text-sm text-gray-600">
                                        {subtask.dueDate}
                                    </span>
                                    <span className="text-right">...</span>
                                </div>
                            ))}

                            <div className="px-4 py-3 text-sm text-gray-500">
                                + Add Subtasks
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
                    <DetailsPanel />
                    <Updates />
                </div>

            </div>
        </main>
    )
}