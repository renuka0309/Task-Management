"use client"
import { Check } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeOptions() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col gap-1">
      {(["light", "dark"] as const).map((option) => (
        <button
          key={option}
          onClick={() => setTheme(option)}
          className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-[#1a1a1a]"
        >
          <span className="capitalize">{option}</span>
          {theme === option && <Check size={14} />}
        </button>
      ))}
    </div>
  );
}