"use client";
import CalendarPicker from "./CalendarPicker";
import { useState } from "react";
import { Settings, ChevronDown, ChevronUp } from "lucide-react";
import PriorityDropdown from "./PriorityDropdown";
import StatusDropdown from "./StatusDropdown";
export default function DetailsPanel() {
    const [isOpen, setIsOpen] = useState(true)

    return (

        <aside className="w-[260px] border rounded-lg px-5 py-6 ml-5 mb-20 mt-22 h-fit">
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
                        <PriorityDropdown />
                    </div>

                    <div className="flex items-center gap-12">
                        <p className="text-xs text-gray-400">Members</p>
                        <p className="text-sm">CN</p>
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
                        <p className="text-sm">Research</p>
                    </div>

                    <div className="flex items-center gap-15">
                        <p className="text-xs text-gray-400">Team</p>
                        <p className="text-sm">Development</p>
                    </div>

                    <div className="flex items-center gap-12">
                        <p className="text-xs text-gray-400">Reports</p>
                        <p className="text-sm">No reports</p>
                    </div>
                </div>
            )}
        </aside>
    );
}