"use client"
import { Check } from "lucide-react";
import { useTheme, COLOR_HEX, Color } from "@/contexts/ThemeContext";

const COLORS: Color[] = ["Amber", "Blue", "Pink", "Rose", "Emerald", "Black"];

export default function ColorOptions() {
  const { color, setColor } = useTheme();

  return (
    <div className="flex flex-col gap-1">
      {COLORS.map((option) => (
        <button
          key={option}
          onClick={() => setColor(option)}
          className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-gray-50"
        >
          <span className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-sm"
              style={{ backgroundColor: COLOR_HEX[option] }}
            />
            {option}
          </span>
          {color === option && <Check size={14} />}
        </button>
      ))}
    </div>
  );
}