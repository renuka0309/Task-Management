"use client"
import { Check, SignalMedium } from "lucide-react";
import { useState } from "react"

export default function PriorityDropdown() {
    const [priority, setPriority] = useState("Urgent");
    
    const [isOpen, setIsOpen] = useState(false);

    const priorities = ["No priority", "Urgent", "High","Medium", "Low"];
    const priorityColors: Record<string, string>={
      "No priority": "text-black",
      "Urgent": "text-red-500",
      "High": "text-orange-500",
      "Medium": "text-yellow-500",
      "Low": "text-gray-500",
    }
    return (
        <div className="relative">
            <p className="text-xs text-gray-400"></p>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`mt-1 text-sm ${priorityColors[priority]}`}
            >
                {priority}
            </button>

            {isOpen && (
                <div className="absolute left-0 top-full z-50 mt-2 w-[220px] rounded-lg bg-white p-2 shadow-lg">
                    <p className="px-2 py-1 text-xs text-gray-400">
                        Priority
                    </p>

                    {priorities.map((item) => (
                        <button
                            key={item}
                            onClick={() => {
                                setPriority(item);
                                setIsOpen(false);
                            }}
                            className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-gray-50"
                        >

                            <div className="flex items-center gap-2">
                                {item!=="No priority" && (
                                    <SignalMedium 
                                      size={16}
                                      className={priorityColors[item]}
                                    />
                                )}
                            <span className={priorityColors[item]}>
                                {item}
                            </span>
                            </div>
                            {priority === item && <span> <Check size={16} /> </span>}

                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}