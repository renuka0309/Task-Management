"use client"
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/contexts/UserContect";
import {
  Sun,
  Square,
  Settings,
  ChevronRight,
  ChevronsUpDown,
  LayoutDashboard,
  GalleryVerticalEnd,
} from "lucide-react";
import ThemeOptions from "./ThemeOptions";
import ColorOptions from "./ColorOptions";

export default function Sidebar() {
  const { user, updateUser } = useUser();
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState<"theme" | "color" | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
        setActiveMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <aside className="w-[240px] min-h-screen border-r border-[#E5E5E5] dark:border-[#262626] bg-gray-50 dark:bg-[#0a0a0a] p-3">
      <div className="flex items-center justify-between relative" ref={menuRef}>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowMenu((prev) => !prev)} className="flex items-center gap-2">
            <Image
              src="/icons/avatar.jpg"
              alt="Avatar"
              width={35}
              height={35}
              className="w-5 h-5 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-[#171717] dark:text-white">
              {mounted ? user.fullName : "Dexter"}
            </span>
          </button>

          {showMenu && (
            <div className="absolute left-0 top-12 w-56 rounded-md border border-[#E5E5E5] dark:border-[#262626] bg-white dark:bg-[#111111] shadow-lg z-50 p-1">
              <div className="flex items-center gap-3 px-3 py-3 border-b border-[#E5E5E5] dark:border-[#262626]">
                <Image src="/icons/avatar.jpg" alt="Dexter" width={32} height={32} className="rounded-full object-cover" />
                <div>
                  <p className="text-sm font-medium text-[#171717] dark:text-white">
                    {mounted ? user.fullName : "Dexter"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {mounted ? user.email : "dexter@gmail.com"}
                  </p>
                </div>
              </div>

              <div className="relative">
                <button
                  onClick={() => setActiveMenu(activeMenu === "theme" ? null : "theme")}
                  className="flex w-full items-center justify-between px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-[#1a1a1a] text-[#171717] dark:text-white"
                >
                  <span className="flex items-center gap-2">
                    <Sun size={14} /> Change Theme
                  </span>
                  <ChevronRight size={14} />
                </button>

                {activeMenu === "theme" && (
                  <div className="absolute left-full top-0 ml-1 w-40 rounded-md border border-[#E5E5E5] dark:border-[#262626] bg-white dark:bg-[#111111] shadow-lg p-1">
                    <ThemeOptions />
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => setActiveMenu(activeMenu === "color" ? null : "color")}
                  className="flex w-full items-center justify-between px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-[#1a1a1a] text-[#171717] dark:text-white"
                >
                  <span className="flex items-center gap-2">
                    <Square size={14} fill="black" /> Color Mode
                  </span>
                  <ChevronRight size={14} />
                </button>

                {activeMenu === "color" && (
                  <div className="absolute left-full top-0 ml-1 w-40 rounded-md border border-[#E5E5E5] dark:border-[#262626] bg-white dark:bg-[#111111] shadow-lg p-1">
                    <ColorOptions />
                  </div>
                )}
              </div>

              <button
                onClick={() => router.push("/settings")}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-[#1a1a1a] text-[#171717] dark:text-white"
              >
                <Settings size={14} /> Settings
              </button>
            </div>
          )}
        </div>

        <span className="text-gray-400 text-sm">
          <ChevronsUpDown size={16} />
        </span>
      </div>

      <div className="mt-8">
        <p className="text-sm ml-3 text-gray-400 mb-3">Workspace</p>

        <div className="flex flex-col gap-3 text-sm">
          <div className="flex items-center gap-2">
            <LayoutDashboard size={16} className="ml-2 text-[#171717] dark:text-white" />
            <Link href="/tasks" className="flex items-center gap-2 px-2 py-1.5 rounded-md">
              <span className="text-sm text-[#171717] dark:text-white">Tasks</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <GalleryVerticalEnd size={16} className="ml-2 text-[#171717] dark:text-white" />
            <Link href="/projects" className="flex items-center gap-2 px-2 py-1.5 rounded-md">
              <span className="text-sm text-[#171717] dark:text-white">Projects</span>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}