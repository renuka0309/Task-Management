"use client"
import { Search, SlidersHorizontal, Menu, Grid2X2 } from "lucide-react";
import FilterIcon from "./FilterIcon";

type VisibleFields = {
  priority: boolean;
  members: boolean;
  dueDate: boolean;
  labels: boolean;
  status: boolean;
  reporter: boolean;
};

type TaskToolbarProps = {
  isSearching: boolean;
  setIsSearching: (val: boolean) => void;
  searchText: string;
  setSearchText: (val: string) => void;

  showFields: boolean;
  setShowFields: (val: boolean | ((prev: boolean) => boolean)) => void;
  visibleFields: VisibleFields;
  toggleFields: (field: keyof VisibleFields) => void;

  viewMode: "board" | "list";
  setViewMode: (mode: "board" | "list") => void;

  setFilters: (filters: Record<string, string[]>) => void;
};

export default function TaskToolbar({
  isSearching, setIsSearching,
  searchText, setSearchText,
  showFields, setShowFields,
  visibleFields, toggleFields,
  viewMode, setViewMode,
  setFilters,
}: TaskToolbarProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setIsSearching(true)}
        className="h-8 w-8 flex items-center justify-center border border-[#E5E5E5] rounded-md"
      >
        <Search size={14} className="text-[#737373]" />
      </button>

      {isSearching && (
        <input
          autoFocus
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search..."
          className="h-8 w-48 rounded-md border border-[#E5E5E5] px-2 text-sm outline-none"
        />
      )}

      <div className="relative">
        <button
          onClick={() => setShowFields((prev) => !prev)}
          className="h-8 px-3 flex items-center gap-1.5 border border-[#E5E5E5] rounded-md text-sm text-[#171717]"
        >
          <SlidersHorizontal size={14} />
          Fields
        </button>

        {showFields && (
          <div className="absolute mt-2 w-56 rounded-md border border-[#E5E5E5] bg-white p-3 shadow-sm z-20">
            <div className="flex items-center gap-1 border-b border-[#E5E5E5] p-2">
              <button onClick={() => setViewMode("list")} className="flex flex-1 items-center justify-center gap-2 rounded-md px-2 py-1.5 text-sm">
                <Menu size={14} /> List
              </button>
              <button onClick={() => setViewMode("board")} className="flex flex-1 items-center justify-center gap-2 rounded-md px-2 py-1.5 text-sm">
                <Grid2X2 size={14} /> Board
              </button>
            </div>

            <div className="flex flex-col justify-between gap-2 p-2">
              <label className="flex items-center justify-between px-2 py-1.5 text-sm">
                <span>Priority</span>
                <input type="checkbox" checked={visibleFields.priority} onChange={() => toggleFields("priority")} />
              </label>
              <label className="flex items-center justify-between px-2 py-1.5 text-sm">
                <span>Members</span>
                <input type="checkbox" checked={visibleFields.members} onChange={() => toggleFields("members")} />
              </label>
              <label className="flex items-center justify-between px-2 py-1.5 text-sm">
                <span>Due Date</span>
                <input type="checkbox" checked={visibleFields.dueDate} onChange={() => toggleFields("dueDate")} />
              </label>
              <label className="flex items-center justify-between px-2 py-1.5 text-sm">
                <span>Labels</span>
                <input type="checkbox" checked={visibleFields.labels} onChange={() => toggleFields("labels")} />
              </label>
              <label className="flex items-center justify-between px-2 py-1.5 text-sm">
                <span>Status</span>
                <input type="checkbox" checked={visibleFields.status} onChange={() => toggleFields("status")} />
              </label>
              <label className="flex items-center justify-between px-2 py-1.5 text-sm">
                <span>Reporter</span>
                <input type="checkbox" checked={visibleFields.reporter} onChange={() => toggleFields("reporter")} />
              </label>
            </div>
          </div>
        )}
      </div>

      <FilterIcon onChange={setFilters} />
    </div>
  );
}