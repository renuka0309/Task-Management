"use client";

import { useState } from "react";
import {Check} from "lucide-react";

export default function LabelsDropdown(){
    const [label, setLabel] = useState("Research");
    const [isOpen, setIsOpen] = useState(false);
    
    const labels=["Research", "Design","Developement","Testing","Deployment"];

    return (
    <div className="relative">
       <button
         onClick={()=>setIsOpen(!isOpen)}
         className="mt-1 flex items-center gap-2 text-sm"
       >
        <span>{label}</span>

       </button>

       {isOpen && (
         <div className="absolute left-0 top-full z-10 mt-2 w-[220px] rounded-lg bg-white p-2 shadow-sm">
           <p className="px-2 py-1 text-xs text-gray-400">Labels</p>

           {labels.map((item)=>(
             <button key={item}
               onClick={()=>{
                  setLabel(item);
                  setIsOpen(false);
               }}
               className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-gray-50"
             >
             
             <span>{item}</span>
             {label===item && <Check size={16}/>}
             </button>
           ))}
         </div>
       )}
    </div>
    )
}