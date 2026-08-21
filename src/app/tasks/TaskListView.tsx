import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Plus, MoreHorizontal } from "lucide-react";
import { Task } from "../types/Task";
import CalendarPicker from "../components/CalendarPicker";
import PriorityDropdown from "../components/PriorityDropdown";

const PRIORITY_COLORS: Record<string, string> = {
  "No priority": "text-black",
  "Urgent": "text-red-500",
  "High": "text-orange-500",
  "Medium": "text-yellow-600",
  "Low": "text-gray-400",
};

type TaskListViewProps = {
  tasks: Task[];
  addingToColumn: string | null;
  setAddingToColumn: (title: string | null) => void;
  newTaskTitle: string;
  setNewTaskTitle: (title: string) => void;
  handleAddTask: (columnTitle: string) => void;
  handleDeleteTask: (columnTitle: string, taskId: number) => void;
  openMenuTaskId: number | null;
  setOpenMenuTaskId: (id: number | null) => void;
  updateTaskPriority: (columnTitle: string, taskId: number, newPriority: string) => void;
  updateTaskDueDate: (columnTitle: string, taskId: number, newDate: string) => void;
};

export default function TaskListView({
  tasks,
  addingToColumn,
  setAddingToColumn,
  newTaskTitle,
  setNewTaskTitle,
  handleAddTask,
  handleDeleteTask,
  openMenuTaskId,
  setOpenMenuTaskId,
  updateTaskPriority,
  updateTaskDueDate,
}: TaskListViewProps) {
  const grouped = {
    "To Do": tasks.filter((t) => t.status === "To Do"),
    "Doing": tasks.filter((t) => t.status === "Doing"),
    "Completed": tasks.filter((t) => t.status === "Completed"),
    "On Hold": tasks.filter((t) => t.status === "On Hold"),
  };

  return (
    <div className="flex flex-col gap-6">
      {Object.entries(grouped).map(([status, group]) => (
        <div key={status} className="border border-[#E5E5E5] rounded-md">
          <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#FAFAFA] text-sm text-[#171717]">
            <ChevronDown size={14} className="text-[#737373]" />
            <span>{status}</span>
            <span className="text-xs text-[#737373]">{group.length}</span>
          </div>

          {group.length > 0 && (
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left text-[#737373] border-b border-[#E5E5E5]">
                  <th className="py-2 px-4 font-normal">Task</th>
                  <th className="font-normal">Priority</th>
                  <th className="font-normal">Members</th>
                  <th className="font-normal">Due Date</th>
                  <th className="font-normal pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {group.map((task) => (
                  <tr
                    key={task.id}
                    className="border-b border-[#E5E5E5] hover:bg-[#FAFAFA] cursor-pointer"
                  >
                    <td className="py-2.5 px-4">
                      <Link href={`/tasks/${task.id}`} className="text-[#171717]">
                        {task.title}
                      </Link>
                    </td>

                    <td>
                      <PriorityDropdown
                        value={task.priority ?? "No priority"}
                        onChange={(newPriority) => {
                          console.log("Clicked:", newPriority, "for task:", task.id, "status:", status);
                          updateTaskPriority(status, task.id, newPriority)
                        }

                        }
                      />
                    </td>
                    <td>
                      <Image src="/icons/avatar.jpg" alt="" width={20} height={20} className="rounded-full object-cover" />
                    </td>
                    <td className="text-[#171717]">{task.date && (
                      <span className="flex items-center gap-1 text-xs px-1.5 py-0.5 rounded w-fit">
                        <CalendarPicker
                          value={task.date}
                          onDateSelect={(newDate: string) => updateTaskDueDate(status, task.id, newDate)}
                        />

                      </span>
                    )}</td>
                    <td className="pr-4 text-[#737373]">
                      <MoreHorizontal size={14}
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuTaskId(openMenuTaskId === task.id ? null : task.id);
                        }}
                      />

                      {openMenuTaskId === task.id && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="absolute right-4 top-6 w-32 rounded-md border border-[#E5E5E5] bg-white shadow-lg z-10"
                        >
                          <button
                            onClick={() => {
                              handleDeleteTask(status, task.id);
                              setOpenMenuTaskId(null);
                            }}
                            className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {addingToColumn === status ? (
            <div className="flex items-center gap-2 px-4 py-2.5">
              <input
                autoFocus
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddTask(status);
                  if (e.key === "Escape") setAddingToColumn(null);
                }}
                placeholder="Task name..."
                className="flex-1 border border-[#E5E5E5] rounded-md px-2 py-1 text-sm outline-none"
              />
              <button onClick={() => handleAddTask(status)} className="text-sm text-[#171717]">
                Add
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setAddingToColumn(status)}
              className="flex items-center gap-1.5 px-4 py-2.5 text-sm text-[#737373] hover:bg-[#FAFAFA] w-full text-left"
            >
              <Plus size={14} />
              Add Task
            </button>
          )}
        </div>
      ))}
    </div>
  );
}