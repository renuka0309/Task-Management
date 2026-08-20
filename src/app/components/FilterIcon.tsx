"use client"
import { useState, useRef, useEffect } from "react";
import { Filter, ChevronRight, Check, SignalMedium } from "lucide-react";
import CalendarPicker from "./CalendarPicker";

const PRIORITY_COLORS: Record<string, string> = {
  "No priority": "text-black",
  "Urgent": "text-red-500",
  "High": "text-orange-500",
  "Medium": "text-yellow-500",
  "Low": "text-gray-500",
};

// Config-driven fields — add more by just adding an entry here
const FILTER_CONFIG: Record<string, { type: "checklist" | "avatar-list" | "date"; options?: string[] }> = {
  "Status": { type: "checklist", options: ["Backlog", "To Do", "Doing", "Completed", "On Hold"] },
  "Priority": { type: "checklist", options: ["No priority", "Urgent", "High", "Medium", "Low"] },
  "Members": { type: "avatar-list", options: ["Admin", "Designer", "Dev Team", "QA Team"] },
  "Due Date": { type: "date" },
  "Teams": { type: "checklist", options: ["Engineering", "Design", "QA"] },
  "Labels": { type: "checklist", options: ["Research", "Design", "Development", "Testing", "Deployment"] },
  "Reporter": { type: "avatar-list", options: ["Admin", "Ankit Dutta"] },
};

export default function FilterIcon({ onChange }: { onChange?: (filters: Record<string, string[]>) => void }) {
  const [showFilter, setShowFilter] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowFilter(false);
        setActiveField(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleValue = (field: string, value: string) => {
    
      const current = filters[field] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      const next = {...filters, [field]: updated};
      setFilters(next);
      onChange?.(next);
  };

  const totalActiveFilters = Object.values(filters).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setShowFilter((prev) => !prev)}
        className="h-8 w-8 flex items-center justify-center border border-[#E5E5E5] rounded-md relative"
      >
        <Filter size={14} className="text-[#737373]" />
        {totalActiveFilters > 0 && (
          <span className="absolute -top-1 -right-1 h-3.5 w-3.5 text-[10px] flex items-center justify-center rounded-full bg-black text-white">
            {totalActiveFilters}
          </span>
        )}
      </button>

      {showFilter && (
        <div className="absolute right-0 top-full mt-2 w-[200px] rounded-lg bg-white p-1 shadow-lg border border-[#E5E5E5] z-50">
          {Object.entries(FILTER_CONFIG).map(([field, config]) => {
            const selectedCount = filters[field]?.length || 0;
            return (
              <div key={field} className="relative" onMouseEnter={() => setActiveField(field)}>
                <button
                  onClick={() => setActiveField(activeField === field ? null : field)}
                  className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-gray-50"
                >
                  <span className="text-[#171717]">
                    {field}{selectedCount > 0 ? ` (${selectedCount})` : ""}
                  </span>
                  <ChevronRight size={14} className="text-[#737373]" />
                </button>

                {activeField === field && (
                  <div className="absolute right-full top-0 mr-1 w-[200px] rounded-lg bg-white p-1 shadow-lg border border-[#E5E5E5]">
                    {config.type === "checklist" &&
                      config.options!.map((item) => (
                        <button
                          key={item}
                          onClick={() => toggleValue(field, item)}
                          className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-2">
                            {field === "Priority" && item !== "No priority" && (
                              <SignalMedium size={16} className={PRIORITY_COLORS[item]} />
                            )}
                            <span className={field === "Priority" ? PRIORITY_COLORS[item] : "text-[#171717]"}>
                              {item}
                            </span>
                          </div>
                          {filters[field]?.includes(item) && <Check size={16} />}
                        </button>
                      ))}

                    {config.type === "avatar-list" &&
                      config.options!.map((person) => (
                        <button
                          key={person}
                          onClick={() => toggleValue(field, person)}
                          className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded-full bg-[#F5F5F5] text-[10px] flex items-center justify-center">
                              {person[0]}
                            </div>
                            <span className="text-[#171717]">{person}</span>
                          </div>
                          {filters[field]?.includes(person) && <Check size={16} />}
                        </button>
                      ))}

                    {config.type === "date" && (
                      <div className="p-2 text-sm text-[#737373]">
                        <CalendarPicker
  value={filters["Due Date"]?.[0]}
  onDateSelect={(date) => toggleValue("Due Date", date)}
/>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}