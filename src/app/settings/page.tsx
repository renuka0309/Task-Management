"use client";
import { ArrowLeft, Search, UserRound, Sun, Square } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ProfilePanel from "../components/ProfilePanel";
import ThemePanel from "../components/ThemePanel";
import ColorPanel from "../components/ColorPanel";

export default function Profile() {
  const router=useRouter();
  const [activeTab, setActiveTab]=useState<"profile" | "theme" |"color">("profile");
  
  return (
    <div className="flex min-h-screen bg-white text-sm text-[#202020]">

      <aside className="w-[235px] border-r border-gray-200 px-2 py-4">

        <button 
        onClick={()=> router.push("/tasks")}
        className="mb-5 flex items-center gap-2 px-2 text-sm">
          <ArrowLeft size={16} />
          <span>Back to app</span>
        </button>

        <div className="mb-2 flex h-[30px] items-center gap-2 rounded-md border border-gray-200 px-2 text-gray-400">
          <Search size={15} />
          <span>Search</span>
        </div>

        <ul className="space-y-1">
          <li>
            <button 
            onClick={()=> setActiveTab("profile")}
            className="flex w-full items-center gap-2 rounded-md bg-gray-100 px-2 py-2 text-left">
              <UserRound size={15} />
              <span>Profile</span>
            </button>
          </li>

          <li>
            <button 
            onClick={()=> setActiveTab("theme")}
            className="flex w-full items-center gap-2 px-2 py-2 text-left">
              <Sun size={16} />
              <span>Theme</span>
            </button>
          </li>

          <li>
            <button 
            onClick={()=> setActiveTab("color")}
            className="flex w-full items-center gap-2 px-2 py-2 text-left">
              <Square size={15} fill="black" />
              <span>Color</span>
            </button>
          </li>
        </ul>
      </aside>

      <main className="flex-1">
         <div className="mx-auto w-[585px] pt-[115px]">
          {activeTab === "profile" && <ProfilePanel />}
          {activeTab === "theme" && <ThemePanel />}
          {activeTab === "color" && <ColorPanel />}
        </div>
      </main>
    </div>
  );
}