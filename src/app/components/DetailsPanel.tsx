"use client";
import CalendarPicker from "./CalendarPicker";
import { useState } from "react";
import { Settings, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import PriorityDropdown from "./PriorityDropdown";
import StatusDropdown from "./StatusDropdown";
import MembersDropdown from "./MembersDropdown";
import LabelsDropdown from "./LabelsDropdown";
import Image from "next/image";
import { Task } from "../types/Task";

export default function DetailsPanel({
    task,
    updateTask,
}: {
    task: Task;
    updateTask: (updates: Partial<Task>) => void;
}) {
    const [isOpen, setIsOpen] = useState(true)

    return (

        <aside className="w-[323px] rounded-lg px-5 py-6 mb-10 mt-22 h-fit border border-[#E5E5E5] p-3">
            <div className="flex items-center justify-between">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between"
                >
                    <span>{isOpen ? <ChevronUp /> : <ChevronDown />}</span>
                    <h2 className="text-sm font-semibold">Details</h2>

                </button>

                <div className="flex items-center gap-3">
                    <button>
                        +
                    </button>

                    <button>
                        <Settings size={16} />
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="mt-6 space-y-5">

                    <div className="flex items-center gap-15">
                        <p className="text-xs text-gray-400">Status</p>
                        <StatusDropdown />
                    </div>

                    <div className="flex items-center gap-15">
                        <p className="text-xs text-gray-400">Priority</p>
                        <PriorityDropdown
                            value={task.priority ?? "No priority"}
                            onChange={(newPriority) => updateTask({ priority: newPriority })}

                        />
                    </div>

                    <div className="flex items-center gap-12">
                        <p className="text-xs text-gray-400">Members</p>
                        <MembersDropdown />
                    </div>

                    <div className="flex items-center gap-5">
                        <p className="text-xs text-gray-400">Dates</p>
                        <div className="flex items-center gap-4">
                            <div>
                                <CalendarPicker className="rounded-full bg-gray-100 text-gray-500" />
                            </div>

                            <div>
                                <CalendarPicker className="rounded-full bg-gray-100 text-gray-500" />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-14">
                        <p className="text-xs text-gray-400">Labels</p>
                        <LabelsDropdown />
                    </div>

                    <div className="flex items-center gap-15">
                        <p className="text-xs text-gray-400">Team</p>
                        <LabelsDropdown />
                    </div>

                    <div className="flex items-center gap-12">
                        <p className="text-xs text-gray-400">Reports</p>
                        <div className="flex items-center gap-2">
                            <Image src="/icons/avatar.jpg"
                                width={24}
                                height={24}
                                alt="You"
                                className="h-6 w-6 rounded-full"
                            />

                            <span className="text-sm">You</span>
                            <ArrowRight size={14} />
                        </div>
                    </div>
                </div>
            )}
        </aside>
    );
}