"use client";

import { useState } from "react";
import { Check } from "lucide-react";

export default function StatusDropdown(){
    const [status, setStatus] = useState("Backlog");
    const [isOpen, setIsOpen] = useState(false);

    const statuses = ["Backlog", "In Progress", "Completed", "Cancelled"];
    const statusColors: Record<string, string>={
        Backlog: "bg-orange-500",
        "In Progress": "bg-blue-500",
        Completed: "bg-green-500",
        Cancelled: "bg-red-500",
    }

    return (
        <div className="relative">
           <button
            onClick={()=>setIsOpen(!isOpen)}
            className="mt-1 flex items-center gap-2 text-sm"
           >
             
             <span
              className={`inline-block h-2 w-2 shrink-0 rounded-full ${statusColors[status]}`}
              ></span>

             <span>{status}</span>
           </button>

           {isOpen && (
            <div className="absolute left-0 top-full z-10 mt-2 w-[220px] rounded-lg border bg-white p-2 shadow-sm">
                <p className="px-2 py-1 text-xs text-gray-400">
                    Status
                </p>

                {statuses.map((item)=>(
                    <button
                     key={item}
                     onClick={()=>{
                        setStatus(item);
                        setIsOpen(false);
                     }}
                     className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-gray-50"
                    >
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-2 w-2 rounded-full ${statusColors[item]}`}
                          ></span>
                          <span>{item}</span>    
                        </div>
                      
                      {status===item && <Check size={16}/>}
                    </button>
                ))}
            </div>
             
          )}
        </div>
    )
}